import { Container, Spinner } from "react-bootstrap";
import CarItem from "./CarItem";
import { useOutletContext } from "react-router-dom";
import useCarFilter from "../hooks/useCarFilter";
import { useState } from "react";
import PaginationComponent from "../UI/Pagination";
import { useCarContext } from "../context/CarContext";
import CarFilterSortForm from "../UI/CarFilterSortForm";

const INITIAL_FILTERS = {
    yearFrom: 2000,
    yearTo: 2025,
    transmission: "All",
    bodyStyle: "All",
    sortBy: "end_soon",
    status: "All",
};

export default function Home() {
    const { searchTerm } = useOutletContext();
    const { cars } = useCarContext();
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const {
        loading,
        filteredCars,
        currentCars,
        currentPage,
        totalPages,
        paginate,
    } = useCarFilter({
        cars,
        filters,
        searchTerm,
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
            <CarFilterSortForm filters={filters} updateFilter={updateFilter} />

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
