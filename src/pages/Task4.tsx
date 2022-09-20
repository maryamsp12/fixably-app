import moment from "moment";
import ReactPaginate from "react-paginate";
import { useAppContext } from "../context/useContext";
import { invoices } from "../context/useContext";
const Task4 = () => {
  const { invoices, handlePageClickInvoices, invoicePageCount } =
    useAppContext();
  const sortedArray = invoices.sort(
    (a: invoices, b: invoices) =>
      new Date(a.created).valueOf() - new Date(b.created).valueOf()
  );
  return (
    <section>
      <table className="center">
        <thead>
          <tr>
            <th colSpan={6}><h4>{"Invoiced data"}</h4></th>
          </tr>
          <tr>
            <th>Id</th>
            <th>Order id</th>
            <th>Amount</th>
            <th>Created date</th>
          </tr>
        </thead>
        <tbody>
          {sortedArray?.map((data: any) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.orderId}</td>
              <td>{data.amount}</td>
              <td>{moment(data.created).format("YYYY-MM-DD")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={invoicePageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClickInvoices}
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

export default Task4;
