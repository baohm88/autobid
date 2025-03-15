import { Table } from "react-bootstrap";
import {
    FaCar,
    FaTachometerAlt,
    FaKey,
    FaMapMarkerAlt,
    FaUser,
    FaCogs,
    FaRoad,
    FaExchangeAlt,
    FaCarSide,
    FaPalette,
    FaChair,
} from "react-icons/fa";

const iconStyle = {
    color: "red",
    fontSize: "1.3rem",
    margin: "0.5rem",
};

export default function CarDetailsTable({ car }) {
    return (
        <>
            <hr />
            {/* First table, visible on medium and smaller screens, hidden on large screens */}
            <Table className="my-3 d-md-table d-lg-none overflow-hidden" hover>
                <tbody>
                    <tr className="align-middle">
                        <th>
                            <FaCar style={iconStyle} /> Make
                        </th>
                        <td>{car.make}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaKey style={iconStyle} /> Model
                        </th>
                        <td>{car.model}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaTachometerAlt style={iconStyle} /> Mileage
                        </th>
                        <td>{car.mileage}</td>
                    </tr>

                    <tr className="align-middle">
                        <th>
                            <FaMapMarkerAlt style={iconStyle} /> Location
                        </th>
                        <td>Novato, CA 94945</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaUser style={iconStyle} /> Seller
                        </th>
                        <td>Genau_AutoWerks</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaCogs style={iconStyle} /> Engine
                        </th>
                        <td>{car.engine}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaRoad style={iconStyle} /> Drivetrain
                        </th>
                        <td>Rear-wheel drive</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaExchangeAlt style={iconStyle} /> Transmission
                        </th>
                        <td>{car.transmission}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaCarSide style={iconStyle} /> Body Style
                        </th>
                        <td>{car.body_style}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaPalette style={iconStyle} /> Exterior Color
                        </th>
                        <td>{car.exterior_color}</td>
                    </tr>
                    <tr className="align-middle">
                        <th>
                            <FaChair style={iconStyle} /> Interior Color
                        </th>
                        <td>{car.interior_color}</td>
                    </tr>
                </tbody>
            </Table>

            {/* Row containing two bottom tables, hidden on medium and small screens, visible on large screens */}
            <div className="row d-none d-lg-flex">
                {/* left table */}
                <div className="col">
                    <Table className="my-3 overflow-hidden" hover>
                        <tbody>
                            <tr className="align-middle">
                                <th>
                                    <FaCar style={iconStyle} /> Make
                                </th>
                                <td>{car.make}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaKey style={iconStyle} /> Model
                                </th>
                                <td>{car.model}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaTachometerAlt style={iconStyle} />{" "}
                                    Mileage
                                </th>
                                <td>{car.mileage}</td>
                            </tr>

                            <tr className="align-middle">
                                <th>
                                    <FaMapMarkerAlt style={iconStyle} />{" "}
                                    Location
                                </th>
                                <td>Novato, CA 94945</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaUser style={iconStyle} /> Seller
                                </th>
                                <td>Genau_AutoWerks</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {/* right table */}
                <div className="col">
                    <Table className="my-3 overflow-hidden" hover>
                        <tbody>
                            <tr className="align-middle">
                                <th>
                                    <FaCogs style={iconStyle} /> Engine
                                </th>
                                <td>{car.engine}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaRoad style={iconStyle} /> Drivetrain
                                </th>
                                <td>Rear-wheel drive</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaExchangeAlt style={iconStyle} />{" "}
                                    Transmission
                                </th>
                                <td>{car.transmission}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaCarSide style={iconStyle} /> Body Style
                                </th>
                                <td>{car.body_style}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaPalette style={iconStyle} /> Exterior
                                    Color
                                </th>
                                <td>{car.exterior_color}</td>
                            </tr>
                            <tr className="align-middle">
                                <th>
                                    <FaChair style={iconStyle} /> Interior Color
                                </th>
                                <td>{car.interior_color}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <hr />
        </>
    );
}
