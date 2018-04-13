import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable } from "mobx"

@observer
export default class Accordian extends React.Component {
  static propTypes = {
    heading: PropTypes.node,
    rows: PropTypes.array,
  }

  @observable open = false

  render() {
    return (
      <React.Fragment>
        <div
          onClick={() => {
            this.open = !this.open
          }}
        >
          {this.props.heading}
        </div>
        {this.open && this.props.rows.map((row, i) => <div key={i}>{row}</div>)}
      </React.Fragment>
    )
  }
}

