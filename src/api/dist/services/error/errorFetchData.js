function errorFetchData(res, error) {
    res.send({ message: 'error', error });
}
export default errorFetchData;
