import { Col, Container, Row, Spinner } from "react-bootstrap";
import CarItem from "./CarItem";
import { useOutletContext } from "react-router-dom";
import useCarFilter from "../hooks/useCarFilter";

import { useState } from "react";
import PaginationComponent from "../UI/Pagination";
import { useCarContext } from "../context/CarContext";
import CarFilterSortForm from "../UI/CarFilterSortForm";
import FeaturedCarousel from "./car/FeaturedCarousel";

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

    return (
        <Container expand="lg">
            <FeaturedCarousel />
            <h1>Live Auctions</h1>
            {/* filter group */}

            <CarFilterSortForm
                yearFrom={yearFrom}
                yearTo={yearTo}
                setYearFrom={setYearFrom}
                setYearTo={setYearTo}
                transmission={transmission}
                setTransmission={setTransmission}
                bodyStyle={bodyStyle}
                setBodyStyle={setBodyStyle}
                sortBy={sortBy}
                setSortBy={setSortBy}
                status={status}
                setStatus={setStatus}
                showStatus={true}
            />

            {/* Car Listings */}
            {filteredCars.length <= 0 ? (
                <p className="text-center text-muted fs-5 my-5">
                    Found no listings that match your filter criteria.
                </p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4 my-3">
                    {currentCars.map((car) => (
                        <Col key={car.id}>
                            <CarItem car={car} />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </Container>
    );
}
