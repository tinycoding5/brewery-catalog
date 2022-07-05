import React from "react";
import { Link } from "react-router-dom";
import { getBreweries } from "../../Services"

export default function BreweryList() {
  const [breweries, setBreweries] = React.useState([]);
  const [text, setText] = React.useState("");
  const [sortName, setSortName] = React.useState("");

  React.useEffect(() => {
    const cb = async () => {
      try {
        const res = await getBreweries();
        setBreweries(res);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    cb();
  }, []);

  const handleInput = (event) => {
    const value = event.target.value;
    setText(value);
  };

  const btnSearch = async (event) => {
    event.preventDefault();
    try {
      const res = await getBreweries(text);
      setBreweries(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const btnReset = async () => {
    try {
      const res = await getBreweries();
      setBreweries(res);
      setText("");
    } catch (error) {
      console.log("Error: ", error);
      setText("");
    }
  };

  const handleSortName = () => {
    const originBreweries = [...breweries];
    if (sortName === "" || sortName === "desc") {
      setSortName("asc");
      const newList = originBreweries.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setBreweries(newList);
    } else {
      setSortName("desc");
      const newList = originBreweries.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }

        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setBreweries(newList);
    }
  };
  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form className="search-form" onSubmit={btnSearch}>
        <input
          type="text"
          name="search"
          placeholder="Find a brewery"
          value={text}
          onChange={handleInput}
        />
        <button type="submit">Search</button>
        <button type="reset" onClick={btnReset}>
          Reset
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              <div className="sort" onClick={handleSortName}>
                Name
              </div>
            </th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td>{item.phone}</td>
              <td>
                {item.website_url ? (
                  <a href={item.website_url}>Visit Website</a>
                ) : (
                  ""
                )}
              </td>
              <td>
                <Link to={`/breweries/${item.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
