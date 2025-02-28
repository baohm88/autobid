// export default function UserProfile() {
//     return (
//         <div className="container mt-3">
//             <div className="card mb-3">
//                 <div className="row g-0">
//                     <div className="col-md-2 p-3 d-flex justify-content-center align-items-center">
//                         <img
//                             src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
//                             className="img-fluid rounded-circle"
//                             alt="Profile Image"
//                             style={{
//                                 width: "100px",
//                                 height: "100px",
//                                 objectFit: "cover",
//                             }}
//                         />

//                         <button
//                             type="button"
//                             className="btn btn-primary"
//                             data-bs-toggle="modal"
//                             data-bs-target="#exampleModal"
//                             data-bs-whatever="@mdo"
//                         >
//                             Edit Profile
//                         </button>

//                         <div
//                             className="modal fade"
//                             id="exampleModal"
//                             tabIndex="-1"
//                             aria-labelledby="exampleModalLabel"
//                             aria-hidden="true"
//                         >
//                             <div className="modal-dialog modal-dialog-centered">
//                                 <div className="modal-content">
//                                     <div className="modal-header">
//                                         <h1
//                                             className="modal-title fs-5"
//                                             id="exampleModalLabel"
//                                         >
//                                             Edit Profile
//                                         </h1>
//                                         <button
//                                             type="button"
//                                             className="btn-close"
//                                             data-bs-dismiss="modal"
//                                             aria-label="Close"
//                                         ></button>
//                                     </div>
//                                     <div className="modal-body">
//                                         <form>
//                                             <div className="mb-3">
//                                                 <label
//                                                     htmlFor="fullname"
//                                                     className="col-form-label"
//                                                 >
//                                                     Full Name:
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="fullname"
//                                                 />
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label
//                                                     htmlFor="bio"
//                                                     className="col-form-label"
//                                                 >
//                                                     Bio:
//                                                 </label>
//                                                 <textarea
//                                                     className="form-control"
//                                                     id="bio"
//                                                 ></textarea>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button
//                                             type="button"
//                                             className="btn btn-secondary"
//                                             data-bs-dismiss="modal"
//                                         >
//                                             Close
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-primary"
//                                         >
//                                             Save
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-md-10">
//                         <div className="card-body">
//                             <h5 className="card-title">John Doe</h5>
//                             <p className="card-text">
//                                 This is a wider card with supporting text below
//                                 as a natural lead-in to additional content. This
//                                 content is a little bit longer.
//                             </p>
//                             <p className="card-text">
//                                 <small className="text-body-secondary">
//                                     Joined January 2025
//                                 </small>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function UserProfile() {
    return (
        <div className="container mt-3">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3 col-lg-2 p-3 d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                                src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                                className="img-fluid rounded-circle"
                                alt="Profile Image"
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9 col-lg-10">
                        <div className="card-body">
                            <h5 className="card-title">John Doe</h5>
                            <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                            </p>
                            <p className="card-text">
                                <small className="text-body-secondary">
                                    Joined January 2025
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit Profile
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="d-flex flex-column align-items-center gap-3">
                                    <img
                                        src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                                        className="img-fluid rounded-circle"
                                        alt="Profile Image"
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                    >
                                        Choose a different picture
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="fullname"
                                        className="col-form-label"
                                    >
                                        Full Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="bio"
                                        className="col-form-label"
                                    >
                                        Bio:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="bio"
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
