import { useEffect, useState } from "react";
import {
    addNewEmployee,
    getEmployee,
    updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (id) {
            getEmployee(id).then((res) => {
                const { firstName, lastName, email } = res.data;
                setEmployee((prevValue) => ({
                    ...prevValue,
                    firstName,
                    lastName,
                    email,
                }));
            });
        }
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setEmployee((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (id) {
            updateEmployee(id, employee)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            addNewEmployee(employee).then((res) => {
                console.log(res.data);
            });
        }

        navigate("/employees");
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }

    return (
        <div className="container">
            <br />
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="name@example.com"
                                    name="firstName"
                                    value={employee.firstName}
                                    onChange={handleChange}
                                />
                                <label htmlFor="firstName">First Name:</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="name@example.com"
                                    name="lastName"
                                    value={employee.lastName}
                                    onChange={handleChange}
                                />
                                <label htmlFor="lastName">Last Name:</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <button className="btn btn-success btn-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
