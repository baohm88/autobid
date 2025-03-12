import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useUpdateUser from "../hooks/useUpdateUser";
export function useBidHandler({ car, user, setUser }) {
    const [bidAmount, setBidAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bidAlert, setBidAlert] = useState("");
    const [depositAlert, setDepositAlert] = useState("");

    const updateUser = useUpdateUser(setUser);

    const handleSaveBid = async () => {
        if (!user || !car) return;

        const amount = parseFloat(bidAmount);

        if (isNaN(amount) || amount <= car.current_bid) {
            setBidAlert("Your bid must be higher than the current bid.");
            return;
        }
        if (isNaN(amount) || amount <= car.starting_bid) {
            setBidAlert("Your bid must be higher than the starting bid.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `http://localhost:8080/listings/add-bid/${car.id}`,
                { user_id: user.id, bid_amount: bidAmount }
            );

            updateUser(res.data);
            toast.success("Bid placed successfully!");
            setShowBidModal(false);
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to place bid.";
            setBidAlert(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Deposit money before bidding
    const handleDeposit = async () => {
        if (!user || !car) return;

        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount < car.starting_bid) {
            setDepositAlert(`You must deposit at least $${car.starting_bid}`);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:8080/deposit`, {
                userId: user.id,
                amount,
            });

            updateUser(res.data);
            toast.success("Deposit successful!");
            setShowDepositModal(false);
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to place bid.";
            toast.error(errorMsg);
            setDepositAlert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        bidAmount,
        setBidAmount,
        depositAmount,
        setDepositAmount,
        showBidModal,
        setShowBidModal,
        showDepositModal,
        setShowDepositModal,
        loading,
        bidAlert,
        depositAlert,
        setBidAlert,
        setDepositAlert,
        handleSaveBid,
        handleDeposit,
    };
}
