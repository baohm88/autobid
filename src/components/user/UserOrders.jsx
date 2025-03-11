import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCreditCard, FaCheckCircle, FaClock } from "react-icons/fa";

export default function UserOrders() {
    const [cars] = useState([
        {
            id: 1,
            title: "2013 Porsche 911 Carrera S Coupe",
            bidPrice: 3500000000,
            orderStatus: "Pending Payment",
            orderDate: "2025-03-01",
            paymentMethod: "Bank Transfer",
            image: "https://media.carsandbids.com/cdn-cgi/image/width=1800,quality=70/8bbf0f64fbfad81f6867cff798d92495738b23a7/photos/exterior/3gol07Le-_G_5hm5/edit/KDd8a.jpg?t=173955521241",
        },
        {
            id: 2,
            title: "2006 Porsche Cayman S",
            bidPrice: 2100000000,
            orderStatus: "Completed",
            orderDate: "2025-02-25",
            paymentMethod: "Credit Card",
            image: "https://media.carsandbids.com/cdn-cgi/image/width=1800,quality=70/59339d5e07287c702e69307de910cceaa69c1d04/photos/exterior/9aAWDQVl-FYrFKtC/edit/TAQxD.jpg?t=173919714643",
        },
    ]);

    const totalOrders = cars.length;
    const totalBidAmount = cars.reduce((sum, car) => sum + car.bidPrice, 0);
    const pendingOrders = cars.filter(
        (car) => car.orderStatus === "Pending Payment"
    ).length;
    const completedOrders = cars.filter(
        (car) => car.orderStatus === "Completed"
    ).length;

    return (
        <div className="container py-4">
            <div className="row">
                {/* Order List */}
                <div className="col-md-8">
                    <h3 className="mb-3">Order List</h3>
                    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="card mb-3 border-0 shadow-sm overflow-hidden"
                            >
                                <div className="row g-0">
                                    {/* Car Image */}
                                    <div className="col-md-5">
                                        <img
                                            src={car.image}
                                            alt={car.title}
                                            className="img-fluid rounded-start"
                                            style={{
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    {/* Car Information */}
                                    <div className="col-md-7 d-flex flex-column justify-content-center p-3">
                                        <h5 className="fw-bold mb-2">
                                            {car.title}
                                        </h5>
                                        <p className="mb-1">
                                            <strong>Price:</strong>{" "}
                                            {car.bidPrice.toLocaleString()} ₫
                                        </p>
                                        <p className="mb-1">
                                            <strong>Order Date:</strong>{" "}
                                            {car.orderDate}
                                        </p>
                                        <p className="mb-1 d-flex align-items-center">
                                            <FaCreditCard className="me-2 text-primary" />{" "}
                                            <strong>Payment:</strong>{" "}
                                            {car.paymentMethod}
                                        </p>
                                        <p
                                            className={`fw-bold ${
                                                car.orderStatus ===
                                                "Pending Payment"
                                                    ? "text-warning"
                                                    : "text-success"
                                            }`}
                                        >
                                            {car.orderStatus ===
                                            "Pending Payment" ? (
                                                <FaClock className="me-2" />
                                            ) : (
                                                <FaCheckCircle className="me-2" />
                                            )}
                                            {car.orderStatus}
                                        </p>
                                        {car.orderStatus ===
                                            "Pending Payment" && (
                                            <button className="btn btn-success">
                                                Pay Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-md-4">
                    <div
                        className="card p-4 border-0 shadow-sm bg-light position-sticky"
                        style={{ top: "100px" }}
                    >
                        <h4 className="mb-3">Order Summary</h4>
                        <hr />
                        <p>
                            <strong>Total Orders:</strong> {totalOrders}
                        </p>
                        <p>
                            <strong>Total Bid Amount:</strong>{" "}
                            {totalBidAmount.toLocaleString()} ₫
                        </p>
                        <p>
                            <strong>Pending Orders:</strong>{" "}
                            <span className="text-warning fw-bold">
                                {pendingOrders}
                            </span>
                        </p>
                        <p>
                            <strong>Completed Orders:</strong>{" "}
                            <span className="text-success fw-bold">
                                {completedOrders}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
