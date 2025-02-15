import { useParams } from "react-router-dom";

export default function Car() {
    const { id } = useParams();

    return (
        <div className="container">
            <h1>Car # {id}</h1>
            <div className="d-flex justify-content-between">
                <span className="btn btn-dark flex-grow-1">
                    <span className="d-flex justify-content-between">
                        <span>
                            <span className="text-secondary">
                                <i className="bi bi-clock"></i>{" "}
                                <span>Time Left</span>
                            </span>{" "}
                            <span>4 Days</span>
                        </span>
                        <span>
                            <span className="text-secondary">
                                <i className="bi bi-arrow-up"></i>{" "}
                                <span>High Bid</span>
                            </span>{" "}
                            <span>$72,000</span>
                        </span>
                        <span>
                            <span className="text-secondary">
                                <i className="bi bi-hash"></i> <span>Bids</span>
                            </span>{" "}
                            <span>14</span>
                        </span>
                        <span>
                            <span className="text-secondary">
                                <i className="bi bi-chat"></i>{" "}
                                <span>Comments</span>
                            </span>{" "}
                            <span>41</span>
                        </span>
                    </span>
                </span>
                <button className="btn btn-success mx-3">Place Bid</button>
            </div>
        </div>
    );
}
