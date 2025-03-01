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
    FaPlus,
    FaFileExcel,
    FaSync,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Orders() {
    // State tìm kiếm, phân trang và sắp xếp
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("newest"); // "newest" hoặc "oldest"
    const itemsPerPage = 10; // 10 order mỗi trang

    // Dữ liệu order mẫu
    const [orders, setOrders] = useState([
        {
            auction_id: "A1001",
            id: 1,
            total_amount: 500000,
            user_id: "U101",
            order_date: "2023-02-10",
            picture:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
        },
        {
            auction_id: "A1002",
            id: 2,
            total_amount: 750000,
            user_id: "U102",
            order_date: "2023-02-11",
            picture:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
        },
        {
            auction_id: "A1003",
            id: 3,
            total_amount: 600000,
            user_id: "U103",
            order_date: "2023-02-12",
            picture:
                "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg",
        },
        // ... các order khác
    ]);

    // State cho modal chỉnh sửa / tạo mới
    const [showModal, setShowModal] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState(null);
    const [isNewOrder, setIsNewOrder] = useState(false);

    // Xử lý ô tìm kiếm
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    // Lọc danh sách dựa trên searchValue (theo auction_id)
    const filteredOrders = orders.filter((order) =>
        order.auction_id.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Sắp xếp danh sách theo order_date dựa trên sortOrder
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const dateA = new Date(a.order_date);
        const dateB = new Date(b.order_date);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    // Phân trang
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Các hàm thao tác
    const handleCreate = () => {
        setIsNewOrder(true);
        setOrderToEdit({
            auction_id: "",
            id: null,
            total_amount: 0,
            user_id: "",
            order_date: new Date().toISOString().slice(0, 10),
            picture: "",
        });
        setShowModal(true);
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        XLSX.writeFile(workbook, "orders.xlsx");
    };

    const handleSync = () => {
        if (window.confirm("Bạn chắc chắn muốn đồng bộ?")) {
            window.location.reload();
        }
    };

    const handleEdit = (order) => {
        setIsNewOrder(false);
        setOrderToEdit({ ...order });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa?")) {
            setOrders((prev) => prev.filter((order) => order.id !== id));
        }
    };

    // Xử lý modal chỉnh sửa / tạo mới
    const handleSaveEdit = () => {
        if (isNewOrder) {
            const newId =
                orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
            setOrders((prev) => [...prev, { ...orderToEdit, id: newId }]);
        } else {
            setOrders((prev) =>
                prev.map((o) => (o.id === orderToEdit.id ? orderToEdit : o))
            );
        }
        setShowModal(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <Container fluid className="py-4">
            {/* Toolbar */}
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
                        {/* Dropdown Sort by */}

                        <Button variant="primary" onClick={handleCreate}>
                            <FaPlus className="me-1" />
                            Create Order
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
            <Row className="mb-3">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        <DropdownButton
                            id="dropdown-sort"
                            title={`Sort by: ${sortOrder === "newest" ? "Newest" : "Oldest"}`}
                            variant="primary"  // sử dụng variant success của bootstrap (màu xanh lá)
                            onSelect={(eventKey) => setSortOrder(eventKey)}
                        >
                            <Dropdown.Item eventKey="newest">Newest</Dropdown.Item>
                            <Dropdown.Item eventKey="oldest">Oldest</Dropdown.Item>
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
                            <th style={{ width: "4%" }}>Picture</th>
                            <th style={{ width: "5%" }}>Auction ID</th>
                            <th style={{ width: "3%" }}>Order ID</th>
                            <th style={{ width: "10%" }}>Total Amount</th>
                            <th>User ID</th>
                            <th>Order Date</th>
                            <th style={{ width: "6%" }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((order, index) => (
                            <tr
                                key={order.id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                                }}
                            >
                                <td>
                                    {order.picture ? (
                                        <img
                                            src={order.picture}
                                            alt="Picture"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    ) : (
                                        <span>No Picture</span>
                                    )}
                                </td>
                                <td>{order.auction_id}</td>
                                <td>{order.id}</td>
                                <td>{order.total_amount.toLocaleString()} đ</td>
                                <td>{order.user_id}</td>
                                <td>{order.order_date}</td>
                                <td>
                                    <div className="d-flex">
                                        <div className="flex-fill text-center">
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => handleEdit(order)}
                                            >
                                                <FaEdit size={16} />
                                            </Button>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                <FaTrash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No orders found.
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

            {/* Modal chỉnh sửa / tạo mới */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isNewOrder ? "Create New Order" : "Edit Order"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderToEdit && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Auction ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={orderToEdit.auction_id}
                                    onChange={(e) =>
                                        setOrderToEdit({
                                            ...orderToEdit,
                                            auction_id: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Total Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={orderToEdit.total_amount}
                                    onChange={(e) =>
                                        setOrderToEdit({
                                            ...orderToEdit,
                                            total_amount: Number(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={orderToEdit.user_id}
                                    onChange={(e) =>
                                        setOrderToEdit({
                                            ...orderToEdit,
                                            user_id: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Order Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={orderToEdit.order_date}
                                    onChange={(e) =>
                                        setOrderToEdit({
                                            ...orderToEdit,
                                            order_date: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Picture URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={orderToEdit.picture}
                                    onChange={(e) =>
                                        setOrderToEdit({
                                            ...orderToEdit,
                                            picture: e.target.value,
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
