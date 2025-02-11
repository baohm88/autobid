import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./components/router";

function App() {
    return (
        <>
            <Routes>
                {routes.map(
                    ({ path, component: Component, layout: Layout }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <Layout>
                                    <Component />
                                </Layout>
                            }
                        />
                    )
                )}
            </Routes>
        </>
    );
}

export default App;
