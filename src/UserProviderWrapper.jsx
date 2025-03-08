import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { AppRouter } from "./components/router";

function UserProviderWrapper() {
    return (
        <RouterProvider router={AppRouter}>
            <UserProvider>
                <div id="app-content">
                    {/* Your application components go here */}
                </div>
            </UserProvider>
        </RouterProvider>
    );
}

export default UserProviderWrapper;