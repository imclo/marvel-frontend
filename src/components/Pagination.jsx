const Pagination = ({ skip, setSkip, count, limit, page, setPage }) => {
  const lastPage = Math.ceil(Number(count) / limit) * 100 - 100;
  //   console.log("lastPage", lastPage);
  //   console.log("page", page);
  //   console.log("skip", skip);

  return (
    <section className="pagination">
      {/* First page */}
      <button
        onClick={() => {
          setSkip(0);
          setPage(1);
        }}
        disabled={skip === 0}
      >
        {"<<"}
      </button>
      {/* Previous page */}
      <button
        onClick={() => {
          setSkip(skip - limit);
          setPage(page - 1);
        }}
        disabled={skip === 0}
      >
        {"<"}
      </button>
      {/* Previous page with number */}
      {skip !== 0 && (
        <button
          onClick={() => {
            setSkip(skip - limit);
            setPage(page - 1);
          }}
        >
          {page - 1}
        </button>
      )}

      {/* Current page */}
      <span>{page}</span>
      {/* Next page with number */}
      {skip !== lastPage && (
        <button
          onClick={() => {
            setSkip(skip + limit);
            setPage(page + 1);
          }}
        >
          {page + 1}
        </button>
      )}
      {/* Next page */}
      <button
        onClick={() => {
          setSkip(skip + limit);
          setPage(page + 1);
        }}
        disabled={skip === lastPage}
      >
        {">"}
      </button>
      {/* Last page */}
      <button
        onClick={() => {
          setSkip(lastPage);
          setPage(lastPage / 100);
        }}
        disabled={skip === lastPage}
      >
        {">>"}
      </button>
    </section>
  );
};

export default Pagination;
