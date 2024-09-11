type Props = {
  length: number;
  currentPage: number;
  setPage: (x: number) => void;
};
export default function Pagination({ length, currentPage, setPage }: Props) {
  const arrs = Array.from({ length: length });
  return (
    <div className="join flex justify-center mt-6">
      <button
        className={`join-item btn`}
        disabled={currentPage < 1}
        onClick={() => setPage(currentPage - 1)}
      >
        «
      </button>
      <button
        className={`join-item btn ${0 == currentPage ? "link bg-base" : "bg-inherit"}`}
        onClick={() => setPage(0)}
      >
        1
      </button>
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${length > 6 && currentPage > 3 ? "" : "hidden"}`}
      >
        ...
      </button>
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${currentPage === length - 1 || currentPage == length - 2 ? "" : "hidden"}`}
        onClick={() => setPage(length - 5)}
      >
        {length - 4}
      </button>
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${currentPage === length - 1 ? "" : "hidden"}`}
        onClick={() => setPage(length - 4)}
      >
        {length - 3}
      </button>
      {arrs.map(
        (_, index) =>
          index > currentPage - 3 &&
          index < currentPage + 3 &&
          index > 0 &&
          index < length - 1 && (
            <button
              key={index}
              className={`join-item btn ${index == currentPage ? "link bg-base" : "bg-inherit"}`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          )
      )}
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${currentPage == 0 ? "" : "hidden"}`}
        onClick={() => setPage(3)}
      >
        4
      </button>
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${currentPage == 0 || currentPage == 1 ? "" : "hidden"}`}
        onClick={() => setPage(4)}
      >
        5
      </button>
      <button
        className={`join-item btn bg-inherit hover:bg-inherit ${length > 6 && length - currentPage > 4 ? "" : "hidden"}`}
      >
        ...
      </button>
      <button
        className={`join-item btn ${length - 1 == currentPage ? "link bg-base" : "bg-inherit"}`}
        onClick={() => setPage(length - 1)}
      >
        {length}
      </button>
      <button
        className="join-item btn"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage > 4}
      >
        »
      </button>
    </div>
  );
}
