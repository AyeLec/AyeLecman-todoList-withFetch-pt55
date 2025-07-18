import React from "react";

const Jumbotron = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="bg-body-tertiary w-100">
                <div className="container-fluid py-4 text-center">
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                        <h1 className="display-5 fw-light jumbotron">todos</h1>
                        <i className="bi bi-check2-circle"></i>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Jumbotron;