import { Col, Row, Spinner } from "react-bootstrap";
import { useCarContext } from "../../context/CarContext";
import useWatchList from "../../hooks/useWatchList";
import CarItem from "../CarItem";
import CarFilterSortForm from "../../UI/CarFilterSortForm";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import useCarFilter from "../../hooks/useCarFilter";
import PaginationComponent from "../../UI/Pagination";

export default function UserWatchList() {
    const { searchTerm } = useOutletContext();
    const { watchList } = useWatchList();
    const { cars } = useCarContext();

    const userSavedCars = cars.filter((car) => watchList.includes(car.id));

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
        cars: userSavedCars,
        searchTerm,
        yearFrom,
        yearTo,
        transmission,
        bodyStyle,
        sortBy,
        status,
    });

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
        <div className="container mt-3">
            <h4>Your Watch List</h4>

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
                showStatus={false}
            />

            {/* Car Listings */}
            {filteredCars.length === 0 ? (
                <p className="text-center text-muted fs-5 my-5">
                    Found no listings in your watch list.
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
        </div>
    );
}
