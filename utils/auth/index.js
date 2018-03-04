/* eslint-disable react/jsx-filename-extension,import/first */
import React from "react"

export { default as withAuth } from "./with_auth"
export { default as Provider } from "./provider"

export { default as AuthRoute } from "./auth_route"
export { default as AuthSwitch } from "./auth_switch"
export { default as AuthLink } from "./auth_link"
export { default as AuthNavLink } from "./auth_nav_link"
import HasPermission from "./has_permission"
export { HasPermission }

export { default as isAuthed } from "libDependencies/isAuthed"

export const hasPermission = permission => Comp => {
  return class PermissionComponent extends React.Component {
    render() {
      return (
        <HasPermission permission={permission}>
          <Comp {...this.props} />
        </HasPermission>
      )
    }
  }
}
