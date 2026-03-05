import { useState } from "react";

function Deposit({ accounts, setAccounts }) {
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [holderName, setHolderName] = useState("");
  const [pin, setPin] = useState("");

  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);

    const acc = accounts.find((a) => a.id == value);
    setHolderName(acc ? acc.name : "");
  };

  const handleDeposit = (e) => {
    e.preventDefault();

    const acc = accounts.find((a) => a.id == id);

    if (!acc || acc.password !== pin) {
      alert("Invalid Account ID or Password ❌");
      return;
    }

    const updated = accounts.map((a) =>
      a.id == id
        ? {
            ...a,
            balance: a.balance + Number(amount),
            transactions: [
              ...a.transactions,
              {
                type: "Deposit",
                amount: Number(amount),
                date: new Date().toLocaleString()
              }
            ]
          }
        : a
    );

    setAccounts(updated);
    localStorage.setItem("accounts", JSON.stringify(updated));

    alert("Deposit Successful 💰");

    setId("");
    setAmount("");
    setPin("");
    setHolderName("");
  };

  return (
    <div className="page-center">
      <div className="account-card">
        <h2>Deposit</h2>

        <form onSubmit={handleDeposit}>
          <input
            placeholder="Account ID"
            value={id}
            onChange={handleIdChange}
            required
          />

          <input
            placeholder="Account Holder"
            value={holderName}
            readOnly
          />

          <input
            type="password"
            placeholder="Password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button className="primary-btn">Deposit</button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
