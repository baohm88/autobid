import { useState, useEffect } from "react";
import axios from "axios";

export default function useCarFilter({
    searchTerm,
    yearFrom,
    yearTo,
    transmission,
    bodyStyle,
    sortBy,
    status = "All", 
}) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        axios
            .get("http://localhost:8080/listings")
            .then((res) => {
                const data = res.data.data;
                setListings(data);
            })
            .catch((err) => {
                console.error("Failed to fetch listings:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, yearFrom, yearTo, transmission, bodyStyle, sortBy, status]);

    // 🔍 Filter
    let filtered = listings.filter((car) => {
        const now = new Date();

        const matchesSearch = `${car.year_model ?? ""} ${car.make} ${car.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesYear =
            car.year_model >= yearFrom && car.year_model <= yearTo;

        const matchesTransmission =
            transmission === "All" || car.transmission === transmission;

        const matchesBodyStyle =
            bodyStyle === "All" || car.body_style === bodyStyle;

        // 🟡 Filter by status
        const carEndTime = new Date(car.end_time);
        const matchesStatus =
            status === "All" ||
            (status === "active" && carEndTime > now) ||
            (status === "ended" && carEndTime <= now);

        return (
            matchesSearch &&
            matchesYear &&
            matchesTransmission &&
            matchesBodyStyle &&
            matchesStatus
        );
    });

    // ↕️ Sort
    filtered.sort((a, b) => {
        if (sortBy === "newly_listed") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === "lowest_mileage") {
            return a.mileage - b.mileage;
        }
        // default: ending soon
        return new Date(a.end_time) - new Date(b.end_time);
    });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        listings,
        loading,
        currentCars,
        filteredCars: filtered,
        currentPage,
        paginate,
        totalPages,
    };
}
