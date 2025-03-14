import { Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import QuickAccessBoxes from "./QuickAccessBoxes";
import RandomComments from "./RandomComments";
import { useState } from "react";
import { useCarContext } from "../../context/CarContext";
import UserWallet from "./UserWallet";

export default function UserProfile() {
    const { user } = useAuth();
    const { cars } = useCarContext();
    const userListings = cars.filter((car) => car.user === user.id);
    const activeListings = userListings.filter(
        (car) => new Date(car.end_time) > new Date()
    );
    const endedListings = userListings.filter(
        (car) => new Date(car.end_time) <= new Date()
    );

    const [showModal, setShowModal] = useState(false);

    document.title = user?.username || "Account Details";

    return (
        <Col sm className="min-vh-100 mt-3">
            <h3 className="mb-3 text-center">Dashboard</h3>

            <ProfileCard
                user={user}
                onEdit={() => setShowModal(true)}
                userListings={userListings}
                activeListings={activeListings}
                endedListings={endedListings}
            />
            <UserWallet />

            <EditProfileModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />

            <QuickAccessBoxes
                userListings={userListings}
                activeListings={activeListings}
                endedListings={endedListings}
            />
            <RandomComments />
        </Col>
    );
}
