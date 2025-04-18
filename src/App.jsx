import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login_page/Login";
import ForgotPassword from "./components/Login_page/ForgotPassword_page/ForgotPassword";
import SignUp from "./components/Login_page/SignUp_page/SignUp";
import SignedIn from "./components/SignedIn/SignedIn";
import User from "./components/User_dasboard/User_dash"
import CreateRide from "./components/driver_dash/CreateRide"
import Driver from "./components/driver_dash/Driver";
import Show_rides from "./components/Show_rides/Show_rides";
import Message from "./components/Message/Message";
import Notification from "./components/Notification/Notification";
import Help from "./components/User_dasboard/Help";
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
				<Route path="/driver_dash" element={<Driver />} />
				<Route path="/show_rides" element={< Show_rides/>} />
				<Route path="/message" element={<Message />} />
				<Route path="/notification" element={<Notification/>}/>
				<Route path="/help" element={<Help/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;