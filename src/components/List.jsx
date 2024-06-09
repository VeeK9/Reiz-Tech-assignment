import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Pagination from "./Pagination";

const List = () => {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [ascending, setAscending] = useState(true);
  const [countries, setCountries] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(30);
  const [allCountries, setAllCountries] = useState(0);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
        const result = await response.json();
        setData(result.sort((a,b)=>a.name.localeCompare(b.name)))
        setCountries(result.sort((a,b)=>a.name.localeCompare(b.name)))
        setAllCountries(result.length)
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  const lastIndex = currentPage * countriesPerPage;
  const firstIndex = lastIndex - countriesPerPage;

  const sortedCountries = (ascending) => {
      if (!ascending) {
        setCountries(countries.sort((a,b)=>a.name.localeCompare(b.name)));
      } else {
        setCountries(countries.sort((a,b)=>b.name.localeCompare(a.name)));
      }
    setCurrentPage(1);
  }

  const handleSortCountriesButton = () => {
    sortedCountries(ascending);
    setAscending(!ascending);
  }

  const handleFilterSelect = (e) => {
    if (e.target.value === 'smallerThanLithuania'){
      setCountries(data.filter(country => country.area < 65300))
    } else if (e.target.value === 'oceaniaRegion'){
      setCountries(data.filter(country => country.region.toLowerCase() == 'oceania'))
    } else {
      if (ascending) {
        setCountries(data.sort((a,b)=>a.name.localeCompare(b.name)));
      } else {
        setCountries(data.sort((a,b)=>b.name.localeCompare(a.name)));}
      }
    setAllCountries(countries.length);
    setCurrentPage(1);
  }

  return (
    <>
      {
        error ?
        <h3>Something went wrong.</h3>
        :
        countries ?
          <div>
            <div className="buttons">
              <div className="filters">
                <select className='select' name="filter" id="filter" onChange={(e)=>handleFilterSelect(e)}>
                  <option value="all">All Countries</option>
                  <option value="smallerThanLithuania">Smaller than Lithuania</option>
                  <option value="oceaniaRegion">Oceania region</option>
                </select>
              </div>
              <div className="sort">
                <button onClick={handleSortCountriesButton}>
                  {ascending ? 'sorting: A-Z' : 'sorting: Z-A'}
                </button>
              </div>
            </div>
            <ul className="list">
              {
                countries.slice(firstIndex, lastIndex).map((country, idx) =>
                  <ListItem
                    country={country}
                    key={idx}/>)
              }
            </ul>
          </div>
        : <h3>Countries are loading...</h3>
      }
      <Pagination currentPage={currentPage} countriesPerPage={countriesPerPage} allCountries={allCountries} setCurrentPage={setCurrentPage}/>
    </>
  );
}
 
export default List;