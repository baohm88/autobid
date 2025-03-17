import { Button, Col, Image, Row } from "react-bootstrap";

export default function CarImagesSection({
    car,
    openModal,
    visibleThumbnails,
    hiddenCount,
}) {
    return (
        <>
            <Row className="car-image-section gx-4 gy-3 mb-3">
                {/* Main image */}

                <Col lg={8} className="main-image-wrapper">
                    {car?.images?.length > 0 && (
                        <div
                            className="main-image-container position-relative"
                            onClick={() => openModal(0)}
                        >
                            <Image
                                src={car.images[0]}
                                alt="Main Car"
                                className="main-image"
                                fluid
                                rounded
                            />
                        </div>
                    )}

                    {/* Thumbnails for small & medium screens */}
                    <div className="d-lg-none mt-3">
                        <div className="mobile-thumbnail-scroll">
                            {visibleThumbnails
                                .slice(0, 8)
                                .map((thumb, index) => (
                                    <div
                                        key={index}
                                        className="mobile-thumbnail-container"
                                        onClick={() => openModal(index)}
                                    >
                                        <Image
                                            src={thumb}
                                            alt={`Thumb ${index + 1}`}
                                            className="mobile-thumbnail-image"
                                            fluid
                                            rounded
                                        />
                                        {index === 7 && hiddenCount > 0 && (
                                            <Button
                                                variant="dark"
                                                className="overlay-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(8);
                                                }}
                                            >
                                                +{hiddenCount} Photos
                                            </Button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </Col>

                {/* Thumbnails for large screens */}
                <Col
                    lg={4}
                    className="d-none d-lg-flex flex-column justify-content-between thumbnail-column"
                >
                    <Row className="g-2">
                        {visibleThumbnails.slice(0, 8).map((thumb, index) => (
                            <Col xs={6} key={index}>
                                <div
                                    className="thumbnail-container"
                                    onClick={() => openModal(index)}
                                >
                                    <Image
                                        src={thumb}
                                        alt={`Thumb ${index + 1}`}
                                        className="thumbnail-image"
                                        fluid
                                        rounded
                                    />
                                    {index === 7 && hiddenCount > 0 && (
                                        <Button
                                            variant="dark"
                                            className="overlay-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(8);
                                            }}
                                        >
                                            +{hiddenCount} Photos
                                        </Button>
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <hr />
        </>
    );
}
