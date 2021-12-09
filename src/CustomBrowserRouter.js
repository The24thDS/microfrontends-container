import { useRef, useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";

const CustomBrowserRouter = ({ basename, history, children }) => {
  let historyRef = useRef(history);

  let historyValue = historyRef.current;
  let [state, setState] = useState({
    action: historyValue.action,
    location: historyValue.location,
  });
  useLayoutEffect(() => historyValue.listen(setState), [historyValue]);

  return (
    <Router
      navigator={historyValue}
      location={state.location}
      navigationType={state.action}
      basename={basename}
    >
      {children}
    </Router>
  );
};

export default CustomBrowserRouter;
