// import { Modal, Button, Form, Spinner } from "react-bootstrap";
// import { formatter } from "../utils/formatter";

// export default function BidModal({
//     show,
//     onClose,
//     car,
//     user,
//     bidAmount,
//     setBidAmount,
//     onSubmit,
//     loading,
// }) {
//     const parsedBid = parseFloat(bidAmount);
//     const currentBid = car?.current_bid || car?.starting_bid || 0;

//     const isValidBid = !isNaN(parsedBid) && parsedBid > currentBid;

//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Place Bid</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>
//                     Current Bid:{" "}
//                     {formatter.format(car?.current_bid || car?.starting_bid)}
//                 </p>
//                 <p>
//                     Current Balance:{" "}
//                     {user?.balance != null
//                         ? formatter.format(Number(user.balance))
//                         : "N/A"}
//                 </p>

//                 <Form>
//                     <Form.Group controlId="bidAmount">
//                         <Form.Label>Bid Amount</Form.Label>
//                         <Form.Control
//                             type="number"
//                             value={bidAmount}
//                             onChange={(e) => setBidAmount(e.target.value)}
//                             placeholder="Enter your bid"
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="light" onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button
//                     variant="danger"
//                     onClick={onSubmit}
//                     disabled={loading || !isValidBid}
//                 >
//                     {loading ? (
//                         <Spinner size="sm" animation="border" />
//                     ) : (
//                         "Place Bid"
//                     )}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

import { Modal, Button, Form, Spinner, Card, Row, Col } from "react-bootstrap";
import { formatter } from "../utils/formatter";
import { useEffect, useState } from "react";

export default function BidModal({
    show,
    onClose,
    car,
    user,
    bidAmount,
    setBidAmount,
    onSubmit,
    loading,
}) {
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        if (countdown === null) return;

        if (countdown === 0) {
            onSubmit(); // final trigger
            setCountdown(null);
        } else {
            const timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const parsedBid = parseFloat(bidAmount);
    const currentBid = car?.current_bid || car?.starting_bid || 0;
    const isValidBid = !isNaN(parsedBid) && parsedBid > currentBid;

    const handleCountdownSubmit = () => {
        setCountdown(3); // start countdown
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>🏁 Place Your Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col xs={6}>
                                <strong>Current Bid:</strong>
                            </Col>
                            <Col xs={6} className="text-end">
                                {formatter.format(currentBid)}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={6}>
                                <strong>Your Balance:</strong>
                            </Col>
                            <Col xs={6} className="text-end">
                                {user?.balance != null
                                    ? formatter.format(Number(user.balance))
                                    : "N/A"}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Form>
                    <Form.Group controlId="bidAmount">
                        <Form.Label>💰 Bid Amount</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid"
                        />
                        {!isValidBid && bidAmount && (
                            <Form.Text className="text-danger">
                                Your bid must be greater than{" "}
                                {formatter.format(currentBid)}.
                            </Form.Text>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={handleCountdownSubmit}
                    disabled={loading || !isValidBid || countdown !== null}
                >
                    {loading ? (
                        <Spinner size="sm" animation="border" />
                    ) : countdown !== null ? (
                        `Placing bid in ${countdown}...`
                    ) : (
                        "Place Bid"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
