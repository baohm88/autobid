import { useAuth } from "../../../context/AuthContext";
import { useCarContext } from "../../../context/CarContext";
import CarItem from "../../CarItem";

export default function PastListings() {
    const { user } = useAuth();
    const { cars } = useCarContext();
    const now = new Date();
    const endedCars = cars.filter(
        (car) => new Date(car.end_time) <= now && car.user === user.id
    );

    if (endedCars.length <= 0) {
        return (
            <div>
                <h2 className="text-center my-3">You have no past listings </h2>
            </div>
        );
    }

    return (
        <>
            <div>
                <h2 className="text-center my-3">
                    Your Past Listings {endedCars.length}{" "}
                </h2>
            </div>
            <div className="row">
                {endedCars.map((car) => (
                    <div className="col-md-4 mb-4" key={car.id}>
                        <CarItem car={car} />
                    </div>
                ))}
            </div>
        </>
    );
}
