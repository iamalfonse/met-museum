type PaginationDTO = {
    postsPerPage: number;
    length: number;
    handlePagination: (number: number) => void;
    currentPage: number;
}

const Pagination = ( {postsPerPage, length, handlePagination, currentPage }: PaginationDTO ) => {
    let paginationNumber = [];
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i); // set the numner of pages for the paginator
    }
    let leftIsDisabled = false;
    if(currentPage -1 == 0) {
        leftIsDisabled = true;
    }
    let rightIsDisabled = false;
    if(currentPage == (length / postsPerPage)) {
        rightIsDisabled = true;
    }
    return (
        <div className='pagination flex flex-wrap'>
            <button className={leftIsDisabled ? "rounded bg-white px-4 py-1 text-stone-400 mx-2 mb-4" :  "rounded bg-white px-4 py-1 text-black mx-2  mb-4 cursor-pointer"} onClick={() => handlePagination(currentPage - 1)} disabled={leftIsDisabled} >
                &lt;
            </button>
            {
                paginationNumber.map((number) => (
                    <button key={number} onClick={() => handlePagination(number)} className={currentPage === number ? 'rounded bg-white px-4 py-1 text-stone-400 mx-2 mb-4' : 'rounded bg-white px-4 py-1 text-black mx-2 mb-4 cursor-pointer'}>
                        {number}
                    </button>
                ))
            }
            <button className={rightIsDisabled ? "rounded bg-white px-4 py-1 text-stone-400 mx-2 mb-4" : "rounded bg-white px-4 py-1 text-black mx-2 mb-4 cursor-pointer"} onClick={() => handlePagination(currentPage + 1)} disabled={rightIsDisabled} >
                &gt;
            </button>
        </div>
    )
}
export default Pagination