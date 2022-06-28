const writeToCache = (url: string, data: Object) => {
    console.log(`wrote to localStorage successfully`);

    localStorage.setItem(url, JSON.stringify(data));
};

const readFromCache = (url: string) => {
    const data = localStorage.getItem(url);
    console.log(`reading from cache`);

    return data ? JSON.parse(data) : null;
};

export { writeToCache, readFromCache };
