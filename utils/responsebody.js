const errorResponseBody = {
    err: {},
    data: {},
    message: "Something went wrong, cannot process the request",
    success: false
};
const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully fetched the data",
    success: true
};

module.exports = {
    errorResponseBody,
    successResponseBody
}