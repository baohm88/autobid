// import { Button } from "react-bootstrap";

// const IconButton = ({ icon, onClick, variant = "light", ...props }) => (
//     <Button
//         variant={variant}
//         onClick={onClick}
//         style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             ...props.style,
//         }}
//         {...props}
//     >
//         {icon}
//     </Button>
// );

// export default IconButton;

import { Button } from "react-bootstrap";

const IconButton = ({
    icon,
    onClick,
    variant = "light",
    style = {},
    ...props
}) => (
    <Button
        variant={variant}
        onClick={onClick}
        style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0, // Ensure no padding to maintain circular shape
            ...style,
        }}
        {...props}
    >
        {icon}
    </Button>
);

export default IconButton;
