const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormOrder = require('../orm/orm-order');

exports.GetAll = async(req, res) => {
    let status = "Success";
    let errorcode = "";
    let message = "";
    let data = "";
    let statuscode = 0;
    let response = {};
    try {
        let respOrm = await ormOrder.GetAll();
        if(respOrm.error) {
            (status = "Failure"),
            (errorcode = respOrm.error.code),
            (message = respOrm.error.message),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
            (message = "Succes GetAll order"), (data = respOrm), 
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
        const Name = req.body.Name;
        const Feeding = req.body.Feeeding;
        const Incisors = req.body.Incisors;
        const Families = req.body.Families;
        const Class = req.body.Class;
        if (Name, Feeding, Incisors, Families, Class) {
            let respOrm = await ormOrder.Create(Name, Feeding, Incisors, Families, Class);
            if (respOrm.error) {
                (status = 'Failure'), (errorcode = respOrm.error.code),
                (message = respOrm.error.message), (statuscode = enum_.CODE_BAD_REQUEST);
            } else {
                (message = 'Order created'), (statuscode = enum_.CODE_CREATED);
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