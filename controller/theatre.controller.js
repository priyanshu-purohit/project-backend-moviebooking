const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try{
        const response = await theatreServices.createTheatre(req.body);
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