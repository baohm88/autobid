import { Alert } from "react-bootstrap";

export const AlertBox = ({ variant = "danger", message, onClose }) =>
    message ? (
        <Alert variant={variant} onClose={onClose} dismissible>
            {message}
        </Alert>
    ) : null;
