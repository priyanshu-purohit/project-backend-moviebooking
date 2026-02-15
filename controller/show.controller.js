const showService = require('../services/show.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

const create = async (req, res) => {
    try{
        const response = await showService.createShow(req.body);
        successResponseBody.message = "Successfully created the show";
        successResponseBody.data = response;
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.codes).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.OK).json(errorResponseBody);
    }
}

module.exports = {
    create
}