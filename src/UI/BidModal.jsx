import { Modal, Button, Form } from "react-bootstrap";

import { AlertBox } from "./AlertBox";
import { formatter } from "../utils/formatter";

export default function BidModal({
    show,
    onClose,
    car,
    user,
    bidAmount,
    setBidAmount,
    onSubmit,
    loading,
    alertMessage,
    clearAlert,
}) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Place Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Current bid: {formatter.format(car?.starting_bid)}</p>
                <p>Current Balance: {formatter.format(user?.balance)}</p>
                <AlertBox
                    variant="danger"
                    message={alertMessage}
                    onClose={clearAlert}
                />
                <Form>
                    <Form.Group controlId="bidAmount">
                        <Form.Label>Bid Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onSubmit} disabled={loading}>
                    {loading ? "Placing Bid..." : "Place Bid"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
