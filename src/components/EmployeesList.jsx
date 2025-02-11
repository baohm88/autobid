import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmployeesList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getAllEmployees();
    }, [location]);

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewEmployee() {
        navigate("/add-employee");
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function confirmDelete(id) {
        if (
            window.confirm(
                `Are you sure you want to delete employee with ID: ${id}?`
            )
        ) {
            deleteEmployee(id)
                .then(() => getAllEmployees())
                .catch((error) => {
                    console.log(error);
                });
            console.log("");
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button
                className="btn btn-primary btn-sm mb-2"
                onClick={addNewEmployee}
            >
                Add Employee
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id} </td>
                            <td>{employee.firstName} </td>
                            <td>{employee.lastName} </td>
                            <td>{employee.email} </td>
                            <td className="text-center">
                                {/* <button
                                    className="btn btn-warning btn-sm mx-1"
                                    onClick={() => updateEmployee(employee.id)}
                                >
                                    Update
                                </button> */}
                                <i
                                    className="bi bi-pencil-square text-primary mx-2"
                                    onClick={() => updateEmployee(employee.id)}
                                ></i>
                                <i
                                    className="bi bi-trash-fill text-danger"
                                    onClick={() => confirmDelete(employee.id)}
                                ></i>
                                {/* <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => confirmDelete(employee.id)}
                                >
                                    Delete
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
