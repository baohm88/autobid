import React from "react";

export default function ModificationsSection({ modifications }) {
    return (
        <div>
            <h5 className="mb-3">Modifications</h5>
            <ul>
                {modifications.map((modification, index) => (
                    <li key={index}>{modification}</li>
                ))}
            </ul>
        </div>
    );
}
