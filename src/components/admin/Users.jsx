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
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
import {
    FaSearch,
    FaFileExcel,
    FaSync,
    FaPlus,
    FaTrash,
    FaEdit,
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Users() {
    // Search, pagination, sort & filter states
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    // Thêm 2 state cho lọc và sắp xếp
    // statusFilter: "All", "Active", "Inactive" (tùy bạn định nghĩa)
    // sortBy: "default", "Ending Soon", "Newly Listed" (hoặc tùy ý)
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    // Users state (30 sample users)
    const [users, setUsers] = useState([
        {
            id: 2,
            fullname: "User Two",
            name: "user2",
            password: "pass2",
            email: "user2@example.com",
            blance: 2000000,
            bio: "Bio of user two",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-02",
            active: true,
        },
        {
            id: 3,
            fullname: "User Three",
            name: "user3",
            password: "pass3",
            email: "user3@example.com",
            blance: 3000000,
            bio: "Bio of user three",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-03",
            active: true,
        },
        {
            id: 4,
            fullname: "User Four",
            name: "user4",
            password: "pass4",
            email: "user4@example.com",
            blance: 4000000,
            bio: "Bio of user four",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-04",
            active: true,
        },
        {
            id: 5,
            fullname: "User Five",
            name: "user5",
            password: "pass5",
            email: "user5@example.com",
            blance: 5000000,
            bio: "Bio of user five",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-05",
            active: true,
        },
        {
            id: 6,
            fullname: "User Six",
            name: "user6",
            password: "pass6",
            email: "user6@example.com",
            blance: 6000000,
            bio: "Bio of user six",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-06",
            active: false,
        },
        {
            id: 7,
            fullname: "User Seven",
            name: "user7",
            password: "pass7",
            email: "user7@example.com",
            blance: 7000000,
            bio: "Bio of user seven",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-07",
            active: false,
        },
        {
            id: 8,
            fullname: "User Eight",
            name: "user8",
            password: "pass8",
            email: "user8@example.com",
            blance: 8000000,
            bio: "Bio of user eight",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-08",
            active: false,
        },
        {
            id: 9,
            fullname: "User Nine",
            name: "user9",
            password: "pass9",
            email: "user9@example.com",
            blance: 9000000,
            bio: "Bio of user nine",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-09",
            active: false,
        },
        {
            id: 10,
            fullname: "User Ten",
            name: "user10",
            password: "pass10",
            email: "user10@example.com",
            blance: 10000000,
            bio: "Bio of user ten",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-10",
            active: false,
        },
        {
            id: 11,
            fullname: "User Eleven",
            name: "user11",
            password: "pass11",
            email: "user11@example.com",
            blance: 11000000,
            bio: "Bio of user eleven",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-11",
            active: false,
        },
        {
            id: 12,
            fullname: "User Twelve",
            name: "user12",
            password: "pass12",
            email: "user12@example.com",
            blance: 12000000,
            bio: "Bio of user twelve",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-12",
            active: false,
        },
        {
            id: 13,
            fullname: "User Thirteen",
            name: "user13",
            password: "pass13",
            email: "user13@example.com",
            blance: 13000000,
            bio: "Bio of user thirteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-13",
            active: false,
        },
        {
            id: 14,
            fullname: "User Fourteen",
            name: "user14",
            password: "pass14",
            email: "user14@example.com",
            blance: 14000000,
            bio: "Bio of user fourteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-14",
            active: false,
        },
        {
            id: 15,
            fullname: "User Fifteen",
            name: "user15",
            password: "pass15",
            email: "user15@example.com",
            blance: 15000000,
            bio: "Bio of user fifteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-15",
            active: false,
        },
        {
            id: 16,
            fullname: "User Sixteen",
            name: "user16",
            password: "pass16",
            email: "user16@example.com",
            blance: 16000000,
            bio: "Bio of user sixteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-16",
            active: false,
        },
        {
            id: 17,
            fullname: "User Seventeen",
            name: "user17",
            password: "pass17",
            email: "user17@example.com",
            blance: 17000000,
            bio: "Bio of user seventeen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-17",
            active: false,
        },
        {
            id: 18,
            fullname: "User Eighteen",
            name: "user18",
            password: "pass18",
            email: "user18@example.com",
            blance: 18000000,
            bio: "Bio of user eighteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-18",
            active: false,
        },
        {
            id: 19,
            fullname: "User Nineteen",
            name: "user19",
            password: "pass19",
            email: "user19@example.com",
            blance: 19000000,
            bio: "Bio of user nineteen",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-19",
            active: false,
        },
        {
            id: 20,
            fullname: "User Twenty",
            name: "user20",
            password: "pass20",
            email: "user20@example.com",
            blance: 20000000,
            bio: "Bio of user twenty",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-20",
            active: true,
        },
        {
            id: 21,
            fullname: "User Twenty-one",
            name: "user21",
            password: "pass21",
            email: "user21@example.com",
            blance: 21000000,
            bio: "Bio of user twenty-one",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-21",
            active: false,
        },
        {
            id: 22,
            fullname: "User Twenty-two",
            name: "user22",
            password: "pass22",
            email: "user22@example.com",
            blance: 22000000,
            bio: "Bio of user twenty-two",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-22",
            active: false,
        },
        {
            id: 23,
            fullname: "User Twenty-three",
            name: "user23",
            password: "pass23",
            email: "user23@example.com",
            blance: 23000000,
            bio: "Bio of user twenty-three",
            image_url:
                "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
            create: "2023-01-23",
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

    // 1) Lọc theo statusFilter
    // Ở đây, giả sử "Active" => user.active === true, "Inactive" => user.active === false
    // "All" => trả về tất cả.
    const filteredByStatus = users.filter((u) => {
        if (statusFilter === "All") return true;
        if (statusFilter === "Active") return u.active === true;
        if (statusFilter === "Inactive") return u.active === false;
        return true;
    });

    // 2) Lọc theo tên (searchValue)
    const filteredBySearch = filteredByStatus.filter((u) =>
        u.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // 3) Sắp xếp theo sortBy (ví dụ ta sắp xếp theo create)
    // "default": không sắp xếp, "Ending Soon": ngày tạo cũ lên trước,
    // "Newly Listed": ngày tạo mới lên trước.
    const sortedUsers = [...filteredBySearch].sort((a, b) => {
        const dateA = new Date(a.create);
        const dateB = new Date(b.create);

        if (sortBy === "Ending Soon") {
            // sort by ngày tạo tăng dần
            return dateA - dateB;
        } else if (sortBy === "Newly Listed") {
            // sort by ngày tạo giảm dần
            return dateB - dateA;
        }
        return 0; // "default": không đổi
    });

    // Pagination calculations
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

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
        if (
            window.confirm(
                "Are you sure you want to delete all selected users?"
            )
        ) {
            setUsers((prev) =>
                prev.filter((u) => !selectedUserIds.includes(u.id))
            );
            setSelectedUserIds([]);
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
            const newId =
                users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
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
        <Container fluid className="py-3">
            {/* Toolbar */}
            <Row className="mb-3">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        <InputGroup
                            className="mb-2 mb-md-0"
                            style={{ width: "300px" }}
                        >
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

            {/* Row chứa Dropdown filter & sort */}
            <Row className="mb-3">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        <DropdownButton
                            id="dropdown-status"
                            title={`Status: ${statusFilter}`}
                            onSelect={(eventKey) => {
                                setStatusFilter(eventKey);
                                setCurrentPage(1);
                            }}
                        >
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Active">
                                Active
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Inactive">
                                Inactive
                            </Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-sort"
                            title={`Sort by: ${sortBy}`}
                            onSelect={(eventKey) => setSortBy(eventKey)}
                        >
                            <Dropdown.Item eventKey="default">
                                Default
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Ending Soon">
                                Ending Soon
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Newly Listed">
                                Newly Listed
                            </Dropdown.Item>
                        </DropdownButton>
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
                                            index % 2 === 0
                                                ? "#ffffff"
                                                : "#f8f9fa",
                                    }}
                                >
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    user.id,
                                                    e.target.checked
                                                )
                                            }
                                            checked={selectedUserIds.includes(
                                                user.id
                                            )}
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
                                        <div className="d-flex">
                                            <div className="flex-fill text-center">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                >
                                                    <FaEdit size={16} />
                                                </Button>
                                            </div>
                                            <div className="flex-fill text-center">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    <FaTrash size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sortedUsers.length === 0 && (
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
                                    currentPage > 1 &&
                                    handlePageChange(currentPage - 1)
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
                                    currentPage < totalPages &&
                                    handlePageChange(currentPage + 1)
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
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={
                                        userToEdit.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    onChange={(e) =>
                                        setUserToEdit({
                                            ...userToEdit,
                                            active: e.target.value === "Active",
                                        })
                                    }
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
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
