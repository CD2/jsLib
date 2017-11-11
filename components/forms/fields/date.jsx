/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear, -1200)
const toMonth = new Date(currentYear + 10, 11)

const DAY_FORMAT = `DD/MM/YYYY`

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form
    onChange(new Date(year.value, month.value))
  }

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          (<option key={i} value={year}>
            {year}
          </option>)
        )}
      </select>
    </form>
  )
}

export default class Example extends React.Component {

  static propTypes = {
    date: PropTypes.number,
    disabled: PropTypes.bool,
    fromYear: PropTypes.number,
    localUtils: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  state = {
    month: fromMonth,
  };

  handleYearMonthChange = month => {
    this.setState({ month })
  };

  handleChange = (day) => {
    const { onChange, name } = this.props
    if (onChange) onChange({ name, value: day })
  }

  render() {
    const dayPickerProps = {
      todayButton: `Go to Today`,
      captionElement: <YearMonthForm disabled={this.props.disabled} onChange={this.handleYearMonthChange} />,
      fromMonth: fromMonth,
      toMonth: toMonth
    }
    return (
      <div className="YearNavigation">
        {JSON.stringify(this.props.value)}
        <DayPickerInput
          month={this.state.month}
          selectedDays={new Date(this.props.value)}
          dayPickerProps={dayPickerProps}
          disabled={this.props.disabled}
          enableOutsideDays
          format={DAY_FORMAT}
          onDayClick={this.handleChange}
          onChange={this.handleChange}
        />
      </div>
    )
  }

}
