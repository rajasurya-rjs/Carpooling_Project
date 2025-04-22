import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login_page/Login";
import ForgotPassword from "./components/Login_page/ForgotPassword_page/ForgotPassword";
import SignUp from "./components/Login_page/SignUp_page/SignUp";
import SignedIn from "./components/SignedIn/SignedIn";
import User from "./components/User_dasboard/User_dash";
import CreateRide from "./components/driver_dash/CreateRide";
import Driver from "./components/driver_dash/Driver";
import Show_rides from "./components/Show_rides/Show_rides";
import Message from "./components/Message/Message";
import Notification from "./components/Notification/Notification";
import Help from "./components/User_dasboard/Help";
import UserProfile from "./components/User_dasboard/UserProfile";
import DriverProfile from "./components/driver_dash/DriverProfile";
import Show_rides_card from "./components/Show_rides/Show_rides_card";
import UserdashMyrides from "./components/User_dasboard/UserdashMyrides/UserdashMyrides";
import Usermyridescard from "./components/User_dasboard/UserdashMyrides/Usermyridescard";
import UserNavbar from "./components/User_dasboard/UserNavbar";
import DriverNavbar from "./components/driver_dash/DriverNavbar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/sign-up" element={<SignUp />} />
        <Route path="/signed-in" element={<SignedIn />} />
        <Route path="/user-dashboard" element={<User />} />
        <Route path="/crete-ride" element={<CreateRide />} />
        <Route
          path="/user-dashboard/*"
          element={
            <>
              <UserNavbar />
              <Routes>
                <Route path="" element={<User />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="help" element={<Help />} />
                <Route path="notification" element={<Notification />} />
                <Route
                  path="myrides"
                  element={
                    <>
                      <Routes>
                        <Route path="" element={<UserdashMyrides />} />
                        <Route path="card" element={<Usermyridescard />} />
                      </Routes>
                    </>
                  }
                />
              </Routes>
            </>
          }
        />
        <Route
          path="/driver-dashboard/*"
          element={
            <>
              <DriverNavbar />
              <Routes>
                <Route path="" element={<Driver />} />
                <Route path="create-ride" element={<CreateRide />} />
                <Route path="notification" element={<Notification />} />
                <Route path="help" element={<Help />} />
                <Route path="profile" element={<DriverProfile />} />
				<Route path="message" element={<Message />} />
              </Routes>
            </>
          }
        />
        <Route path="/show_rides" element={<Show_rides />} />
        {/* <Route path="/DriverProfile" element={<DriverProfile />} /> */}
        <Route path="/showridescard" element={<Show_rides_card />} />
        <Route path="/userdashmyrides" element={<UserdashMyrides />} />
        <Route path="/userdashcard" element={<Usermyridescard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
