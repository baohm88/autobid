import React from "react";

export default function EquipmentSection({ equipments }) {
    return (
        <div className="mt-4">
            <h5 className="mb-3">Equipment</h5>
            <ul>
                {equipments.map((equipment, index) => (
                    <li key={index}>{equipment}</li>
                ))}
            </ul>
        </div>
    );
}
