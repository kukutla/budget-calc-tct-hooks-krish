import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuid } from "uuid";

/* const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1000 },
  { id: uuid(), charge: "car payment", amount: 1500 },
  { id: uuid(), charge: "card bill", amount: 1200 },
]; */
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  /************** state values   **************/
  const [expenses, setExpenses] = useState(initialExpenses);
  /***       single charge */
  const [charge, setCharge] = useState("");
  /***       single amount */
  const [amount, setAmount] = useState("");
  /***       single edit */
  const [edit, setEdit] = useState(false);
  /***       single id */
  const [id, setId] = useState(0);
  /***       single submit */
  const [alert, setAlert] = useState({ show: false });
  /***************  functionality ************************ */

  useEffect(() => {
    console.log("useEffect called");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  //handle charge

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //handle amount

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert = ({ type, text }) => {
    console.log(type, text);
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge.length > 0 && amount > 0) {
      console.log(id, charge, amount);
      let singleExpense = "";
      if (edit) {
        //we can use fileter but to manage the previous order using map
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        handleAlert({ type: "success", text: "Item edited" });
      } else {
        singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item Added" });
      }
      setCharge("");
      setAmount("");
      setId(0);
      setEdit(false);
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and
         amount value has to be bigger 
         than zero`,
      });
    }
  };

  const handleClearExpenses = () => {
    console.log("handleClearExpenses");
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  const handleDelete = (id) => {
    const remExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(remExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  const handleEdit = (id) => {
    console.log("handleEdit", id);
    const expense = expenses.find((expense) => expense.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setId(expense.id);
    setEdit(true);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          edit={edit}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          expenses={expenses}
          handleClearExpenses={handleClearExpenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
