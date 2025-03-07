import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Row, Pagination, Spinner } from "react-bootstrap";
import CarItem from "./CarItem";

export default function Home() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        axios
            .get("http://localhost:8080/listings")
            .then((res) => {
                const data = res.data.data;
                setListings(data);
                console.log(data);
            })
            .catch((err) => {
                console.error("Failed to fetch listings:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    document.title = "AutoBid: Car Auctions";

    const filteredCars = listings.filter((car) =>
        `${car.year_model ?? ""} ${car.make} ${car.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <Container>
            <h1 className="my-4">All Listings</h1>

            {/* Search Bar */}
            <Form.Control
                type="text"
                placeholder="Search for cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />

            {/* Car Listings */}
            <Row>
                {currentCars.map((car) => (
                    <CarItem key={car.id} car={car} />
                ))}
            </Row>

            {/* Pagination */}
            <Pagination className="justify-content-center">
                {Array.from(
                    { length: Math.ceil(filteredCars.length / itemsPerPage) },
                    (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    )
                )}
            </Pagination>
        </Container>
    );
}
