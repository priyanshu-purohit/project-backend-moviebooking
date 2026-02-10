const userService = require('../services/user.services');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

const update = async (req, res) => {
    try{
        const response = await userService.updateUserRoleOrStatus(req.body, req.body.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the user';
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    update
}