
import { Button, Col, Image, Row } from 'react-bootstrap'


export default function CarImagesSection({car, openModal, visibleThumbnails, hiddenCount}) {    
  return (
    <Row>
                {/* Main Image */}
                <Col lg={8} className="mb-3">
                    {car?.images?.length > 0 && (
                        <Image
                            src={car.images[0]}
                            alt="Main Car"
                            fluid
                            rounded
                            style={{ cursor: "pointer" }}
                            onClick={() => openModal(0)} // Open modal with the first image
                        />
                    )}
                </Col>

                {/* Thumbnails & All Photos Button */}
                <Col lg={4}>
                    <Row className="g-2">
                        {visibleThumbnails.map((thumb, index) => (
                            <Col
                                key={index}
                                xs={6}
                                className="position-relative"
                            >
                                <Image
                                    src={thumb}
                                    alt={`Thumb ${index + 1}`}
                                    fluid
                                    rounded
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openModal(index)}
                                />
                                {index === 7 && hiddenCount > 0 && (
                                    <Button
                                        variant="dark"
                                        className="w-100 position-absolute top-0 start-0 h-100"
                                        style={{
                                            opacity: 0.8, // Adjust opacity for better visibility
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.2rem",
                                            color: "white",
                                        }}
                                        onClick={() => openModal(8)}
                                    >
                                        +{hiddenCount} Photos
                                    </Button>
                                )}
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
  )
}
