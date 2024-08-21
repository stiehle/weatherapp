import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import { City } from "./routes/city/City";

function App() {
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
  //     errorElement: <ErrorPage />,
  //     children: [
  //       { index: true, element: <Main /> },
  //       { path: "city", element: <City /> },
  //     ],
  //   },
  // ]);

  // const router = createBrowserRouter([
  //     {
  //       path: "/weatherapp/",
  //       element: <Main />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "/weatherapp/city",
  //       element: <City />,
  //     },
  // ]);

  // const router = createBrowserRouter(
  //   [
  //     {
  //       path: "/",
  //       element: <Main />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "/city",
  //       element: <City />,
  //     },
  //   ],
  //   { basename: "/weatherapp/" }
  // );

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/weatherapp" element={<Main />}>
  //       <Route path="city" element={<City />} />
  //     </Route>
  //   )
  // );

  //   {
  //     path: "/weatherapp",
  //     element: <Main />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         path: "city",
  //         element: <City />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "city",
  //     element: <City />,
  //   },
  // ]);

  //   {
  //     path: "/weatherapp/",
  //     // element: <Main />,
  //     element: <City />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "weatherapp/main",
  //     element: <Main />,
  //   },
  //   {
  //     path: "/city",
  //     element: <City />,
  //   },
  //   {
  //     path: "/site2",
  //     element: <Site2 />,
  //   },
  // ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
