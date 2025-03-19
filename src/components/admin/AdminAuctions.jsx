import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import moment from "moment";
import { useCarContext } from "../../context/CarContext";
import CarFilterSortForm from "../../UI/CarFilterSortForm";
import CarDetailsModal from "../../UI/CarDetailsModal";

export default function AdminAuction() {
    const { cars, setCars } = useCarContext();
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFrom, setYearFrom] = useState(2000);
    const [yearTo, setYearTo] = useState(2025);
    const [transmission, setTransmission] = useState("All");
    const [bodyStyle, setBodyStyle] = useState("All");
    const [sortBy, setSortBy] = useState("end_soon");

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCarDetailsId, setSelectedCarDetailsId] = useState(null);
    const [rejectionMessage, setRejectionMessage] = useState("");

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

    const handleApprove = (carId) => {
        const updatedCars = cars.map((car) =>
            car.id === carId
                ? { ...car, status: "approved", adminMessage: "" }
                : car
        );
        setCars(updatedCars);
    };

    const handleRejectClick = (carId) => {
        setSelectedCarId(carId);
        setRejectionMessage("");
        setShowModal(true);
    };

    const handleRejectSubmit = () => {
        const updatedCars = cars.map((car) =>
            car.id === selectedCarId
                ? {
                      ...car,
                      status: "rejected",
                      adminMessage: rejectionMessage,
                  }
                : car
        );
        setCars(updatedCars);
        setShowModal(false);
    };

    console.log(cars);

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
                            <th>Admin Message</th>
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
                                        onClick={() => {
                                            setSelectedCarDetailsId(car.id);
                                            setShowDetailsModal(true);
                                        }}
                                        style={{ cursor: "pointer" }}
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
                                    <span
                                        className={`badge ${
                                            car.status === "approved"
                                                ? "bg-success"
                                                : car.status === "pending"
                                                ? "bg-warning text-dark"
                                                : "bg-danger"
                                        }`}
                                    >
                                        {car.status}
                                    </span>
                                </td>
                                <td>
                                    {car.status === "pending" ||
                                    car.status === "rejected" ? (
                                        <Button
                                            size="sm"
                                            variant="success"
                                            className="me-1 fw-bold"
                                            onClick={() =>
                                                handleApprove(car.id)
                                            }
                                        >
                                            Approve
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            className="me-1 fw-bold"
                                            onClick={() =>
                                                handleRejectClick(car.id)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    {car.adminMessage !== null
                                        ? car.adminMessage
                                        : ""}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Rejection Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Rejection Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="rejectionMessage">
                            <Form.Label>
                                Why is this car rejected? (Visible to owner)
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={rejectionMessage}
                                onChange={(e) =>
                                    setRejectionMessage(e.target.value)
                                }
                                placeholder="Please explain what needs to be changed..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRejectSubmit}>
                        Reject Car
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
