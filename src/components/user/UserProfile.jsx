import { Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import RandomComments from "./RandomComments";
import { useState } from "react";
import { useCarContext } from "../../context/CarContext";
import UserWallet from "./UserWallet";
import ChangePassword from "./ChangePassword";

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

    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);

    document.title = user?.username || "Account Details";

    return (
        <Col sm>
            <h3 className="mb-4 text-center"> My Profile</h3>

            <ProfileCard
                user={user}
                onEditProfile={() => setShowEditProfileModal(true)}
                onChangePassword={() => setShowChangePasswordModal(true)}
                userListings={userListings}
                activeListings={activeListings}
                endedListings={endedListings}
            />

            <UserWallet />

            <EditProfileModal
                show={showEditProfileModal}
                handleClose={() => setShowEditProfileModal(false)}
            />
            <ChangePassword
                show={showChangePasswordModal}
                handleClose={() => setShowChangePasswordModal(false)}
            />

            <RandomComments />
        </Col>
    );
}
