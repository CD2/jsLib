import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

export class DateTime extends React.Component {
  static propTypes = {
    date: PropTypes.any,
    format: PropTypes.string,
  }

  static defaultProps = {
    format: `short_date`,
  }

  predefinedFormats = {
    short_date: `DD MMM YYYY`,
    long_date: `Do MMMM YYYY`,
    with_time: `H:mm - DD MMM YYYY`,
  }

  dateToday(){
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    const yyyy = today.getFullYear()
    dd = dd<10 ? `0${dd}` : dd
    mm = mm<10 ? `0${mm}` : mm
    return `${yyyy}-${mm}-${dd}`
  }

  render() {
    let { format } = this.props
    format = this.predefinedFormats[format] || format
    const datestring = moment(this.props.date).format(format)
    return <span>{datestring}</span>
  }
}

// YEAR, MONTH, DAY
// YYYY        2014            4 or 2 digit year
// YY          14              2 digit year
// Y           -25             Year with any number of digits and sign
// Q           1..4            Quarter of year. Sets month to first month in quarter.
// M MM        1..12           Month number
// MMM MMMM    Jan..December   Month name in locale set by moment.locale()
// D DD        1..31           Day of month
// Do          1st..31st       Day of month with ordinal
// DDD DDDD    1..365          Day of year
// X           1410715640.579  Unix timestamp
// x           1410715640579   Unix ms timestamp
//
//
// WEEK YEAR, WEEK, WEEKDAY (aka not useful)
// gggg       2014          Locale 4 digit week year
// gg         14            Locale 2 digit week year
// w ww       1..53         Locale week of year
// e          0..6          Locale day of week
// ddd dddd   Mon...Sunday  Day name in locale set by moment.locale()
// GGGG       2014          ISO 4 digit week year
// GG         14            ISO 2 digit week year
// W WW       1..53         ISO week of year
// E          1..7          ISO day of week
//
//
// Hour, minute, second, millisecond, and offset tokens
// Input	     Example     Description
// H HH       0..23       Hours (24 hour time)
// h hh       1..12       Hours (12 hour time used with a A.)
// k kk       1..24       Hours (24 hour time from 1 to 24)
// a A        am pm       Post or ante meridian
// m mm       0..59       Minutes
// s ss       0..59       Seconds
// S SS SSS   0..999      Fractional seconds
// Z ZZ       +12:00      Offset from UTC as +-HH:mm, +-HHmm, or Z

export default DateTime
