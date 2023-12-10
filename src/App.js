import logo from "./logo.svg";
import "./App.css";
import Voting from "./components/voting";
import Sidebar from "./layout/sidebar";
import { Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Signup from "./components/signup";
import Login from "./components/login";
import Map from "./components/map";
import TextField from '@mui/material/TextField';


// UP VOTE AND DOWN VOTE
function App() {

  return (
    <div className="App">
      {/* <Voting /> */}
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div>
                <TextField id="outlined-basic" label="Search restaurant" variant="outlined" style={{position:"absolute", top:"5%", zIndex:"100000", backgroundColor: "white", left: "50%", transform: "translate(-50%, -50%)"}}/>
                </div>
                <Map />
                <Sidebar />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>

    </div>
  );
}

export default App;
