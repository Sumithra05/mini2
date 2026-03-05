import { useNavigate } from "react-router-dom";

function AllData({ accounts, setAccounts }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const updatedAccounts = accounts.filter((acc) => acc.id !== id);
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  };

  return (
    <div className="allDataPage">
      <div className="allDataCard">
        <h2>All Account Data</h2>

        <table>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Name</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="4">No accounts found</td>
              </tr>
            ) : (
              accounts.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>{acc.name}</td>
                  <td>₹ {acc.balance}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/transactions/${acc.id}`)}
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(acc.id)}
                      style={{
                        marginLeft: "8px",
                        background: "crimson",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      X
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllData;