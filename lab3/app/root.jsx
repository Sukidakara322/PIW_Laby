import { Outlet, useRouteError, isRouteErrorResponse } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { LibraryProvider } from "./Contexts/LibraryContext";
import { FavoritesProvider } from "./Contexts/FavoritesContext";
import "./app.css";

export default function App() {
  return (
    <LibraryProvider>
      <FavoritesProvider>
        <NavBar />
        <main className="pt-16 p-4 container mx-auto">
          <Outlet />
        </main>
        <Footer />
      </FavoritesProvider>
    </LibraryProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
