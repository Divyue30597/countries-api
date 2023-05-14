import "./searchAndFilter.css";

const regionsArr = [
  { value: "/", text: "Filter By Region" },
  { value: "africa", text: "Africa" },
  { value: "america", text: "America" },
  { value: "asia", text: "Asia" },
  { value: "europe", text: "Europe" },
  { value: "oceania", text: "Oceania" },
];


export function SearchAndFilter() {
  return (
    <section className="container search-and-filter">
      <input type="text" placeholder="Search for a country..." />
      <select name="Fiter by Region" id="filter-by-region">
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
