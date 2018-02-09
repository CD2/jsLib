import React from "react"
import PropTypes from "prop-types"
import PaginationControls from "./pagination_controls"

import { observable, computed, action, toJS } from "mobx"
import { observer, Provider } from "mobx-react"
import { styled, t } from "lib/utils/theme"

import Th from "./Th"
import Input from "lib/components/forms/input"
import Button from "lib/components/button"
import ModalStore from "lib/utils/modal_store"

@styled`
  font-size: 0.9em;
  tbody tr {
    ${({ noLinks }) => {
      if (!noLinks) {
        return `
          cursor: pointer;
          &:hover {
            background: #f3f7fb;
          }
    `
      }
    }}
  }
  tr {
    background: white;
    &:hover {
      background: white;
    }
  }
  th{
    padding: ${t(`gutterWidth`, w => w / 2)}px;
    white-space: nowrap;
    text-align: left;
    border-bottom: 2px solid ${t(`border`)};

    ${({ darkHead }) => {
      if (darkHead) {
        return `
          background-color: rgb(27, 27, 31);
          color: white;
          border: 0;
        `
      }
    }}
  }

  .background-image {
    border-radius: 5px;
  }
  td {
    padding: ${t(`gutterWidth`, w => w / 4)}px ${t(
  `gutterWidth`,
  w => w / 2,
)}px;
    height: 48px;
    &.primary { font-weight: 600 }
  }
  th:last-child, td:last-child {
    text-align: right;
  }
  .nowrap {
    white-space: nowrap;
  }
  .table__container {
    border-radius: ${t(`borderRadii.table`)};
    overflow: hidden;
    box-shadow: ${t(`shadow0`)};
  }
  .thumb-column { width: 70px; }
  .placeholder {
    border-radius: 7px;
    height: 14px;
    background: #efefef;
    width: 75%;
    display: inline-block;
    &.small {
      width: 50%;
    }
    &.large {
      width: 100%;
    }
  }
`
@observer
export default class IndexTable extends React.Component {
  static propTypes = {
    bulkActions: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.string.isRequired,
        cord: PropTypes.object,
        text: PropTypes.string,
        formatPayload: PropTypes.func.isRequired,
        onSuccess: PropTypes.func,
        onSubmit: PropTypes.func,
        modalConfirmationText: PropTypes.string,
      }),
    ),
    className: PropTypes.string,
    darkHead: PropTypes.bool,
    headings: PropTypes.node,
    ids: PropTypes.array,
    paginationPosition: PropTypes.string,
    paginationStyle: PropTypes.object,
    query: PropTypes.object,
    row: PropTypes.func,
    rowProps: PropTypes.object,
    storePageName: PropTypes.string,
  }

  static defaultProps = {
    bulkActions: null,
    rowProps: {},
    ids: null,
    paginationPosition: `top`,
    storePageName: null,
  }

  @observable page = 1
  @observable per_page = 20
  // bulk state
  @observable bulkAllToggled = false
  @observable bulkSelected = []

  @action
  handleToggleAllBulk = () => {
    this.bulkAllToggled = !this.bulkAllToggled
    this.bulkSelected.replace(this.bulkAllToggled ? this.paginated_ids : [])
  }

  @action
  handleToggleBulkItem = id => {
    if (this.bulkSelected.includes(id)) {
      this.bulkSelected.replace(
        this.bulkSelected.filter(selectedId => selectedId !== id),
      )
    } else {
      this.bulkSelected.push(id)
    }
  }

  performAction = (action, payload) => {
    return action.cord.perform(action.action, payload).then(response => {
      action.onSuccess && action.onSuccess()
      action.reloadRecord && action.reloadRecord()
      ModalStore.clear()
    })
  }

  handleBulkActionSubmit = action => {
    const { onSubmit, formatPayload } = action

    if (onSubmit) return onSubmit(this.bulkSelected)
    const payload = formatPayload
      ? formatPayload(toJS(this.bulkSelected))
      : toJS(this.bulkSelected)
    this.performAction(action, payload)
  }

  handleBulkAction = action => {
    if (!this.bulkSelected) return
    if (action.modalConfirmationText) {
      ModalStore.addItem(
        <div>
          <p>{action.modalConfirmationText}</p>
          <Button onClick={() => this.handleBulkActionSubmit(action)}>
            Proceed
          </Button>
        </div>,
      )
    } else {
      this.handleBulkActionSubmit(action)
    }
  }

  @computed
  get total_items() {
    return this.props && this.props.ids
      ? this.props.ids.length
      : this.props.query.ids.length
  }

  @computed
  get paginated_ids() {
    const start = (this.page - 1) * this.per_page
    const end = start + this.per_page
    const ids = this.props.ids || this.props.query.ids

    return ids.slice(start, end)
  }

  @action handlePageChange = page => (this.page = page)

  @computed
  get pagination_controls() {
    return (
      <PaginationControls
        storePageName={this.props.storePageName}
        page={this.page}
        per_page={this.per_page}
        total_items={this.total_items}
        onPageChange={this.handlePageChange}
        style={this.props.paginationStyle}
      />
    )
  }

  renderBulkAction = (action, index) => (
    <Button key={index} onClick={() => this.handleBulkAction(action)}>
      {action.text}
    </Button>
  )

  renderBulkActions = () => (
    <div>{this.props.bulkActions.map(this.renderBulkAction)}</div>
  )

  renderRow = id => {
    let bulkColumn = null

    if (this.props.bulkActions) {
      bulkColumn = (
        <td onClick={e => e.stopPropagation()}>
          <Input
            name="headerCheck"
            type="checkbox"
            value={this.bulkSelected.includes(id)}
            onChange={() => this.handleToggleBulkItem(id)}
          />
        </td>
      )
    }

    return (
      <this.props.row
        key={id}
        id={id}
        {...{ ...this.props.rowProps, bulkColumn }}
      />
    )
  }

  renderBulkHeader = () => {
    const { headings } = this.props
    const bulkHeading = (
      <Th key="bulk">
        <Input
          name="headerCheck"
          type="checkbox"
          value={this.bulkAllToggled}
          onChange={this.handleToggleAllBulk}
        />
      </Th>
    )

    return React.cloneElement(headings, headings.props, [
      bulkHeading,
      ...headings.props.children,
    ])
  }

  render() {
    const { paginationPosition, bulkActions, headings } = this.props
    return (
      <div className={this.props.className}>
        {this.props.bulkActions ? this.renderBulkActions() : null}
        {paginationPosition !== `bottom` && this.pagination_controls}
        <Provider query={this.props.query}>
          <div className="table__container">
            <table>
              {bulkActions ? [this.renderBulkHeader(), ...headings] : headings}
              <tbody>{this.paginated_ids.map(this.renderRow)}</tbody>
            </table>
          </div>
        </Provider>

        {paginationPosition !== `top` && this.pagination_controls}
      </div>
    )
  }
}
