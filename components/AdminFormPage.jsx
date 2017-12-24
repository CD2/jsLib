import React from 'react'
import PropTypes from 'prop-types'

import { styled } from 'lib/utils/theme'
import decorate from 'lib/utils/decorate'
import Wrapper from "lib/components/wrapper"
import SectionIntro from "lib/components/SectionIntro"
import Grid from "lib/components/grid"
import Button from "lib/components/button"

export class AdminFormPage extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    children: PropTypes.any,
    className: PropTypes.string,
    content: PropTypes.any,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    viewLink: PropTypes.string,
  }

  render() {
    const { className, children, title, content, actions, viewLink } = this.props

    return (
      <div className={className}>
        <Grid columns={3}>
          <Grid.Item colSpan={2}>
            <SectionIntro className="admin-title" title={title}>
              {content}
            </SectionIntro>
          </Grid.Item>
          <Grid.Item align="right">
            {actions}
            {viewLink && <Button to={viewLink}>View on site</Button>}
          </Grid.Item>
        </Grid>
        <Wrapper floating overflow>
          {children}
        </Wrapper>
      </div>
    )
  }

}
export default decorate(
  styled`
    .admin-title {margin-bottom: 36px;}
    .btn { margin-bottom: 10px }
  `,
  AdminFormPage
)
