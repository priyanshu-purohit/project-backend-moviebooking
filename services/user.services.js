const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS, STATUS_CODES } = require('../utils/constants');

const createUser = async (data) => {
    try{
        if(!data.userRole || data.userRole == USER_ROLE.customer){
            if(data.userStatus && data.userStatus != USER_STATUS.approved){
                throw {
                    err: "We cannot set any other status for customer",
                    code: STATUS_CODES.BAD_REQUEST
                }
            }
        }
        if(data.userRole && data.userRole != USER_ROLE.customer) {
            data.userStatus = USER_STATUS.pending;
        }

        const response = await User.create(data);
        console.log(response);
        return response;
    }
    catch(error){
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            })
            throw {err: err, code: 422};
        }
        throw error;
    }
}

const getUserByemail = async (email) => {
    try{
        const response = await User.findOne({
            email: email
        })
        if(!response){
            throw {err: "No user found for the given email", code: 404};
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const getUserById = async (id) => {
    try{
        const response = await User.findById(id);
        if(!response){
            errorResponseBody.err = "No user found for the given id";
            return res.status(404).json(errorResponseBody);
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error; 
    }
}

const updateUserRoleOrStatus = async (data, userId) => {
    try{
        let updateQuery = {};

        if(data.userRole){
            updateQuery.userRole = data.userRole;
        }

        if(data.userStatus){
            updateQuery.userStatus = data.userStatus;
        }

        const response = await User.findOneAndUpdate(
            userId,
            updateQuery,
            {new: true, runValidators: true}
        )

        if(!response){
            throw {err: 'No user found for the given id', code: STATUS_CODES.NOT_FOUND};
        }

        return response;
    }
    catch(error){
        console.log(error);
        if(error.name = 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            })
            throw {err: err, code: STATUS_CODES.BAD_REQUEST};
        }
        throw error;
    }
}


module.exports = {
    createUser,
    getUserByemail,
    getUserById,
    updateUserRoleOrStatus
}