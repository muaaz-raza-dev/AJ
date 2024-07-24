import { useCallback, useEffect, useState } from "react";
const usePagination = ({
  totalItems,
  itemsPerPage,
}: {
  totalItems: number;
  itemsPerPage: number;
}) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(true);

  useEffect(() => {
    if (totalItems !== 0) {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setPageNumbers((prevPages) => {
        const newPages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return newPages.length === prevPages.length ? prevPages : newPages;
      });
    }
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    const hasNextPage = currentPage < pageNumbers[pageNumbers.length - 1];
    const hasPreviousPage = currentPage > 1;
    setHasNextPage(hasNextPage);
    setHasPreviousPage(hasPreviousPage);
  }, [currentPage, pageNumbers]);

  const goToPage = useCallback(
    (page: number) => {  
      setCurrentPage(Math.min(page, Math.max(...pageNumbers,1)));
    },
    [pageNumbers]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) =>
      prev < pageNumbers[pageNumbers.length - 1] ? prev + 1 : prev
    );
  }, [pageNumbers]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, [pageNumbers]);

  return {
    pageNumbers,
    currentPage,
    previousPage,
    nextPage,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  };
};

export { usePagination };