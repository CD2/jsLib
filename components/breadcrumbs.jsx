import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import Grid from "lib/components/grid"
import { styled, t } from "lib/utils/theme"
import { observer } from "mobx-react"
import decorate from "lib/utils/decorate"
import BreadcrumbStore from "lib/stores/Breadcrumbs"
import Wrapper from "./wrapper"

export class Breadcrumbs extends React.Component {
  static propTypes = {
    background: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    breadcrumbs: [],
  }

  renderBreadcrumb({ name, href }) {
    return (
      <span key={href}>
        <span>{` > `}</span>
        <Link className="breadcrumb__link" to={href}>
          {name}
        </Link>
      </span>
    )
  }

  render() {
    if (BreadcrumbStore.breadcrumbs.filter(crumb => crumb).length === 0) {
      return null
    }
    return (
      <Wrapper
        width={`100%`}
        spacing={10}
        className={`${this.props.className} breadcrumbs`}
        background={this.props.background || this.props.theme.secondary}
      >
        <Grid columns={6}>
          <Grid.Item colSpan={5}>
            <span>
              <Link className="breadcrumb__link" to="/">
                Home
              </Link>
            </span>
            {BreadcrumbStore.breadcrumbs.filter(crumb => crumb).map(this.renderBreadcrumb)}
          </Grid.Item>
        </Grid>
      </Wrapper>
    )
  }
}
export default decorate(
  styled`
    color: ${BreadcrumbStore.color};
    font-size: 14px;
    @media (max-width: 1000px) {
        font-size: 12px;
      }
    max-width: ${t(`siteWidth`)}px;
    margin: 0 auto;
    .breadcrumb__link {
      border-bottom: 0;
      color: inherit;
    }

    img {
      max-width: 18px;
      opacity: 0.5;
      position: relative;
      top: 4px;
    }
  `,
  observer,
  Breadcrumbs,
)
