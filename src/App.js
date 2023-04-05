/* 
1) Допишите код так, чтобы DatePicker был контролируемым компонентом.
2) При выборе даты в input'е, текст на ним должен обновляться и показывать выбранную дату
3) При нажатии на кнопку Reset date, input должен очищаться, а надпись становаиться 'Select date'
*/

import React from 'react';
import './style.css';

class DatePicker extends React.Component {
  inputRef = null;

  componentDidMount() {
    $(this.inputRef).datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: this.handleDateChange,
    });
    $(this.inputRef).datepicker('setDate', this.props.value || '');
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      $(this.inputRef).datepicker('setDate', this.props.value || '');
    }
  }

  handleDateChange = (date) => {
    this.props.onDateChange(date);
  };

  render() {
    return (
      <input
        ref={(domElement) => {
          this.inputRef = domElement;
        }}
        value={this.props.value}
        onChange={this.handleDateChange}
        className="date-picker"
      />
    );
  }
}

export default class App extends React.Component {
  state = {
    date: '1/4/2023',
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleResetClick = () => {
    this.setState({ date: '' });
  };

  render() {
    return (
      <div className="container">
        <div>{this.state.date ? `Date: ${this.state.date}` : 'Select date'}</div>
        <div className="date-picker-container">
          <DatePicker value={this.state.date} onDateChange={this.handleDateChange} />
        </div>
        <div className="btn-container">
          <button onClick={this.handleResetClick} className="btn">
            Reset date
          </button>
        </div>
      </div>
    );
  }
}
