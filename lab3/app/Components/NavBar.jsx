import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/new">Add new book</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}
