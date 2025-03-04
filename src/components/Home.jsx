import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        axios
            .get("http://localhost:8080/listings")
            .then((res) => {
                const data = res.data.data[0];
                setListings(data);
                console.log(data);
            })
            .catch((err) => {
                console.error("Failed to fetch listings:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    document.title = "AutoBid: Car Auctions";

    const getImage = (car) => {
        if (car.url) {
            return car.url;
        }
        return (
            car.images?.[0] ||
            "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/d9b636c2ec84ddc3bc7f2eb32861b39bdd5f9683/photos/exterior/36NEAdwO-VkkkrG8/edit/ShNjA.jpg?t=174034598685"
        );
    };

    const filteredCars = listings.filter((car) =>
        `${car.year_model ?? ""} ${car.make} ${car.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading cars...</div>;
    }

    return (
        <div className="container">
            <h1>All Listings</h1>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Search for cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="row">
                {currentCars.map((car) => (
                    <div key={car.id} className="col-md-3">
                        <div className="card my-3">
                            <NavLink to={`listings/${car.id}`}>
                                <img
                                    src={getImage(car)}
                                    className="card-img-top"
                                    alt={car.name || car.description}
                                />
                            </NavLink>

                            <div className="card-body">
                                <h5 className="card-title">
                                    {car.year_model ?? ""} {car.make}{" "}
                                    {car.model}
                                </h5>
                                <p className="card-text">{car.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from(
                        {
                            length: Math.ceil(
                                filteredCars.length / itemsPerPage
                            ),
                        },
                        (_, index) => (
                            <li key={index} className="page-item">
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`page-link ${
                                        currentPage === index + 1
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}
