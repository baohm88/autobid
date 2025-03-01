import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Form,
    InputGroup,
    Pagination,
    Modal,
} from "react-bootstrap";
import {
    FaSearch,
    FaFileExcel,
    FaSync,
    FaPlus,
    FaTrash,
    FaCheck,
    FaEdit,
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Users() {
    // Search and pagination states
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    // Users state (30 sample users)
    const [users, setUsers] = useState([
        {
            id: 1,
            fullname: "User One",
            name: "user1",
            password: "pass1",
            email: "user1@example.com",
            blance: 1000000,
            bio: "Bio of user one",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-01",
            active: false,
        },
        // ... Users from 2 to 29 ...
        {
            id: 30,
            fullname: "User Thirty",
            name: "user30",
            password: "pass30",
            email: "user30@example.com",
            blance: 3000000,
            bio: "Bio of user thirty",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-30",
            active: false,
        },
    ]);

    // State for selected users (checkbox)
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    // State for modal (edit / create)
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    // Flag to differentiate between creating and editing
    const [isNewUser, setIsNewUser] = useState(false);

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    // Filter users by username
    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Action functions
    const handleCreate = () => {
        setIsNewUser(true);
        setUserToEdit({
            id: null,
            fullname: "",
            name: "",
            password: "",
            email: "",
            blance: 0,
            bio: "",
            image_url: "",
            create: new Date().toISOString().slice(0, 10),
            active: false,
        });
        setShowEditModal(true);
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users.xlsx");
    };

    const handleSync = () => {
        if (window.confirm("Are you sure you want to sync?")) {
            window.location.reload();
        }
    };

    // Edit action from the Action column
    const handleEdit = (user) => {
        setIsNewUser(false);
        setUserToEdit({ ...user });
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        }
    };

    // Delete all selected users
    const handleDeleteSelected = () => {
        if (selectedUserIds.length === 0) {
            alert("No user selected.");
            return;
        }
        if (window.confirm("Are you sure you want to delete all selected users?")) {
            setUsers((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
            setSelectedUserIds([]);
        }
    };

    // Active action: update active state to true for a user by id
    const handleActive = (id) => {
        if (window.confirm("Are you sure you want to activate?")) {
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, active: true } : u))
            );
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle checkbox selection
    const handleCheckboxChange = (id, checked) => {
        if (checked) {
            setSelectedUserIds((prev) => [...prev, id]);
        } else {
            setSelectedUserIds((prev) => prev.filter((uid) => uid !== id));
        }
    };

    // Handle modal save (edit/create)
    const handleSaveEdit = () => {
        if (isNewUser) {
            const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
            setUsers((prev) => [...prev, { ...userToEdit, id: newId }]);
        } else {
            setUsers((prev) =>
                prev.map((u) => (u.id === userToEdit.id ? userToEdit : u))
            );
        }
        setShowEditModal(false);
        setSelectedUserIds([]);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    // Common style for Active/Inactive badge
    const statusBadgeStyle = {
        display: "inline-block",
        width: "80px", // fixed width for both states
        textAlign: "center",
        color: "#fff",
        padding: "4px 0",
        borderRadius: "4px",
    };

    return (
        <Container fluid className="py-4">
            {/* Toolbar */}
            <Row className="mb-3">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        <InputGroup className="mb-2 mb-md-0" style={{ width: "300px" }}>
                            <Form.Control
                                placeholder="Search for account..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-secondary">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button variant="primary" onClick={handleCreate}>
                            <FaPlus className="me-1" />
                            Create New
                        </Button>
                        <Button variant="success" onClick={handleExportExcel}>
                            <FaFileExcel className="me-1" />
                            Export Excel
                        </Button>
                        <Button variant="info" onClick={handleSync}>
                            <FaSync className="me-1" />
                            Sync
                        </Button>
                        <Button variant="danger" onClick={handleDeleteSelected}>
                            <FaTrash className="me-1" />
                            Delete Selected
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Data Table */}
            <Row>
                <Col>
                    <Table bordered hover responsive>
                        <thead className="table-light">
                        <tr>
                            <th>Select</th>
                            <th>Avatar</th>
                            <th style={{ width: "4%" }}>Status</th>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th>Bio</th>
                            <th>Image URL</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                                }}
                            >
                                <td className="text-center">
                                    <Form.Check
                                        type="checkbox"
                                        onChange={(e) =>
                                            handleCheckboxChange(user.id, e.target.checked)
                                        }
                                        checked={selectedUserIds.includes(user.id)}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={user.image_url}
                                        alt={user.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </td>
                                <td>
                                    {user.active ? (
                                        <span
                                            style={{
                                                ...statusBadgeStyle,
                                                backgroundColor: "green",
                                            }}
                                        >
                        Active
                      </span>
                                    ) : (
                                        <span
                                            style={{
                                                ...statusBadgeStyle,
                                                backgroundColor: "red",
                                            }}
                                        >
                        Inactive
                      </span>
                                    )}
                                </td>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.name}</td>
                                <td>{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.blance.toLocaleString()} đ</td>
                                <td>{user.bio}</td>
                                <td>{user.image_url}</td>
                                <td>{user.create}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <FaEdit size={16} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <FaTrash size={16} />
                                        </Button>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleActive(user.id)}
                                        >
                                            <FaCheck size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={13} className="text-center">
                                    No matching account found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Pagination */}
            {totalPages > 1 && (
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() =>
                                    currentPage > 1 && handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            />
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === currentPage}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() =>
                                    currentPage < totalPages && handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}

            {/* Modal for Create/Edit */}
            <Modal show={showEditModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isNewUser ? "Create New User" : "Edit User"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userToEdit && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userToEdit.fullname}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            fullname: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userToEdit.name}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userToEdit.password}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={userToEdit.email}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={userToEdit.blance}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            blance: Number(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={userToEdit.bio}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            bio: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userToEdit.image_url}
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            image_url: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
