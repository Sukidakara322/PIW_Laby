import { useContext, useState } from "react";
import { LibraryContext } from "../Contexts/LibraryContext";
import { useNavigate } from "react-router-dom";

export function meta() {
  return [
    { title: "Add New Book" },
    { name: "description", content: "Add a new book to the library" },
  ];
}

export default function NewBook() {
  const { bookList, setBookList } = useContext(LibraryContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("hard");
  const [pages, setPages] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: bookList.length + 1,
      title,
      author,
      cover,
      pages: parseInt(pages, 10) || 0,
      description,
    };

    setBookList((prevBooks) => [...prevBooks, newBook]);

    navigate("/");
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit} className="new-book-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Book title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            placeholder="Author name"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cover Type:</label>
          <div>
            <label>
              <input
                type="radio"
                name="cover"
                value="hard"
                checked={cover === "hard"}
                onChange={() => setCover("hard")}
              />
              Hard Cover
            </label>
            <label>
              <input
                type="radio"
                name="cover"
                value="soft"
                checked={cover === "soft"}
                onChange={() => setCover("soft")}
              />
              Soft Cover
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="pages">Number of Pages:</label>
          <input
            id="pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="3"
            value={description}
            placeholder="Brief description of the book"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
