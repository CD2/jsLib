import React from 'react'
import { Link } from 'react-router-dom';
import { history } from 'utils/router'
import home from 'images/home.svg'
import { Grid, GridItem } from 'lib/components/grid'
import { styled, t } from 'utils/theme'
import { small_icon } from 'utils/common_styles'
import Wrapper from "./wrapper";
import Img from "./img";

import BreadcrumbStore from 'stores/breadcrumbs'
import { observer } from 'mobx-react'
import decorate from 'utils/decorate'

export class Breadcrumbs extends React.Component {

  static defaultProps = {
    breadcrumbs: [],
  }

  renderBreadcrumb({name, href}) {
    return (
      <span key={href}>
        <span> > </span>
        <Link className='breadcrumb__link' to={href}>{name}</Link>
      </span>
    )
  }

  render() {
    if (BreadcrumbStore.breadcrumbs.filter(crumb=>crumb).length === 0) return null
    return(
      <Wrapper width="1600" className={this.props.className} background={this.props.theme.secondary}>
        <Grid>
          <GridItem weight={5/6}>
            <span>
              <Link className='breadcrumb__link' to='/'>
                <Img src={home} />
              </Link>
            </span>
            {BreadcrumbStore.breadcrumbs.filter(crumb=>crumb).map(this.renderBreadcrumb)}
          </GridItem>
          <GridItem align="right" weight={1/6}>
            <a onClick={ history.goBack } >Back</a>
          </GridItem>
        </Grid>
      </Wrapper>
    )
  }
}
export default decorate(
  styled`
    color: ${t('lightText')};
    box-shadow: ${t('shadow1')};
    color: white;
    font-weight: 600;
    .breadcrumb__link {
      border-bottom: 0;
    }
    img {
      ${small_icon}
    }
    a {
      color: white;
    }
  `,
  observer,
  Breadcrumbs
)
