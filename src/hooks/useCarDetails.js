import { useState, useEffect } from "react";
import axios from "axios";

export const useCarDetails = (id) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchListing() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/listings/${id}`
                );
                setCar(res.data.data[0]);
            } catch (err) {
                setError(
                    "Failed to fetch car details. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id]);

    return { car, loading, error };
};
