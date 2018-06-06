import Listening from './listening'

class FormField extends Listening {
  value = null
  valid = true
  changed = false
  errorMessage = null
  defaultValue = undefined

  constructor ({ defaultValue }) {
    super()
    this.defaultValue = defaultValue
  }

  setValue = (value) => {
    this.value = value
    this.trigger('change', this)
  }

  setValidation = (valid, errorMessage = null) => {
    this.valid = valid
    this.errorMessage = errorMessage
  }

  change = (event = null) => {
    if (event !== null && 'target' in event && 'value' in event.target) {
      this.changed = true
      this.setValue(event.target.value)
    }
  }

  changeValue = (value) => {
    this.changed = true
    this.setValue(value)
  }

  reset = () => {
    this.changed = false
    this.setValue(this.defaultValue)
  }
}

export default FormField
