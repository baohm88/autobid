import { useState, useEffect } from "react";
import axios from "axios";

export const useCarDetails = (id) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setCar(null);
            setError(null);
            return;
        }

        setCar(null);
        setError(null);

        async function fetchListing() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/listings/${id}`
                );
                setCar(res.data.data[0]);
            } catch (err) {
                setError("Failed to fetch car details: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id]);

    return { car, loading, error };
};
