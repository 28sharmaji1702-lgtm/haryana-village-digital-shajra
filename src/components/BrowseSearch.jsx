import { useState } from "react";

import "../styles/BrowseSearch.css";

function BrowseSearch({
  onSearch,
}) {

  const [keyword, setKeyword] = useState("");

  function handleSearch() {

    const value = keyword.trim();

    if (!value) return;

    onSearch(value);

  }

  function handleKeyDown(e) {

    if (e.key === "Enter") {

      e.preventDefault();

      handleSearch();

    }

  }

  return (

    <section className="browse-search">

      <h2 className="browse-search-title">
        Browse Village
      </h2>

      <div className="browse-search-box">

        <div className="browse-search-input">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />

            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />

          </svg>

          <input

            type="text"

            placeholder="Search village..."

            value={keyword}

            onChange={(e)=>
              setKeyword(
                e.target.value
              )
            }

            onKeyDown={handleKeyDown}

          />

        </div>

        <button
          onClick={handleSearch}
        >

          Search

        </button>

      </div>

    </section>

  );

}

export default BrowseSearch;