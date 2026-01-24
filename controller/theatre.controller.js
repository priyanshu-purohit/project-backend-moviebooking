const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try{
        const response = await theatreServices.createTheatre(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few paramters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.message = 'Successfully created the theatre';
        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    create 
}