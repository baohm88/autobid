import { useEffect, useState } from "react";
import { Badge, Button, Container, Image, Spinner } from "react-bootstrap";
import { useCarContext } from "../../context/CarContext";
import "./FeaturedCarousel.css";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountDown";
import IconButton from "../../UI/IconButton";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default function FeaturedCarousel() {
    const { cars } = useCarContext();
    const [featuredCars, setFeaturedCars] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    // Randomly pick 5 featured cars once
    useEffect(() => {
        const shuffled = [...cars].sort(() => 0.5 - Math.random());
        setFeaturedCars(shuffled.slice(0, 5));
    }, [cars]);

    // Autoplay every 3s
    useEffect(() => {
        if (featuredCars.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredCars.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [featuredCars]);

    const goPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? featuredCars.length - 1 : prev - 1
        );
    };

    const goNext = () => {
        if (featuredCars.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % featuredCars.length);
    };

    const currentCar = featuredCars[currentIndex];
    const { countdown } = useCountdown(currentCar?.end_time);

    if (!currentCar) return null;

    if (featuredCars.length === 0) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Loading featured cars...
                    </span>
                </Spinner>
            </Container>
        );
    }

    return (
        <div className="featured-carousel position-relative my-4">
            <div className="position-relative">
                <Image
                    src={currentCar.images[0]}
                    alt="Featured"
                    fluid
                    rounded
                    className="w-100 featured-main-img"
                    style={{ objectFit: "cover", height: "480px" }}
                    onClick={() => navigate(`/listings/${currentCar.id}`)}
                />

                {/* Featured Badge */}
                <Badge
                    bg="warning"
                    className="position-absolute top-0 start-0 m-3"
                >
                    FEATURED
                </Badge>

                {/* Car Info */}
                <div className="position-absolute top-0 end-0 m-3 text-end text-light bg-dark bg-opacity-50 p-3 rounded">
                    <h4 className="mb-1">
                        {currentCar.year_model} {currentCar.make}{" "}
                        {currentCar.model}
                    </h4>
                    <p className=" mb-0">
                        ~{currentCar.mileage} miles, {currentCar.transmission},{" "}
                        {currentCar.engine} engine, {currentCar.exterior_color}{" "}
                        exterior
                    </p>
                </div>

                {/* Countdown + Bid */}
                <div className="position-absolute bottom-0 start-0 m-3">
                    <Badge bg="dark" className="me-2">
                        ⏳ {countdown}
                    </Badge>
                    <Badge bg="danger">
                        💰 ${currentCar.current_bid || currentCar.starting_bid}
                    </Badge>
                </div>

                {/* Navigation Buttons */}

                <IconButton
                    icon={<ChevronLeft size={20} />}
                    onClick={goPrev}
                    style={{ left: "10px" }}
                />

                <IconButton
                    icon={<ChevronRight size={20} />}
                    onClick={goNext}
                    style={{ right: "10px" }}
                />
            </div>

            {/* Indicator Dots */}
            <div className="text-center mt-3">
                {featuredCars.map((_, i) => (
                    <span
                        key={i}
                        className={`carousel-dot ${
                            i === currentIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(i)}
                    />
                ))}
            </div>
            <hr />
        </div>
    );
}
