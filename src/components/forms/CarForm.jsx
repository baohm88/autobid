import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    Row,
    Col,
    Form as BootstrapForm,
    Container,
} from "react-bootstrap";
import ImageUpload from "../../UI/ImageUpload";
import { BODY_STYLES } from "../user/dummy_data";

const CarForm = ({ initialValues, onSubmit, isEditing }) => {
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        brand: Yup.string().required("Brand is required"),
        year: Yup.number()
            .min(1900, "Year must be after 1900")
            .max(new Date().getFullYear(), "Year can't be in the future")
            .required("Year is required"),
        mileage: Yup.number()
            .min(0, "Mileage must be positive")
            .required("Mileage is required"),
        transmission: Yup.string().required("Transmission is required"),
        bodyStyle: Yup.string().required("Body style is required"),
        startingPrice: Yup.number()
            .min(0, "Starting price must be positive")
            .required("Starting price is required"),
        description: Yup.string().required("Description is required"),
        images: Yup.array().min(1, "At least one image is required"),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ setFieldValue, values, isSubmitting }) => (
                <Container>
                    <Form>
                        {/* Year, Make, Model */}
                        <Row>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>
                                        Year
                                    </BootstrapForm.Label>
                                    <Field
                                        name="year_model"
                                        type="number"
                                        className="form-control"
                                    />
                                    <div className="text-danger">
                                        <ErrorMessage name="year_model" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>
                                        {" "}
                                        Make{" "}
                                    </BootstrapForm.Label>
                                    <Field
                                        name="make"
                                        className="form-control"
                                    />
                                    <div className="text-danger">
                                        {" "}
                                        <ErrorMessage name="make" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Model</BootstrapForm.Label>
                                    <Field name="model" className="form-control"/>
                                    <div className="text-danger"><ErrorMessage name="model" /></div> 
                                    </BootstrapForm.Group>
                            </Col>
                        </Row>

                        {/* Transmission, Mileage, Engine */}
                        <Row>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>
                                        Transmission
                                    </BootstrapForm.Label>
                                    <Field
                                        name="transmission"
                                        as="select"
                                        className="form-control"
                                    >
                                        <option value="">Select</option>
                                        <option value="automatic">
                                            {" "}
                                            Automatic{" "}
                                        </option>
                                        <option value="manual">Manual</option>
                                    </Field>
                                    <div className="text-danger">
                                        {" "}
                                        <ErrorMessage name="transmission" />{" "}
                                    </div>
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>
                                        {" "}
                                        Mileage{" "}
                                    </BootstrapForm.Label>
                                    <Field
                                        name="mileage"
                                        type="number"
                                        className="form-control"
                                    />
                                    <div className="text-danger">
                                        <ErrorMessage name="mileage" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>
                                        {" "}
                                        Engine{" "}
                                    </BootstrapForm.Label>
                                    <Field
                                        name="engine"
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="text-danger">
                                        <ErrorMessage name="engine" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        {/* Body Style, Interior Color, Exterior Color */}
                        <Row>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label> Body Style </BootstrapForm.Label>
                                    <Field name="body_style" as="select" className="form-control">
                                        {BODY_STYLES.map(({ key, value }) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </Field>
                                    <div className="text-danger">
                                        <ErrorMessage name="body_style" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>
                            
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Interior Color</BootstrapForm.Label>
                                    <Field name="interial_color" className="form-control"/>
                                    <div className="text-danger"><ErrorMessage name="interial_color" /></div> 
                                    </BootstrapForm.Group>
                            </Col>

                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Exterior Color</BootstrapForm.Label>
                                    <Field name="exterior_color" className="form-control"/>
                                    <div className="text-danger"><ErrorMessage name="exterior_color" /></div> 
                                    </BootstrapForm.Group>
                            </Col>    
                        </Row>

                        <Row>
                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label> Starting Price (USD) </BootstrapForm.Label>
                                    <Field name="startingPrice" type="number" className="form-control" />
                                    <div className="text-danger">
                                        <ErrorMessage name="startingPrice" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label> Start Time </BootstrapForm.Label>
                                    <Field name="start_time" type="datetime-local" className="form-control"  min={new Date().toISOString().slice(0, 16)} />
                                    <div className="text-danger">
                                        <ErrorMessage name="start_time" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={4}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label> End Time </BootstrapForm.Label>
                                    <Field name="end_time" type="datetime-local" className="form-control"  min={new Date().toISOString().slice(0, 16)} />
                                    <div className="text-danger">
                                        <ErrorMessage name="end_time" />
                                    </div>
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>Special options/equipment - Separate each item with ;</BootstrapForm.Label>
                            <Field name="description" as="textarea" className="form-control"/>
                            <div className="text-danger">
                                <ErrorMessage name="description" />
                            </div>
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>
                                Upload Images
                            </BootstrapForm.Label>
                            <ImageUpload
                                images={values.images}
                                setImages={(files) =>
                                    setFieldValue("images", files)
                                }
                            />
                            <div className="text-danger">
                                <ErrorMessage name="images" />
                            </div>
                        </BootstrapForm.Group>

                        <Button type="submit" disabled={isSubmitting}>
                            {isEditing ? "Update Car" : "Add Car"}
                        </Button>
                    </Form>
                </Container>
            )}
        </Formik>
    );
};

export default CarForm;
