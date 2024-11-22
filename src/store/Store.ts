import { LOCAL_STORAGE_EN_INDEX } from '../const/localStorage';

type StoreType = {
    voiceEnIndex: number;
    setVoiceEnIndex: (index: number) => void;
    rate: number;
    setRate: (rate: number) => void;
    voicesOrigin: SpeechSynthesisVoice[];
    voicesEn: SpeechSynthesisVoice[];
    initVoices: VoidFunction;
    utterance: SpeechSynthesisUtterance;

    onSidebarSwitch: VoidFunction;
    setCallbackForSidebarSwitch: (callback: VoidFunction) => void;

    onRightSidebar: VoidFunction;
    setCallbackForRightSidebar: (callback: VoidFunction) => void;
};

const isLocalKey = (key: string) => {
    const result = localStorage.getItem(key);
    if (result) {
        return Number(result);
    } else {
        return 0;
    }
};

const getPriority = (lang: string) => {
    if (lang === 'en-GB' || lang === 'en_GB') return 1;
    if (lang === 'en-US' || lang === 'en_US') return 2;
    return 3;
};

const compareLangs = (a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => {
    const priorityA = getPriority(a.lang);
    const priorityB = getPriority(b.lang);

    if (priorityA !== priorityB) {
        return priorityA - priorityB;
    }

    return a.lang > b.lang ? 1 : -1;
};

const getVoices = () => {
    return new Promise<SpeechSynthesisVoice[]>((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            resolve(voices);
        };
    });
};

class Store implements StoreType {
    rate = 1;
    voicesOrigin: SpeechSynthesisVoice[] = [];
    voicesEn: SpeechSynthesisVoice[] = [];
    voiceEnIndex = isLocalKey(LOCAL_STORAGE_EN_INDEX);
    utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    onSidebarSwitch = () => {};
    onRightSidebar = () => {};

    constructor() {
        this.utterance = new SpeechSynthesisUtterance();
    }

    setCallbackForSidebarSwitch(callback: VoidFunction) {
        this.onSidebarSwitch = callback;
    }

    setCallbackForRightSidebar(callback: VoidFunction) {
        this.onRightSidebar = callback;
    }

    setRate(rate: number) {
        this.rate = rate;
    }
    setVoiceEnIndex(index: number) {
        this.voiceEnIndex = index;
        localStorage.setItem(LOCAL_STORAGE_EN_INDEX, String(index));
    }
    private setVoicesOrigin(voices: SpeechSynthesisVoice[]) {
        this.voicesOrigin = voices;
    }
    private setVoicesEn(voicesEn: SpeechSynthesisVoice[]) {
        this.voicesEn = voicesEn;
    }
    async initVoices() {
        if (this.voicesOrigin.length > 0) {
            return;
        }
        const voices = await getVoices();
        if (voices.length < 1) {
            return;
        }
        const voicesEn = voices
            .filter((item) => item.lang.substring(0, 2) === 'en')
            .sort(compareLangs);

        this.setVoicesOrigin(voices);
        this.setVoicesEn(voicesEn);
    }
    playSound(text: string, onStart: VoidFunction, onEnd: VoidFunction) {
        speechSynthesis.cancel();

        const selectedVoice = this.voicesEn[this.voiceEnIndex];
        const voice = this.voicesOrigin.find((item) => item?.name === selectedVoice?.name);

        this.utterance.text = text;
        this.utterance.rate = this.rate;
        this.utterance.pitch = 1;

        // NOTE: 'en-GB' or 'en_GB' mobile
        // this.utterance.lang = 'en-GB';
        //

        if (voice) {
            this.utterance.voice = voice;
            this.utterance.lang = voice.lang;
        }

        speechSynthesis.speak(this.utterance);

        this.utterance.onstart = () => {
            onStart();
        };
        this.utterance.onend = () => {
            onEnd();
        };
    }
}

export default new Store();
