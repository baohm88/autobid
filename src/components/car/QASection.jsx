import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { DUMMY_QA, headers } from "../user/dummy_data";
import QAModal from "../../UI/QAModal";
import useQACarousel from "../../hooks/useQACarousel";
import QAItemCard from "./QAItemCard";
import IconButton from "../../UI/IconButton";
import axios from "axios";
import { toast } from "react-toastify";

// get all comments => http://localhost:8080/comments/car/

export default function QASection({ carId, user }) {
    const [questions, setQuestions] = useState(DUMMY_QA);
    const [showModal, setShowModal] = useState(false);
    const [selectedQA, setSelectedQA] = useState(null);
    const [questionInput, setQuestionInput] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await axios.get(
                "http://localhost:8080/comments/car/" + carId
            );

            if (!res.data.success === true) {
                toast.error("Failed to fetch comments");
            }

            setQuestions(res.data.data);
        };
        ``;
        fetchQuestions();
    }, [carId]);

    const {
        scrollRef,
        scrollByCards,
        currentPage,
        maxPages,
        canScrollLeft,
        canScrollRight,
        updatePagination,
    } = useQACarousel(questions);

    const handleViewAnswer = (qa) => {
        setSelectedQA(qa);
        setShowModal(true);
    };

    const handleUpvote = (qaId) => {
        setQuestions((prev) =>
            prev.map((qa) =>
                qa.id === qaId ? { ...qa, upvotes: (qa.upvotes || 0) + 1 } : qa
            )
        );
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQA(null);
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        if (!questionInput.trim()) return;

        const payload = {
            carId,
            userId: user.id,
            commentText: questionInput.trim(),
        };

        try {
            const res = await axios.post(
                "http://localhost:8080/comments/create",
                payload,
                headers
            );

            if (!res.data.success === true) {
                toast.error(res.data.message);
            }

            toast.success(res.data.message);
            const resData = res.data.data[0];

            const newQuestion = {
                id: Date.now(),
                askerName: user.username || "You",
                askerImage: user.image_url || "/images/default-user.png",
                askerScore: user.score || 5,
                question: resData.commentText,
                answer: "_Pending response from seller..._",
                sellerName: "Seller",
                sellerImage: "/images/default-seller.png",
                upvotes: 0,
            };

            setQuestions([newQuestion, ...questions]);
            setQuestionInput("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit your question.");
        }
    };

    return (
        <div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                <h5 className="fw-bold mb-0">
                    Seller Q&A ({questions.length})
                </h5>
            </div>

            {/* Ask Form */}
            <Form onSubmit={handleSubmitQuestion} className="mb-4">
                <Form.Group controlId="questionInput">
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Ask the seller a question..."
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className="text-end mt-2">
                    <Button type="submit" variant="primary">
                        Submit Question
                    </Button>
                </div>
            </Form>

            {/* Carousel */}
            <div className="position-relative">
                <div
                    ref={scrollRef}
                    onScroll={updatePagination}
                    className="d-flex overflow-auto px-1"
                    style={{ scrollSnapType: "x mandatory", gap: "1rem" }}
                >
                    {questions.map((qa) => (
                        <QAItemCard
                            key={qa.id}
                            qa={qa}
                            onViewAnswer={handleViewAnswer}
                        />
                    ))}
                </div>

                {/* Scroll Buttons */}
                <IconButton
                    icon={<ChevronLeft size={20} />}
                    variant="dark"
                    onClick={() => scrollByCards(-2)}
                    style={{ left: "10px", opacity: canScrollLeft ? 0.5 : 0.2 }}
                    disabled={!canScrollLeft}
                />
                <IconButton
                    icon={<ChevronRight size={20} />}
                    variant="dark"
                    onClick={() => scrollByCards(2)}
                    style={{
                        right: "10px",
                        opacity: canScrollRight ? 0.5 : 0.2,
                    }}
                    disabled={!canScrollRight}
                />
            </div>

            {/* Pagination Dots */}
            <div className="d-flex justify-content-center mt-3 gap-2">
                {Array.from({ length: maxPages }, (_, i) => (
                    <span
                        key={i}
                        className={`rounded-circle ${
                            i === currentPage ? "bg-dark" : "bg-secondary"
                        }`}
                        style={{
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            opacity: i === currentPage ? 1 : 0.4,
                        }}
                    />
                ))}
            </div>

            {/* Modal */}
            <QAModal
                show={showModal}
                onClose={handleCloseModal}
                qa={selectedQA}
                onUpvote={handleUpvote}
            />
        </div>
    );
}