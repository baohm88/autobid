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
    FaEdit,
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Orders() {
    // State tìm kiếm và phân trang
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ví dụ: 10 order mỗi trang

    // Dữ liệu order mẫu (giả lập dữ liệu được lấy từ database với trường picture)
    const [orders, setOrders] = useState([
        { auction_id: "A1001", id: 1, total_amount: 500000, user_id: "U101", order_date: "2023-02-10", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1002", id: 2, total_amount: 750000, user_id: "U102", order_date: "2023-02-11", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1003", id: 3, total_amount: 600000, user_id: "U103", order_date: "2023-02-12", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1004", id: 4, total_amount: 900000, user_id: "U104", order_date: "2023-02-13", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1005", id: 5, total_amount: 450000, user_id: "U105", order_date: "2023-02-14", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1006", id: 6, total_amount: 820000, user_id: "U106", order_date: "2023-02-15", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1007", id: 7, total_amount: 770000, user_id: "U107", order_date: "2023-02-16", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1008", id: 8, total_amount: 650000, user_id: "U108", order_date: "2023-02-17", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1009", id: 9, total_amount: 530000, user_id: "U109", order_date: "2023-02-18", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1010", id: 10, total_amount: 880000, user_id: "U110", order_date: "2023-02-19", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1011", id: 11, total_amount: 600000, user_id: "U111", order_date: "2023-02-20", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1012", id: 12, total_amount: 700000, user_id: "U112", order_date: "2023-02-21", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1013", id: 13, total_amount: 650000, user_id: "U113", order_date: "2023-02-22", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1014", id: 14, total_amount: 800000, user_id: "U114", order_date: "2023-02-23", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1015", id: 15, total_amount: 550000, user_id: "U115", order_date: "2023-02-24", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1016", id: 16, total_amount: 900000, user_id: "U116", order_date: "2023-02-25", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1017", id: 17, total_amount: 850000, user_id: "U117", order_date: "2023-02-26", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1018", id: 18, total_amount: 720000, user_id: "U118", order_date: "2023-02-27", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1019", id: 19, total_amount: 680000, user_id: "U119", order_date: "2023-02-28", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1020", id: 20, total_amount: 950000, user_id: "U120", order_date: "2023-03-01", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1021", id: 21, total_amount: 780000, user_id: "U121", order_date: "2023-03-02", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1022", id: 22, total_amount: 820000, user_id: "U122", order_date: "2023-03-03", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1023", id: 23, total_amount: 600000, user_id: "U123", order_date: "2023-03-04", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1024", id: 24, total_amount: 710000, user_id: "U124", order_date: "2023-03-05", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1025", id: 25, total_amount: 660000, user_id: "U125", order_date: "2023-03-06", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1026", id: 26, total_amount: 840000, user_id: "U126", order_date: "2023-03-07", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1027", id: 27, total_amount: 900000, user_id: "U127", order_date: "2023-03-08", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1028", id: 28, total_amount: 750000, user_id: "U128", order_date: "2023-03-09", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1029", id: 29, total_amount: 810000, user_id: "U129", order_date: "2023-03-10", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
        { auction_id: "A1030", id: 30, total_amount: 880000, user_id: "U130", order_date: "2023-03-11", picture: "https://cdnphoto.dantri.com.vn/EYNfOXzgHa-HRiIB7-yRdA8G_J0=/thumb_w/1020/2022/10/05/2024-bugatti-mistral-1664958499760.jpg" },
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

    // Phân trang
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Các hàm thao tác
    const handleCreate = () => {
        setIsNewOrder(true);
        setOrderToEdit({
            auction_id: "",
            id: null,
            total_amount: 0,
            user_id: "",
            order_date: new Date().toISOString().slice(0, 10),
            picture: "", // Để trống, người dùng tự nhập
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Xử lý modal chỉnh sửa / tạo mới
    const handleSaveEdit = () => {
        if (isNewOrder) {
            const newId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
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
                                            <Button variant="warning" size="sm" onClick={() => handleEdit(order)}>
                                                <FaEdit size={16} />
                                            </Button>
                                        </div>
                                        <div className="flex-fill text-center">
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(order.id)}>
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
                                        setOrderToEdit({ ...orderToEdit, auction_id: e.target.value })
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
                                        setOrderToEdit({ ...orderToEdit, user_id: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Order Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={orderToEdit.order_date}
                                    onChange={(e) =>
                                        setOrderToEdit({ ...orderToEdit, order_date: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Picture URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={orderToEdit.picture}
                                    onChange={(e) =>
                                        setOrderToEdit({ ...orderToEdit, picture: e.target.value })
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
