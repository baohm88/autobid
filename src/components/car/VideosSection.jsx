import React from "react";

export default function VideosSection() {
    return (
        <div>
            <h5 className="mb-3">Video</h5>
            <div className="ratio ratio-16x9">
                <iframe
                    src="https://www.youtube.com/embed/Kxj667ER6ps?si=5SWlFca_15piauou"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
