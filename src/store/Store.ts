type StoreType = {
    voiceEnIndex: number;
    voiceRuIndex: number;
    setVoiceEnIndex: (index: number) => void;
    setVoiceRuIndex: (index: number) => void;

    voicesEn: SpeechSynthesisVoice[];
    voicesRu: SpeechSynthesisVoice[];
    initVoices: VoidFunction;
};

const isLocalKey = (key: string) => {
    const result = localStorage.getItem(key);
    if (result) {
        return Number(result);
    } else {
        return 0;
    }
};

class Store implements StoreType {
    voicesEn: SpeechSynthesisVoice[] = [];
    voicesRu: SpeechSynthesisVoice[] = [];
    voiceEnIndex = isLocalKey('EnIndex');
    voiceRuIndex = isLocalKey('RuIndex');

    setVoiceEnIndex(index: number) {
        this.voiceEnIndex = index;
        localStorage.setItem('EnIndex', String(index));
    }
    setVoiceRuIndex(index: number) {
        this.voiceRuIndex = index;
        localStorage.setItem('RuIndex', String(index));
    }
    private setVoicesEn(voicesEn: SpeechSynthesisVoice[]) {
        this.voicesEn = voicesEn;
    }
    private setVoicesRu(voicesRu: SpeechSynthesisVoice[]) {
        this.voicesRu = voicesRu;
    }
    initVoices() {
        let voices = speechSynthesis.getVoices();
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            const voicesEn = voices.filter((item) => item.lang.split('-')[0] === 'en');
            const voicesRu = voices.filter((item) => item.lang.split('-')[0] === 'ru');
            this.setVoicesEn(voicesEn);
            this.setVoicesRu(voicesRu);
        };
    }
}

export default new Store();
