// import { IoIosSearch } from "react-icons/io";

function SearchBox({search, setSearch, searchHandler}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <button onClick={searchHandler}>send</button>
    </div>
  );
}

export default SearchBox;
