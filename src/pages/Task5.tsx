import { useAppContext } from "../context/useContext";
import "./task5Styles.css";

export const Task5 = () => {
  const {
    onSubmitNewOrder,
    handleChangeNewOrder,
    handleChangeNewNote,
    onSubmitNewNote,
    orderValues,
    noteValues,
  } = useAppContext();

  const deviceOptions = [
    {
      label: "Laptop",
      value: "Laptop",
    },
    {
      label: "Phone",
      value: "Phone",
    },
    {
      label: "Tablet",
      value: "Tablet",
    },
  ];

  const orderTypeOptions = [
    {
      label: "Issue",
      value: "Issue",
    },
    {
      label: "Diagnosis",
      value: "Diagnosis",
    },
    {
      label: "Resolution",
      value: "Resolution",
    },
  ];

  return (
    <section className="parentDiv">
      <section className="childDiv">
        <header>
          <h4>Create a new order</h4>
        </header>
        <main>
          <form onSubmit={onSubmitNewOrder}>
            <article>
              <label>Device manufacturer:* </label>
              <input
                name="deviceManufacturer"
                placeholder="Device manufacturer"
                onChange={handleChangeNewOrder}
                value={orderValues.deviceManufacturer}
                required
              />
            </article>
            <article>
              <label>Device brand:* </label>
              <input
                name="deviceBrand"
                placeholder="Device brand"
                onChange={handleChangeNewOrder}
                value={orderValues.deviceBrand}
                required
              />
            </article>
            <article>
              <label>Device type:* </label>
              <select
                name="deviceType"
                placeholder="Device type"
                onChange={handleChangeNewOrder}
                required
              >
                <option value="">{"Choose one"}</option>
                {deviceOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </article>
            <input className="submit" type="submit" value="Submit" />
          </form>
        </main>
      </section>
      <section className="childDiv">
        <header>
          <h4>Create a new note to a specific order</h4>
        </header>
        <main>
          <form onSubmit={onSubmitNewNote}>
            <article>
              <label> Order Id:* </label>
              <input
                name="orderId"
                placeholder="OrderId"
                onChange={handleChangeNewNote}
                value={noteValues.orderId}
                required
              />
            </article>
            <article>
              <label>Order type:* </label>
              <select
                name="orderType"
                placeholder="Order type"
                onChange={handleChangeNewNote}
                required
              >
                <option value="">{"Choose one"}</option>
                {orderTypeOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </article>
            <article>
              <label>Description:* </label>
              <input
                name="description"
                placeholder="Description"
                onChange={handleChangeNewNote}
                value={noteValues.description}
                required
              />
            </article>
            <input className="submit" type="submit" value="Submit" />
          </form>
        </main>
      </section>
    </section>
  );
};

export default Task5;
