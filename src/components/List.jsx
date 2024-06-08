import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Button from "./Button";

const URL = 'https://restcountries.com/v2/all?fields=name,region,area';
// const URL = 'https://jsonplaceholder.typicode.com/users';

const List = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [ascending, setAscending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [sizeFilter, setSizeFilter] = useState(false);
  const [regionFilter, setRegionFilter] = useState(false);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setData(result.sort((a,b)=>a.name.localeCompare(b.name)))
        setCountries(result.sort((a,b)=>a.name.localeCompare(b.name)))
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  // useEffect(()=> {
  //   if (!ascending) {
  //     setCountries(countries.sort((a,b)=>a.name.localeCompare(b.name)));
  //   } else {
  //     setCountries(countries.sort((a,b)=>b.name.localeCompare(a.name)));
  //   }
  // }, [ascending])

  const sortedCountries = (ascending) => {
      if (!ascending) {
        setCountries(countries.sort((a,b)=>a.name.localeCompare(b.name)));
      } else {
        setCountries(countries.sort((a,b)=>b.name.localeCompare(a.name)));
      }
  }

  const handleSortCountriesButton = () => {
    sortedCountries(ascending);
    setAscending(!ascending);
  }

  // useEffect(()=> {
  //   if (sizeFilter) {
  //     setCountries(countries.filter(country => country.area < 65300))
  //   } else {
  //     setCountries(data)
  //   }
  // }, [sizeFilter])

  // useEffect(()=> {
  //   if (regionFilter) {
  //     setCountries(countries.filter(country => country.region.toLowerCase().includes('oceania')))
  //   } else {
  //     setCountries(data)
  //   }
  // }, [regionFilter])

  return (
    <>
      <h1>Countries of the World.</h1>
      <div className="buttons">
        <div className="filters">
          <Button
            func={()=>setSizeFilter(!sizeFilter)}
            title={sizeFilter ? 'Show All' : 'Smaller than Lithuania'} />
          <Button
            func={()=>setRegionFilter(!regionFilter)}
            title={regionFilter ? 'Show All' : 'In Oceania region'} />
        </div>
        <div className="sort">
          <Button
          func={handleSortCountriesButton}
          title={ascending ? 'A-Z' : 'Z-A'} />
        </div>
      </div>
      <ul className="list">
        {
          error ?
          <h3>Something went wrong.</h3>
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
      </ul>
    </>
  );
}
 
export default List;