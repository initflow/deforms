const formContainer = function (Constructor) {
  return class extends Constructor {
    constructor (...attributes) {
      super(...attributes)

      if (this.__formCreators) {
        this.__formCreators.forEach(creator => creator(this))
      }
    }
  }
}

export default formContainer
