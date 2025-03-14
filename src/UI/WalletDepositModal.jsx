import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Props: show (boolean), onClose (function), onDeposit (async function)
const WalletDepositModal = ({ show, onClose, onDeposit }) => {
    const formik = useFormik({
        initialValues: {
            amount: "",
        },
        validationSchema: Yup.object({
            amount: Yup.number()
                .required("Amount is required")
                .min(1000, "Minimum deposit is 1,000 USD"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await onDeposit(Number(values.amount));
                resetForm();
                onClose();
            } catch (error) {
                console.log(error);
                toast.error("Deposit failed. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Modal show={show} onHide={onClose} centered>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit to Wallet</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Amount (USD)</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>USD</InputGroup.Text>
                            <Form.Control
                                type="number"
                                name="amount"
                                autoFocus
                                placeholder="Enter amount (min 1,000 USD)"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.touched.amount &&
                                    formik.errors.amount
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.amount}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={onClose}
                        disabled={formik.isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" />{" "}
                                Depositing...
                            </>
                        ) : (
                            "Deposit"
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default WalletDepositModal;
