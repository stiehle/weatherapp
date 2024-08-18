import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import { City } from "./routes/city/City";

function App() {
  const router = createBrowserRouter([
    {
      path: "/weatherapp/",
      element: <Main />,
      // element: <City />,
      errorElement: <ErrorPage />,
    },
    {
      path: "weatherapp/main",
      element: <Main />,
    },
    {
      path: "weatherapp/city",
      element: <City />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
