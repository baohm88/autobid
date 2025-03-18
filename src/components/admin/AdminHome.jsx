import { Card, Col, Container, Row, ListGroup } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AdminHome() {
    // Sample data
    const stats = [
        {
            label: "Total Users",
            value: 1200,
            icon: "bi-people-fill",
            color: "primary",
        },
        {
            label: "Active Auctions",
            value: 87,
            icon: "bi-hammer",
            color: "success",
        },
        {
            label: "Orders",
            value: 320,
            icon: "bi-basket-fill",
            color: "warning",
        },
        {
            label: "Revenue",
            value: "$25,000",
            icon: "bi-currency-dollar",
            color: "danger",
        },
    ];

    const lineChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Weekly Visitors",
                data: [500, 700, 800, 600, 900, 1000, 750],
                fill: true,
                backgroundColor: "rgba(13,110,253,0.1)",
                borderColor: "#0d6efd",
                tension: 0.4,
            },
        ],
    };

    const barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Monthly Revenue ($)",
                data: [4000, 6000, 5500, 7000, 8000, 7500],
                backgroundColor: "#198754",
            },
        ],
    };

    const recentActivities = [
        "User JohnDoe registered",
        "Auction #102 ended with 12 bids",
        "Admin updated car #453",
        "Order #909 marked as shipped",
        "New car listing approved",
    ];

    return (
        <div>
            <h3 className="mb-4">Admin Dashboard</h3>

            {/* Metrics */}
            <Row className="g-3 mb-4">
                {stats.map((stat, idx) => (
                    <Col md={6} lg={3} key={idx}>
                        <Card
                            bg={stat.color}
                            text="white"
                            className="shadow-sm"
                        >
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title className="mb-0 fs-5">
                                        {stat.label}
                                    </Card.Title>
                                    <h4 className="fw-bold">{stat.value}</h4>
                                </div>
                                <i className={`bi ${stat.icon} fs-2`}></i>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Charts */}
            <Row className="g-4 mb-4">
                <Col lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header>Visitors This Week</Card.Header>
                        <Card.Body>
                            <Line data={lineChartData} height={200} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header>Monthly Transaction Revenue</Card.Header>
                        <Card.Body>
                            <Bar data={barChartData} height={200} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Recent Activity */}
            <Row>
                <Col lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header>Recent Activity</Card.Header>
                        <ListGroup variant="flush">
                            {recentActivities.map((activity, idx) => (
                                <ListGroup.Item key={idx}>
                                    {activity}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
