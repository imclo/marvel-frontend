const Search = ({ search, setSearch }) => {
  return (
    <div>
      <div className="input-search">
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
