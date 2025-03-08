import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DashboardSidebar from "../components/user/DashboardSidebar";

export default function DashboardLayout() {
    return (
        <Container>
            <Row>
                <Col md={3} lg={2} className=" p-3">
                    <DashboardSidebar />
                </Col>
                <Col md={9} lg={10} className="p-4">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}
