import React from "react"
import PropTypes from "prop-types"
import List from "lib/components/list"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import { BasicInput } from "@cd2/cord-react-dom"
import { errorDisplay, sessionSubmission, SubmitButton } from "components/Sessions/utils"
import { Link } from "react-router-dom"
import session from "stores/session"
import { redirect } from "lib/utils/router"
@observer
export default class SignIn extends React.Component {
  static propTypes = {
    afterFunc: PropTypes.func,
    handleSubmit: PropTypes.func,
    redirectPath: PropTypes.string,
  }  
  @observable submitting = false
  @observable email
  @observable password
  @observable errors

  @action setSubmitting = val => (this.submitting = val)
  @action setErrors = val => (this.errors = val)

  handleSubmit = (e) => {
    e.preventDefault()

    sessionSubmission(this.setSubmitting, this.setErrors, () =>
      session.signIn(this.email, this.password),
    this.props.afterFunc ? this.props.afterFunc : ()=>{}
    )
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit || this.handleSubmit}
      >
        <List.Simple spacing={10}>
          {errorDisplay(this.errors)}
          <BasicInput
            type="email"
            name="email"
            placeholder="your@email.com" // TODO: i18n as part of placeholders
            value={this.email}
            onChange={val => (this.email = val)}
          />
          <BasicInput
            type="password"
            placeholder="Password" // TODO: i18n as part of placeholders
            value={this.password}
            onChange={val => (this.password = val)}
          />
          <SubmitButton submitting={this.submitting} text="Sign in" />
        </List.Simple>
        <List.Separator spacing={16} />
        <Link to="/password/new">Forgotten your password?</Link>
      </form>
    )
  }
}