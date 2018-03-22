const unenumerable = (cls, fname, descriptor) => {
  descriptor.enumerable = false
  return descriptor
}

export default unenumerable
