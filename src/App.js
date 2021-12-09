import { Routes, Route, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import CustomBrowserRouter from "./CustomBrowserRouter";
import { ROUTES } from "./Constants";
import React from "react";
import MicroFrontendClass from "./MicroFrontendClass";

const history = createBrowserHistory();

export const App = () => {
  return (
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
                Welcome to the container. Use the above links to navigate to the
                microfrontends
              </p>
            }
          />
          <Route
            path={`${ROUTES.BROWSE}/*`}
            element={
              <MicroFrontendClass
                name="browse"
                host={process.env.BROWSE_HOST}
                history={history}
                restaurantsPath={ROUTES.RESTAURANTS}
                basename={ROUTES.BROWSE}
                key="browse-uf"
              />
            }
          />
          <Route
            path={`${ROUTES.RESTAURANTS}/*`}
            element={
              <MicroFrontendClass
                name="restaurants"
                host={process.env.RESTAURANTS_HOST}
                history={history}
                browsePath={ROUTES.BROWSE}
                basename={ROUTES.RESTAURANTS}
                key="restaurants-uf"
              />
            }
          />
        </Routes>
      </div>
    </CustomBrowserRouter>
  );
};
