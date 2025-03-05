const qaData = [
    {
        id: 1,
        askerName: "dhb2",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+22",
        question:
            "Hello - What is the actual color of the car (under the wrap)? I don see it in the invoice you attached. Thanks!",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "Hi great question, it is not that difficult to take off the wrap...",
    },
    {
        id: 2,
        askerName: "Cinn",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+2",
        question: "So... how difficult would it be to remove the green wrap!?",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "It not that difficult to remove the wrap...",
    },
    {
        id: 3,
        askerName: "kvo",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+7",
        question:
            "On the pictures, the color near the trunk — is it the original or the wrap?",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "Yes, partially original. The trunk area was left unwrapped.",
    },
    {
        id: 4,
        askerName: "User4",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+5",
        question: "Another question example?",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "Answer for Q&A 4.",
    },
    {
        id: 5,
        askerName: "User5",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+3",
        question: "What about the car's maintenance history?",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "The maintenance records are available upon request.",
    },
    {
        id: 6,
        askerName: "User6",
        askerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        askerScore: "+1",
        question: "Is there any damage reported?",
        sellerName: "Raymondu.lu",
        sellerImage:
            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp",
        answer: "No significant damage has been reported.",
    },
];

export default function QASection() {
    // Chia dữ liệu thành nhóm, mỗi nhóm chứa 3 Q&A
    const groupSize = 3;
    const groups = [];
    for (let i = 0; i < qaData.length; i += groupSize) {
        groups.push(qaData.slice(i, i + groupSize));
    }
    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                <h5 className="fw-bold mb-0">Seller Q&A ({qaData.length})</h5>
                <div>
                    <a href="#!" className="text-decoration-none me-3">
                        Ask a question
                    </a>
                    <a href="#!" className="text-decoration-none">
                        View all
                    </a>
                </div>
            </div>

            {/* Carousel chứa các slide Q&A */}
            <div
                id="qaCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                {/*    <div id="qaCarousel" className="carousel slide" >*/}
                <div className="carousel-inner">
                    {groups.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className={`carousel-item ${
                                groupIndex === 0 ? "active" : ""
                            }`}
                        >
                            <div className="row row-cols-1 row-cols-md-3 g-3">
                                {group.map((qa) => (
                                    <div key={qa.id} className="col-5 d-flex">
                                        <div className="bg-light p-3 rounded d-flex flex-column w-100 h-100">
                                            {/* Phần Người hỏi */}
                                            <div className="d-flex align-items-center mb-2">
                                                <img
                                                    src={qa.askerImage}
                                                    alt={qa.askerName}
                                                    className="rounded-circle me-2"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <span className="fw-bold me-2">
                                                    {qa.askerName}
                                                </span>
                                                <span className="text-success fw-bold">
                                                    {qa.askerScore}
                                                </span>
                                            </div>
                                            {/* Phần Câu hỏi */}
                                            <p className="mb-2">
                                                <strong>Q:</strong>{" "}
                                                {qa.question}
                                            </p>
                                            {/* Phần Người trả lời (Seller) */}
                                            <div className="d-flex align-items-center text-muted mb-2">
                                                <img
                                                    src={qa.sellerImage}
                                                    alt={qa.sellerName}
                                                    className="rounded-circle me-2"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <span>{qa.sellerName}</span>
                                                <span className="badge bg-secondary ms-2">
                                                    Seller
                                                </span>
                                            </div>
                                            {/* Phần Câu trả lời */}
                                            <p className="mb-2">
                                                <strong>A:</strong> {qa.answer}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Các nút điều khiển nếu có nhiều hơn 1 slide */}
                {groups.length > 1 && (
                    <>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#qaCarousel"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#qaCarousel"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
