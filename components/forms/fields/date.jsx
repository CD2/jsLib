/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import moment from "moment"
import { DateUtils } from "react-day-picker"
import DayPickerInput from "react-day-picker/DayPickerInput"
import "react-day-picker/lib/style.css"

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear, -1200)
const toMonth = new Date(currentYear + 10, 11)
// const defaultTime = moment(new Date()).subtract(25, `years`)
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
      <select name="month" value={date.getMonth()} onChange={handleChange}>
        {months.map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" value={date.getFullYear()} onChange={handleChange}>
        {years.map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  )
}

@observer
export default class Example extends React.Component {
  static propTypes = {
    asDateString: PropTypes.bool,
    date: PropTypes.number,
    disabled: PropTypes.bool,
    fromYear: PropTypes.number,
    localUtils: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  @observable asDateString = false
  @observable day = this.props.value ? new Date(this.props.value) : new Date()
  @observable month = this.props.value ? new Date(this.props.value) : new Date()

  @action
  handleYearMonthChange = month => {
    this.month = month
    this.day = month
  }

  handleChange = day => {
    const { onChange, name, asDateString } = this.props
    if (onChange)
      onChange({ name, value: asDateString ? day.toDateString() : day })
  }

  getValue = () => {
    const valMoment = moment(this.props.value)
    const value = valMoment.isValid() ? valMoment : new moment()

    return value.format(DAY_FORMAT)
  }

  render() {
    const dayPickerProps = {
      todayButton: `Go to Today`,
      captionElement: (
        <YearMonthForm
          disabled={this.props.disabled}
          onChange={this.handleYearMonthChange}
        />
      ),
      fromMonth,
      toMonth,
      onChange: this.handleChange,
      onDayClick: this.handleChange,
      disabled: this.props.disabled,
      enableOutsideDays: true,
      month: this.month,
      modifiers: {
        selected: date => {
          return DateUtils.isSameDay(this.day, date)
        },
      },
    }

    return (
      <div className="YearNavigation">
        <DayPickerInput
          ref={ele => (this.dayPicker = ele)}
          dayPickerProps={dayPickerProps}
          value={this.getValue()}
          format={DAY_FORMAT}
        />
      </div>
    )
  }
}
