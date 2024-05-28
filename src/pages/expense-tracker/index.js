import { useState } from "react";
import { signOut } from "firebase/auth";
import useGetTransactions from "../../hooks/useGetTransactions";
import useAddTransaction from "../../hooks/ useAddTransaction";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";



import { auth } from "../../config/firebase-config";



export default function ExpenseTracker(){
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="expense-tracker flex flex-col items-center w-full min-h-screen bg-gray-900 py-10">
  <div className="container max-w-4xl bg-gray-800 shadow-lg rounded-lg p-8 w-full">
    <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">{name}'s Expense Tracker</h1>
    <div className="balance text-center mb-8">
      <h3 className="text-2xl font-semibold text-gray-400">Your Balance</h3>
      {balance >= 0 ? (
        <h2 className="text-4xl font-bold text-green-400">${balance}</h2>
      ) : (
        <h2 className="text-4xl font-bold text-red-400">-${Math.abs(balance)}</h2>
      )}
    </div>
    <div className="summary grid grid-cols-2 gap-6 mb-8">
      <div className="income bg-green-900 text-green-400 p-6 rounded-lg shadow-md text-center">
        <h4 className="text-xl font-medium">Income</h4>
        <p className="text-3xl font-bold">${income}</p>
      </div>
      <div className="expenses bg-red-900 text-red-400 p-6 rounded-lg shadow-md text-center">
        <h4 className="text-xl font-medium">Expenses</h4>
        <p className="text-3xl font-bold">${expenses}</p>
      </div>
    </div>
    <form className="add-transaction mb-8" onSubmit={onSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          required
          className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={transactionAmount}
          required
          className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="expense"
          value="expense"
          className="mr-2"
          checked={transactionType === "expense"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        <label htmlFor="expense" className="mr-4 text-gray-400">Expense</label>
        <input
          type="radio"
          id="income"
          value="income"
          className="mr-2"
          checked={transactionType === "income"}
          onChange={(e) => setTransactionType(e.target.value)}
        />
        <label htmlFor="income" className="text-gray-400">Income</label>
      </div>
      <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 transition-colors duration-300">Add Transaction</button>
    </form>
  </div>
  {profilePhoto && (
    <div className="profile flex flex-col items-center mt-6">
      <img className="profile-photo w-24 h-24 rounded-full mb-4 border-4 border-gray-600 shadow-lg" src={profilePhoto} alt="Profile" />
      <button className="sign-out-button bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300" onClick={signUserOut}>Sign Out</button>
    </div>
  )}
  <div className="transactions w-full max-w-4xl mt-10">
    <h3 className="text-3xl font-semibold text-center mb-6 text-gray-100">Transactions</h3>
    <ul className="space-y-4">
      {transactions.map((transaction, index) => {
        const { description, transactionAmount, transactionType } = transaction;
        return (
          <li key={index} className="bg-gray-800 shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium text-gray-100">{description}</h4>
              <p className="text-gray-400">${transactionAmount}</p>
            </div>
            <span className={`text-xl font-semibold ${transactionType === "expense" ? "text-red-400" : "text-green-400"}`}>
              {transactionType}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
</div>


    </>
  );
};