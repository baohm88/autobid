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
            <Button variant="warning" onClick={toggleWatch}>
                {isInWatchList(carId) ? (
                    <span>
                        <i className="bi bi-heart-fill text-danger"></i>{" "}
                        Watching
                    </span>
                ) : (
                    <span>
                        <i className="bi bi-heart "></i> Watch
                    </span>
                )}{" "}
            </Button>
        </>
    );
};

export default WatchListButton;
