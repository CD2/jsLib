import React from "react"
import PropTypes from "prop-types"
import { Form, Input, Submit } from "lib/components/forms"
import { observer } from "mobx-react"
import { styled } from "lib/utils/theme"

@styled`
  position: relative;
  .filter-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 9px 20px;
    margin: 2px;
    height: 38px;
  }
`
@observer
export class IndexFilters extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    filterText: PropTypes.string,
    query: PropTypes.object,
  }

  handleChange = e => {
    this.props.query.setSearchValue(e.name, e.value)
  }

  handleSubmit = () => {
    this.props.query.fetch()
  }

  render() {
    return (
      <Form className={this.props.className} onSubmit={this.handleSubmit}>
        <Input
          name="search"
          placeholder={this.props.filterText || `Filter...`}
          value={this.props.query.getSearchValue(`search`)}
          onChange={this.handleChange}
        />
        <Submit className="filter-button" value="Search" />
      </Form>
    )
  }
}
export default IndexFilters
