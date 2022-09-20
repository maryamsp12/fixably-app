import ReactPaginate from "react-paginate";
import Table from "../components/table/Table";
import { useAppContext } from "../context/useContext";

const Task2 = () => {
  const { orders, handlePageClick, itemsCount } = useAppContext();

  return (
    <section>
      <Table tableHeader={"Lists statistics of orders"} tableData={orders} />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={itemsCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </section>
  );
};

export default Task2;
