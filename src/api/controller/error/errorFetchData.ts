function errorFetchData (res: any, error: any) {
  res.send({ message: 'error', error })
}

export default errorFetchData
