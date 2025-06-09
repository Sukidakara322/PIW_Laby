import { NavLink } from "react-router-dom";
import { useFavorites } from "../Contexts/FavoritesContext";

export default function NavBar() {
  const { favorites } = useFavorites();

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/new">Add new book</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
    </nav>
  );
}
