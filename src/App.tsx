import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import City from "./routes/city/City";
import { useState } from "react";
import { CitiesContext } from "./context/CitiesContext";
// import Main from "./routes/main/Main";
// import { City } from "./routes/city/City";

function App() {
  const [cities, setCities] = useState<number[]>([576216, 2618724, 623685, 386789, 267097, 604791, 9000293, 9000433]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Main /> },
          { path: "city", element: <City /> },
        ],
      },
    ],
    { basename: "/weatherapp/" }
  );

  // const router = createBrowserRouter([
  //   {
  //     path: "/weatherapp/",
  //     element: <Main />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/weatherapp/city",
  //     element: <City />,
  //   },
  // ]);

  return (
    <>
      <CitiesContext.Provider value={{ cities, setCities }}>
        <RouterProvider router={router} />
      </CitiesContext.Provider>
    </>
  );
}

export default App;
