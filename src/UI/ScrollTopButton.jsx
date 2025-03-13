import { useEffect, useState } from "react";

export default function ScrollTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="btn btn-danger shadow-lg d-flex justify-content-center align-items-center"
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 9999,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    fontSize: "24px",
                    transition: "opacity 0.3s ease-in-out",
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <i className="bi bi-arrow-up-short" />
            </button>
        )
    );
}
