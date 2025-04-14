import { createContext, useState } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Fathers and Sons",
      author: "Ivan Turgenev",
      description: "A classic of Russian literature",
      cover: "soft",
      pages: 320,
    },
    {
      id: 2,
      title: "War and Peace",
      author: "Leo Tolstoy",
      description: "An epic historical novel",
      cover: "hard",
      pages: 1200,
    },
    {
      id: 3,
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      description: "A novel about pre-colonial life in Nigeria",
      cover: "hard",
      pages: 200,
    },
    {
      id: 4,
      title: "Beloved",
      author: "Toni Morrison",
      description: "A novel set in the aftermath of the American Civil War",
      cover: "soft",
      pages: 330,
    },
    {
      id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A story about the Jazz Age in the United States",
      cover: "soft",
      pages: 180,
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian social science fiction novel",
      cover: "hard",
      pages: 350,
    },
    {
      id: 7,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description: "A romantic novel of manners",
      cover: "soft",
      pages: 275,
    },
    {
      id: 8,
      title: "Moby-Dick",
      author: "Herman Melville",
      description:
        "A sailor's narrative of the obsessive quest for the white whale",
      cover: "hard",
      pages: 585,
    },
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [hardCoverFilter, setHardCoverFilter] = useState(false);
  const [softCoverFilter, setSoftCoverFilter] = useState(false);
  const [minPagesFilter, setMinPagesFilter] = useState("");
  const [maxPagesFilter, setMaxPagesFilter] = useState("");
  const [descFilter, setDescFilter] = useState("");

  const filteredBooks = bookList.filter((book) => {
    if (
      titleFilter &&
      !book.title.toLowerCase().includes(titleFilter.toLowerCase())
    ) {
      return false;
    }

    if (
      authorFilter &&
      !book.author.toLowerCase().includes(authorFilter.toLowerCase())
    ) {
      return false;
    }

    if (hardCoverFilter && !softCoverFilter && book.cover !== "hard") {
      return false;
    }
    if (softCoverFilter && !hardCoverFilter && book.cover !== "soft") {
      return false;
    }

    if (minPagesFilter && book.pages < parseInt(minPagesFilter, 10)) {
      return false;
    }

    if (maxPagesFilter && book.pages > parseInt(maxPagesFilter, 10)) {
      return false;
    }

    if (
      descFilter &&
      !book.description.toLowerCase().includes(descFilter.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <LibraryContext.Provider
      value={{
        bookList: filteredBooks,
        setBookList,
        titleFilter,
        setTitleFilter,
        authorFilter,
        setAuthorFilter,
        hardCoverFilter,
        setHardCoverFilter,
        softCoverFilter,
        setSoftCoverFilter,
        minPagesFilter,
        setMinPagesFilter,
        maxPagesFilter,
        setMaxPagesFilter,
        descFilter,
        setDescFilter,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
