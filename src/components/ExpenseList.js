import React from "react";
import ExpItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses,handleClearExpenses,handleEdit,handleDelete }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (<ExpItem key={expense.id} expense={expense}  handleEdit = {handleEdit}
          handleDelete = {handleDelete}/>);
        })}
      </ul>

      {expenses.length > 0 && (
        <button className="btn" onClick={()=>handleClearExpenses}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
