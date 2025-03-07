import { DUMMY_BIDS } from "../user/dummy_data";
import { formatter } from "../../utils/formatter";

const imageStyle = {
    width: "30px",
    height: "30px",
};

export default function BidsSection() {
    return (
        <>
            <div className="container">
                {/* Bids Section */}
                <h2>Bids History</h2>
                {DUMMY_BIDS.map((bid, index) => (
                    <div key={index} className="row mt-3">
                        <div className="col-auto">
                            <img
                                src={bid.bidderImage}
                                alt={bid.bidderName}
                                className="rounded-circle"
                                style={imageStyle}
                            />
                        </div>
                        <div className="col">
                            <div className="d-flex align-items-center">
                                <span className="fw-bold me-1">
                                    {bid.bidderName}
                                </span>
                                <i className="bi bi-patch-check-fill text-success me-1"></i>
                                <span className="text-muted me-1">
                                    &#x2191;{bid.increase}
                                </span>
                                <span className="text-muted">
                                    {bid.bidTime}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-danger btn-sm me-2">
                                    <span className="text-body">Bid</span>{" "}
                                    {formatter.format(bid.bidAmount)}
                                </button>
                                <span className="me-2">
                                    <i className="bi bi-arrow-up"></i>{" "}
                                    {bid.totalIncrease}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {/* End Bids Section */}
            </div>
        </>
    );
}
