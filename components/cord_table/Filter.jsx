import React from "react"
import PropTypes from "prop-types"
import { Input } from "lib/components/forms"
import { styled, t } from "lib/utils/theme"
import { observer, inject } from "mobx-react"

@styled`
  position: relative;
  cursor: pointer;
  > div {
    position: absolute;
    padding: ${t(`gutterWidth`, w => w / 2)}px;
  }
  .input-filter:last-child {
    margin-bottom: 0;
  }
`
@inject(`query`)
@observer
export class TableFilter extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    filter: PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.object,
    }).isRequired,
    name: PropTypes.string,
    query: PropTypes.obj,
    selected: PropTypes.array,
  }

  handleChange = option => {
    this.props.query.handleFilterChange(this.props.name, option)
  }

  get selected() {
    return this.props.query.getFilterState(this.props.name)
  }

  renderCheckboxFilter() {
    const { filter: { options } } = this.props
    return (
      <div className={this.props.className}>
        <div>
          {Object.entries(options).map(([option, display_name]) => (
            <Input
              key={option}
              name={option}
              labelText={display_name}
              type="checkbox"
              checked={this.selected.get(option)}
              onChange={this.handleChange.bind(this, option)}
            />
          ))}
        </div>
      </div>
    )
  }

  handleRadioChange = option => {
    this.props.query.setFilter(this.props.name, [option])
  }

  renderRadiosFilter() {
    const { filter: { options } } = this.props
    return (
      <div className={this.props.className}>
        <div>
          {Object.entries(options).map(([option, display_name]) => (
            <Input
              key={option}
              name={option}
              labelText={display_name}
              type="checkbox"
              checked={this.selected.get(option)}
              onChange={this.handleRadioChange.bind(this, option)}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const { type } = this.props.filter
    if (type === `checkboxes`) return this.renderCheckboxFilter()
    // if (type==='radios') return this.renderRadiosFilter()
    return <div>unknown filter type</div>
  }
}
export default TableFilter
