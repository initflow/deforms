import Listening from './listening'

class FormField extends Listening {
  value = null
  valid = true
  changed = false
  errorMessage = null

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
}

export default FormField
