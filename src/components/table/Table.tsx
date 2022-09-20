import "./styles.css";
import { order } from "./../../context/useContext";
import moment from "moment";

const Table = (props: {
  tableHeader: string;
  tableHeader2?: string;
  tableData: order[];
}) => {
  return (
    <table className="center">
      <thead>
        <tr>
          <th colSpan={6}>
            <h4>{props.tableHeader}</h4>
          </th>
        </tr>
        {props.tableHeader2 && (
          <tr>
            <th colSpan={6}>
              <h6>{props.tableHeader2}</h6>
            </th>
          </tr>
        )}
        <tr>
          <th>Order id</th>
          <th>Created date</th>
          <th>Type</th>
          <th>Device brand</th>
          <th>Technician</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.length !== 0 ? (
          props.tableData?.map((data: any) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{moment(data.created).format("YYYY-MM-DD")}</td>
              <td>{data.deviceType}</td>
              <td>{data.deviceBrand}</td>
              <td>{data.technician}</td>
              <td>{data.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>{"No relevant data found on this page"}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
