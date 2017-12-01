import React from 'react'
import PropTypes from 'prop-types'
import PaginationControls from './pagination_controls'
import Input from 'lib/components/forms/input'
import { observable, computed, action, toJS } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { styled, t } from 'lib/utils/theme'
import { titleCase } from 'lib/utils/helpers'
import loader from '../forms/loader'
import Row from './TableRow'
import Page from 'lib/components/SectionIntro'
import { THead, Th, IndexFilters } from 'lib/components/table'
import Button from 'lib/components/button'
@styled`
  font-size: 0.9em;
  thead tr {
    background: ${t(`darkBackground`)};
    color: white;
    &:hover {
      background: ${t(`darkBackground`)};
    }
  }
  tbody tr {
    cursor: pointer;
  }
  tr {
    background: white;
    &:hover {
      background: ${t(`border`)};
    }
  }
  th{
    padding: ${t(`gutterWidth`, w=>w/2)}px;
    white-space: nowrap;
  }
  .background-image {
    border-radius: 5px;
  }
  td {
    padding: ${t(`gutterWidth`, w=>w/4)}px ${t(`gutterWidth`, w=>w/2)}px;
    &.primary { font-weight: 600 }
  }
  tr:first-child, tr:last-child {
    td {
      padding: ${t(`gutterWidth`, w=>w/2)}px;
    }
  }
  .nowrap {
    white-space: nowrap;
  }
  .table__container {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: ${t(`shadow0`)};
  }
  .thumb-column { width: 70px; }
`
@observer
export class IndexTable extends React.Component {

  static propTypes = {
    bulkActions: PropTypes.shape({
      action: PropTypes.string.isRequired,
      cord: PropTypes.object,
      text: PropTypes.string,
      payloadFormat: PropTypes.func.isRequired,
      onSuccess: PropTypes.func,
      ids: PropTypes.array,
    }),
    className: PropTypes.string,
    headings: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      column: PropTypes.string,
      fields: PropTypes.array,
      conditional: PropTypes.string,
      contents: PropTypes.func,
    })),
    ids: PropTypes.array,
    loader: PropTypes.object,
    newRoute: PropTypes.string,
    onChecked: PropTypes.func,
    onRedirect: PropTypes.func,
    query: PropTypes.object,
    rowPath: PropTypes.string,
    rowProps: PropTypes.object,
    title: PropTypes.string,
  }

  static defaultProps = {
    rowProps: {},
    ids: null,
  }

  componentDidMount() {
    if (this.props.ids) return null
    this.props.query.fetch()
  }

  // Render table row methods //
  renderRow = (id) => {
    if(this.props.loader){
      this.row = loader(Row, this.loaderFieldType(id))
      return(
        <this.row
          id={id}
          key={id}
          {...this.props.rowProps}
          columns={this.props.headings}
          selectedIds={this.selectedIds}
          onRedirect={this.props.onRedirect}
          onSelect={this.handleChecked}
        />
      )
    }
    return (
      <Row
        id={id}
        key={id}
        {...this.props.rowProps}
        columns={this.props.headings}
        selectedIds={this.selectedIds}
        onRedirect={this.props.onRedirect}
        onSelect={this.handleChecked}
      />
    )
  }

  // Loader setup //
  loaderFieldType = (id) => {
    if(this.props.loader.type === `fields`){
      this.loader = this.props.loader.fields ? this.props.loader
        : {
          ...this.props.loader,
          fields: this.props.headings.map(heading=>heading[0])
        }
    }
    this.loader = this.props.loader
    this.loader.as = `resource`
    this.loader.id = id
    return this.loader
  }

  // PaginationControls //
  @observable page=1
  @observable per_page=30

  @computed get total_items() {
    return this.props.ids ? this.props.ids.length : this.props.query.ids.length
  }

  @computed get paginated_ids() {
    const start = (this.page-1) * this.per_page
    const end = start + this.per_page
    const ids = this.props.ids || this.props.query.ids
    return ids.slice(start, end)
  }

  @action handlePageChange = (page) => {
    this.page = page
  }

  @computed get pagination_controls() {
    return (
      <PaginationControls
        page={this.page}
        per_page={this.per_page}
        total_items={this.total_items}
        onPageChange={this.handlePageChange}
      />
    )
  }
  @action handleSelectAll = () => {
    if(this.selectAll){
      this.selectAll = false
      this.paginated_ids.map(id=>this.handleChecked(id, this.selectAll, true))
    }else{
      this.selectAll = true
      this.paginated_ids.map(id=>this.handleChecked(id, this.selectAll, true))
    }
  }

  // Checkbox methods //
  @observable ids = []
  @observable selectedIds = []
  @action handleChecked = (id, remove, toggle) => {
    if (this.selectedIds.includes(id) && !toggle) {
      this.selectedIds.replace(this.selectedIds.filter(checkedId => checkedId !== id))
    } else {
      if(!toggle){
        this.selectedIds.push(id)
      }
    }
    if(toggle){
      if (this.selectedIds.includes(id) && !remove) {
        this.selectedIds.replace(this.selectedIds.filter(checkedId => checkedId !== id))
      } else {
        if(remove){
          this.selectedIds.push(id)
        }
      }
    }
    this.props.onChecked(this.selectedIds)
  }

  // Table heading render //
  @observable selectAll = false
  renderHeadings = () => {
    return (
      <THead>
        {this.props.headings.map((heading, i) => {
          if(heading.fields && heading.fields.includes(`select`)){
            return (
              <Th sortable={heading.column ? heading.column : null} key={i}>
                <Input
                  name="select"
                  type="checkbox"
                  labelText={`${this.selectAll ? `Unselect` : `Select`} All`}
                  value={this.selectAll}
                  onChange={() => this.handleSelectAll()}
                />
              </Th>
            )
          }
          return <Th sortable={heading.column ? heading.column : null} key={i}>{heading.text}</Th>
        })}
      </THead>
    )
  }

  // Perform on bulk action //
  handlePerformAction = () => {
    const { bulkActions } = this.props
    console.log(this.selectedIds)

    if(bulkActions.cord){
      bulkActions.cord.perform(
        bulkActions.action,
        { ids: bulkActions.ids, ...bulkActions.payloadFormat(this.selectedIds) }
      ).then(response=>{
        bulkActions.onSuccess && bulkActions.onSuccess(response)
      })
    }
    if(!bulkActions.cord){
      this.props.loader.cord.perform(
        bulkActions.action,
        { ids: toJS(this.selectedIds), ...bulkActions.payloadFormat(this.selectedIds) }
      ).then(response=>{
        bulkActions.onSuccess && bulkActions.onSuccess(response)
      })
    }

  }

  render() {
    const { title, ids, query, newRoute, bulkActions } = this.props
    return (
      <Page title={title}>
        <div className="filters">
          {newRoute && <Button to={`/${newRoute}/new`}>New {name}</Button>}
          {bulkActions && <Button onClick={this.handlePerformAction}>
            {bulkActions.text ? bulkActions.text : titleCase(bulkActions.action)}
          </Button>}
          {!ids && <IndexFilters query={query} />}
        </div>
        <div className={this.props.className}>
          {this.pagination_controls}
          <Provider query={this.props.query}>
            <div className="table__container">
              <table>
                {this.renderHeadings()}
                <tbody>
                  {this.paginated_ids.map(id => {
                    return this.renderRow(id)
                  })}
                </tbody>
              </table>
            </div>
          </Provider>
          {this.pagination_controls}
        </div>
      </Page>
    )
  }

}
export default IndexTable
