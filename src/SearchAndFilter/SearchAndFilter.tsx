import "./searchAndFilter.css";

const regionsArr = [
  { value: "all", text: "Filter By Region" },
  { value: "region/Africa", text: "Africa" },
  { value: "region/America", text: "America" },
  { value: "region/Asia", text: "Asia" },
  { value: "region/Europe", text: "Europe" },
  { value: "region/Oceania", text: "Oceania" },
];

export function SearchAndFilter({ setRegion, name, setName }) {
  return (
    <section className="container search-and-filter">
      <input
        type="text"
        placeholder="Search for a country..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        name="Fiter by Region"
        id="filter-by-region"
        onChange={(e) => setRegion(e.target.value)}
      >
        {regionsArr.map((region) => {
          return (
            <option key={region.value} value={region.value}>
              {region.text}
            </option>
          );
        })}
      </select>
    </section>
  );
}
