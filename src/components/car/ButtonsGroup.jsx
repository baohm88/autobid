import { Row, Col, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { BiTime, BiUpArrowAlt, BiHash, BiChat } from "react-icons/bi";
import { formatter } from "../../utils/formatter";
import { useCountdown } from "../../hooks/useCountDown";

export default function ButtonsGroup({ car }) {
    const iconStyle = {
        marginRight: "6px",
        verticalAlign: "middle",
    };

    const { countdown } = useCountdown(car?.end_time);
    const bidsCount = car.bids_count || 11;

    const iconSizeClass = "fs-5 fs-md-4 fs-lg-3"; // Scales with screen size
    const textSizeClass = "fw-bold fs-6 fs-md-5";

    const renderTooltip = (text) => (
        <Tooltip>
            <span>{text}</span>
        </Tooltip>
    );

    return (
        <div className="bg-danger rounded-3 py-2 px-2 my-3 ">
            <div className="d-flex flex-wrap justify-content-between align-items-center text-light gap-3">
                {/* Time Left */}
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Time Left")}
                    >
                        <span className={`text-body ${iconSizeClass}`}>
                            <BiTime style={iconStyle} />
                        </span>
                    </OverlayTrigger>
                    <span className={`${textSizeClass}`}>{countdown}</span>
                </div>

                {/* Current Bid */}
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Current Bid")}
                    >
                        <span className={`text-body ${iconSizeClass}`}>
                            <BiUpArrowAlt style={iconStyle} />
                        </span>
                    </OverlayTrigger>
                    <span className={`${textSizeClass}`}>
                        {formatter.format(car.current_bid || car.starting_bid)}
                    </span>
                </div>

                {/* Bids */}
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Bids")}
                    >
                        <span className={`text-body ${iconSizeClass}`}>
                            <BiHash style={iconStyle} />
                        </span>
                    </OverlayTrigger>
                    <span className={`${textSizeClass} me-2`}>{bidsCount}</span>
                    {bidsCount > 10 && (
                        <Badge bg="warning" text="dark" className="ms-1">
                            🔥 HOT
                        </Badge>
                    )}
                </div>

                {/* Comments */}
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Comments")}
                    >
                        <span className={`text-body ${iconSizeClass}`}>
                            <BiChat style={iconStyle} />
                        </span>
                    </OverlayTrigger>
                    <span className={`${textSizeClass}`}>
                        {car.comments_count || 41}
                    </span>
                </div>
            </div>
        </div>
    );
}
