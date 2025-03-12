import { Container, Row, Pagination, Spinner } from "react-bootstrap";
import CarItem from "./CarItem";
import { Form, useOutletContext } from "react-router-dom";
import useCarFilter from "../hooks/useCarFilter";
import { BODY_STYLES } from "./user/dummy_data";
import { useState } from "react";

export default function Home() {
    const { searchTerm } = useOutletContext();

    // State variables for filters and sorting
    const [sortBy, setSortBy] = useState("end_soon");
    const [transmission, setTransmission] = useState("All");
    const [bodyStyle, setBodyStyle] = useState("All");
    const [yearFrom, setYearFrom] = useState(2000);
    const [yearTo, setYearTo] = useState(2025);

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
        searchTerm,
        yearFrom,
        yearTo,
        transmission,
        bodyStyle,
        sortBy,
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

    return (
        <Container expand="lg">
            <h1>Live Auctions</h1>
            {/* filter group */}

            <div className="d-flex justify-content-between my-3">
                <div className="d-flex">
                    <Form className="d-flex">
                        {/* year */}
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light dropdown-toggle text-black border-secondary-subtle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {`${yearFrom} - ${yearTo}`}
                            </button>

                            <ul className="dropdown-menu wide-dropdown-menu">
                                <li className="d-flex justify-content-between align-items-center">
                                    <select
                                        className="form-select mx-1"
                                        aria-label="From Year"
                                        value={yearFrom}
                                        onChange={handleYearFromChange}
                                    >
                                        {Array.from(
                                            { length: 26 },
                                            (_, i) => 2000 + i
                                        ).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="text-muted">To</p>
                                    <select
                                        className="form-select mx-1"
                                        aria-label="To Year"
                                        value={yearTo}
                                        onChange={handleYearToChange}
                                    >
                                        {Array.from(
                                            { length: 26 },
                                            (_, i) => 2025 - i
                                        ).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                            </ul>
                        </div>

                        {/* transmission */}
                        <select
                            className="form-select mx-1"
                            aria-label="Transmission"
                            value={transmission}
                            onChange={handleTransmissionChange}
                        >
                            <option value="All">All Transmissions</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>

                        {/* body style */}
                        <select
                            className="form-select mx-1"
                            aria-label="Body Style"
                            value={bodyStyle}
                            onChange={handleBodyStyleChange}
                        >
                            <option value="All">All Body Styles</option>
                            {BODY_STYLES.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </select>
                    </Form>
                </div>

                {/* sort by group */}
                <div>
                    <select
                        className="form-select"
                        aria-label="Sort By"
                        value={sortBy}
                        onChange={handleSortByChange}
                    >
                        <option value="end_soon" selected>
                            Ending Soon
                        </option>
                        <option value="newly_listed">Newly listed</option>
                        <option value="lowest_mileage">Lowest Mileage</option>
                    </select>
                </div>
            </div>

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
            {totalPages > 1 && (
                <Pagination className="justify-content-center">
                    {/* Previous button */}
                    <Pagination.Prev
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    {/* Next button */}
                    <Pagination.Next
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            )}
        </Container>
    );
}
