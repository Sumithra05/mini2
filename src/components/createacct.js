
import { useState } from "react";

export default function CreateAccount({ accounts, setAccounts }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    first: "",
    last: "",
    gender: "",
    dob: "",
    email: "",
    idType: "",
    aadhaar: "",
    accType: "",
    password: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newId, setNewId] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calculateAge(dob) {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.first ||
      !form.last ||
      !form.gender ||
      !form.dob ||
      !form.email ||
      !form.idType ||
      !form.accType ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    const age = calculateAge(form.dob);

    if (age < 18) {
      alert("Only 18+ allowed");
      return;
    }

    if (form.idType === "Aadhaar") {
      const aadhaarRegex = /^\d{12}$/;

      if (!aadhaarRegex.test(form.aadhaar)) {
        alert("Aadhaar number must be 12 digits");
        return;
      }
    }

    const id = Math.floor(100000000000 + Math.random() * 900000000000);

    const newAccount = {
      id,
      name: form.first + " " + form.last,
      gender: form.gender,
      dob: form.dob,
      age,
      email: form.email,
      idType: form.idType,
      aadhaar: form.aadhaar,
      type: form.accType,
      password: form.password,
      balance: 0,
      transactions: []
    };

    const updated = [...accounts, newAccount];

    setAccounts(updated);
    localStorage.setItem("accounts", JSON.stringify(updated));

    setNewId(id);
    setShowPopup(true);
  }

  return (
    <div className="create-page">
      <div className="card">

        {step === 1 && (
          <>
            <h2>Basic Details</h2>

            <input
              name="first"
              placeholder="First Name"
              value={form.first}
              onChange={handleChange}
              required
            />

            <input
              name="last"
              placeholder="Last Name"
              value={form.last}
              onChange={handleChange}
              required
            />

            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />

            <button onClick={() => setStep(2)}>Next ➜</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Account Details</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select name="idType" value={form.idType} onChange={handleChange} required>
              <option value="">ID Type</option>
              <option value="Aadhaar">Aadhaar</option>
            </select>

            {form.idType === "Aadhaar" && (
              <input
                name="aadhaar"
                placeholder="Aadhaar Number"
                value={form.aadhaar}
                onChange={handleChange}
                maxLength="12"
                required
              />
            )}

            <select name="accType" value={form.accType} onChange={handleChange} required>
              <option value="">Account Type</option>
              <option>Savings</option>
              <option>Current</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="btn-row">
              <button onClick={() => setStep(1)}>⬅ Back</button>
              <button onClick={handleSubmit}>Create</button>
            </div>
          </>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-box">
            <h3>Account Created 🎉</h3>
            <p>Account ID</p>
            <h2>{newId}</h2>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
