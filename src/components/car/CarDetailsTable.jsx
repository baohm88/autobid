// export default function CarDetailsTable({ car }) {
//     return (
//         <div>
//             <div className="card  border-secondary">
//                 <div className="card-body">
//                     <h5 className="card-title">Vehicle Details</h5>
//                     <table className="table  table-striped table-bordered mb-0">
//                         <tbody>
//                             <tr>
//                                 <th>Make</th>
//                                 <td>{car.make}</td>
//                             </tr>
//                             <tr>
//                                 <th>Model</th>
//                                 <td>{car.model}</td>
//                             </tr>
//                             <tr>
//                                 <th>Mileage</th>
//                                 <td>{car.mileage}</td>
//                             </tr>
//                             <tr>
//                                 <th>VIN</th>
//                                 <td>WBSNB93528CX08328</td>
//                             </tr>
//                             <tr>
//                                 <th>Title Status</th>
//                                 <td>Clean (CA)</td>
//                             </tr>
//                             <tr>
//                                 <th>Location</th>
//                                 <td>Novato, CA 94945</td>
//                             </tr>
//                             <tr>
//                                 <th>Seller</th>
//                                 <td>Genau_AutoWerks</td>
//                             </tr>
//                             <tr>
//                                 <th>Engine</th>
//                                 <td>{car.engine}</td>
//                             </tr>
//                             <tr>
//                                 <th>Drivetrain</th>
//                                 <td>Rear-wheel drive</td>
//                             </tr>
//                             <tr>
//                                 <th>Transmission</th>
//                                 <td>{car.transmission}</td>
//                             </tr>
//                             <tr>
//                                 <th>Body Style</th>
//                                 <td>{car.body_style}</td>
//                             </tr>
//                             <tr>
//                                 <th>Exterior Color</th>
//                                 <td>{car.exterior_color}</td>
//                             </tr>
//                             <tr>
//                                 <th>Interior Color</th>
//                                 <td>{car.interial_color}</td>
//                             </tr>
//                             <tr>
//                                 <th>Seller Type</th>
//                                 <td>Private Party</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Table } from "react-bootstrap";

export default function CarDetailsTable({ car }) {
    return (
        <Table className="my-3" striped bordered hover>
            <tbody>
                <tr>
                    <th>Make</th>
                    <td>{car.make}</td>
                </tr>
                <tr>
                    <th>Model</th>
                    <td>{car.model}</td>
                </tr>
                <tr>
                    <th>Mileage</th>
                    <td>{car.mileage}</td>
                </tr>
                <tr>
                    <th>VIN</th>
                    <td>WBSNB93528CX08328</td>
                </tr>
                <tr>
                    <th>Title Status</th>
                    <td>Clean (CA)</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>Novato, CA 94945</td>
                </tr>
                <tr>
                    <th>Seller</th>
                    <td>Genau_AutoWerks</td>
                </tr>
                <tr>
                    <th>Engine</th>
                    <td>{car.engine}</td>
                </tr>
                <tr>
                    <th>Drivetrain</th>
                    <td>Rear-wheel drive</td>
                </tr>
                <tr>
                    <th>Transmission</th>
                    <td>{car.transmission}</td>
                </tr>
                <tr>
                    <th>Body Style</th>
                    <td>{car.body_style}</td>
                </tr>
                <tr>
                    <th>Exterior Color</th>
                    <td>{car.exterior_color}</td>
                </tr>
                <tr>
                    <th>Interior Color</th>
                    <td>{car.interial_color}</td>
                </tr>
                <tr>
                    <th>Seller Type</th>
                    <td>Private Party</td>
                </tr>
            </tbody>
        </Table>
    );
}
