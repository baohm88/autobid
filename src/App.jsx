import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { AppRouter } from "./components/router";


function App() {
    return (
        <UserProvider>
            <RouterProvider router={AppRouter} />
        </UserProvider>
    );
}

export default App;
