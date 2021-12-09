import { Routes, Route, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import CustomBrowserRouter from "./CustomBrowserRouter";
import MicroFrontend from "./MicroFrontend";

const history = createBrowserHistory();

export const App = () => {
  return (
    <>
      <CustomBrowserRouter history={history}>
        <nav>
          Main Nav: <NavLink to="browse">Browse</NavLink>{" "}
          <NavLink to="restaurants">Restaurants</NavLink>
        </nav>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <p>
                  Welcome to the container. Use the above links to navigate to
                  the microfrontends
                </p>
              }
            />
            <Route
              path="browse/*"
              element={
                <MicroFrontend
                  name="browse"
                  host="http://localhost:3001"
                  history={history}
                  restaurantsPath="restaurants"
                />
              }
            />
            <Route
              path="restaurants/*"
              element={
                <MicroFrontend
                  name="restaurants"
                  host="http://localhost:3002"
                  history={history}
                />
              }
            />
          </Routes>
        </div>
      </CustomBrowserRouter>
    </>
  );
};
