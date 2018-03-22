import Form from './common/form'

const updateContext = (context) => {
  if ('forceUpdate' in context && typeof context.forceUpdate === 'function') {
    context.forceUpdate()
  }
}

const formCreate = function (inputAttr) {
  return function (target, propertyKey, descriptor) {
    target.__formCreators = target.__formCreators || []

    target.__formCreators.push((context) => {
      const options = context[propertyKey]
      const form = new Form(options)
      form.on('change', () => {
        updateContext(context)
      })
      form.on('submit', () => {
        updateContext(context)
      })
      context[propertyKey] = form
    })

    return null
  }
}

export default formCreate
