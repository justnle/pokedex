const writeToCache = (url: string, data: Object) => {
    localStorage.setItem(url, JSON.stringify(data));
};

const readFromCache = (url: string) => {
    const data = localStorage.getItem(url);

    return data ? JSON.parse(data) : null;
};

export { writeToCache, readFromCache };
