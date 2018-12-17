import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';



export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    //if current data exists then use it, otherwise, using default data
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //using existed time stamp or now moment()
      calendarFocused: false,
      error: ''
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    //if amount is empty or has number
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    //if createdAt exists, return createdAt, otherwise no change
    //it prevents user clear date input
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    //Check if user actually fill inputs
    if (!this.state.description || !this.state.amount) {
      //Set error state equal to 'Please provide description and amount'
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    } else {
      //clear error
      this.setState(() => ({ error: '' }));
      //Using function pass from AddExpensePage(parent)
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),     //valueof is moment method to get time stamp
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (<p>{this.state.error}</p>)}
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Description" autoFocus="true" value={this.state.description} onChange={this.onDescriptionChange}/>
          <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}/>
          <SingleDatePicker date={this.state.createdAt} onDateChange={this.onDateChange} focused={this.state.calendarFocused} onFocusChange={this.onFocusChange} numberOfMonths={1} isOutsideRange={() => false}/>
          <textarea placeholder="Add a note for your expense(optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}