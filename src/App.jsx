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
import UserProfile from "./components/User_dasboard/UserProfile";
import UserNavbar from "./components/User_dasboard/UserNavbar";
import Help from "./components/User_dasboard/Help";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login/forgot-password" element={<ForgotPassword />} />
				<Route path="/login/sign-up" element={<SignUp />} />
				<Route path="/signed-in" element={<SignedIn />} />
					<Route
						path="/user-dashboard/*"
						element={
							<>
								<UserNavbar />
								<Routes>
									<Route path="" element={<User />} />
									<Route path="help" element={<Help />} />
									<Route path="profile" element={<UserProfile />} />
								</Routes>
							</>
						}
					/>
				<Route path="/crete-ride" element={<CreateRide />} />
				<Route path="/driver_dash" element={<Driver />} />
				<Route path="/show_rides" element={< Show_rides/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;