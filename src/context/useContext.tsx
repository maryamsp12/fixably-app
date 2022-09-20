import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export type order = {
  created: string;
  deviceBrand: string;
  deviceManufacturer: string;
  deviceType: string;
  id: number;
  status: string | number;
  technician: null | string;
};

type order2 = {
  created: string;
  deviceBrand: string;
  deviceManufacturer: string;
  deviceType: string;
  id: number;
  status: number;
  technician: null | string;
};

export type invoices = {
  id: number;
  amount: number;
  created: Date;
  orderId: number;
};

type status = { id: number; description: string };

export type useAppContextOutput = {
  apiToken: string;
  orders: order[];
  handleRefreshToken: () => void;
  handlePageClick: (data: { selected: number }) => void;
  handlePageClickInvoices: (data: { selected: number }) => void;
  itemsCount: number;
  iphoneData: order[];
  phonePageCount: number;
  handlePageClickIphone: (data: { selected: number }) => void;
  invoices: invoices[] | [];
  invoicePageCount: number;
  onSubmitNewOrder: (e: FormEvent) => void;
  handleChangeNewOrder: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  orderValues: {
    deviceManufacturer: string;
    deviceBrand: string;
    deviceType: string;
  };
  noteValues: {
    orderId: string | number;
    orderType: string;
    description: string;
  };
  onSubmitNewNote: (e: FormEvent) => void;
  handleChangeNewNote: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export const useAppContext = (): useAppContextOutput => {
  const [apiToken, setApiToken] = useState("");
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [status, setStatus] = useState([]);
  const [iphoneData, setIphoneData] = useState([]);
  const [phonePageCount, setIphonePageCount] = useState<number>(0);
  const [invoices, setInvoices] = useState([]);
  const [invoicePageCount, setInvoicePageCount] = useState<number>(0);
  const [orderValues, setOrderValues] = useState({
    deviceManufacturer: "",
    deviceBrand: "",
    deviceType: "",
  });
  const [noteValues, setNoteValues] = useState({
    orderId: "",
    orderType: "",
    description: "",
  });

  /****** Task 1 ******/

  useEffect(() => {
    var bodyFormData = new FormData();
    bodyFormData.append("Code", "78916132");
    axios({
      method: "post",
      url: "https://careers-api.fixably.com/token",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setApiToken(response.data.token);
        getDeviceOrders(response.data.token);
        getDeviceStatus(response.data.token);
        getInvoicedData(response.data.token);
        getIphoneData(response.data.token);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

  const handleRefreshToken = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("Code", "78916132");
    axios({
      method: "post",
      url: "https://careers-api.fixably.com/token",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setApiToken(response.data.token);
        getDeviceOrders(response.data.token);
        getDeviceStatus(response.data.token);
        getInvoicedData(response.data.token);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  /****** Task 2 ******/

  const getDeviceOrders = async (token: string) => {
    const headers = {
      "X-Fixably-Token": token,
    };
    axios
      .get(`https:careers-api.fixably.com/orders`, {
        headers,
      })
      .then(function (response: any) {
        setItems(response.data.results);
        const count = Math.ceil(response.data.total / 10);
        setItemsCount(count);
      });
  };

  const getDeviceStatus = async (token: string) => {
    const headers = {
      "X-Fixably-Token": token,
    };
    axios
      .get(`https:careers-api.fixably.com/statuses`, {
        headers,
      })
      .then(function (response: any) {
        setStatus(response.data);
      });
  };

  const fetchDeviceOrders = (currentPage: number) => {
    const headers = {
      "X-Fixably-Token": apiToken,
    };
    axios
      .get(`https:careers-api.fixably.com/orders?page=${currentPage}`, {
        headers,
      })
      .then(function (response: any) {
        setItems(response.data.results);
      });
  };
  const handlePageClick = (data: { selected: number }) => {
    let currentPage = data.selected + 1;
    fetchDeviceOrders(currentPage);
  };
  const sortedArray =
    items && items.sort((a: order2, b: order2) => b.status - a.status);

  const orders =
    sortedArray &&
    sortedArray.map((order: order) => {
      const item: status | undefined = status.find(
        (s: status) => s.id === order.status
      );
      if (item) {
        return {
          ...order,
          status: item["description"],
        };
      } else return { ...order };
    });

  /****** Task 3 ******/
  const getIphoneData = (apiToken: string) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Criteria", "iPhone");
    axios({
      method: "post",
      url: "https://careers-api.fixably.com/search/devices",
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": apiToken,
      },
    })
      .then(function (response) {
        //handle success
        setIphoneData(response.data.results);
        const count = Math.ceil(response.data.total / 10);
        setIphonePageCount(count);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  const fetchDeviceIphone = (currentPage: number) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Criteria", "iPhone");
    axios({
      method: "post",
      url: `https://careers-api.fixably.com/search/devices?page=${currentPage}`,
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": apiToken,
      },
    }).then(function (response: any) {
      setIphoneData(response.data.results);
    });
  };
  const handlePageClickIphone = (data: { selected: number }) => {
    let currentPage = data.selected + 1;
    fetchDeviceIphone(currentPage);
  };

  /****** Task 4 ******/

  const fetchDeviceInvoices = (currentPage: number) => {
    var date = {
      startDate: "2020-11-01",
      endData: "2020-11-30",
    };
    var bodyFormData = new FormData();
    bodyFormData.append("Code", "78916132");
    axios({
      method: "post",
      url: `https://careers-api.fixably.com/report/${date.startDate}/${date.endData}?page=${currentPage}`,
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": apiToken,
      },
    }).then(function (response: any) {
      setInvoices(response.data.results);
    });
  };

  const handlePageClickInvoices = (data: { selected: number }) => {
    let currentPage = data.selected + 1;
    fetchDeviceInvoices(currentPage);
  };

  const getInvoicedData = async (token: string) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Code", "78916132");
    axios({
      method: "post",
      url: "https://careers-api.fixably.com/report/2020-11-01/2020-11-30",
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": token,
      },
    })
      .then(function (response) {
        //handle success
        setInvoices(response.data.results);
        const count = Math.ceil(response.data.total / 10);
        setInvoicePageCount(count);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  /****** Task 5 ******/
  /* create a new order */
  const handleChangeNewOrder = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist();
    setOrderValues({ ...orderValues, [event.target.name]: event.target.value });
    console.log(orderValues);
  };
  const handleSubmitNewOrder = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("DeviceManufacturer", orderValues.deviceManufacturer);
    bodyFormData.append("DeviceBrand", orderValues.deviceBrand);
    bodyFormData.append("DeviceType", orderValues.deviceType);
    axios({
      method: "post",
      url: "https://careers-api.fixably.com/orders/create",
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": apiToken,
      },
    })
      .then(function (response) {
        //handle success
        setOrderValues({
          deviceManufacturer: "",
          deviceBrand: "",
          deviceType: "",
        });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  const onSubmitNewOrder = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitNewOrder();
  };

  /* create a new note to an existing order */
  const handleChangeNewNote = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist();
    setNoteValues({ ...noteValues, [event.target.name]: event.target.value });
  };
  const handleSubmitNewNote = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("Type", noteValues.orderType);
    bodyFormData.append("Description", noteValues.description);
    axios({
      method: "post",
      url: `https://careers-api.fixably.com/orders/${noteValues.orderId}/notes/create`,
      data: bodyFormData,
      headers: {
        "X-Fixably-Token": apiToken,
      },
    })
      .then(function (response) {
        //handle success
        setNoteValues({ orderId: "", orderType: "", description: "" });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setNoteValues({ orderId: "", orderType: "", description: "" });
      });
  };
  const onSubmitNewNote = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitNewNote();
  };
  return {
    orders,
    handlePageClick,
    itemsCount,
    iphoneData,
    phonePageCount,
    handlePageClickIphone,
    invoices,
    invoicePageCount,
    handlePageClickInvoices,
    apiToken,
    handleRefreshToken,
    orderValues,
    onSubmitNewOrder,
    handleChangeNewOrder,
    noteValues,
    onSubmitNewNote,
    handleChangeNewNote,
  };
};
