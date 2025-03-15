import useWatchList from "../hooks/useWatchList";
import { Button } from "react-bootstrap";

const WatchListButton = ({ carId }) => {
    const { isInWatchList, addToWatchList, removeFromWatchList } =
        useWatchList();

    const toggleWatch = () => {
        isInWatchList(carId)
            ? removeFromWatchList(carId)
            : addToWatchList(carId);
    };

    return (
        <>
            <Button variant="warning" className="mb-3" onClick={toggleWatch}>
                {isInWatchList(carId) ? (
                    <span>
                        <i class="bi bi-heart-fill text-danger"></i> Watching
                    </span>
                ) : (
                    <span>
                        <i class="bi bi-heart "></i> Watch
                    </span>
                )}{" "}
            </Button>
        </>
    );
};

export default WatchListButton;
