import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

export default function AvatarUploader({ avatarPreview, onChange }) {
    const fileRef = useRef();

    return (
        <div className="d-flex flex-column align-items-center gap-3 mb-3">
            <img
                src={avatarPreview}
                className="img-fluid rounded-circle"
                alt="avatar"
                style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                }}
            />
            <Form.Control
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={onChange}
            />
            <Button
                variant="warning"
                size="sm"
                onClick={() => fileRef.current.click()}
            >
                <i className="bi bi-person-bounding-box"></i> Choose a different
                picture
            </Button>
        </div>
    );
}
