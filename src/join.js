export default (...args) => {
  return args.filter(x => !!x).join(' ')
}
