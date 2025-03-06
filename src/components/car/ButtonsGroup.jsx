import { Row, Col } from "react-bootstrap";
import { BiTime, BiUpArrowAlt, BiHash, BiChat } from "react-icons/bi"; // Use BiTime instead of BiClock

export default function ButtonsGroup() {
    return (
        <>
            <Row className="d-flex justify-content-between align-items-center bg-dark rounded-2 p-2 m-1">
                <Col>
                    <span className="text-secondary">
                        <BiTime style={{ fontSize: "1.2rem" }} /> Time Left
                    </span>{" "}
                    <span className="text-light">4 Days</span>
                </Col>
                <Col>
                    <span className="text-secondary">
                        <BiUpArrowAlt style={{ fontSize: "1.2rem" }} /> High Bid
                    </span>{" "}
                    <span className="text-light">$72,000</span>
                </Col>
                <Col>
                    <span className="text-secondary">
                        <BiHash style={{ fontSize: "1.2rem" }} /> Bids
                    </span>{" "}
                    <span className="text-light">14</span>
                </Col>
                <Col>
                    <span className="text-secondary">
                        <BiChat style={{ fontSize: "1.2rem" }} /> Comments
                    </span>{" "}
                    <span className="text-light"> 41</span>
                </Col>
            </Row>
        </>
    );
}
