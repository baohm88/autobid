import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

import moment from "moment";
import { toast } from "react-toastify";
import { useCarContext } from "../../context/CarContext";
import CarFilterSortForm from "../../UI/CarFilterSortForm";
import CarDetailsModal from "../../UI/CarDetailsModal";

export default function AdminAuction() {
    const { cars } = useCarContext();
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFrom, setYearFrom] = useState(2000);
    const [yearTo, setYearTo] = useState(2025);
    const [transmission, setTransmission] = useState("All");
    const [bodyStyle, setBodyStyle] = useState("All");
    const [sortBy, setSortBy] = useState("end_soon");

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [rejectionNote, setRejectionNote] = useState("");
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCarDetailsId, setSelectedCarDetailsId] = useState(null);

    useEffect(() => {
        filterAndSortCars();
    }, [cars, yearFrom, yearTo, transmission, bodyStyle, sortBy]);

    const filterAndSortCars = () => {
        let filtered = [...cars];

        filtered = filtered.filter((car) => {
            const year = parseInt(car.year_model);
            return (
                year >= parseInt(yearFrom) &&
                year <= parseInt(yearTo) &&
                (transmission === "All" || car.transmission === transmission) &&
                (bodyStyle === "All" || car.body_style === bodyStyle)
            );
        });

        switch (sortBy) {
            case "end_soon":
                filtered.sort(
                    (a, b) => new Date(a.end_time) - new Date(b.end_time)
                );
                break;
            case "newly_listed":
                filtered.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                break;
            case "lowest_mileage":
                filtered.sort((a, b) => a.mileage - b.mileage);
                break;
            default:
                break;
        }

        setFilteredCars(filtered);
    };

    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            const term = searchTerm.toLowerCase();
            const results = cars.filter((car) =>
                `${car.make} ${car.model}`.toLowerCase().includes(term)
            );
            setFilteredCars(results);
        }
    };

    const handleStatusChange = (carId, status) => {
        if (status === "rejected") {
            setSelectedCarId(carId);
            setShowModal(true);
        } else {
            toast.success("Listing approved successfully");
            // You would send API request to update status here
        }
    };

    const handleRejectSubmit = () => {
        toast.info(`Rejection note sent to owner: ${rejectionNote}`);
        setShowModal(false);
        setRejectionNote("");
        setSelectedCarId(null);
        // Send rejection note to owner via API
    };

    return (
        <div>
            <h2 className="mb-3">Manage Car Listings</h2>

            {/* Search Box */}
            <Form.Control
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKey}
                className="mb-3"
            />

            {/* Filters */}
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
                showStatus={true}
            />

            {/* Table View */}
            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Make / Model</th>
                            <th>Year</th>
                            <th>Mileage</th>
                            <th>Transmission</th>
                            <th>Body Style</th>
                            <th>Start - End</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCars.map((car) => (
                            <tr key={car.id}>
                                <td>
                                    <img
                                        src={car.images[0]}
                                        alt="car"
                                        width="200"
                                        className="rounded"
                                    />
                                </td>
                                <td>
                                    <strong>
                                        {car.make} {car.model}
                                    </strong>
                                </td>
                                <td>{car.year_model}</td>
                                <td>{car.mileage} km</td>
                                <td>{car.transmission}</td>
                                <td>{car.body_style}</td>
                                <td>
                                    {moment(car.start_time).format("MMM D")} -{" "}
                                    {moment(car.end_time).format("MMM D")}
                                </td>
                                <td>
                                    {car.status ? (
                                        <span className="text-success fw-semibold">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="text-warning fw-semibold">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {!car.status && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="success"
                                                className="me-1"
                                                onClick={() =>
                                                    handleStatusChange(
                                                        car.id,
                                                        "approved"
                                                    )
                                                }
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                className="me-1"
                                                onClick={() =>
                                                    handleStatusChange(
                                                        car.id,
                                                        "rejected"
                                                    )
                                                }
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => {
                                                    setSelectedCarDetailsId(
                                                        car.id
                                                    );
                                                    setShowDetailsModal(true);
                                                }}
                                            >
                                                View
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Rejection Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Rejection Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Reason for Rejection</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={rejectionNote}
                            onChange={(e) => setRejectionNote(e.target.value)}
                            placeholder="Explain what needs to be modified..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRejectSubmit}>
                        Send Note
                    </Button>
                </Modal.Footer>
            </Modal>

            {showDetailsModal && (
                <CarDetailsModal
                    show={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    carId={selectedCarDetailsId}
                />
            )}
        </div>
    );
}
