import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import { City } from "./routes/city/City";
import Site2 from "./routes/site2/Site2";
import TestContext from "./components/TestContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/weatherapp/",
      // element: <Main />,
      element: <City />,
      errorElement: <ErrorPage />,
    },
    {
      path: "weatherapp/main",
      element: <Main />,
    },
    {
      path: "/city",
      element: <City />,
    },
    {
      path: "/site2",
      element: <Site2 />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
