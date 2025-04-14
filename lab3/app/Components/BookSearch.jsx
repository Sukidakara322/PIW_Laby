import { useContext } from "react";
import { LibraryContext } from "../Contexts/LibraryContext";

export default function BookSearch() {
  const {
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
  } = useContext(LibraryContext);

  return (
    <form className="book-filters">
      <div>
        <label htmlFor="titleFilter">Title:</label>
        <input
          id="titleFilter"
          type="text"
          value={titleFilter}
          placeholder="Search by title"
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="authorFilter">Author:</label>
        <input
          id="authorFilter"
          type="text"
          value={authorFilter}
          placeholder="Search by author"
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={hardCoverFilter}
            onChange={(e) => setHardCoverFilter(e.target.checked)}
          />
          Hard Cover
        </label>
        <label>
          <input
            type="checkbox"
            checked={softCoverFilter}
            onChange={(e) => setSoftCoverFilter(e.target.checked)}
          />
          Soft Cover
        </label>
      </div>

      <div>
        <label htmlFor="minPages">Min Pages:</label>
        <input
          id="minPages"
          type="number"
          value={minPagesFilter}
          onChange={(e) => setMinPagesFilter(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="maxPages">Max Pages:</label>
        <input
          id="maxPages"
          type="number"
          value={maxPagesFilter}
          onChange={(e) => setMaxPagesFilter(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="descFilter">Word in Description:</label>
        <input
          id="descFilter"
          type="text"
          value={descFilter}
          placeholder="Search text in description"
          onChange={(e) => setDescFilter(e.target.value)}
        />
      </div>
    </form>
  );
}
