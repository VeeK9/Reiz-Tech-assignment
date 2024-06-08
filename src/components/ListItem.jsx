const ListItem = ({country}) => {
  return (
    <div className="listItem">
      <h2>{country.name}</h2>
      <h4>Region: {country.region}</h4>
      <h4>Area size: {country.area} km&sup2;</h4>
    </div>
  );
}
 
export default ListItem;