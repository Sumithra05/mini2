
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/Home";
import CreateAccount from "./components/createacct";
import Deposit from "./components/Deposite";
import Withdraw from "./components/Withdraw";
import AllData from "./components/Alldata";
import TransactionHistory from "./components/transaction";
import Login from "./components/login";

function AppContent() {

  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("accounts"));
    if (data) setAccounts(data);
  }, []);

// useEffect(() => {
//   localStorage.clear();
// }, []);

const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="nav-left">
          <Link to="/"><button>Home</button></Link>

          {!isLoggedIn && (
            <Link to="/login"><button>Login</button></Link>
          )}

          {isLoggedIn && (
            <button onClick={handleLogout}>Logout</button>
          )}

          <Link to="/create"><button>Create Account</button></Link>
          <Link to="/deposit"><button>Deposit</button></Link>
          <Link to="/withdraw"><button>Withdraw</button></Link>
          <Link to="/all"><button>All Data</button></Link>
        </div>

        <div className="nav-right">
          <h2>🏦 FinoraBank</h2>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create" element={<CreateAccount accounts={accounts} setAccounts={setAccounts} />} />
        <Route path="/deposit" element={<Deposit accounts={accounts} setAccounts={setAccounts} />} />
        <Route path="/withdraw" element={<Withdraw accounts={accounts} setAccounts={setAccounts} />} />

        <Route 
          path="/all" 
          element={<AllData accounts={accounts} setAccounts={setAccounts} />} 
        />

        <Route 
          path="/transactions/:id" 
          element={<TransactionHistory accounts={accounts} />} 
        />
      </Routes>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}