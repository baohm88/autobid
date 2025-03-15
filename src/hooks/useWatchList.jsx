import { useState, useEffect } from "react";

const WATCH_LIST_KEY = "watch_list";

export default function useWatchList() {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(WATCH_LIST_KEY);
        if (stored) {
            setWatchList(JSON.parse(stored));
        }
    }, []);

    const saveToStorage = (items) => {
        localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(items));
    };

    const addToWatchList = (carId) => {
        if (!watchList.includes(carId)) {
            const updated = [...watchList, carId];
            setWatchList(updated);
            saveToStorage(updated);
        }
    };

    const removeFromWatchList = (carId) => {
        const updated = watchList.filter((id) => id !== carId);
        setWatchList(updated);
        saveToStorage(updated);
    };

    const isInWatchList = (carId) => {
        return watchList.includes(carId);
    };

    return {
        watchList,
        addToWatchList,
        removeFromWatchList,
        isInWatchList,
    };
}
