const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormUser = require('../orm/orm-user');

exports.GetAll = async(req,res) => {
    let status = "Success";
    let errorcode = "";
    let message = "";
    let data = "";
    let statuscode = 0;
    let response = {};
    try {
        let respOrm = await ormUser.GetAll();
        if(respOrm.error) {
            (status = "Failure"),
            (errorcode = respOrm.error.code),
            (message = respOrm.error.message),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
            (message = "Succes GetAll User"), (data = respOrm), 
            (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
        }
        response = await magic.ResponseService(status, errorcode, message, data)
        return res.status(statuscode).send(response);
    } catch (error) {
        magic.LogDanger("error:", error)
        response = await magic.ResponseService("Failure", enum_.CODE_BAD_REQUEST, error, "");
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
    }
}

exports.Create = async (req, res) => {
    let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
    try {
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Avatar = req.body.Avatar;
        if (Username, Password, Avatar) {
            let respOrm = await ormUser.Create(Username, Password, Avatar);
            if (respOrm.error) {
                (status = 'Failure'), (errorcode = respOrm.error.code),
                (message = respOrm.error.message), (statuscode = enum_.CODE_BAD_REQUEST);
            } else {
                (message = 'User created'), (statuscode = enum_.CODE_CREATED);
            }
        } else {
            (status = 'Failure'),
            (errorcode = enum_.ERROR_REQUIRED_FIELD),
            (message = 'All fields are required'), (statuscode = enum_.CODE_BAD_REQUEST);
        } 
        response = await magic.ResponseService(status, errorcode, message, data);
        return res.status(statuscode).send(response);
    } catch (error) {
        console.log('error = ', error);
        return res
        .status(enum_.CODE_INTERNAL_SERVER_ERROR)
        .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
    }
}