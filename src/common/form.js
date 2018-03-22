import Validator from '../utils/validator'
import Listening from './listening'
import FormField from './formField'

class Form extends Listening {
  schema = {}
  defaultData = {}
  fields = {}
  submitted = false
  valid = true
  onSubmit = null
  onChange = null
  validationSchema = {
    properties: {}
  }

  constructor ({ schema, onSubmit = null, onChange = null }) {
    super()
    this.schema = schema
    this.onSubmit = onSubmit
    this.onChange = onChange
    for (let name in schema) {
      const {
        defaultValue = null,
        validation = null
      } = schema[name]

      const field = new FormField()
      field.setValue(defaultValue)
      field.on('change', (formField) => this.onChangeField(name, formField))

      this.defaultData[name] = defaultValue
      if (validation !== null) {
        this.validationSchema.properties[name] = validation
      }
      this.fields[name] = field
    }

    this.validate()
  }

  onChangeField = (name, formField) => {
    this.validate()
    this.trigger('change', this)
    if (this.onChange !== null) {
      this.onChange(this)
    }
  }

  submit = (event = null) => {
    if (event !== null && 'preventDefault' in event) {
      event.preventDefault()
    }
    this.submitted = true
    if (!this.valid) {
      return
    }

    this.trigger('submit', this)
    if (this.onSubmit !== null) {
      const formData = this.getFormData()
      this.onSubmit(formData, this)
    }
  }

  validate = () => {
    let data = {}

    for (let name in this.fields) {
      data[name] = this.fields[name].value
    }
    let schema = this.validationSchema
    let validation = Validator.validate(data, schema)
    this.valid = validation.valid

    let fieldsError = {}
    validation.errors.forEach(error => {
      fieldsError[error.property] = error
    })

    for (let name in this.fields) {
      if (name in fieldsError) {
        this.fields[name].setValidation(false, fieldsError[name].message)
      } else {
        this.fields[name].setValidation(true, null)
      }
    }
  }

  getFormData = () => {
    const formData = {}

    for (let name in this.fields) {
      formData[name] = this.fields[name].value
    }

    return formData
  }
}

export default Form
