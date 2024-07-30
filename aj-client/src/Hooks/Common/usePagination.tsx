
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
        if (totalItems != 0) {
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          setPageNumbers((prevPages) => {
            const newPages = Array.from({ length: totalPages }, (_, i) => i + 1);
            return newPages.length === prevPages.length ? prevPages : newPages;
          });
        }
      }, [totalItems, itemsPerPage]);
    
    function ValidatePageCounts (){
        const hasNextPage = currentPage < pageNumbers.length ;
        const hasPreviousPage = currentPage > 1 ;
        setHasNextPage(hasNextPage);
        setHasPreviousPage(hasPreviousPage);
    }
      useEffect(() => {
        ValidatePageCounts()
      }, [currentPage, pageNumbers]);
    
      const goToPage = (page: number) => {
          setCurrentPage(Math.min(page, pageNumbers.length));
          ValidatePageCounts()
        }
    
      const nextPage = ()=> {
        setCurrentPage((prev) => prev < (pageNumbers.length) ? prev + 1 : prev);
        ValidatePageCounts()
      }
    
      const previousPage = useCallback(() => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
        ValidatePageCounts()
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
    

export default usePagination