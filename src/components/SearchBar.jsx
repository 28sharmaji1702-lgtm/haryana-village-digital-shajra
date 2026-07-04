import "../styles/SearchBar.css";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
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
        type="search"
        placeholder="Search Village or Village Code..."
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;