import { Table } from "react-bootstrap";

export default function CarDetailsTable({ car }) {
    return (
        <Table className="my-3 rounded-2 overflow-hidden" bordered hover>
            <tbody>
                <tr >
                    <th className="bg-light">Make</th>
                    <td>{car.make}</td>
                </tr>
                <tr>
                    <th className="bg-light">Model</th>
                    <td>{car.model}</td>
                </tr>
                <tr >
                    <th className="bg-light">Mileage</th>
                    <td>{car.mileage}</td>
                </tr>
                <tr>
                    <th className="bg-light">VIN</th>
                    <td>WBSNB93528CX08328</td>
                </tr>
                <tr >
                    <th className="bg-light">Title Status</th>
                    <td>Clean (CA)</td>
                </tr>
                <tr>
                    <th className="bg-light">Location</th>
                    <td>Novato, CA 94945</td>
                </tr>
                <tr >
                    <th className="bg-light">Seller</th>
                    <td>Genau_AutoWerks</td>
                </tr>
                <tr>
                    <th className="bg-light">Engine</th>
                    <td>{car.engine}</td>
                </tr>
                <tr >
                    <th className="bg-light">Drivetrain</th>
                    <td>Rear-wheel drive</td>
                </tr>
                <tr>
                    <th className="bg-light">Transmission</th>
                    <td>{car.transmission}</td>
                </tr>
                <tr >
                    <th className="bg-light">Body Style</th>
                    <td>{car.body_style}</td>
                </tr>
                <tr>
                    <th className="bg-light">Exterior Color</th>
                    <td>{car.exterior_color}</td>
                </tr>
                <tr >
                    <th className="bg-light">Interior Color</th>
                    <td>{car.interial_color}</td>
                </tr>
                <tr>
                    <th className="bg-light">Seller Type</th>
                    <td>Private Party</td>
                </tr>
            </tbody>
        </Table>
    );
}
