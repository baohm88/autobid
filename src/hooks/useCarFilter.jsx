import { useState, useEffect } from "react";
import { isActive, isEnded } from "../utils/helpers";

export default function useCarFilter({
    cars = [],
    searchTerm = "",
    yearFrom,
    yearTo,
    transmission,
    bodyStyle,
    sortBy,
    status = "All",
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, yearFrom, yearTo, transmission, bodyStyle, sortBy, status]);

    // 🔍 Filter
    const filteredCars = cars.filter((car) => {
        const matchesSearch = `${car.year_model ?? ""} ${car.make} ${car.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesYear =
            car.year_model >= yearFrom && car.year_model <= yearTo;

        const matchesTransmission =
            transmission === "All" || car.transmission === transmission;

        const matchesBodyStyle =
            bodyStyle === "All" || car.body_style === bodyStyle;

        const matchesStatus =
            status === "All" ||
            (status === "active" && isActive(car)) ||
            (status === "ended" && isEnded(car));

        return (
            matchesSearch &&
            matchesYear &&
            matchesTransmission &&
            matchesBodyStyle &&
            matchesStatus
        );
    });

    // ↕️ Sort
    filteredCars.sort((a, b) => {
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
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        currentCars,
        filteredCars,
        currentPage,
        paginate,
        totalPages,
        loading: false,
    };
}
