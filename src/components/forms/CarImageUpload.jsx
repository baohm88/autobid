import React from 'react';
import { Form } from 'react-bootstrap';

const CarImageUpload = ({ values }) => {
  return (
    <Form.Group controlId="images" className="mt-3">
      <Form.Label>Upload Car Images</Form.Label>
      <Form.Control type="file" multiple />
      {/* Preview uploaded images if editing */}
    </Form.Group>
  );
};

export default CarImageUpload;
