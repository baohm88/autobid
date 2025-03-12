import { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { formatter } from "../utils/formatter";
dayjs.extend(duration);

function getBadge(car) {
    const now = dayjs();
    const endTime = dayjs(car.end_time);
    const createdAt = dayjs(car.created_at);

    if (endTime.diff(now, "hour") <= 24) return "🔥 Ending Soon";
    if (now.diff(createdAt, "day") < 3) return "🚗 New";
    return null;
}

const maxLength = 50;

export default function CarItem({ car }) {
    const [showFullText, setShowFullText] = useState(false);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const updateCountdown = () => {
            const now = dayjs();
            const end = dayjs(car.end_time);
            const diff = end.diff(now);

            if (diff <= 0) {
                setCountdown("Auction ended");
                return;
            }

            const duration = dayjs.duration(diff);
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            if (diff < 60 * 60 * 1000) {
                // less than 1 hour
                setCountdown(`${minutes}m ${seconds}s left`);
            } else {
                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [car.end_time]);

    const truncateText = (text) => {
        return text.length <= maxLength
            ? text
            : text.slice(0, maxLength) + "...";
    };

    const text = `~${car.mileage} Miles, ${car.transmission} ${car.engine} engine, ${car.exterior_color} exterior`;
    const displayText = showFullText ? text : truncateText(text);

    const badgeText = getBadge(car);

    function getCountdown(endTime) {
        const now = dayjs();
        const end = dayjs(endTime);
        const diff = end.diff(now);

        if (diff <= 0) return "Auction ended";

        const duration = dayjs.duration(diff);
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        return `${days}d ${hours}h ${minutes}m left`;
    }

    return (
        <Card className="h-100">
            <div className="position-relative">
                {badgeText && (
                    <Badge
                        bg="danger"
                        className="position-absolute top-0 start-0 m-2"
                        style={{ zIndex: 10 }}
                    >
                        {badgeText}
                    </Badge>
                )}

                <NavLink to={`listings/${car.id}`}>
                    <Card.Img
                        variant="top"
                        src={car.images[0]}
                        alt={car.name || car.description}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                </NavLink>
            </div>

            {/* <Card.Body>
                <Card.Title>
                    {car.year_model} {car.make} {car.model}
                </Card.Title>
                <Card.Text title={text}>
                    {displayText}
                    {text.length > maxLength && (
                        <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => setShowFullText(!showFullText)}
                        >
                            {showFullText ? " Show less" : " Show more"}
                        </span>
                    )}
                </Card.Text>

                <Card.Text className="text-muted">
                    <strong>⏳ {getCountdown(car.end_time)}</strong>
                </Card.Text>
                <Card.Text>
                    <strong>
                        Starting Bid: ${car.starting_bid.toLocaleString()}
                    </strong>
                </Card.Text>
                <NavLink to={`listings/${car.id}`}>
                    <button className="btn btn-primary w-100">Place Bid</button>
                </NavLink>
            </Card.Body> */}
            <Card.Body>
                <Card.Title>
                    {car.year_model} {car.make} {car.model}
                </Card.Title>

                <Card.Text title={text}>
                    {displayText}
                    {text.length > maxLength && (
                        <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => setShowFullText(!showFullText)}
                        >
                            {showFullText ? " Show less" : " Show more"}
                        </span>
                    )}
                </Card.Text>

                <Card.Text className="text-muted">
                    <strong>⏳ {countdown}</strong>
                </Card.Text>

                <Card.Text>
                    <strong>
                        Starting Bid: {formatter.format(car.starting_bid)}
                    </strong>
                    <br />
                    <strong>
                        Current Bid:{" "}
                        {formatter.format(car.starting_bid || car.current_bid)}
                    </strong>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <NavLink to={`listings/${car.id}`}>
                    {" "}
                    <button className="btn btn-danger w-100">Place Bid</button>
                </NavLink>
            </Card.Footer>
        </Card>
    );
}
