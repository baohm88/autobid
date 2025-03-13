import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { DUMMY_QA } from "../user/dummy_data";
import QAModal from "../../UI/QAModal";
import useQACarousel from "../../hooks/useQACarousel";
import QAItemCard from "./QAItemCard";

export default function QASection() {
    const [qas, setQAs] = useState(DUMMY_QA);
    const [showModal, setShowModal] = useState(false);
    const [selectedQA, setSelectedQA] = useState(null);
    const [questionInput, setQuestionInput] = useState("");

    const {
        scrollRef,
        scrollByCards,
        currentPage,
        maxPages,
        canScrollLeft,
        canScrollRight,
        updatePagination,
    } = useQACarousel(qas);

    const handleViewAnswer = (qa) => {
        setSelectedQA(qa);
        setShowModal(true);
    };

    const handleUpvote = (qaId) => {
        setQAs((prev) =>
            prev.map((qa) =>
                qa.id === qaId ? { ...qa, upvotes: (qa.upvotes || 0) + 1 } : qa
            )
        );
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQA(null);
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        if (!questionInput.trim()) return;

        const newQuestion = {
            id: Date.now(),
            askerName: "You",
            askerImage: "/images/default-user.png",
            askerScore: 5,
            question: questionInput,
            answer: "_Pending response from seller..._",
            sellerName: "Seller",
            sellerImage: "/images/default-seller.png",
            upvotes: 0,
        };

        setQAs([newQuestion, ...qas]);
        setQuestionInput("");
    };

    return (
        <div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                <h5 className="fw-bold mb-0">Seller Q&A ({qas.length})</h5>
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
                    {qas.map((qa) => (
                        <QAItemCard
                            key={qa.id}
                            qa={qa}
                            onViewAnswer={handleViewAnswer}
                        />
                    ))}
                </div>

                {/* Scroll Buttons */}
                <Button
                    variant="dark"
                    disabled={!canScrollLeft}
                    className="position-absolute top-50 start-0 translate-middle-y"
                    style={{
                        zIndex: 1,
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        opacity: canScrollLeft ? 0.8 : 0.3,
                    }}
                    onClick={() => scrollByCards(-2)}
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="dark"
                    disabled={!canScrollRight}
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{
                        zIndex: 1,
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        opacity: canScrollRight ? 0.8 : 0.3,
                    }}
                    onClick={() => scrollByCards(2)}
                >
                    <ChevronRight />
                </Button>
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
