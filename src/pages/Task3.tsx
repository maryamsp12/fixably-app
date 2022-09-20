import React from "react";
import Table from "../components/table/Table";
import ReactPaginate from "react-paginate";
import { useAppContext } from "../context/useContext";

const Task3 = () => {
  const { iphoneData, phonePageCount, handlePageClickIphone } = useAppContext();
  const filtertedData = iphoneData.filter(
    (data: any) => data.technician !== null
  );
  return (
    <section>
      {filtertedData.length > 0 ? (
        <Table
          tableHeader={"IPhone devices assigned to a technician"}
          tableData={filtertedData}
        />
      ) : (
        <Table
          tableHeader={"IPhone devices assigned to a technician"}
          tableHeader2={
            "No iPhone device found which is assigned to a technician."
          }
          tableData={iphoneData}
        />
      )}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={phonePageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClickIphone}
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

export default Task3;
