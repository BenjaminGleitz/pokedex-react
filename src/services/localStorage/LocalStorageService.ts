const LocalStorageService = {
    get(key: string) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string) {
        localStorage.removeItem(key);
    }
};

export default LocalStorageService;
