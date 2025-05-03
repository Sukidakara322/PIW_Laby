import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LibraryContext } from "../Contexts/LibraryContext";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshBooks } = useContext(LibraryContext);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBook(docSnap.data());
      } else {
        alert("Book not found.");
        navigate("/");
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "books", id), {
      ...book,
      pages: parseInt(book.pages, 10),
    });

    await refreshBooks();
    navigate("/");
  };

  if (!book) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>

      <label>
        Title:
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Author:
        <input
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Cover:
        <select name="cover" value={book.cover} onChange={handleChange}>
          <option value="hard">Hard</option>
          <option value="soft">Soft</option>
        </select>
      </label>

      <label>
        Pages:
        <input
          name="pages"
          type="number"
          value={book.pages}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update Book</button>
    </form>
  );
}
