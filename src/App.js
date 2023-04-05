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
      <React.Fragment>
        <div>
          {this.state.date ? `Date: ${this.state.date}` : 'Select date'}{' '}
        </div>
        <div>
          <DatePicker value={this.state.date} onDateChange={this.handleDateChange} />
        </div>
        <div>
          <button onClick={this.handleResetClick}>Reset date</button>
        </div>
      </React.Fragment>
    );
  }
}
