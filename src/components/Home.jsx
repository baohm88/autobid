import { Link } from "react-router-dom";

export default function Home() {
    const cars = [
        {
            id: 1,
            name: "abc",
            price: 123,
            url: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/ee7f173e46ec801a48d1673c50f9cebaa1bf2854/photos/3oeDdQJw-EpehCPjostB/edit/uHjYm.jpg?t=173040929875",
        },
        {
            id: 2,
            name: "bcd",
            price: 234,
            url: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/da4b9237bacccdf19c0760cab7aec4a8359010b0/photos/3BvYjqNz-E17vlM6rcC2-T6f-ADne6D.jpg?t=173886804490",
        },
        {
            id: 3,
            name: "cde",
            price: 345,
            url: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/c51905b0000b639a185eeb080dd879bf007f5604/photos/rNBJVlQW-6gbsJg5xiK/edit/-pQjG.jpg?t=173814065931",
        },
        {
            id: 4,
            name: "def",
            price: 456,
            url: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/20309e251cb7341d1fb94cb5d4546882260d2202/photos/exterior/3pnBPlYd-mAR5olzie/edit/6tq-n.jpg?t=173868182034",
        },
    ];

    document.title = "AutoBid: Car Auctions";

    return (
        <div className="container">
            <h1>All products</h1>

            <div className="row">
                {cars.map((car) => (
                    <div key={car.id} className="col-md-3">
                        <div className="card my-3">
                            <Link to={`cars/${car.id}`}>
                                <img
                                    src={car.url}
                                    className="card-img-top"
                                    alt={car.name}
                                />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title">{car.name}</h5>
                                <p className="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
