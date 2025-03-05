import React from "react";

export default function BidsSection() {
    return (
        <div className="col">
            <div className="card  border-secondary">
                <div className="card-body">
                    <h5 className="card-title">Comments &amp; Bids</h5>
                    {/* Thanh điều hướng comment */}
                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <button className="btn btn-sm btn-outline-light me-2">
                                Newest
                            </button>
                            <button className="btn btn-sm btn-outline-light">
                                More
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-success">
                                Bid History
                            </button>
                        </div>
                    </div>

                    {/* Form thêm comment */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add a Comment..."
                        />
                    </div>

                    {/* Danh sách comment demo */}
                    <div className="mb-3">
                        <p className="fw-bold mb-1">
                            SeaCAD <span className="text-muted">• 12h</span>
                        </p>
                        <p className="mb-0">
                            Bid <strong>$56,789</strong>
                        </p>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <p className="fw-bold mb-1">
                            Rae mnpinlu <span className="text-muted">• 1d</span>
                        </p>
                        <p className="mb-0">
                            Great wrap. I prefer the original PNM (PWP) Matte
                            though.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
