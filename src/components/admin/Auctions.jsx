import { useState, useEffect } from "react";
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
    FaPlus,
    FaFileExcel,
    FaSync,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Auctions() {
    // Dữ liệu mẫu 10 auction
    const [auctions, setAuctions] = useState([
        {
            id: 1,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 100,
            status: "Pending",
            user_id: 101,
            year_model: 2020,
            created_at: "2023-01-01",
            end_time: "2023-02-01",
            start_time: "2023-01-05",
            make: "Toyota",
            model: "Corolla",
            description: "Description 1",
        },
        {
            id: 2,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 150,
            status: "Live",
            user_id: 102,
            year_model: 2019,
            created_at: "2023-01-02",
            end_time: "2023-02-02",
            start_time: "2023-01-06",
            make: "Honda",
            model: "Civic",
            description: "Description 2",
        },
        {
            id: 3,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 200,
            status: "Pass",
            user_id: 103,
            year_model: 2018,
            created_at: "2023-01-03",
            end_time: "2023-02-03",
            start_time: "2023-01-07",
            make: "Ford",
            model: "Focus",
            description: "Description 3",
        },
        {
            id: 4,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 120,
            status: "Pending",
            user_id: 104,
            year_model: 2021,
            created_at: "2023-01-04",
            end_time: "2023-02-04",
            start_time: "2023-01-08",
            make: "Chevrolet",
            model: "Malibu",
            description: "Description 4",
        },
        {
            id: 5,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 180,
            status: "Live",
            user_id: 105,
            year_model: 2017,
            created_at: "2023-01-05",
            end_time: "2023-02-05",
            start_time: "2023-01-09",
            make: "Nissan",
            model: "Sentra",
            description: "Description 5",
        },
        {
            id: 6,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 250,
            status: "Pass",
            user_id: 106,
            year_model: 2016,
            created_at: "2023-01-06",
            end_time: "2023-02-06",
            start_time: "2023-01-10",
            make: "Mazda",
            model: "Mazda3",
            description: "Description 6",
        },
        {
            id: 7,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 300,
            status: "Pending",
            user_id: 107,
            year_model: 2022,
            created_at: "2023-01-07",
            end_time: "2023-02-07",
            start_time: "2023-01-11",
            make: "BMW",
            model: "3 Series",
            description: "Description 7",
        },
        {
            id: 8,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 220,
            status: "Live",
            user_id: 108,
            year_model: 2015,
            created_at: "2023-01-08",
            end_time: "2023-02-08",
            start_time: "2023-01-12",
            make: "Audi",
            model: "A4",
            description: "Description 8",
        },
        {
            id: 9,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 140,
            status: "Pass",
            user_id: 109,
            year_model: 2014,
            created_at: "2023-01-09",
            end_time: "2023-02-09",
            start_time: "2023-01-13",
            make: "Hyundai",
            model: "Elantra",
            description: "Description 9",
        },
        {
            id: 10,
            image:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
            starting_bid: 190,
            status: "Pending",
            user_id: 110,
            year_model: 2023,
            created_at: "2023-01-10",
            end_time: "2023-02-10",
            start_time: "2023-01-14",
            make: "Kia",
            model: "Optima",
            description: "Description 10",
        },
    ]);

    // Dropdown filter và sort (mặc định status là All)
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    // State cho ô tìm kiếm Auction ID
    const [searchValue, setSearchValue] = useState("");

    // State cho Modal tạo mới/chỉnh sửa
    const [showModal, setShowModal] = useState(false);
    // editingMode = false: tạo mới, true: chỉnh sửa
    const [editingMode, setEditingMode] = useState(false);
    const [newAuction, setNewAuction] = useState({
        id: "",
        image: "",
        starting_bid: "",
        status: "Pending",
        user_id: "",
        year_model: "",
        created_at: "",
        end_time: "",
        start_time: "",
        make: "",
        model: "",
        description: "",
    });

    useEffect(() => {
        // Nếu có API thì gọi và setAuctions(data) ở đây.
    }, []);

    // Hàm xử lý ô tìm kiếm theo Auction ID
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    // Hàm mở modal tạo mới
    const handleCreate = () => {
        setEditingMode(false);
        setNewAuction({
            id: auctions.length > 0 ? Math.max(...auctions.map((a) => a.id)) + 1 : 1,
            image: "",
            starting_bid: "",
            status: "Pending",
            user_id: "",
            year_model: "",
            created_at: new Date().toISOString().slice(0, 10),
            end_time: "",
            start_time: "",
            make: "",
            model: "",
            description: "",
        });
        setShowModal(true);
    };

    // Hàm mở modal chỉnh sửa Auction
    const handleEdit = (auction) => {
        setEditingMode(true);
        setNewAuction(auction);
        setShowModal(true);
    };

    // Hàm xóa Auction
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa auction này?")) {
            setAuctions((prev) => prev.filter((a) => a.id !== id));
        }
    };

    // Hàm lưu Auction mới/chỉnh sửa
    const handleSaveNewAuction = () => {
        if (editingMode) {
            // Cập nhật auction đã chỉnh sửa
            setAuctions((prev) =>
                prev.map((a) => (a.id === newAuction.id ? newAuction : a))
            );
        } else {
            // Thêm auction mới
            setAuctions((prev) => [...prev, newAuction]);
        }
        setShowModal(false);
    };

    // Hàm xử lý Export Excel sử dụng thư viện xlsx
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(auctions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Auctions");
        XLSX.writeFile(workbook, "auctions.xlsx");
    };

    // Hàm xử lý Sync: reload trang để đồng bộ dữ liệu mới nhất từ server
    const handleSync = () => {
        window.location.reload();
    };

    // Bộ lọc theo status: nếu statusFilter là "All" thì hiển thị tất cả,
    // ngược lại lọc theo giá trị đã chọn.
    const filteredAuctions = auctions.filter((auction) =>
        statusFilter === "All"
            ? true
            : auction.status.toLowerCase() === statusFilter.toLowerCase()
    );

    // Bộ lọc theo Auction ID (nếu có giá trị tìm kiếm)
    const searchedAuctions = filteredAuctions.filter((auction) =>
        searchValue.trim() === ""
            ? true
            : auction.id.toString().includes(searchValue.trim())
    );

    // Sắp xếp dữ liệu
    const sortedAuctions = [...searchedAuctions].sort((a, b) => {
        if (sortBy === "Ending Soon") {
            return new Date(a.end_time) - new Date(b.end_time);
        }
        if (sortBy === "Newly Listed") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
    });

    // Phân trang - ví dụ chỉ hiển thị 10 dữ liệu
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedAuctions.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentAuctions = sortedAuctions.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hàm lấy style cho ô trạng thái: nền cố định và chữ căn giữa.
    const getStatusStyle = (status) => {
        let style = {};
        switch (status.toLowerCase()) {
            case "live":
                style = { backgroundColor: "skyblue", color: "white" };
                break;
            case "pass":
                style = { backgroundColor: "green", color: "white" };
                break;
            case "pending":
                style = { backgroundColor: "orange", color: "white" };
                break;
            default:
                style = { backgroundColor: "transparent", color: "black" };
                break;
        }
        return {
            ...style,
            width: "80px",
            height: "30px",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "1.1rem",
        };
    };

    return (
        <Container fluid className="py-4">
            {/* Toolbar Tìm kiếm & Nút thao tác */}
            <Row className="mb-3">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        <InputGroup className="mb-2 mb-md-0" style={{ width: "300px" }}>
                            <Form.Control
                                placeholder="Search by Auction ID..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-secondary">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button variant="primary" onClick={handleCreate}>
                            <FaPlus className="me-1" />
                            Create
                        </Button>
                        <Button variant="success" onClick={handleExportExcel}>
                            <FaFileExcel className="me-1" />
                            Export Excel
                        </Button>
                        <Button variant="info" onClick={handleSync}>
                            <FaSync className="me-1" />
                            Sync
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Dropdown Toolbar */}
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
                            <Dropdown.Item eventKey="Live">Live</Dropdown.Item>
                            <Dropdown.Item eventKey="Pass">Pass</Dropdown.Item>
                            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-sort"
                            title={`Sort by: ${sortBy}`}
                            onSelect={(eventKey) => {
                                setSortBy(eventKey);
                            }}
                        >
                            <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                            <Dropdown.Item eventKey="Ending Soon">Ending Soon</Dropdown.Item>
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
                    <Table bordered hover responsive style={{ tableLayout: "auto" }}>
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: "4%" }}>Image</th>
                            <th style={{ width: "3%" }}>Id</th>
                            <th style={{ width: "5%" }}>Status</th>
                            <th style={{ width: "6%" }}>Starting Bid</th>
                            <th style={{ width: "6%" }}>User Id</th>
                            <th style={{ width: "6%" }}>Year Model</th>
                            <th style={{ width: "6%" }}>Created At</th>
                            <th style={{ width: "6%" }}>End Time</th>
                            <th style={{ width: "6%" }}>Start Time</th>
                            <th style={{ width: "8%" }}>Make</th>
                            <th style={{ width: "8%" }}>Model</th>
                            <th>Description</th>
                            <th style={{ width: "120px" }}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentAuctions.map((auction) => (
                            <tr key={auction.id}>
                                <td>
                                    <img
                                        src={auction.image}
                                        alt={`Auction ${auction.id}`}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </td>
                                <td>{auction.id}</td>
                                <td>
                    <span style={getStatusStyle(auction.status)}>
                      {auction.status}
                    </span>
                                </td>
                                <td>{auction.starting_bid}</td>
                                <td>{auction.user_id}</td>
                                <td>{auction.year_model}</td>
                                <td>{auction.created_at}</td>
                                <td>{auction.end_time}</td>
                                <td>{auction.start_time}</td>
                                <td>{auction.make}</td>
                                <td>{auction.model}</td>
                                <td>{auction.description}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEdit(auction)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(auction.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {currentAuctions.length === 0 && (
                            <tr>
                                <td colSpan={13} className="text-center">
                                    Không có dữ liệu phù hợp.
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

            {/* Modal Tạo mới/Chỉnh sửa Auction */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingMode ? "Edit Auction" : "Create New Auction"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuction.image}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, image: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Starting Bid</Form.Label>
                            <Form.Control
                                type="number"
                                value={newAuction.starting_bid}
                                onChange={(e) =>
                                    setNewAuction({
                                        ...newAuction,
                                        starting_bid: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={newAuction.status}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, status: e.target.value })
                                }
                            >
                                <option value="Live">Live</option>
                                <option value="Pass">Pass</option>
                                <option value="Pending">Pending</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>User Id</Form.Label>
                            <Form.Control
                                type="number"
                                value={newAuction.user_id}
                                onChange={(e) =>
                                    setNewAuction({
                                        ...newAuction,
                                        user_id: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Year Model</Form.Label>
                            <Form.Control
                                type="number"
                                value={newAuction.year_model}
                                onChange={(e) =>
                                    setNewAuction({
                                        ...newAuction,
                                        year_model: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control
                                type="date"
                                value={newAuction.created_at}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, created_at: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="date"
                                value={newAuction.end_time}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, end_time: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="date"
                                value={newAuction.start_time}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, start_time: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuction.make}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, make: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuction.model}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, model: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newAuction.description}
                                onChange={(e) =>
                                    setNewAuction({ ...newAuction, description: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewAuction}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
