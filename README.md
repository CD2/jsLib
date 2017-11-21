# The Lib
Common components, functions, and utilities used across cd2 systems.
asdasasdas
## Components

### Forms
`import { Form, Input, Submit, formValidations } from 'lib/components/forms'`

#### Form Component
The form component is nothing more then a normal form except it prevents default automatically and accepts an array of errors to render.
```javascript
  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
    preventDefault: PropTypes.bool,                     (default=true)
  }
```
If you want the form to submit then pass `preventDefault={true}` to the form

#### Submit
a submit button for a form
```javascript
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    submitting: PropTypes.bool,
  }
```
#### Input
handle any and all of your input needs

```javascript
  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }
```
its a factory to lots of input types, if the input type is not found then it will just render a normal input with that type.

#### validateForm
method to validate the inputted values of a form
```javascript
  const errors = validateForm( values:(map of form values), validations:(object) ) 
```

validations is an object where the keys are the field names and the values are validators.
validators take the form of `{validator_type: options, ...}`

##### Available types
- presence
 - options: { allow_blank=true }
- acceptance
  - options: { accepts:[true, 'true', 1, '1'] }
- format
  - options: { with:(required regex to match value to) }

its really simple to write new validators, just look at one of the files and it is obvious (remember to add new validators to the array at the top of the *form_validations.js* so they can get picked up by the method.
