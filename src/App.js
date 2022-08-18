import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";


function App() {
	return (
		<div className='App'>
			<Navigation />
			<Routes>
				<Route path='/' element={<Home />} />

				{/* <Route path='/about' element={<ProtectedRoute>
												<About />
												</ProtectedRoute>
											} /> */}

				<Route element={<ProtectedRoute/>}>
					<Route path="/profile" element={<Profile/>}/>
				</Route>

				<Route path='/signup' element={<Signup/>}/>
				<Route path="/login" element={<Login/>}/>
			</Routes>
		</div>
	);
}

export default App;
