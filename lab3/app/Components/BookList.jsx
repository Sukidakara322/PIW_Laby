import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { LibraryContext } from "../Contexts/LibraryContext";
import { useFavorites } from "../Contexts/FavoritesContext";

export default function BookList() {
  const { bookList, setBookList } = useContext(LibraryContext);
  const { favorites, addFavorite } = useFavorites();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  if (bookList.length === 0) {
    return <p>No books found</p>;
  }

  const handleEdit = (book) => {
    if (!currentUser || book.owner !== currentUser.uid) {
      alert("You can only edit your own books.");
      return;
    }
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = async (book) => {
    if (!currentUser || book.owner !== currentUser.uid) {
      alert("You are not allowed to delete this book.");
      return;
    }

    try {
      await deleteDoc(doc(db, "books", book.id));
      setBookList((prev) => prev.filter((b) => b.id !== book.id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
    }
  };

  const handleAddToFavorites = (book) => {
    const alreadyFav = favorites.some((fav) => fav.id === book.id);
    if (!alreadyFav) {
      addFavorite(book);
    }
  };

  return (
    <ul>
      {bookList.map((book) => (
        <li key={book.id} style={{ marginBottom: "8px" }}>
          <strong>{book.title}</strong> – {book.author} ({book.pages} pages)
          <button
            style={{ marginLeft: "12px", marginRight: "8px" }}
            onClick={() => handleAddToFavorites(book)}
            disabled={favorites.some((fav) => fav.id === book.id)}
          >
            {favorites.some((fav) => fav.id === book.id)
              ? "Added"
              : "Add to Favorites"}
          </button>
          {currentUser && book.owner === currentUser.uid && (
            <>
              <button
                style={{ marginRight: "8px" }}
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(book)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
