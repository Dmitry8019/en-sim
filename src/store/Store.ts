type StoreType = {
    voiceEnIndex: number;
    voiceRuIndex: number;
    setVoiceEnIndex: (index: number) => void;
    setVoiceRuIndex: (index: number) => void;

    voicesOrigin: SpeechSynthesisVoice[];
    voicesEn: SpeechSynthesisVoice[];
    voicesRu: SpeechSynthesisVoice[];
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

// const getVoices = () => {
//     return new Promise<SpeechSynthesisVoice[]>((resolve) => {
//         let voices = speechSynthesis.getVoices();
//         if (voices.length) {
//             resolve(voices);
//             return;
//         }
//         speechSynthesis.onvoiceschanged = () => {
//             voices = speechSynthesis.getVoices();
//             resolve(voices);
//         };

//         // Добавляем задержку в 100 миллисекунд
//         setTimeout(() => {
//             voices = speechSynthesis.getVoices();
//             if (voices.length) {
//                 resolve(voices);
//             }
//         }, 100);
//     });
// };
const getVoices = () => {
    return new Promise<SpeechSynthesisVoice[]>((resolve, reject) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }

        let attempts = 0;
        const maxAttempts = 10;
        const retryInterval = setInterval(() => {
            voices = speechSynthesis.getVoices();
            attempts++;
            if (voices.length) {
                clearInterval(retryInterval);
                resolve(voices);
            } else if (attempts >= maxAttempts) {
                clearInterval(retryInterval);
                reject(new Error('Unable to load voices after multiple attempts'));
            }
        }, 100);

        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            if (voices.length) {
                clearInterval(retryInterval);
                resolve(voices);
            }
        };
    });
};

class Store implements StoreType {
    voicesOrigin: SpeechSynthesisVoice[] = [];
    voicesEn: SpeechSynthesisVoice[] = [];
    voicesRu: SpeechSynthesisVoice[] = [];
    voiceEnIndex = isLocalKey('EnIndex');
    voiceRuIndex = isLocalKey('RuIndex');
    utterance: SpeechSynthesisUtterance;

    constructor() {
        this.utterance = new SpeechSynthesisUtterance();
    }

    setVoiceEnIndex(index: number) {
        this.voiceEnIndex = index;
        localStorage.setItem('EnIndex', String(index));
    }
    setVoiceRuIndex(index: number) {
        this.voiceRuIndex = index;
        localStorage.setItem('RuIndex', String(index));
    }
    private setVoicesOrigin(voices: SpeechSynthesisVoice[]) {
        this.voicesOrigin = voices;
    }
    private setVoicesEn(voicesEn: SpeechSynthesisVoice[]) {
        this.voicesEn = voicesEn;
    }
    private setVoicesRu(voicesRu: SpeechSynthesisVoice[]) {
        this.voicesRu = voicesRu;
    }
    async initVoices() {
        const voices = await getVoices();
        const voicesEn = voices.filter((item) => item.lang.split('-')[0] === 'en');
        const voicesRu = voices.filter((item) => item.lang.split('-')[0] === 'ru');
        this.setVoicesOrigin(voices);
        this.setVoicesEn(voicesEn);
        this.setVoicesRu(voicesRu);
    }
    playSound(text: string, voiceType: string, onStart: VoidFunction, onEnd: VoidFunction) {
        const selectedVoice =
            voiceType === 'en'
                ? this.voicesEn[this.voiceEnIndex]
                : this.voicesRu[this.voiceRuIndex];
        const voice =
            this.voicesOrigin.find((item) => item.name === selectedVoice.name) ??
            this.voicesOrigin[0];

        speechSynthesis.cancel();

        this.utterance.text = text;
        this.utterance.voice = voice;
        this.utterance.lang = voice.lang;
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
