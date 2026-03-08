

import { useNavigate } from "react-router-dom";

function AllData({ accounts }) {

  const navigate = useNavigate();

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