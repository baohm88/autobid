import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { AppRouter } from "./components/router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <UserProvider>
            <RouterProvider router={AppRouter} />
        </UserProvider>
    );
}

export default App;
