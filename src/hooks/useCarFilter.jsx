import { useState, useEffect } from "react";
import { isActive, isEnded } from "../utils/helpers";

const CARS_PER_PAGE = 6;

export default function useCarFilter({
    cars = [],
    searchTerm = "",
    yearFrom,
    yearTo,
    transmission = "All",
    bodyStyle = "All",
    sortBy = "end_soon",
    status = "All",
}) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, yearFrom, yearTo, transmission, bodyStyle, sortBy, status]);

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

    // Sort
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortBy === "newly_listed") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === "lowest_mileage") {
            return a.mileage - b.mileage;
        }
        return new Date(a.end_time) - new Date(b.end_time);
    });

    // Pagination
    const indexOfLastItem = currentPage * CARS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - CARS_PER_PAGE;
    const currentCars = sortedCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        loading: false,
        currentCars,
        filteredCars: sortedCars,
        currentPage,
        paginate,
        totalPages,
    };
}

// export default function useCarFilter({ cars, filters, searchTerm = "" }) {
//     const {
//         yearFrom,
//         yearTo,
//         transmission,
//         bodyStyle,
//         sortBy,
//         status, // Only used in UserListings
//     } = filters;

//     const [filteredCars, setFilteredCars] = useState([]);
//     const [currentCars, setCurrentCars] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(true);

//     // Filter and sort the cars when filters change
//     useEffect(() => {
//         setLoading(true);
//         let updated = [...cars];

//         // Filter by year
//         updated = updated.filter(
//             (car) => car.year >= yearFrom && car.year <= yearTo
//         );

//         // Transmission
//         if (transmission !== "All") {
//             updated = updated.filter(
//                 (car) => car.transmission === transmission
//             );
//         }

//         // Body Style
//         if (bodyStyle !== "All") {
//             updated = updated.filter((car) => car.body_style === bodyStyle);
//         }

//         // Status (only in UserListings)
//         if (status && status !== "All") {
//             if (status === "active") {
//                 updated = updated.filter(
//                     (car) => new Date(car.end_time) > new Date()
//                 );
//             } else if (status === "ended") {
//                 updated = updated.filter(
//                     (car) => new Date(car.end_time) <= new Date()
//                 );
//             }
//         }

//         // Search Term
//         if (searchTerm) {
//             const term = searchTerm.toLowerCase();
//             updated = updated.filter((car) =>
//                 `${car.make} ${car.model} ${car.description}`
//                     .toLowerCase()
//                     .includes(term)
//             );
//         }

//         // Sort
//         switch (sortBy) {
//             case "end_soon":
//                 updated.sort(
//                     (a, b) => new Date(a.end_time) - new Date(b.end_time)
//                 );
//                 break;
//             case "newly_listed":
//                 updated.sort(
//                     (a, b) => new Date(b.created_at) - new Date(a.created_at)
//                 );
//                 break;
//             case "lowest_mileage":
//                 updated.sort((a, b) => a.mileage - b.mileage);
//                 break;
//             default:
//                 break;
//         }

//         setFilteredCars(updated);
//         setCurrentPage(1);
//         setLoading(false);
//     }, [cars, filters, searchTerm]);

//     // Pagination
//     useEffect(() => {
//         const startIndex = (currentPage - 1) * CARS_PER_PAGE;
//         const endIndex = startIndex + CARS_PER_PAGE;
//         setCurrentCars(filteredCars.slice(startIndex, endIndex));
//     }, [filteredCars, currentPage]);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);

//     return {
//         loading,
//         filteredCars,
//         currentCars,
//         currentPage,
//         totalPages,
//         paginate,
//     };
// }
