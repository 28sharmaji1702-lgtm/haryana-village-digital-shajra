function DistrictDropdown({
  districts,
  selectedDistrict,
  onDistrictChange,
}) {
  return (
    <select
      value={selectedDistrict}
      onChange={(e) => onDistrictChange(e.target.value)}
    >
      <option value="">
        Select District
      </option>

      {districts.map((district) => (
        <option
          key={district.id}
          value={district.id}
        >
          {district.name}
        </option>
      ))}
    </select>
  );
}

export default DistrictDropdown;