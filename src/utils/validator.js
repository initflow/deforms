import revalidator from 'revalidator'

class Validator {
  validate = (data, schema) => revalidator.validate(data, schema)
}

export default new Validator()
