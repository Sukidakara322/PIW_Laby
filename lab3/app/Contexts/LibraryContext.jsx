import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [hardCoverFilter, setHardCoverFilter] = useState(false);
  const [softCoverFilter, setSoftCoverFilter] = useState(false);
  const [minPagesFilter, setMinPagesFilter] = useState("");
  const [maxPagesFilter, setMaxPagesFilter] = useState("");
  const [descFilter, setDescFilter] = useState("");

  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const books = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookList(books);
      } catch (error) {
        console.error("Error fetching books from Firestore:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = bookList.filter((book) => {
    if (showOnlyMine && currentUser && book.owner !== currentUser.uid) {
      return false;
    }

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
        showOnlyMine,
        setShowOnlyMine,
        currentUser,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
