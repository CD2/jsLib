import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Table, THead, Th, IndexFilters } from 'lib/components/table'
import Button from 'lib/components/button'
import { observer } from 'mobx-react'
import decorate from 'lib/utils/decorate'
import { styled } from 'lib/utils/theme'
import SectionIntro from "lib/components/SectionIntro"
import Grid from "lib/components/grid/index"

export class AdminIndexPage extends React.Component {

  static propTypes = {
    TableRow: PropTypes.func,
    actions: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    content: PropTypes.node,
    fetchIds: PropTypes.func,
    headings: PropTypes.array,
    ids: PropTypes.array,
    intro: PropTypes.node,
    name: PropTypes.string,
    newRoute: PropTypes.string,
    onlyShowTable: PropTypes.bool,
    query: PropTypes.object,
    rowProps: PropTypes.object,
    showActions: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    onlyShowTable: false,
  }

  componentDidMount() {
    if (this.props.ids) return null
    this.props.query && this.props.query.fetch()
  }

  renderHeadings = () => (
    <THead>
      {this.props.headings.map((heading, i) => {
        if (heading.column){
          return <Th sortable={heading.column} key={i}>{heading.text}</Th>
        }
        return <Th key={i}>{heading.text}</Th>
      })}
    </THead>
  )

  renderTable = () => {
    const { query, TableRow, ids, name, actions, showActions } = this.props

    if (!TableRow) return

    return (
      <Fragment>
        {showActions && actions}
        <Table
          storePageName={name}
          query={ids ? null : query}
          headings={this.renderHeadings()}
          row={TableRow}
          ids={ids}
          rowProps={this.props.rowProps}
        />
      </Fragment>
    )
  }

  renderIntro = () => {
    const { intro, title, content } = this.props
    if (intro) return intro

    return (
      <SectionIntro className="admin-title" title={title}>
        {content}
      </SectionIntro>
    )
  }

  renderIndex = () => {
    const {
      query, ids, newRoute, name, className, actions, children,
    } = this.props

    return (
      <div className={className}>
        {this.renderIntro()}
        <div className="filters">
          <Grid columns={3}>
            <Grid.Item colSpan={2} className="actions">
              {newRoute ? <Button to={`/${newRoute}/new`}>New {name}</Button> : null}
              { actions }
            </Grid.Item>
            <Grid.Item>
              {!this.props.query || ids ? null : <IndexFilters query={query} />}
            </Grid.Item>
          </Grid>
        </div>
        {this.renderTable()}
        {children}
      </div>
    )
  }

  render() {
    if (this.props.onlyShowTable) return this.renderTable()

    return this.renderIndex()
  }

}

export default decorate(
  styled`
    .btn { margin-bottom: 10px }
    .actions {
      a, .btn {
        font-size: 0.95em;
        margin-bottom: 0;
      }
      font-weight: 600;
      > div { display: inline-block; }
    }
  `,
  observer,
  AdminIndexPage
)
