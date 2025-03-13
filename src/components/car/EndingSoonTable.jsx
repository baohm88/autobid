import { Card } from "react-bootstrap";
import CarItem from "../CarItem"; // Adjust path if needed

export default function EndingSoonTable({ cars }) {
    if (!cars || cars.length === 0) return null;

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-warning text-dark fw-bold m-3 text-center">
                🚗 Ending Soon Listings
            </Card.Header>
            <Card.Body className="p-3">
                {cars.map((car) => (
                    <div key={car.id} className="mb-3">
                        <CarItem car={car} />
                        <hr />
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
}
