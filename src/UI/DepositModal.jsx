import { Modal, Button, Form } from "react-bootstrap";
import { formatter } from "../utils/formatter";
import { AlertBox } from "./AlertBox";

export default function DepositModal({
    show,
    onClose,
    car,
    user,
    depositAmount,
    setDepositAmount,
    onSubmit,
    alertMessage,
    clearAlert,
}) {
    // 🛡️ Safely calculate required amount
    const requiredAmount =
        car && user
            ? Math.max(car.starting_bid + 100 - user.balance, 0)
            : 0;

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Insufficient funds!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Please deposit to continue.</h4>
                <hr />
                <p>
                    Current Balance:{" "}
                    {user?.balance != null
                        ? formatter.format(user.balance)
                        : "N/A"}
                </p>
                <p>
                    Required Amount:{" "}
                    {car && user
                        ? formatter.format(requiredAmount)
                        : "N/A"}
                </p>
                <AlertBox
                    variant="success"
                    message={alertMessage}
                    onClose={clearAlert}
                />
                <Form>
                    <Form.Group controlId="depositAmount">
                        <Form.Label>Deposit Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={depositAmount}
                            onChange={(e) =>
                                setDepositAmount(Number(e.target.value))
                            }
                            placeholder="Enter amount to deposit"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onClose}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={onSubmit}
                    disabled={
                        !user ||
                        !car ||
                        depositAmount <= 0 ||
                        depositAmount < requiredAmount
                    }
                >
                    Deposit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
