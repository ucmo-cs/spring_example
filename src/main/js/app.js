import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ListComponent from "./components/ListComponent";
import AddComponent from "./components/AddComponent";
import EditComponent from "./components/EditComponent";

function App() {
	return (
		<div className="container">
			<Router>
				<div className="col-md-6">
					<h1 className="text-center" style={style}>React Car Application</h1>
					<Routes>
						<Route path="/" element={<ListComponent />} exact />
						<Route path="/list" element={<ListComponent />} />
						<Route path="/add" element={<AddComponent />} />
						<Route path="/edit" element={<EditComponent />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

const style = {
	color: 'red',
	margin: '10px'
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("react"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

