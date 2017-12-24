import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import decorate from 'lib/utils/decorate'
import PrintStore from 'lib/utils/print'
import { styled } from 'lib/utils/theme'

export class PrintView extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    hideClassName: PropTypes.string,
    printViewContents: PropTypes.node,
    setPrintViewContents: PropTypes.func,
  }

  static defaultProps = {
    hideClassName: null,
  }

  render() {
    const { hideClassName } = this.props

    if (PrintStore.hasContents) {
      return (
        <div className="print-view">
          { hideClassName ? <style>{`${hideClassName} {display: none !important;}`}</style> : null}
          {PrintStore.contents}
        </div>
      )
    }

    return null
  }

}

export default decorate(
  styled`
    background-color: white;
    text-align: left;
    z-index: 1000000;
  `,
  observer,
  PrintView
)
