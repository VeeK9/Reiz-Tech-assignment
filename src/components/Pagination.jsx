const Pagination = ({countriesPerPage, setCurrentPage, currentPage, allCountries}) => {

  let pages = []

  for (let i = 1; i<= Math.ceil(allCountries / countriesPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className="pagination">
      {
        pages.map((page, idx) => 
          <button key={idx} onClick={() => setCurrentPage(page)} className={currentPage==page? "activePage" : ""}>{page}</button>
        )
      }
    </div>
  );
}
 
export default Pagination;