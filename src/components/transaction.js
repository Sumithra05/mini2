import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function TransactionHistory({ accounts = [] }) {

  const { id } = useParams();

  const account = accounts.find(acc => String(acc?.id) === id);

  if (!account) return <h2 style={{color:"white"}}>Account Not Found</h2>;

  const downloadPDF = () => {

    if (!account.transactions || account.transactions.length === 0) {
      alert("No transactions to download");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Transaction History", 14, 15);

    doc.setFontSize(12);
    doc.text(`Name: ${account.name}`, 14, 25);
    doc.text(`Account ID: ${account.id}`, 14, 32);
    doc.text(`Current Balance: Rs. ${account.balance}`, 14, 39);

    const tableColumn = ["Type", "Amount", "Date"];
    const tableRows = [];

    account.transactions.forEach((t) => {
      const rowData = [
        t.type,
        `Rs. ${t.amount}`,
        t.date
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
    });

    doc.save(`Transaction_${account.name}_${account.id}.pdf`);
  };

  return (
    <div className="allDataPage">
      <div className="allDataCard">

        <h2>Transaction History</h2>

        <button
          onClick={downloadPDF}
          style={{
            marginBottom: "15px",
            padding: "8px 15px",
            background: "#f36e4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Download PDF
        </button>

        <p><b>Name:</b> {account.name}</p>
        <p><b>Account ID:</b> #{account.id}</p>
        <p><b>Current Balance:</b> ₹{account.balance}</p>

        <table style={{marginTop:"20px"}}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {!account.transactions || account.transactions.length === 0 ? (

              <tr>
                <td colSpan="3">No Transactions</td>
              </tr>

            ) : (

              account.transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.type}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.date}</td>
                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default TransactionHistory;