import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import City from "./routes/city/City";
import { useState } from "react";
import { CitiesContext } from "./context/CitiesContext";
import { getLocalStorage } from "./utils/localStorage";
// import Main from "./routes/main/Main";
// import { City } from "./routes/city/City";

function App() {
  const [cities, setCities] = useState<number[]>(getLocalStorage());

  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Main /> },
          { path: "city", element: <City />, children: [{ path: ":itemId", element: <City /> }] },
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
