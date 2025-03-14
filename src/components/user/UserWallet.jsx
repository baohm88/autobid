const DUMMY_TRANSACTIONS = [
    { id: 1, type: "Deposit", amount: 1000, flow: "in" },
    { id: 2, type: "Car Bid", amount: 2000, flow: "out" },
    { id: 3, type: "Deposit", amount: 3000, flow: "in" },
];

import { useCallback, useEffect, useState } from "react";
import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import WalletDepositModal from "../../UI/WalletDepositModal";
import confetti from "canvas-confetti";
import { playSound } from "../../utils/helpers";
import axios from "axios";
import { formatter } from "../../utils/formatter";
import BalanceChart from "../../UI/BalanceChart";
import WalletWithdrawModal from "../../UI/WalletWithdrawModal";

export default function UserWallet() {
    const { user, setUser } = useAuth();
    const [wallet, setWallet] = useState({
        balance: 0,
        transactions: DUMMY_TRANSACTIONS,
    });
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showAllTxns, setShowAllTxns] = useState(false);

    useEffect(() => {
        if (user) {
            setWallet((prev) => ({
                ...prev,
                balance: user.balance,
            }));
        }
    }, [user]);

    const handleDeposit = useCallback(
        async (amount) => {
            if (isNaN(amount) || amount <= 0)
                return toast.error("Enter a valid deposit amount.");

            try {
                const res = await axios.post(`http://localhost:8080/deposit`, {
                    userId: user.id,
                    amount,
                });

                console.log(res.data.data[0]);

                setUser(res.data.data[0]);
                toast.success("Deposit added successfully!");
                setShowDeposit(false);
                playSound("/sounds/deposit-success.mp3");

                // 💥 Fire confetti!
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 },
                });
            } catch (err) {
                console.error(err);
                const errorMsg =
                    err.response?.data?.message || "Failed to deposit.";
                toast.error(errorMsg);
            }

            const newTransaction = {
                id: Date.now(),
                type: "Deposit",
                amount,
                flow: "in",
            };

            setWallet((prev) => ({
                ...prev,
                transactions: [newTransaction, ...prev.transactions],
            }));

            setShowDeposit(false);
        },
        [user, setUser]
    );

    const handleWithdraw = useCallback(
        async (amount) => {
            if (isNaN(amount) || amount <= 0)
                return toast.error("Enter a valid withdraw amount.");

            if (amount > wallet.balance)
                return toast.error(
                    "Insufficient balance. Enter a smaller amount"
                );

            try {
                const res = await axios.post(`http://localhost:8080/withdraw`, {
                    userId: user.id,
                    amount,
                });

                console.log(res.data.data[0]);

                setUser(res.data.data[0]);
                toast.success("Withdrawal successful!");
                setShowWithdraw(false);
                playSound("/sounds/deposit-success.mp3");

                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 },
                });
            } catch (err) {
                console.error(err);
                const errorMsg =
                    err.response?.data?.message || "Failed to withdraw.";
                toast.error(errorMsg);
            }

            const newTransaction = {
                id: Date.now(),
                type: "Withdraw",
                amount,
                flow: "out",
            };

            setWallet((prev) => ({
                ...prev,
                balance: prev.balance - amount,
                transactions: [newTransaction, ...prev.transactions],
            }));

            setShowWithdraw(false);
        },
        [user, wallet.balance, setUser]
    );

    const sortedTransactions = [...wallet.transactions].sort(
        (a, b) => a.id - b.id
    );

    return (
        <div className="mb-5">
            <hr />
            <h4 className="mb-4 text-center">
                <FaWallet className="me-2" />
                <strong>My Wallet</strong>
            </h4>

            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card shadow-sm p-4">
                        <h6 className="text-center mb-3 text-muted">
                            Wallet Balance Over Time
                        </h6>

                        <BalanceChart transactions={sortedTransactions} />
                    </div>
                </div>
                {/* Wallet Balance */}
                <div className="col-md-5 mb-4">
                    <div className="card shadow-sm p-4 text-center">
                        <h6 className="text-muted mb-2">Current Balance</h6>
                        <h2 className="text-success fw-bold">
                            {formatter.format(wallet.balance)}
                        </h2>

                        <div className="d-flex justify-content-around mt-4">
                            <button
                                className="btn btn-outline-primary d-flex flex-column align-items-center shadow-sm"
                                onClick={() => setShowDeposit(true)}
                            >
                                <FaArrowDown size={20} className="mb-1" />
                                <small>Deposit</small>
                            </button>
                            <button
                                className="btn btn-outline-danger d-flex flex-column align-items-center shadow-sm"
                                onClick={() => setShowWithdraw(true)}
                            >
                                <FaArrowUp size={20} className="mb-1" />
                                <small>Withdraw</small>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="col-md-7">
                    <div className="card shadow-sm p-4 ">
                        <h6 className="text-center text-muted">
                            Transaction History
                        </h6>
                        <ul className="list-group overflow-auto">
                            {(showAllTxns
                                ? wallet.transactions
                                : wallet.transactions.slice(0, 3)
                            ).map((txn) => {
                                const moneyIn = txn.flow === "in";
                                return (
                                    <li
                                        key={txn.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            {moneyIn ? (
                                                <FaArrowDown className="text-success me-2" />
                                            ) : (
                                                <FaArrowUp className="text-danger me-2" />
                                            )}
                                            {txn.type}
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className={
                                                    moneyIn
                                                        ? "text-success fw-bold"
                                                        : "text-danger fw-bold"
                                                }
                                            >
                                                {moneyIn ? "+" : "-"}
                                                {formatter.format(txn.amount)}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {wallet.transactions.length > 3 && (
                            <div className="text-center mt-2">
                                <button
                                    className="btn btn-link btn-sm"
                                    onClick={() =>
                                        setShowAllTxns((prev) => !prev)
                                    }
                                >
                                    {showAllTxns ? "See Less" : "See More"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            <WalletDepositModal
                show={showDeposit}
                onClose={() => setShowDeposit(false)}
                onDeposit={handleDeposit}
            />

            <WalletWithdrawModal
                show={showWithdraw}
                onClose={() => setShowWithdraw(false)}
                onWithdraw={handleWithdraw}
            />
            <hr />
        </div>
    );
}
