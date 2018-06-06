import test from 'ava'
import { formContainer, formCreate } from '../../lib/index'

const defaultValue = 'defaultValue'
const newValue = 'newValue'

@formContainer
class TestFormContainer {
  @formCreate()
  form = {
    schema: {
      testField: {
        defaultValue: defaultValue
      }
    }
  }
}

const testFormContainer = new TestFormContainer()

test('Default value', (t) => {
  const form = testFormContainer.form

  t.is(form.fields.testField.value, defaultValue)
})

test('Seting value', (t) => {
  const form = testFormContainer.form

  form.fields.testField.changeValue(newValue)
  t.is(form.fields.testField.value, newValue)
})

test('Reset form', (t) => {
  const form = testFormContainer.form

  form.fields.testField.changeValue(newValue)
  form.reset()
  t.is(form.fields.testField.value, defaultValue)
})
