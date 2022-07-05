import React from "react";
import { Link, useParams } from "react-router-dom";
import { getBrewery } from "../../Services";

export default function BreweryDetail() {
  const { id } = useParams();
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    const cb = async () => {
      if (id) {
        try {
          const res = await getBrewery(id);
          setItem(res);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    };

    cb();
  }, [id]);

  return (
    <main>
      <h1>Brewery {id}</h1>
      <p>
        Name: {item.name}
      </p>
      <p>City: {item.city}</p>
      <p>State: {item.state}</p>
      <p>Country: {item.country}</p>
      <p>Phone Number: {item.phone}</p>
      <p>
        {item.website_url ? <a href={item.website_url}>View Website</a> : ""}
      </p>
      <Link to="/breweries">Back to Breweries</Link>
    </main>
  );
}
