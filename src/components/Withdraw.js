import { useState } from "react";

function Withdraw({ accounts, setAccounts }) {
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

  const handleWithdraw = (e) => {
    e.preventDefault();

    const acc = accounts.find((a) => a.id == id);

    if (!acc) {
      alert("Account not found ❌");
      return;
    }

    if (acc.password !== pin) {
      alert("Wrong Password ❌");
      return;
    }

    if (Number(amount) > acc.balance) {
      alert("Insufficient Balance ❌");
      return;
    }

    const updated = accounts.map((a) =>
      a.id == id
        ? {
            ...a,
            balance: a.balance - Number(amount),
            transactions: [
              ...a.transactions,
              {
                type: "Withdraw",
                amount: Number(amount),
                date: new Date().toLocaleString()
              }
            ]
          }
        : a
    );

    setAccounts(updated);
    localStorage.setItem("accounts", JSON.stringify(updated));

    alert("Withdraw Successful 💸");

    setId("");
    setAmount("");
    setPin("");
    setHolderName("");
  };

  return (
    <div className="page-center">
      <div className="account-card">
        <h2>Withdraw</h2>

        <form onSubmit={handleWithdraw} autoComplete="off">

          <input
            placeholder="Account ID"
            value={id}
            onChange={handleIdChange}
            autoComplete="off"
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
            autoComplete="new-password"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
            required
          />

          <button className="primary-btn">Withdraw</button>

        </form>
      </div>
    </div>
  );
}

export default Withdraw;