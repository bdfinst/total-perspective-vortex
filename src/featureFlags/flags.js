const flags = () => {
  const clearCache = process.env.REACT_APP_CLEAR_LOCAL_STORAGE === 'true'
  const showRetryNodes = process.env.REACT_APP_SHOW_RETRY === 'true'
  const showCRD = process.env.REACT_APP_SHOW_CRD === 'true'

  return {
    clearCache,
    showRetryNodes,
    showCRD,
  }
}

export default flags
