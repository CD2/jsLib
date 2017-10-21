/* eslint-disable react/prop-types */
import React from 'react'
import DayPicker from 'react-day-picker'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import 'react-day-picker/lib/style.css'
import PropTypes from 'prop-types'

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear, -10)
const toMonth = new Date(currentYear + 10, 11)

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1)  years.push(i)

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.parentNode.children
    onChange(new Date(year.value, month.value))
  }

  return (
    <div className="DayPicker-Caption">
      <select name="month" value={date.getMonth()} onChange={handleChange}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" value={date.getFullYear()} onChange={handleChange}>
        {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
      </select>
    </div>
  )
}

@observer
export default class Example extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number,
  }

  // noinspection JSAnnotator
  @observable month: fromMonth

  handleYearMonthChange = month => {
    this.month = month
  };
  handleChange = (day) => {
    const { onChange, name } = this.props
    if (onChange) onChange({ name, value: day })
  }
  render() {
    return (
      <div className="YearNavigation">
        <DayPicker
          todayButton="Go to Today"
          month={this.month}
          selectedDays={new Date(this.props.value)}
          fromMonth={fromMonth}
          toMonth={toMonth}
          captionElement={
            <YearMonthForm onChange={this.handleYearMonthChange} />
          }
          enableOutsideDays
          onChange={this.handleChange}
          onDayClick={this.handleChange}
        />
      </div>
    )
  }

}
