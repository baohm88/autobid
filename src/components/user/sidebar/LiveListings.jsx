import { useAuth } from "../../../context/AuthContext";
import { useCarContext } from "../../../context/CarContext";
import CarItem from "../../CarItem";

export default function LiveListings() {
    const { user } = useAuth();
    const { cars } = useCarContext();
    const now = new Date();
    const activeCars = cars.filter(
        (car) => new Date(car.end_time) > now && car.user === user.id
    );

    if (activeCars.length <= 0) {
        return (
            <div>
                <h2 className="text-center my-3">You have no live listings </h2>
            </div>
        );
    }

    return (
        <>
            <div>
                <h2 className="text-center my-3">
                    Your Active Listings {activeCars.length}{" "}
                </h2>
            </div>
            <div className="row">
                {activeCars.map((car) => (
                    <div className="col-md-4 mb-4" key={car.id}>
                        <CarItem car={car} />
                    </div>
                ))}
            </div>
        </>
    );
}
