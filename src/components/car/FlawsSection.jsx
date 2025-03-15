export default function FlawsSection({ flaws }) {
    return (
        <div>
            <h5 className="mb-3">Known Flaws</h5>
            <ul>
                {flaws.map((equipment, index) => (
                    <li key={index}>{equipment}</li>
                ))}
            </ul>
        </div>
    );
}
