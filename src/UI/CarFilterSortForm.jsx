// src/components/FilterSortForm.jsx
import { Form } from "react-bootstrap";
import { BODY_STYLES } from "../components/user/dummy_data";

const selectStyle = {
    width: "70px",
    backgroundColor: "transparent",
    boxShadow: "none",
};

export default function CarFilterSortForm({
    yearFrom,
    yearTo,
    setYearFrom,
    setYearTo,
    transmission,
    setTransmission,
    bodyStyle,
    setBodyStyle,
    sortBy,
    setSortBy,
    status,
    setStatus, // optional
    showStatus = false,
}) {
    return (
        <div className="d-flex justify-content-between my-3">
            {/* Filter group */}
            <Form className="d-flex">
                {/* Year Range */}
                <div className="select-wrapper d-flex align-items-center border border-secondary-subtle rounded px-2 py-1">
                    <span className="me-2 fw-semibold text-secondary">
                        Year:
                    </span>
                    <select
                        className="form-select border-0 p-0"
                        style={selectStyle}
                        aria-label="From Year"
                        value={yearFrom}
                        onChange={(e) => setYearFrom(e.target.value)}
                    >
                        {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                            (year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )
                        )}
                    </select>
                    <span className="text-muted">To</span>
                    <select
                        className="form-select border-0 p-0 ms-2"
                        style={selectStyle}
                        aria-label="To Year"
                        value={yearTo}
                        onChange={(e) => setYearTo(e.target.value)}
                    >
                        {Array.from({ length: 26 }, (_, i) => 2025 - i).map(
                            (year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Transmission */}
                <select
                    className="form-select mx-1"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                >
                    <option value="All">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>

                {/* Body Style */}
                <select
                    className="form-select mx-1"
                    value={bodyStyle}
                    onChange={(e) => setBodyStyle(e.target.value)}
                >
                    <option value="All">All Body Styles</option>
                    {BODY_STYLES.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>
            </Form>

            {/* Sort & Status Group */}
            <div className="d-flex">
                <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="end_soon">Ending Soon</option>
                    <option value="newly_listed">Newly listed</option>
                    <option value="lowest_mileage">Lowest Mileage</option>
                </select>

                {showStatus && (
                    <select
                        className="form-select ms-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="All">All Listings</option>
                        <option value="active">Active Listings</option>
                        <option value="ended">Past Listings</option>
                    </select>
                )}
            </div>
        </div>
    );
}
