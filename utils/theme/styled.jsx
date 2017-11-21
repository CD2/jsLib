import styled from 'styled-components'
import { withTheme } from './index'

const styledWithTheme = (...args) => (Comp) => withTheme(styled(Comp)(...args))

export default styledWithTheme
