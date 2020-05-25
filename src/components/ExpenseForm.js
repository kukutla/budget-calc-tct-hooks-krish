import React from "react";
import { MdSend, MdModeEdit } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  edit,
  handleCharge,
  handleAmount,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            name="charge"
            id="charge"
            value={charge}
            placeholder="e.g. rent"
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={amount}
            id="amount"
            onChange={handleAmount}
            placeholder="e.g. 100"
          />
        </div>
      </div>
      {edit ? (
        <button className="btn">
          edit
          <MdModeEdit className="btn-icon" />
        </button>
      ) : (
        <button className="btn">
          submit
          <MdSend className="btn-icon" />
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
