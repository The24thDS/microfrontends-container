import { useRef, useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";

const CustomBrowserRouter = ({ basename, history, children }) => {
  let historyRef = useRef(history);

  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      navigator={history}
      location={state.location}
      navigationType={state.action}
      basename={basename}
    >
      {children}
    </Router>
  );
};

export default CustomBrowserRouter;
