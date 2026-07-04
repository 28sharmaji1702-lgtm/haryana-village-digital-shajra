function TehsilDropdown({
  tehsils,
  selectedTehsil,
  onTehsilChange,
}) {
  return (
    <select
      value={selectedTehsil}
      onChange={(e) => onTehsilChange(e.target.value)}
      disabled={tehsils.length === 0}
    >
      <option value="">
        {tehsils.length === 0
          ? "Select District First"
          : "Select Tehsil"}
      </option>

      {tehsils.map((tehsil) => (
        <option
          key={tehsil.id}
          value={tehsil.id}
        >
          {tehsil.name}
        </option>
      ))}
    </select>
  );
}

export default TehsilDropdown;