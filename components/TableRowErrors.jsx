import React from 'react'
import PropTypes from 'prop-types'
import placeholder from 'images/placeholder.png'
import Image from 'lib/components/image'
import FaIcon from "lib/components/fa_icon";
import theme from 'styles/theme'
import { observer } from 'mobx-react'

@observer 
export default class TableRowErrors extends React.Component {

  static propTypes = {
    alternateAction: PropTypes.func,
    children: PropTypes.any,
    resource: PropTypes.object.isRequired,
  }

  renderErrorRow(){
    console.log(`error`)
    return(
      <tr>
        <td className="thumb-column"><FaIcon icon='error-outline' color={theme.error} size={1.25} /></td>
        <td colSpan="3">
          <span>Error loading {this.props.resource.class.name}</span>
        </td>
        <td />
      </tr>
    )
  }

  renderLoadingRow(){
    console.log(`loading`)
    return(
      <tr>
        <td className="thumb-column"><Image defaultSrc={placeholder} /></td>
        <td><span className='placeholder large' /></td>
        <td><span className='placeholder small' /></td>
        <td><span className='placeholder small' /></td>
        <td><span className='placeholder small' /></td>
      </tr>
    )
  }

  render(){
    const { resource, children, alternateAction } = this.props
    alternateAction && alternateAction()
    if (resource && resource.errored) return this.renderErrorRow()
    if (resource && resource.loading) return this.renderLoadingRow()
    if (resource && !resource.loaded) return this.renderLoadingRow()
    return children
  }
}