import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from "lib/utils/theme"
import Wrapper from "lib/components/wrapper"
import decorate from 'lib/utils/decorate'

export class Range extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onRawChange: PropTypes.func,
    placeholder: PropTypes.string,
    theme: PropTypes.object,
    type: PropTypes.string,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const props = { ...this.props }
    delete props.initialValue
    delete props.onRawChange
    delete props.theme
    props.type = props.type || `range`

    return (
      <div className={this.props.className}>
        <Wrapper background={this.props.theme.background} spacing={10} floating>
          <p className="value">{props.value === `null` ? `Choose value` : props.value}</p>
          <div className={`slider`}>
            <b>0</b>
            <input
              {...props}
              min={0}
              max={10}
              onChange={this.handleChange}
            />
            <b>10</b>
          </div>
        </Wrapper>
      </div>
    )
  }

}
export default decorate(
  styled`
    .slider {
      display: flex;
      b { 
        font-size: 0.9em;
        font-weight: 600;
        color: ${t(`lightText`)};
        flex: 0 0 25px;
        text-align: center; 
      }
    }
    .value {
      margin: 0;
      text-align: center;
      font-size: 0.9em;
      color: ${t(`lightText`)};
    }
    input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #10C7C7;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 2px #000000;
  border: 0px solid #2497E3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #0F9494;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6.5px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #10C7C7;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #10C7C7;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 2px #000000;
  border: 0px solid #2497E3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #0F9494;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #10C7C7;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #10C7C7;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 2px #000000;
  border: 0px solid #2497E3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #0F9494;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #10C7C7;
}
input[type=range]:focus::-ms-fill-upper {
  background: #10C7C7;
}
  `,
  Range
)
