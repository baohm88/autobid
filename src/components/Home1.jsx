import { Container, Spinner } from "react-bootstrap";
import CarItem from "./CarItem";
import { Form, useOutletContext } from "react-router-dom";
import useCarFilter from "../hooks/useCarFilter";
import { BODY_STYLES } from "./user/dummy_data";
import { useState } from "react";
import PaginationComponent from "../UI/Pagination";
import { useCarContext } from "../context/CarContext";
import FilterSortForm from "../UI/FilterSortForm";

export default function Home() {
    const { searchTerm } = useOutletContext();
    const { cars } = useCarContext();

    // State variables for filters and sorting
    const [sortBy, setSortBy] = useState("end_soon");
    const [transmission, setTransmission] = useState("All");
    const [bodyStyle, setBodyStyle] = useState("All");
    const [yearFrom, setYearFrom] = useState(2000);
    const [yearTo, setYearTo] = useState(2025);
    const [status, setStatus] = useState("All");

    // Handle filter and sort by changes
    const handleTransmissionChange = (e) => setTransmission(e.target.value);
    const handleBodyStyleChange = (e) => setBodyStyle(e.target.value);
    const handleYearFromChange = (e) => setYearFrom(parseInt(e.target.value));
    const handleYearToChange = (e) => setYearTo(parseInt(e.target.value));
    const handleSortByChange = (e) => setSortBy(e.target.value);

    const {
        loading,
        currentCars,
        filteredCars,
        currentPage,
        paginate,
        totalPages,
    } = useCarFilter({
        cars,
        searchTerm,
        yearFrom,
        yearTo,
        transmission,
        bodyStyle,
        sortBy,
        status,
    });

    document.title = "AutoBid: Car Auctions";

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading Listings...</span>
                </Spinner>
            </div>
        );
    }

    console.log(cars);

    return (
        <Container expand="lg">
            <h1>Live Auctions</h1>
            {/* filter group */}

            <FilterSortForm
                yearFrom={yearFrom}
                yearTo={yearTo}
                transmission={transmission}
                bodyStyle={bodyStyle}
                sortBy={sortBy}
                status={status}
                onYearFromChange={setYearFrom}
                onYearToChange={setYearTo}
                onTransmissionChange={setTransmission}
                onBodyStyleChange={setBodyStyle}
                onSortByChange={setSortBy}
                onStatusChange={setStatus}
            />

            {/* Car Listings */}
            <div className="car-listings">
                {filteredCars.length === 0 ? (
                    <p className="text-center text-muted fs-5 my-5">
                        Found no listings that match your filter criteria.
                    </p>
                ) : (
                    currentCars.map((car) => (
                        <div className="car-card" key={car.id}>
                            <CarItem car={car} />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </Container>
    );
}
