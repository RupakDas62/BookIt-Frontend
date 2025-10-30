// import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExperienceDetails from "./pages/ExperienceDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Header /> */}
      <Route path="/" element={<Home />} />
      <Route path="/experience/:id" element={<ExperienceDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
