export default function CarForm() {


    
    return (
        <div className="container">
            <h1 className="text-center">Add a new car</h1>

            <div className="card">
                <form className="row g-3 bg-body-tertiary p-3">
                    <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">
                            Year
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Choose</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputPassword4" className="form-label">
                            Make
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputPassword4" className="form-label">
                            Model
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Transmission
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Select transmission type</option>
                            <option value="automatic">Automatic</option>
                            <option value="manual">Manual</option>
                        </select>
                    </div>
                    <div className="col-md-6">
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

                    <div className="mb-3 mt-3">
                        <label htmlFor="equipment" className="form-label">
                            Special options/equipment
                        </label>
                        <textarea
                            className="form-control"
                            placeholder='Separate each item with ",". For example: sport package, long-range battery, FSD or other important factory-installed features'
                            rows="5"
                            id="equipment"
                            name="text"
                        ></textarea>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="inputEmail4" className="form-label">
                            Has the car been modified?
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Choose</option>
                            <option value="new">Brand New</option>
                            <option value="modified">Modified</option>
                        </select>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="modification" className="form-label">
                            List any modifications.
                        </label>
                        <textarea
                            className="form-control"
                            placeholder='Separate each item with ",".'
                            rows="5"
                            id="modification"
                            name="text"
                        ></textarea>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="inputEmail4" className="form-label">
                            Are there any significant mechanical or cosmetic
                            flaws that we should know about?
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Choose</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="flaws" className="form-label">
                            Please give details.
                        </label>
                        <textarea
                            className="form-control"
                            placeholder='Separate each item with ",".'
                            rows="5"
                            id="flaws"
                            name="text"
                        ></textarea>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
