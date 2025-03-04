import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/Car.css";
import axios from "axios";

export default function Car() {
    const { id } = useParams();
    const [modalImage, setModalImage] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        async function fetchListing() {
            axios
                .get("http://localhost:8080/listings/" + id)
                .then((res) => {
                    const data = res.data.data[0];

                    console.log(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch listings:", err);
                });
        }

        fetchListing();
    }, [id]);

    // Ảnh chính demo (thay bằng link ảnh thật của bạn)
    const mainImageUrl =
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069";

    // Mảng danh sách thumbnails (có thể chứa nhiều hơn 8 ảnh)
    const thumbnails = [
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-2ua3HBz/edit/mCm_t.jpg?t=173928087523",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-pXr-O5F/edit/8tKmr.jpg?t=173928081607",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-2ua3HBz/edit/mCm_t.jpg?t=173928087523",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-pXr-O5F/edit/8tKmr.jpg?t=173928081607",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-2ua3HBz/edit/mCm_t.jpg?t=173928087523",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-pXr-O5F/edit/8tKmr.jpg?t=173928081607",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-2ua3HBz/edit/mCm_t.jpg?t=173928087523",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-pXr-O5F/edit/8tKmr.jpg?t=173928081607",
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-KTijHM1/edit/1685c.jpg?t=173928083959",
    ];

    const visibleThumbnails = thumbnails.slice(0, 8);
    const hiddenCount = thumbnails.length > 8 ? thumbnails.length - 8 : 0;
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
            question:
                "So... how difficult would it be to remove the green wrap!?",
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

    // Chia dữ liệu thành nhóm, mỗi nhóm chứa 3 Q&A
    const groupSize = 3;
    const groups = [];
    for (let i = 0; i < qaData.length; i += groupSize) {
        groups.push(qaData.slice(i, i + groupSize));
    }

    return (
        <div className="page-bg text-light">
            <div className="container py-4">
                {/* Tiêu đề & mô tả */}
                <h1 className="fw-bold">2008 BMW M5 - Car #{id}</h1>
                <p className="text-muted">
                    6-Speed Manual, V10 Power, Warm-Climate-Owned, Mostly
                    Unmodified
                </p>

                {/* Row: Ảnh chính (bên trái) + Thumbnails (bên phải) */}
                <div className="row">
                    {/* Ảnh chính */}
                    <div className="col-lg-8 mb-3">
                        <img
                            src={mainImageUrl}
                            alt="Main Car"
                            className="img-fluid rounded"
                            style={{ cursor: "pointer" }}
                            onClick={() => setModalImage(mainImageUrl)}
                        />
                    </div>
                    {/* Thumbnails & Nút All Photos */}
                    <div className="col-lg-4">
                        <div className="row g-2">
                            {visibleThumbnails.map((thumb, index) => (
                                <div
                                    className="col-6 col-md-6 position-relative"
                                    key={index}
                                >
                                    <img
                                        src={thumb}
                                        alt={`Thumb ${index + 1}`}
                                        className="img-fluid rounded"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setModalImage(thumb)}
                                    />
                                    {index === 7 && hiddenCount > 0 && (
                                        <button
                                            className="btn btn-dark w-100 overlay-thumbnail"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowGallery(true);
                                            }}
                                        >
                                            +{hiddenCount} Photos
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khối Time Left / High Bid / Bids / Comments + Place Bid + Auctions ending soon */}

                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <div className="container">
                            <h1>Car # {id}</h1>
                            <div className="d-flex justify-content-between">
                                <span className="btn btn-dark flex-grow-1">
                                    <span className="d-flex justify-content-between">
                                        <span>
                                            <span className="text-secondary">
                                                <i className="bi bi-clock"></i>{" "}
                                                <span>Time Left</span>
                                            </span>{" "}
                                            <span>4 Days</span>
                                        </span>
                                        <span>
                                            <span className="text-secondary">
                                                <i className="bi bi-arrow-up"></i>{" "}
                                                <span>High Bid</span>
                                            </span>{" "}
                                            <span>$72,000</span>
                                        </span>
                                        <span>
                                            <span className="text-secondary">
                                                <i className="bi bi-hash"></i>{" "}
                                                <span>Bids</span>
                                            </span>{" "}
                                            <span>14</span>
                                        </span>
                                        <span>
                                            <span className="text-secondary">
                                                <i className="bi bi-chat"></i>{" "}
                                                <span>Comments</span>
                                            </span>{" "}
                                            <span>41</span>
                                        </span>
                                    </span>
                                </span>
                                <button className="btn btn-success mx-3">
                                    Place Bid
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Details + Auctions ending soon (2 cột) */}
                        <div className="row mt-4">
                            {/* Vehicle Details: chiếm 8 cột */}
                            <div>
                                <div className="card bg-dark border-secondary">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Vehicle Details
                                        </h5>
                                        <table className="table table-dark table-striped table-bordered mb-0">
                                            <tbody>
                                                <tr>
                                                    <th>Make</th>
                                                    <td>BMW</td>
                                                </tr>
                                                <tr>
                                                    <th>Model</th>
                                                    <td>E60 M5</td>
                                                </tr>
                                                <tr>
                                                    <th>Mileage</th>
                                                    <td>101,000</td>
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
                                                    <td>5.0L V10</td>
                                                </tr>
                                                <tr>
                                                    <th>Drivetrain</th>
                                                    <td>Rear-wheel drive</td>
                                                </tr>
                                                <tr>
                                                    <th>Transmission</th>
                                                    <td>Manual (6-Speed)</td>
                                                </tr>
                                                <tr>
                                                    <th>Body Style</th>
                                                    <td>Sedan</td>
                                                </tr>
                                                <tr>
                                                    <th>Exterior Color</th>
                                                    <td>
                                                        Silverstone Metallic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Interior Color</th>
                                                    <td>Black</td>
                                                </tr>
                                                <tr>
                                                    <th>Seller Type</th>
                                                    <td>Private Party</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Auctions ending soon: chiếm 4 cột */}
                        </div>

                        {/* Highlights (bỏ khung) */}
                        <div className="mt-4">
                            <h5 className="mb-3">Highlights</h5>
                            <ul>
                                <li>
                                    THIS is a 2022 Porsche Taycan GTS, finished
                                    in black with an Acid Green vinyl wrap and a
                                    black interior.
                                </li>
                                <li>
                                    The attached Carfax history report shows no
                                    accidents or mileage discrepancies in this
                                    Taycan’s past.
                                </li>
                                <li>
                                    According to the digital window sticker
                                    provided in the gallery, factory equipment
                                    includes the Premium Package, the
                                    SportDesign Package in High Gloss Black,
                                    Porsche Dynamic Chassis Control Sport (PDCC
                                    Sport), 21-inch Mission E Design wheels, and
                                    more.
                                </li>
                            </ul>
                        </div>

                        {/* Equipment (bỏ khung) */}
                        <div>
                            <h5 className="mb-3">Equipment</h5>
                            <p>
                                A digital window sticker is provided in the
                                gallery, and a partial list of notable equipment
                                includes:
                            </p>
                            <ul>
                                <li>
                                    Premium Package (power-folding exterior
                                    mirrors, Bose surround sound system,
                                    Surround View camera, Lane Change Assist,
                                    Ionizer, heated steering wheel, seat
                                    ventilation, ambient lighting, noise
                                    insulated glass, etc.)
                                </li>
                                <li>SportDesign Package in High Gloss Black</li>
                                <li>21-inch Mission E Design wheels</li>
                            </ul>
                        </div>

                        {/* Video */}
                        <div>
                            <h5 className="mb-3">Video</h5>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.youtube.com/embed/Kxj667ER6ps?si=5SWlFca_15piauou"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="container my-4">
                            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                                <h5 className="fw-bold mb-0">
                                    Seller Q&A ({qaData.length})
                                </h5>
                                <div>
                                    <a
                                        href="#!"
                                        className="text-decoration-none me-3"
                                    >
                                        Ask a question
                                    </a>
                                    <a
                                        href="#!"
                                        className="text-decoration-none"
                                    >
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
                                                    <div
                                                        key={qa.id}
                                                        className="col-5 d-flex"
                                                    >
                                                        <div className="bg-dark p-3 rounded d-flex flex-column w-100 h-100">
                                                            {/* Phần Người hỏi */}
                                                            <div className="d-flex align-items-center mb-2">
                                                                <img
                                                                    src={
                                                                        qa.askerImage
                                                                    }
                                                                    alt={
                                                                        qa.askerName
                                                                    }
                                                                    className="rounded-circle me-2"
                                                                    style={{
                                                                        width: "32px",
                                                                        height: "32px",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                                <span className="fw-bold me-2">
                                                                    {
                                                                        qa.askerName
                                                                    }
                                                                </span>
                                                                <span className="text-success fw-bold">
                                                                    {
                                                                        qa.askerScore
                                                                    }
                                                                </span>
                                                            </div>
                                                            {/* Phần Câu hỏi */}
                                                            <p className="mb-2">
                                                                <strong>
                                                                    Q:
                                                                </strong>{" "}
                                                                {qa.question}
                                                            </p>
                                                            {/* Phần Người trả lời (Seller) */}
                                                            <div className="d-flex align-items-center text-muted mb-2">
                                                                <img
                                                                    src={
                                                                        qa.sellerImage
                                                                    }
                                                                    alt={
                                                                        qa.sellerName
                                                                    }
                                                                    className="rounded-circle me-2"
                                                                    style={{
                                                                        width: "32px",
                                                                        height: "32px",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                                <span>
                                                                    {
                                                                        qa.sellerName
                                                                    }
                                                                </span>
                                                                <span className="badge bg-secondary ms-2">
                                                                    Seller
                                                                </span>
                                                            </div>
                                                            {/* Phần Câu trả lời */}
                                                            <p className="mb-2">
                                                                <strong>
                                                                    A:
                                                                </strong>{" "}
                                                                {qa.answer}
                                                            </p>
                                                            {/*<div className="mt-auto">*/}
                                                            {/*    <div className="d-flex justify-content-end">*/}
                                                            {/*        <a href="#!" className="text-decoration-none">*/}
                                                            {/*            View answer*/}
                                                            {/*        </a>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
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
                                            <span className="visually-hidden">
                                                Previous
                                            </span>
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
                                            <span className="visually-hidden">
                                                Next
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Thông tin đấu giá: model, current bid, seller, ending... */}
                        <div className="card bg-dark border-secondary mb-4 mt-4">
                            <div className="card bg-dark border-secondary mb-4 ">
                                <div className="card-body">
                                    {/* Tiêu đề xe */}
                                    <h5 className="fw-bold mb-3">
                                        2022 Porsche Taycan GTS &middot; Reserve
                                    </h5>

                                    <div className="row">
                                        {/* Cột trái (Current Bid, Place Bid, liên kết) */}
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center mb-2">
                                                <span className="me-2 text-muted">
                                                    Current Bid
                                                </span>
                                                <span className="fw-bold">
                                                    SeaCAD
                                                </span>
                                            </div>
                                            {/* Số tiền bid */}
                                            <h2 className="fw-bold text-success mb-3">
                                                $56,789
                                            </h2>

                                            {/* Nút Place Bid */}
                                            <div className="mb-3">
                                                <button className="btn btn-success">
                                                    Place Bid
                                                </button>
                                            </div>

                                            {/* Liên kết dưới bid */}
                                            <div className="d-flex flex-wrap">
                                                <a
                                                    href="#!"
                                                    className="text-decoration-none me-3 mb-2"
                                                >
                                                    How buying works
                                                </a>
                                                <a
                                                    href="#!"
                                                    className="text-decoration-none me-3 mb-2"
                                                >
                                                    Watch this auction
                                                </a>
                                                <a
                                                    href="#!"
                                                    className="text-decoration-none mb-2"
                                                >
                                                    Notify me of Taycans
                                                </a>
                                            </div>
                                        </div>

                                        {/* Cột phải (Seller, Ending, Bids, Views) */}
                                        <div className="col-md-4 text-md-end mt-4 mt-md-0">
                                            <div className="mb-2">
                                                <span className="me-2">
                                                    Seller
                                                </span>
                                                <span className="fw-bold">
                                                    RaymonduLiu
                                                </span>
                                                <button className="btn btn-sm btn-outline-light ms-2">
                                                    Contact
                                                </button>
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">
                                                    Ending:
                                                </span>{" "}
                                                <strong>
                                                    Tue, Feb 25 3:08 AM
                                                </strong>
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-muted">
                                                    Bids:
                                                </span>{" "}
                                                <strong>12</strong>
                                            </div>
                                            <div>
                                                <span className="text-muted">
                                                    Views:
                                                </span>{" "}
                                                <strong>9,645</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            {/* Comments & Bids Section */}
                            <div className="card bg-dark border-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Comments &amp; Bids
                                    </h5>
                                    {/* Thanh điều hướng comment */}
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <button className="btn btn-sm btn-outline-light me-2">
                                                Newest
                                            </button>
                                            <button className="btn btn-sm btn-outline-light">
                                                More
                                            </button>
                                        </div>
                                        <div>
                                            <button className="btn btn-sm btn-outline-success">
                                                Bid History
                                            </button>
                                        </div>
                                    </div>

                                    {/* Form thêm comment */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Add a Comment..."
                                        />
                                    </div>

                                    {/* Danh sách comment demo */}
                                    <div className="mb-3">
                                        <p className="fw-bold mb-1">
                                            SeaCAD{" "}
                                            <span className="text-muted">
                                                • 12h
                                            </span>
                                        </p>
                                        <p className="mb-0">
                                            Bid <strong>$56,789</strong>
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <p className="fw-bold mb-1">
                                            Rae mnpinlu{" "}
                                            <span className="text-muted">
                                                • 1d
                                            </span>
                                        </p>
                                        <p className="mb-0">
                                            Great wrap. I prefer the original
                                            PNM (PWP) Matte though.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Auctions ending soon*/}
                    <div className="col-lg-4">
                        <div className="container mt-4">
                            <div>
                                <h3 className="text-light mt-5">
                                    Auctions ending soon
                                </h3>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Ferrari"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$44,500</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:21:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card bg-secondary h-100">
                                        <img
                                            src="https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                            className="card-img-top"
                                            alt="Honda Civic"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setModalImage(
                                                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/39ba75f9b610a05237adc3ca976891cd48f5832c/photos/KdobEYly-y6V3CiO/edit/jAnBE.jpg?t=173928075069"
                                                )
                                            }
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                1982 Ferrari 308 GTSi
                                            </h5>
                                            <p>
                                                Bid <strong>$7,170</strong>
                                            </p>
                                            <p className="mt-5">
                                                7:27:27 Remaining
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal hiển thị ảnh toàn màn hình cho ảnh đơn */}
                {modalImage && (
                    <div
                        className="fullscreen-modal"
                        onClick={() => setModalImage(null)}
                    >
                        <img
                            src={modalImage}
                            alt="Fullscreen"
                            className="fullscreen-image"
                        />
                        <button
                            className="close-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setModalImage(null);
                            }}
                        >
                            ✖
                        </button>
                    </div>
                )}

                {/* Modal hiển thị Gallery toàn bộ ảnh (4x4) với scroll cho 20+ ảnh */}
                {showGallery && (
                    <div
                        className="fullscreen-modal"
                        onClick={() => setShowGallery(false)}
                    >
                        <div
                            className="gallery-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="container py-4">
                                <h3 className="mb-4">All Photos</h3>
                                <div
                                    className="gallery-scroll-container"
                                    style={{
                                        maxHeight: "80vh",
                                        overflowY: "auto",
                                    }}
                                >
                                    <div className="row">
                                        {thumbnails.map((img, index) => (
                                            <div
                                                className="col-3 mb-3"
                                                key={index}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="img-fluid rounded"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setModalImage(img);
                                                        setShowGallery(false);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-light mt-3"
                                    onClick={() => setShowGallery(false)}
                                >
                                    Close Gallery
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
