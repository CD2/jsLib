import React from 'react'

export default class ColumnFilterSearch extends React.Component {

  static propTypes = {

  }

  state = {
    value: ``,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {

  }

  handleKeyPress = (e) => {
    if (e.key === `Enter`) this.handleSubmit()
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.value} onKeyPress={this.handleKeyPress} />
        <button onClick={this.handleSubmit}>Apply</button>
      </div>
    )
  }

}
