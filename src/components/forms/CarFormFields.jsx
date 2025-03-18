import { Form } from "react-bootstrap";

const CarFormFields = ({ values, isEdit }) => {
    return (
        <>
            <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" defaultValue={values.year} required />
            </Form.Group>
            
            <Form.Group controlId="make">
                <Form.Label>Make</Form.Label>
                <Form.Control type="text" defaultValue={values.make} required />
            </Form.Group>

            <Form.Group controlId="model">
                <Form.Label>Model</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={values.model}
                    required
                />
            </Form.Group>

            {/* Add other fields like year, mileage, price, etc. */}
        </>
    );
};

export default CarFormFields;
