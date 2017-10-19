import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

const types = {
  search: require(`./filter_types/search`).default,
  select: require(`./filter_types/select`).default,
}

@styled`
  background: ${t(`secondary`)};
  padding: 0 18px;
  left: 0;
  width: 100%;
  z-index: 2;
`
export default class ColumnFilter extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([`search`])
  }

  state = {
    value: ``,
    selected: [],
  }

  getComponent(type) {
    return types[type]
  }

  render() {
    const Component = this.getComponent(this.props.type)
    return (
      <div className={this.props.className}>
        <Component {...this.props} />
      </div>
    )
  }

}
