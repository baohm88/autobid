import { useCarContext } from "../../context/CarContext";
import useWatchList from "../../hooks/useWatchList";
import CarItem from "../CarItem";

export default function UserWatchList() {
    const { watchList } = useWatchList();
    const { cars } = useCarContext();

    const userSavedCars = cars.filter((car) => watchList.includes(car.id));

    console.log(watchList);

    return (
        <div className="container mt-3">
            <h4>Your Watch List</h4>
            <div className="car-listings">
                {userSavedCars.length === 0 ? (
                    <p className="text-center text-muted fs-5 my-5">
                        Found no listings in your watch list.
                    </p>
                ) : (
                    userSavedCars.map((car) => (
                        <div className="car-card" key={car.id}>
                            <CarItem car={car} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
