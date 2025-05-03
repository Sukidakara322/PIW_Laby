import { createBrowserRouter } from "react-router-dom";
import App from "./root";
import Home from "./routes/home";
import NewBook from "./routes/new";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "new", element: <NewBook /> },
    ],
  },
]);

export default router;
