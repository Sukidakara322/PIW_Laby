import { createBrowserRouter } from "react-router-dom";
import App from "./root";
import Home from "./routes/home";
import NewBook from "./routes/new";
import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "new", element: <NewBook /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;
