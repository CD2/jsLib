import React from 'react'

export default class ColumnFilterSearch extends React.Component {

  state = {
    value: ``,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    // TODO
  }

  handleKeyPress = (e) => {
    if (e.key === `Enter`) this.handleSubmit()
  }

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Apply</button>
      </div>
    )
  }

}
