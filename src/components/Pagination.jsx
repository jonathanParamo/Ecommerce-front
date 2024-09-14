const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-5 flex justify-center items-center gap-2.5">
    <button
      className="w-30 py-2 px-4 border-none bg-purple-500 dark:bg-transparent dark:border
      dark:border-cyan-500 text-white cursor-pointer text-center disabled:bg-[#C8C6D7]
      disabled:cursor-not-allowed"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      className="w-30 py-2 px-4 border-none bg-purple-500 dark:bg-transparent dark:border
      dark:border-cyan-500 text-white cursor-pointer text-center disabled:bg-[#C8C6D7]
      disabled:cursor-not-allowed"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
);

export default Pagination;