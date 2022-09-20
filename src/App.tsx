import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Task3 from "./pages/Task3";
import Task4 from "./pages/Task4";
import Task5 from "./pages/Task5";

const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
          <Route path="/task3" element={<Task3 />} />
          <Route path="/task4" element={<Task4 />} />
          <Route path="/task5" element={<Task5 />} />
        </Routes>
    </>
  );
};

export default App;
