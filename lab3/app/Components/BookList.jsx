import { useContext } from "react";
import { LibraryContext } from "../Contexts/LibraryContext";

export default function BookList() {
  const { bookList } = useContext(LibraryContext);

  if (bookList.length === 0) {
    return <p>No books found</p>;
  }

  const handleEdit = (book) => {
    alert(`Edit: ${book.title}`);
  };

  const handleDelete = (book) => {
    alert(`Delete: ${book.title}`);
  };

  return (
    <ul>
      {bookList.map((book) => (
        <li key={book.id} style={{ marginBottom: "8px" }}>
          <strong>{book.title}</strong> - {book.author} ({book.pages} pages)
          <button
            style={{ marginLeft: "12px", marginRight: "8px" }}
            onClick={() => handleEdit(book)}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(book)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
