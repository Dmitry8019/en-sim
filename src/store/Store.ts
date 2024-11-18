type StoreType = {
    voiceEnIndex: number;
    setVoiceEnIndex: (index: number) => void;
    rate: number;
    setRate: (rate: number) => void;
    voicesOrigin: SpeechSynthesisVoice[];
    voicesEn: SpeechSynthesisVoice[];
    initVoices: VoidFunction;
    utterance: SpeechSynthesisUtterance;
};

const isLocalKey = (key: string) => {
    const result = localStorage.getItem(key);
    if (result) {
        return Number(result);
    } else {
        return 0;
    }
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
    voiceEnIndex = isLocalKey('EnIndex');
    utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();

    constructor() {
        this.utterance = new SpeechSynthesisUtterance();
    }

    setRate(rate: number) {
        this.rate = rate;
    }
    setVoiceEnIndex(index: number) {
        this.voiceEnIndex = index;
        localStorage.setItem('EnIndex', String(index));
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
        const voicesEn = voices.filter((item) => item.lang.split('-')[0] === 'en');
        this.setVoicesOrigin(voices);
        this.setVoicesEn(voicesEn);
    }
    playSound(text: string, onStart: VoidFunction, onEnd: VoidFunction) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        const selectedVoice = this.voicesEn[this.voiceEnIndex];
        const voice =
            this.voicesOrigin.find((item) => item?.name === selectedVoice?.name) ??
            this.voicesOrigin[0];

        utterance.lang = voice?.lang ? voice.lang : 'en-GB';
        utterance.rate = this.rate;
        utterance.pitch = 1;

        if (voice?.lang) {
            utterance.voice = voice;
        }

        speechSynthesis.speak(utterance);

        utterance.onstart = () => {
            onStart();
        };
        utterance.onend = () => {
            onEnd();
        };
    }
    // playSound(text: string, onStart: VoidFunction, onEnd: VoidFunction) {
    //     speechSynthesis.cancel();

    //     const selectedVoice = this.voicesEn[this.voiceEnIndex];
    //     const voice =
    //         this.voicesOrigin.find((item) => item?.name === selectedVoice?.name) ??
    //         this.voicesOrigin[0];

    //     this.utterance.lang = 'en-GB';
    //     this.utterance.text = text;
    //     this.utterance.rate = this.rate;
    //     this.utterance.pitch = 1;

    //     if (voice?.lang) {
    //         this.utterance.voice = voice;
    //         this.utterance.lang = voice.lang;
    //     }

    //     speechSynthesis.speak(this.utterance);

    //     this.utterance.onstart = () => {
    //         onStart();
    //     };
    //     this.utterance.onend = () => {
    //         onEnd();
    //     };
    // }
}

export default new Store();
