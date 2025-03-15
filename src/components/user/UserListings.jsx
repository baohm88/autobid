import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useCarContext } from "../../context/CarContext";
import CarItem from "../CarItem";
import { useState, useMemo } from "react";
import useCarFilter from "../../hooks/useCarFilter";
import { useOutletContext } from "react-router-dom";
import PaginationComponent from "../../UI/Pagination";
import CarFilterSortForm from "../../UI/CarFilterSortForm";

export default function UserListings() {
    const { searchTerm } = useOutletContext();
    const { user } = useAuth();
    const { cars } = useCarContext();

    document.title = "Your All Listings";

    // Memoize user listings to prevent re-render loop
    const userListings = useMemo(() => {
        return cars.filter((car) => car.user === user.id);
    }, [cars, user.id]);

    // State variables for filters and sorting
    const [sortBy, setSortBy] = useState("end_soon");
    const [status, setStatus] = useState("All");
    const [transmission, setTransmission] = useState("All");
    const [bodyStyle, setBodyStyle] = useState("All");
    const [yearFrom, setYearFrom] = useState(2000);
    const [yearTo, setYearTo] = useState(2025);

    const {
        loading,
        currentCars,
        filteredCars,
        currentPage,
        paginate,
        totalPages,
    } = useCarFilter({
        cars: userListings,
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
                    <span className="visually-hidden">
                        Loading your listings...
                    </span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container>
            <h1>Your Listings</h1>

            {/* Filter and Sort UI */}
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

            {/* 📄 Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </Container>
    );
}
