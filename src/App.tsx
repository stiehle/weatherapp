import "./App.css";
import ErrorPage from "./routes/error/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import { City } from "./routes/city/City";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
<<<<<<< HEAD
      children: [
        {
          path: "city",
          element: <City />,
        },
      ],
    },
  ]);
=======
      // children: [
      //   {
      //     path: "/main/",
      //     element: <Main />,
      //   },
      // ],
    },
    {
      path: "/city/",
      element: <City />,
    },
  ],{basename: "/weatherapp"});
>>>>>>> 11d8fd30e0dc1a538b67288c3e8ede81a9b1ee9e

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
