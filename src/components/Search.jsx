import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <div className="input-search">
        <FontAwesomeIcon
          className="icon-search"
          icon="fa-solid fa-magnifying-glass"
        />
        <input
          className="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Search;
