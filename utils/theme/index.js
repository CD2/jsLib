import { css } from "styled-components"
export { default as Provider } from "./provider"
export { default as withTheme } from "./with_theme"
export { default as styled } from "./styled"

export const media = {
  min: size => (...args) =>
    css`@media (min-width: ${size / 16}em) {${css(...args)}}`,
  max: size => (...args) =>
    css`@media (max-width: ${size / 16}em) {${css(...args)}}`,
}

export const theme = (name, callback) => props => {
  let { theme: value } = props
  name.split(`.`).forEach(part => (value = value[part]))
  if (callback) value = callback(value)
  if (!value) throw new Error(`style variable ${name} does not exist`)
  return value
}

export const prop = (name, defaultValue, callback) => props => {
  let value = props
  name.split(`.`).forEach(part => (value = value[part]))
  value = value === undefined ? defaultValue : value
  if (callback) value = callback(value)
  if (!value) throw new Error(`prop ${name} does not exist`)
  return value
}

export const unit = (value, unit = `px`) => {
  const units = [
    `%`,
    `cm`,
    `em`,
    `ex`,
    `in`,
    `mm`,
    `pc`,
    `pt`,
    `px`,
    `vh`,
    `vw`,
    `vmin`,
  ]
  value += ``
  if (units.find(u => value.endsWith(u)) === undefined) value += unit
  return value
}

export { unit as u, prop as p, theme as t }
