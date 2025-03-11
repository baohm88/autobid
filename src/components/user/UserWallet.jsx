import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWallet, FaHistory, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

export default function UserWallet() {
    // Model của ví
    const [wallet, setWallet] = useState({
        balance: 5000.0,
        transactions: [
            { id: 1, type: "Deposit", amount: 1000, status: "Success" },
            { id: 2, type: "Car Bid", amount: -2000, status: "Success" },
            { id: 3, type: "Deposit", amount: 3000, status: "Success" },
        ],
    });

    // State của Modal
    const [showDeposit, setShowDeposit] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);

    // Input cho Deposit
    const [depositAmount, setDepositAmount] = useState("");

    // Input cho Transfer
    const [transferAmount, setTransferAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    // Xử lý Deposit: tăng số dư và thêm giao dịch Deposit
    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }
        const newBalance = wallet.balance + amount;
        const newTransaction = {
            id: Date.now(),
            type: "Deposit",
            amount: amount,
            status: "Success",
        };
        setWallet((prev) => ({
            balance: newBalance,
            transactions: [newTransaction, ...prev.transactions],
        }));
        setDepositAmount("");
        setShowDeposit(false);
    };

    // Xử lý Transfer: giảm số dư và thêm giao dịch Transfer
    const handleTransfer = () => {
        const amount = parseFloat(transferAmount);
        if (recipient.trim() === "") {
            alert("Please enter a recipient.");
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid transfer amount.");
            return;
        }
        if (amount > wallet.balance) {
            alert("Insufficient balance for transfer.");
            return;
        }
        const newBalance = wallet.balance - amount;
        const newTransaction = {
            id: Date.now(),
            type: `Transfer to ${recipient}`,
            amount: -amount,
            status: "Success",
        };
        setWallet((prev) => ({
            balance: newBalance,
            transactions: [newTransaction, ...prev.transactions],
        }));
        setTransferAmount("");
        setRecipient("");
        setShowTransfer(false);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">My Wallet</h2>
            <div className="row justify-content-center">
                {/* Wallet Balance Section */}
                <div className="col-md-5">
                    <div className="card text-center shadow-sm p-4">
                        <h5 className="mb-3">Wallet Balance</h5>
                        <h2 className="text-success fw-bold">
                            ${wallet.balance.toFixed(2)}
                        </h2>
                        <div className="d-flex justify-content-around mt-4">
                            <button
                                className="btn btn-outline-primary d-flex flex-column align-items-center p-3 shadow-sm"
                                onClick={() => setShowDeposit(true)}
                            >
                                <FaArrowDown size={30} className="mb-2" />
                                Deposit
                            </button>
                            <button
                                className="btn btn-outline-danger d-flex flex-column align-items-center p-3 shadow-sm"
                                onClick={() => setShowTransfer(true)}
                            >
                                <FaArrowUp size={30} className="mb-2" />
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
                {/* Transaction History Section */}
                <div className="col-md-7">
                    <div className="card shadow-sm p-4">
                        <h5 className="text-center mb-3">
                            Transaction History
                        </h5>
                        <ul className="list-group">
                            {wallet.transactions.map((txn) => (
                                <li
                                    key={txn.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>{txn.type}</span>
                                    <span
                                        className={
                                            txn.amount > 0
                                                ? "text-success fw-bold"
                                                : "text-danger fw-bold"
                                        }
                                    >
                                        {txn.amount > 0 ? "+" : ""}$
                                        {Math.abs(txn.amount).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            <Modal
                show={showDeposit}
                onHide={() => setShowDeposit(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={depositAmount}
                                onChange={(e) =>
                                    setDepositAmount(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeposit(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDeposit}>
                        Deposit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Transfer Modal */}
            <Modal
                show={showTransfer}
                onHide={() => setShowTransfer(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Transfer Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipient</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recipient name"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={transferAmount}
                                onChange={(e) =>
                                    setTransferAmount(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowTransfer(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleTransfer}>
                        Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
