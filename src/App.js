import { Routes, Route, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import CustomBrowserRouter from "./CustomBrowserRouter";

const history = createBrowserHistory();

export const App = () => {
  return (
    <>
      <CustomBrowserRouter history={history}>
        <nav>
          <NavLink to="/">Browse</NavLink>{" "}
          <NavLink to="restaurant">Restaurants</NavLink>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<p>Browse</p>} />
            <Route path="restaurant/*" element={<p>Restaurant</p>} />
          </Routes>
        </div>
      </CustomBrowserRouter>
    </>
  );
};
