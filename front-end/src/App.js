import { Login } from "@mui/icons-material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import Home from "./Home";
import CreateClass from "./NgoPages/CreateClass";
import CreateOutlet from "./NgoPages/CreateOutlet";
import NgoDashboard from "./NgoPages/NgoDashboard";
import Register from "./NgoPages/Register";
import ShowClasses from "./UserPages/ShowClasses";
import ShowOutlets from "./UserPages/ShowOutlets";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/ngo-register" element={<Register />} />
          <Route path="/ngo-login" element={<Login />} />

          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/show-classes" element={<ShowClasses />} />
          <Route path="/show-outlets" element={<ShowOutlets />} />

          <Route path="/create-outlet" element={<CreateOutlet />} />
          <Route path="/create-class" element={<CreateClass />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
