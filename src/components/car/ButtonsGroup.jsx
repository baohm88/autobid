import { Row, Col } from "react-bootstrap";
import { BiTime, BiUpArrowAlt, BiHash, BiChat } from "react-icons/bi";
import { useEffect, useState } from "react";
import { formatter } from "../../utils/formatter";

export default function ButtonsGroup({ car }) {
    const iconStyle = { fontSize: "1.5rem" };
    const [remainingTime, setRemainingTime] = useState("");

    useEffect(() => {
        const calculateRemainingTime = () => {
            const endTime = new Date(car.end_time);
            const currentTime = new Date();
            const timeDifference = endTime - currentTime;

            if (timeDifference > 0) {
                const daysDifference = Math.floor(
                    timeDifference / (1000 * 60 * 60 * 24)
                );
                if (daysDifference >= 1) {
                    setRemainingTime(`${daysDifference} Days`);
                } else {
                    const hours = String(
                        Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
                    ).padStart(2, "0");
                    const minutes = String(
                        Math.floor((timeDifference / (1000 * 60)) % 60)
                    ).padStart(2, "0");
                    const seconds = String(
                        Math.floor((timeDifference / 1000) % 60)
                    ).padStart(2, "0");
                    setRemainingTime(`${hours}:${minutes}:${seconds}`);
                }
            } else {
                setRemainingTime("Auction Ended");
            }
        };

        calculateRemainingTime();
        const intervalId = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(intervalId);
    }, [car.end_time]);

    return (
        <>
            <Row className="d-flex justify-content-between align-items-center bg-danger rounded-2 py-2 my-3 mx-1">
                <Col>
                    <span>
                        <span className="text-body">
                            <BiTime style={iconStyle} /> Time Left
                        </span>{" "}
                        <span className="text-light">{remainingTime}</span>
                    </span>
                </Col>
                <Col>
                    <span>
                        <span className="text-body">
                            <BiUpArrowAlt style={iconStyle} /> Current Bid
                        </span>{" "}
                        <span className="text-light">
                            {formatter.format(car.starting_bid)}
                        </span>
                    </span>
                </Col>
                <Col className="d-none d-md-block">
                    <span>
                        <span className="text-body">
                            <BiHash style={iconStyle} /> Bids
                        </span>{" "}
                        <span className="text-light">14</span>
                    </span>
                </Col>
                <Col className="d-none d-lg-block">
                    <span>
                        <span className="text-body">
                            <BiChat style={iconStyle} /> Comments
                        </span>{" "}
                        <span className="text-light">41</span>
                    </span>
                </Col>
            </Row>
        </>
    );
}
