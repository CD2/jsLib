// import React from 'react'
// import PropTypes from 'prop-types'
//
// export default class DateField extends React.Component {
//
//   static propTypes = {
//     onChange: PropTypes.func,
//     onRawChange: PropTypes.func,
//     onKeyPress: PropTypes.func,
//     onFocus: PropTypes.func,
//     name: PropTypes.string,
//     placeholder: PropTypes.string,
//     initialValue: PropTypes.string,
//     type: PropTypes.string,
//   }
//
//   handleChange = (e) => {
//     const { onRawChange, onChange } = this.props
//     if (onRawChange) onRawChange(e)
//     if (onChange) onChange({name: e.target.name, value: e.target.value})
//   }
//
//   render() {
//     const { name, value, placeholder, initialValue, onFocus, type, onKeyPress } = this.props;
//
//     return (
//       <input
//         type={type || 'text'}
//         name={name}
//         defaultValue={initialValue}
//         value={value || ''}
//         placeholder={placeholder}
//         onChange={this.handleChange}
//         onFocus={onFocus}
//         onKeyPress={onKeyPress}
//       />
//     )
//   }
// }
//



import React from 'react';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, -10);
const toMonth = new Date(currentYear + 10, 11);

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1)  years.push(i);

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
      </select>
    </form>
  );
}

export default class Example extends React.Component {
  state = {
    month: fromMonth,
  };
  handleYearMonthChange = month => {
    this.setState({ month });
  };
  handleChange = (day) => {
    const { onChange, name } = this.props
    console.log(day)
    if (onChange) onChange({name, value: day})
  }
  render() {
    return (
      <div className="YearNavigation">
        {JSON.stringify(this.props.value)}
        <DayPicker
          enableOutsideDays
          todayButton="Go to Today"
          onDayClick={this.handleChange}
          month={this.state.month}
          onChange={this.handleChange}
          selectedDays={new Date(this.props.value)}
          fromMonth={fromMonth}
          toMonth={toMonth}
          captionElement={
            <YearMonthForm onChange={this.handleYearMonthChange} />
          }
        />
      </div>
    );
  }
}
