import { Container, Form, Pagination, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useCarContext } from "../../context/CarContext";
import CarItem from "../CarItem";
import { useState, useMemo } from "react";
import useCarFilter from "../../hooks/useCarFilter";
import { BODY_STYLES } from "./dummy_data";
import { useOutletContext } from "react-router-dom";

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
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading your listings...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container>
            <h1>Your Listings</h1>

            {/* 🔽 Filter and Sort UI */}
            <div className="d-flex justify-content-between my-3">
                <Form className="d-flex">
                    {/* Year */}
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle text-black border-secondary-subtle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {`${yearFrom} - ${yearTo}`}
                        </button>
                        <ul className="dropdown-menu wide-dropdown-menu">
                            <li className="d-flex justify-content-between align-items-center px-2">
                                <select className="form-select mx-1" value={yearFrom} onChange={(e) => setYearFrom(parseInt(e.target.value))}>
                                    {Array.from({ length: 26 }, (_, i) => 2000 + i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <p className="text-muted">To</p>
                                <select className="form-select mx-1" value={yearTo} onChange={(e) => setYearTo(parseInt(e.target.value))}>
                                    {Array.from({ length: 26 }, (_, i) => 2025 - i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                    </div>

                    {/* Transmission */}
                    <select className="form-select mx-1" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                        <option value="All">All Transmissions</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>

                    {/* Body Style */}
                    <select className="form-select mx-1" value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}>
                        <option value="All">All Body Styles</option>
                        {BODY_STYLES.map((style) => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </select>
                </Form>

                {/* Sort and Status */}
                <div className="d-flex">
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="end_soon">Ending Soon</option>
                        <option value="newly_listed">Newly listed</option>
                        <option value="lowest_mileage">Lowest Mileage</option>
                    </select>

                    <select className="form-select ms-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="All">All Listings</option>
                        <option value="active">Active Listings</option>
                        <option value="ended">Past Listings</option>
                    </select>
                </div>
            </div>

            {/* 🧾 Car Listings */}
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

            {/* 📄 Pagination */}
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            )}
        </Container>
    );
}
