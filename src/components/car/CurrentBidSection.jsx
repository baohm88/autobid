import { NavLink } from "react-router-dom";
import { formatter } from "../../utils/formatter";

const fontSize = {
    fontSize: "4rem",
};

export default function CurrentBidSection({ car, onPlaceBid }) {
    return (
        <>
            <hr />
            <div className="border rounded-2 my-4 p-3">
                <h5 className="fw-bold mb-3">
                    {car.year_model} {car.make} {car.model}
                </h5>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex align-items-center">
                            <h6 className="me-2">Current Bid</h6>
                            <i className="bi bi-person-fill me-1"></i>
                            <span>RimRock</span>
                        </div>
                        <h1 className="text-success" style={fontSize}>
                            {formatter.format(car.starting_bid)}
                        </h1>
                        <button
                            className="btn btn-danger my-3"
                            onClick={onPlaceBid}
                        >
                            <i className="bi bi-currency-dollar"></i> Place Bid
                        </button>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-4">
                                <h6>Seller</h6>
                            </div>
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-fill me-1"></i>
                                    <span className="me-2">300GF</span>
                                    <NavLink
                                        to="#"
                                        className="text-success"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Contact
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h6>Ending</h6>
                            </div>
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-calendar me-1"></i>
                                    <span>Wed, Mar 12 3:18 AM</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h6>Bids</h6>
                            </div>
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-hash me-1"></i>
                                    <span>19</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h6>Views</h6>
                            </div>
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-eye-fill me-1"></i>
                                    <span>11,186</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}
