import React from "react"
import PropTypes from "prop-types"
import PaginationControls from "./pagination_controls"
import { observable, computed, action } from "mobx"
import { observer } from "mobx-react"
import { styled, t } from "lib/utils/theme"
import IndexFilters from "./IndexFilters"
import decorate from "lib/utils/decorate"
import Th from "./Th"
import Input from "lib/components/forms/input"
import Button from "lib/components/button"
import ModalStore from "lib/utils/modal_store"
import Popover from "../popover"
import Grid from "../grid/index"

export class Table extends React.Component {
  static propTypes = {
    bulkActions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        onSuccess: PropTypes.func,
        onSubmit: PropTypes.func,
        modalConfirmationText: PropTypes.string,
      }),
    ),
    className: PropTypes.string,
    headings: PropTypes.node,
    ids: PropTypes.array,
    noResultsPanel: PropTypes.object,
    paginationPosition: PropTypes.string,
    perPage: PropTypes.number,
    query: PropTypes.object,
    row: PropTypes.func,
    rowProps: PropTypes.object,
    searchBar: PropTypes.bool,
    storePageName: PropTypes.string,
  }

  static defaultProps = {
    bulkActions: null,
    rowProps: {},
    ids: null,
    storePageName: null,
    searchBar: true,
  }

  @observable page = 1
  @observable per_page = this.props.perPage || 20
  // bulk state
  @observable bulkAllToggled = false
  @observable bulkSelected = []

  @observable batchActionPanelOpen = false

  @action
  handleToggleAllBulk = () => {
    this.bulkAllToggled = !this.bulkAllToggled
    this.bulkSelected.replace(this.bulkAllToggled ? this.paginated_ids : [])
  }

  @action
  handleToggleBulkItem = id => {
    if (this.bulkSelected.includes(id)) {
      this.bulkSelected.replace(this.bulkSelected.filter(selectedId => selectedId !== id))
    } else {
      this.bulkSelected.push(id)
    }
  }

  @action handleBatchPanelOpen = () => (this.batchActionPanelOpen = true)
  @action handleBatchPanelClose = () => (this.batchActionPanelOpen = false)

  handleBulkActionSubmit = action => {
    action.onSubmit(this.bulkSelected.toJS())
  }

  handleBatchAction = action => {
    if (!this.bulkSelected) return
    if (action.modalConfirmationText) {
      ModalStore.addItem(
        <div>
          <p>{action.modalConfirmationText}</p>
          <Button onClick={() => this.handleBulkActionSubmit(action)}>Proceed</Button>
        </div>,
      )
    } else {
      this.handleBulkActionSubmit(action)
    }
  }

  @computed
  get total_items() {
    return this.props && this.props.ids ? this.props.ids.length : this.props.query.ids.length
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
      />
    )
  }

  renderBulkActions = () => {
    return (
      <div>
        <Button buttonStyle="gradient-neutral" onClick={this.handleBatchPanelOpen}>
          Bulk actions
        </Button>
        <Popover
          open={this.batchActionPanelOpen}
          className="bulk-action-menu"
          closeOnOutsideClick
          onToggle={this.handleBatchPanelClose}
        >
          <div>
            {this.props.bulkActions.map((action, i) => (
              <Button
                key={i}
                buttonStyle="menu"
                onClick={this.handleBatchAction.bind(this, action)}
              >
                {action.text}
              </Button>
            ))}
          </div>
        </Popover>
      </div>
    )
  }

  renderRow = id => {
    let bulkColumn = null

    if (this.props.bulkActions) {
      bulkColumn = (
        <td className="checkbox-column" onClick={e => e.stopPropagation()}>
          <Input
            name="headerCheck"
            type="checkbox"
            value={this.bulkSelected.includes(id)}
            onChange={() => this.handleToggleBulkItem(id)}
          />
        </td>
      )
    }

    return <this.props.row key={id} id={id} {...this.props.rowProps} bulkColumn={bulkColumn} />
  }

  renderBulkHeader = () => {
    const { headings } = this.props
    const bulkHeading = (
      <Th key={-1} className="checkbox-column">
        <Input
          name="headerCheck"
          type="checkbox"
          value={this.bulkAllToggled}
          onChange={this.handleToggleAllBulk}
        />
      </Th>
    )

    return React.cloneElement(headings, headings.props, [bulkHeading, ...headings.props.children])
  }

  render() {
    const { paginationPosition, bulkActions, headings, query, searchBar } = this.props
    return (
      <div className={this.props.className}>
        <Grid columns={2} className={this.props.bulkActions && `table-actions`}>
          <Grid.Item>
            {this.props.bulkActions && this.bulkSelected.length ? this.renderBulkActions() : null}
          </Grid.Item>
          <Grid.Item>
            {searchBar && query && <IndexFilters query={query} />}
            {/* SHANE IT IS HERE - cheers bud */}
          </Grid.Item>
        </Grid>
        {paginationPosition !== `bottom` && this.pagination_controls}
        <div className="table__container">
          {this.props.noResultsPanel && this.props.ids.length === 0 ? (
            this.props.noResultsPanel
          ) : (
            <table>
              {bulkActions ? [this.renderBulkHeader(), ...headings] : headings}
              <tbody>{this.paginated_ids.map(this.renderRow)}</tbody>
            </table>
          )}
        </div>
        {paginationPosition !== `top` && this.pagination_controls}
      </div>
    )
  }
}

export default decorate(
  styled`
  font-size: 0.95em;
  color: ${t('lightText')};
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
    padding: 20px 12px;
    white-space: nowrap;
    text-align: left;
    border-bottom: 1px solid ${t(`border`)};
  }
  .background-image {
    border-radius: 5px;
  }
  td {
    padding: ${t(`gutterWidth`, w => w / 4)}px ${t(`gutterWidth`, w => w / 2)}px;
    &.primary { font-weight: 600 }
  }
  .nowrap {
    white-space: nowrap;
  }
  .table__container {
    border-radius: ${t(`borderRadii.table`)};
    overflow: hidden;
    box-shadow: ${t(`shadow0`)};
    border: 1px solid ${t(`border`)}
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
  .table-actions {
    padding-bottom: 10px;
  }
   .checkbox-column {
    padding: 11px 0 0px 12px;
    width: 10px;
    input { margin-right: 0; }
   }
   .disabled {
     opacity: 0.5;
   }
   tr:not(:last-child) td {
    border-bottom: 1px solid #ececec;
   }
   a {
    font-weight: 700;
   }
`,
  observer,
  Table,
)
