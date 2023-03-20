import { Box, BoxProps, cssClass } from '@adminjs/design-system'
import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

import allowOverride from '../../../hoc/allow-override.js'
import { ReduxState } from '../../../store/store.js'
import SidebarBranding from './sidebar-branding.js'
import SidebarFooter from './sidebar-footer.js'
import SidebarPages from './sidebar-pages.js'
import SidebarResourceSection from './sidebar-resource-section.js'

type Props = {
  isVisible: boolean
}

const StyledSidebar = styled(Box)<BoxProps>`
  top: 0;
  bottom: 0;
  flex-shrink: 0;
  overflow-y: auto;
  width: ${({ theme }) => theme.sizes.sidebarWidth};
  border-right: ${({ theme }) => theme.borders.default};
  display: flex;
  flex-direction: column;
  z-index: 50;
  background: ${({ theme }) => theme.colors.sidebar};
  transition: left 300ms ease-in;

  &.hidden {
    left: -${({ theme }) => theme.sizes.sidebarWidth};
    // transform: translateX(-100%);
    // transition: transform 300ms ease-out;
  }
  &.visible {
    left: 0;
    // transform: translateX(0);
  }
`

StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'initial'],
}

const SidebarOriginal: React.FC<Props> = (props) => {
  const { isVisible } = props
  const branding = useSelector((state: ReduxState) => state.branding)
  const resources = useSelector((state: ReduxState) => state.resources)
  const pages = useSelector((state: ReduxState) => state.pages)

  return (
    <StyledSidebar className={isVisible ? 'visible' : 'hidden'} data-css="sidebar">
      <SidebarBranding branding={branding} />
      <Box flexGrow={1} className={cssClass('Resources')} data-css="sidebar-resources">
        <SidebarResourceSection resources={resources} />
      </Box>
      <SidebarPages pages={pages} />
      <SidebarFooter />
    </StyledSidebar>
  )
}

const Sidebar = allowOverride(SidebarOriginal, 'Sidebar')

export { Sidebar }
export default Sidebar
