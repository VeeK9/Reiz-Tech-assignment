import { useEffect, useState } from "react";
import ListItem from "./ListItem";

const URL = 'https://restcountries.com/v2/all?fields=name,region,area';

const List = () => {

  const [countries, setCountries] = useState();
  const [error, setError] = useState();

  useEffect(()=> {
    const fetchCountries = async () => {

      try {
        const response = await fetch(URL);
        const result = (await response.json());
        setCountries(result);
      } catch (error) {
        setError(error);
      }

    }

    fetchCountries();
  }, []);

  return (
    <div className="list">
      <h1>Countries of the World.</h1>
      <button>hello</button>
      <button>hello</button>
      {
        error ?
        <h5>Something went wrong.</h5>
        :
        countries ?
        countries.map((country, idx) =>
          <ListItem
            country={country}
            key={idx}
          />
        )
        : <h3>Countries are loading...</h3>
      }
    </div>
  );
}
 
export default List;