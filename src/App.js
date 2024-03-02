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
import TextField from "@mui/material/TextField";
import RestaurantSearchInput from "./components/search-input";
import {
  RestaurantContextProvider,
  useRestaurant,
} from "./context/RestuaurantContext";
import React, { useEffect } from "react";

// UP VOTE AND DOWN VOTE
function App() {

  useEffect(() => {
    // data.fetchRestaurant();
  }, []);

  // useContext(REsta)

  return (
    <div className="App">
      {/* <Voting /> */}
      <UserAuthContextProvider>
        <RestaurantContextProvider>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <div
                    style={{
                      padding: "5px",
                      border: "40%",
                      background: "#fff",
                      position: "absolute",
                      top: "4%",
                      zIndex: "10",
                      backgroundColor: "white",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* <RestaurantSearchInput /> */}
                  </div>
                  <Map/>
                  <Sidebar />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </RestaurantContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
