import { Card, Col, Row } from "react-bootstrap";
import { DASHBOARD_LINKS } from "./dummy_data";
import { NavLink } from "react-router-dom";

export default function QuickAccessBoxes() {
    return (
        <>
            {/* Quick Access Boxes */}
            <Row className="mb-5">
                {DASHBOARD_LINKS.map((item, index) => (
                    <Col xs={6} md={3} key={index} className="mb-3">
                        <NavLink
                            to={item.link}
                            className="text-decoration-none"
                        >
                            <Card className="text-center p-3 h-100">
                                <Card.Body>
                                    <i
                                        className={`bi ${item.icon} fs-1 mb-2 d-block`}
                                    ></i>
                                    <Card.Title className="fs-5">
                                        {item.name}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </>
    );
}
