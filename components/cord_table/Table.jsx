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
      this.bulkSelected.replace(
        this.bulkSelected.filter(selectedId => selectedId !== id),
      )
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
      />
    )
  }

  renderBulkActions = () => {
    return (
      <div>
        <Button
          buttonStyle="gradient-neutral"
          onClick={this.handleBatchPanelOpen}
        >
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

    return (
      <this.props.row
        key={id}
        id={id}
        {...this.props.rowProps}
        bulkColumn={bulkColumn}
      />
    )
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

    return React.cloneElement(headings, headings.props, [
      bulkHeading,
      ...headings.props.children,
    ])
  }

  render() {
    const {
      paginationPosition,
      bulkActions,
      headings,
      query,
      searchBar,
      theme,
    } = this.props
    let tableClassName = ``
    const headingClasses = headings.props.children.map(
      heading => heading.props.className,
    )
    if (this.props.bulkActions) tableClassName += ` with-checkbox`
    if (headingClasses.includes(`thumb-column`)) tableClassName += ` with-thumb`
    if (headingClasses.includes(`prime-column`)) tableClassName += ` with-prime`
    return (
      <div className={this.props.className}>
        <Grid columns={2} className={this.props.bulkActions && `table-actions`}>
          <Grid.Item>
            {this.props.bulkActions && this.bulkSelected.length
              ? this.renderBulkActions()
              : null}
          </Grid.Item>
          <Grid.Item>
            {searchBar && query && <IndexFilters query={query} />}
          </Grid.Item>
        </Grid>
        {paginationPosition !== `bottom` && this.pagination_controls}
        <div className="fixed-table__container">
          <div className="table__container">
            {this.props.noResultsPanel && this.props.ids.length === 0 ? (
              this.props.noResultsPanel
            ) : (
              <table className={tableClassName}>
                {bulkActions
                  ? [this.renderBulkHeader(), ...headings]
                  : headings}
                <tbody>{this.paginated_ids.map(this.renderRow)}</tbody>
              </table>
            )}
          </div>
        </div>
        {paginationPosition !== `top` && this.pagination_controls}
      </div>
    )
  }
}

export default decorate(
  styled`
  font-size: 0.95em;
  color: ${t(`lightText`)};
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
    padding: 18px ${t(`gutterWidth`, w => w / 2)}px;
    white-space: nowrap;
    text-align: left;
    border-bottom: 1px solid ${t(`border`)};
  }
  .background-image {
    border-radius: 5px;
  }
  td {
    padding: ${t(`gutterWidth`, w => w / 4)}px ${t(
    `gutterWidth`,
    w => w / 2,
  )}px;
    height: 54px;
    &.primary { font-weight: 600 }
  }
  .nowrap, .no-wrap {
    white-space: nowrap;
  }
  .narrow-column {
    width: 1px;
    text-align: center;
  }
  .minor-column {
    color: rgba(0,0,0,0.2);
  }
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
   .disabled {
     opacity: 0.5;
   }
   tr:not(:last-child) td {
    border-bottom: 1px solid #ececec;
   }
   a {
    font-weight: 700;
   }
   .table-tag {
     display: inline-block;
     padding: 4px 6px;
     border-radius: 3px; 
     font-size: 13px;
     background: ${t(`background`)};
     white-space: nowrap;
     + .table-tag { margin-left: 3px; }
     &__in_progress {
        background: ${t(`colors.blue`)};;
        color: white;
     }
     &__complete, &__active {
        background: ${t(`colors.green`)};;
        color: white;
     }
   }
   .right-align {
    text-align: right;
   }

  /* Responsive Table */
  table {
    &.with-prime { margin-left: 220px; }
    &.with-checkbox { margin-left: 48px; }
    &.with-checkbox.with-prime { margin-left: 268px; }
    &.with-thumb { margin-left: 52px; }
    &.with-thumb.with-prime { margin-left: 274px; }
    &.with-thumb.with-checkbox { margin-left: 102px; }
    &.with-checkbox.with-thumb.with-prime { margin-left: 322px; }
  }
  .fixed-table__container {
    position: relative;
  }
  .table__container {
    background: white;
    border-radius: ${t(`borderRadii.table`)};
    overflow: auto;
    box-shadow: ${t(`shadow0`)};
    border: 1px solid ${t(`border`)};
    max-width: 100%;
  }
  .checkbox-column {
    position: absolute;
    min-width: 48px;
    height: 54px;
    text-align: center;
    padding: 18px;
    input { margin-right: 0; }
    left: 0;
    background: #fbfbfb;
    & + .thumb-column {
      left: 48px;
      + .prime-column {
        left: 102px; 
      }
    }
 }
 .thumb-column { 
    width: 54px;
    height: 54px;
    padding: 3px;
    position: absolute;
    background: #fbfbfb;
    left: 0;
    + .prime-column {
      left: 54px; 
    }
    img { 
      border: 2px solid #e5e5e5;
      border-radius: 4px; 
      width: 48px;
      height: 48px
    }
  }
  .prime-column {
    position: absolute;
    width: 220px;
    left: 102px;
    border-right: 1px solid ${t(`border`)};
    background: #fbfbfb;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,
  observer,
  Table,
)
