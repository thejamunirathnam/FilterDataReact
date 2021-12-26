import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      <BrowserRouter >
         <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
