import { css } from 'styled-components'
import { t } from './theme'

export const dark_panel = (props) => css`
  border-radius: ${t(`borderRadii.panel`)(props)};
  overflow: hidden;
  border: 1px solid ${t(`border`)(props)};
  background: ${t(`darkBackground`)};
  h1, h2, h3, h4, p {
    color: white;
  }
`

export const popover = (props) => css`
  border-radius: ${t(`borderRadii.panel`)(props)};
  border: 1px solid ${t(`border`)(props)};
  background: white;
  box-shadow: ${t(`shadow5`)(props)};
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
`

export const active_card = (props) => css`
  background-color: ${t(`white`)(props)};
  box-shadow: ${t(`shadow1`)(props)};
  transition: box-shadow ${t(`globalTransitionSpeed`)(props)};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  &:hover {
    box-shadow: ${t(`shadow3`)(props)}
  }
`

export const small_icon = (props) => css`
    max-width: 18px;
    opacity: 0.5;
    position: relative;
    top: 4px;
`

export const tag = (props) => css`
  border-radius: 3px;
  color: #999;
  background-color: #f5f5f5;
  font-size: 12px;
  letter-spacing: .5px;
  padding: 5px 7px 4px;
  border: 1px solid #ddd;
  text-transform: uppercase;
  margin: 0 3px 3px 0;
  cursor: pointer;
  display: inline-block;
  transition: 0.3s;
  user-select: none;
  &:hover {
    background-color: #e3eff3;
    border-bottom: 0;
  }

  &.selected {
    background: ${t(`primary`)(props)};
    color: white;
  }
`
