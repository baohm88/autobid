import { Modal, Image } from "react-bootstrap";
import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons";
import IconButton from "./IconButton";

export default function ImageViewerModal({
    show,
    imageSrc,
    onClose,
    onPrev,
    onNext,
}) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
            fullscreen
            contentClassName="bg-dark"
        >
            <Modal.Body className="p-0 d-flex align-items-center justify-content-center position-relative">
                <IconButton
                    icon={<X size={20} />}
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                        zIndex: 1000,
                    }}
                />
                <IconButton
                    icon={<ChevronLeft size={20} />}
                    onClick={onPrev}
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1000,
                    }}
                />
                <Image
                    src={imageSrc}
                    alt="Fullscreen Image"
                    fluid
                    style={{ maxHeight: "90vh", objectFit: "contain" }}
                />
                <IconButton
                    icon={<ChevronRight size={20} />}
                    onClick={onNext}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1000,
                    }}
                />
            </Modal.Body>
        </Modal>
    );
}
