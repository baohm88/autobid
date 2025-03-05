import React from "react";

export default function CurrentBidSection() {
    return (
        <div className="card border-secondary mb-4 mt-4">
            <div className="card  border-secondary mb-4 ">
                <div className="card-body">
                    {/* Tiêu đề xe */}
                    <h5 className="fw-bold mb-3">
                        2022 Porsche Taycan GTS &middot; Reserve
                    </h5>

                    <div className="row">
                        {/* Cột trái (Current Bid, Place Bid, liên kết) */}
                        <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                                <span className="me-2 text-muted">
                                    Current Bid
                                </span>
                                <span className="fw-bold">SeaCAD</span>
                            </div>
                            {/* Số tiền bid */}
                            <h2 className="fw-bold text-success mb-3">
                                $56,789
                            </h2>

                            {/* Nút Place Bid */}
                            <div className="mb-3">
                                <button className="btn btn-success">
                                    Place Bid
                                </button>
                            </div>

                            {/* Liên kết dưới bid */}
                            <div className="d-flex flex-wrap">
                                <a
                                    href="#!"
                                    className="text-decoration-none me-3 mb-2"
                                >
                                    How buying works
                                </a>
                                <a
                                    href="#!"
                                    className="text-decoration-none me-3 mb-2"
                                >
                                    Watch this auction
                                </a>
                                <a
                                    href="#!"
                                    className="text-decoration-none mb-2"
                                >
                                    Notify me of Taycans
                                </a>
                            </div>
                        </div>

                        {/* Cột phải (Seller, Ending, Bids, Views) */}
                        <div className="col-md-4 text-md-end mt-4 mt-md-0">
                            <div className="mb-2">
                                <span className="me-2">Seller</span>
                                <span className="fw-bold">RaymonduLiu</span>
                                <button className="btn btn-sm btn-outline-light ms-2">
                                    Contact
                                </button>
                            </div>
                            <div className="mb-2">
                                <span className="text-muted">Ending:</span>{" "}
                                <strong>Tue, Feb 25 3:08 AM</strong>
                            </div>
                            <div className="mb-2">
                                <span className="text-muted">Bids:</span>{" "}
                                <strong>12</strong>
                            </div>
                            <div>
                                <span className="text-muted">Views:</span>{" "}
                                <strong>9,645</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
