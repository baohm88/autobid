import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

const BODY_STYLES = [
    "Coupe",
    "Convertible",
    "Hatchback",
    "Sedan",
    "SUV/Crossover",
    "Truck",
    "Van/Minivan",
    "Wagon",
];

export default function CarForm() {
    const [modified, setModified] = useState("");
    const [hasFlaw, setHasFlow] = useState("");
    const [imageLinks, setImageLinks] = useState(Array(10).fill(""));
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    document.title = "Add new car";

    async function carFormAction(fd) {
        const carData = Object.fromEntries(fd.entries());

        carData.user = user.id;
        carData.description =
            "~" +
            carData.mileage +
            ", " +
            carData.engine +
            ", " +
            carData.exterior;

        carData.images = imageLinks.filter((link) => link.trim() !== "");

        console.log(carData);

        try {
            const res = await axios.post(
                `http://localhost:8080/listings/add-listing`,
                carData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res);

            if (res.status === 200) {
                alert(res.data.message);
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to add a listing!", error);
        }
    }

    const handleImageLinkChange = (index, value) => {
        const newImageLinks = [...imageLinks];
        newImageLinks[index] = value;
        setImageLinks(newImageLinks);
    };

    return (
        <div className="container">
            <h1 className="text-center">Add a new car</h1>

            <div className="card">
                <form
                    className="row g-3 bg-body-tertiary py-3"
                    action={carFormAction}
                >
                    {/* 1st row */}
                    <div className="row mb-3 mx-auto">
                        <div className="col-md-4">
                            <label htmlFor="year" className="form-label">
                                Year
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="year"
                                name="year"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Choose
                                </option>
                                {Array.from(
                                    { length: 2025 - 1960 },
                                    (_, index) => {
                                        const year = 2025 - index;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="make" className="form-label">
                                Make
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="make"
                                name="make"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="model" className="form-label">
                                Model
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="model"
                                name="model"
                                defaultValue=""
                            />
                        </div>
                    </div>

                    {/* 2nd row */}
                    <div className="row mb-3 mx-auto">
                        <div className="col-md-4">
                            <label
                                htmlFor="transmission"
                                className="form-label"
                            >
                                Transmission
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="transmission"
                                name="transmission"
                            >
                                <option selected>Select transmission</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="mileage" className="form-label">
                                Mileage (in miles)
                            </label>
                            <input
                                className="form-control"
                                type="number"
                                id="mileage"
                                name="mileage"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="engine" className="form-label">
                                Engine
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="engine"
                                name="engine"
                            />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="row mb-3 mx-auto">
                        <div className="col-md-4">
                            <label htmlFor="bodyStyle" className="form-label">
                                Body Style
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="bodyStyle"
                                name="bodyStyle"
                            >
                                <option selected>Select Body Style</option>
                                {BODY_STYLES.map((style) => (
                                    <option key={style} value={style}>
                                        {style}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="interior" className="form-label">
                                Interior Color
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="interior"
                                name="interior"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="exterior" className="form-label">
                                Exterior Color
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="exterior"
                                name="exterior"
                            />
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className="row mb-3 mx-auto">
                        <div className="col-md-4">
                            <label
                                htmlFor="starting_bid"
                                className="form-label"
                            >
                                Starting Bid ($)
                            </label>
                            <input
                                className="form-control"
                                type="number"
                                id="starting_bid"
                                name="starting_bid"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="start_time" className="form-label">
                                Start Time
                            </label>
                            <input
                                className="form-control"
                                type="datetime-local" // Change type to datetime-local
                                id="start_time"
                                name="start_time"
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="end_time" className="form-label">
                                End Time
                            </label>
                            <input
                                className="form-control"
                                type="datetime-local" // Change type to datetime-local
                                id="end_time"
                                name="end_time"
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 mx-auto">
                        <div>
                            <label htmlFor="equipment" className="form-label">
                                Special options/equipment
                            </label>
                            <textarea
                                className="form-control"
                                placeholder='Separate each item with ",". For example: sport package, long-range battery, FSD or other important factory-installed features'
                                rows="3"
                                id="equipment"
                                name="equipment"
                            ></textarea>
                        </div>
                    </div>

                    <div className="row mb-3 mx-auto">
                        <div>
                            <label htmlFor="modified" className="form-label">
                                Has the car been modified?
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="modified"
                                name="modified"
                                onChange={(e) => setModified(e.target.value)}
                            >
                                <option selected>Choose</option>
                                <option value="new">Brand New</option>
                                <option value="modified">Modified</option>
                            </select>
                        </div>
                    </div>

                    {modified === "modified" && (
                        <div className="mb-3">
                            <label
                                htmlFor="modification"
                                className="form-label"
                            >
                                List any modifications.
                            </label>
                            <textarea
                                className="form-control"
                                placeholder='Separate each item with ",".'
                                rows="3"
                                id="modification"
                                name="modification"
                            ></textarea>
                        </div>
                    )}

                    <div className="row mb-3 mx-auto">
                        <div>
                            <label htmlFor="flaw" className="form-label">
                                Are there any significant mechanical or cosmetic
                                flaws that we should know about?
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="flaw"
                                name="flaw"
                                onChange={(e) => setHasFlow(e.target.value)}
                            >
                                <option selected>Choose</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    {hasFlaw === "yes" && (
                        <div className="row mb-3 mx-auto">
                            <div>
                                <label htmlFor="flaws" className="form-label">
                                    Please give details.
                                </label>
                                <textarea
                                    className="form-control"
                                    placeholder='Separate each item with ",".'
                                    rows="3"
                                    id="flaws"
                                    name="flaws"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {/* images */}

                    <div className="row mb-3 mx-auto">
                        <div>
                            <label htmlFor="carImages" className="form-label">
                                Car Images (Insert up to 10 image URLs)
                            </label>
                            {imageLinks.map((link, index) => (
                                <input
                                    key={index}
                                    type="url"
                                    className="form-control mb-2"
                                    placeholder={`Image URL ${index + 1}`}
                                    value={link}
                                    onChange={(e) =>
                                        handleImageLinkChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="row mb-3 mx-auto">
                        <div className="col-12">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
