import BookSearch from "../Components/BookSearch";
import BookList from "../Components/BookList";

export function meta() {
  return [
    { title: "Apple Worm 2.0 - Library" },
    { name: "description", content: "Main page for searching the books" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Apple Worm 2.0 - Library</h1>
      <BookSearch />
      <BookList />
    </div>
  );
}
