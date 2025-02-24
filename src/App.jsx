import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login_page/Login";
import ForgotPassword from "./components/Login_page/ForgotPassword_page/ForgotPassword";
import SignUp from "./components/Login_page/SignUp_page/SignUp";
import SignedIn from "./components/SignedIn/SignedIn";
import User from "./components/User_dasboard/User_dash"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login/forgot-password" element={<ForgotPassword />} />
				<Route path="/login/sign-up" element={<SignUp />} />
				<Route path="/signed-in" element={<SignedIn />} />
				<Route path="/user-dashboard" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
