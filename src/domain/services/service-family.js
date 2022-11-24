const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormFamily = require('../orm/orm-family');

exports.GetAll = async(req, res) => {
    let status = "Success";
    let errorcode = "";
    let message = "";
    let data = "";
    let statuscode = 0;
    let response = {};
    try {
        let respOrm = await ormFamily.GetAll();
        if(respOrm.error) {
            (status = "Failure"),
            (errorcode = respOrm.error.code),
            (message = respOrm.error.message),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
            (message = "Succes GetAll family"), (data = respOrm), 
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
        const Reproduction = req.body.Reproduction;
        const Class = req.body.Class;
        const Order = req.body.Order;
        const Species = req.body.Species;
        if (Name, Reproduction, Class, Order, Species) {
            let respOrm = await ormFamily.Create(Name, Reproduction, Class, Order, Species);
            if (respOrm.error) {
                (status = 'Failure'), (errorcode = respOrm.error.code),
                (message = respOrm.error.message), (statuscode = enum_.CODE_BAD_REQUEST);
            } else {
                (message = 'Family created'), (statuscode = enum_.CODE_CREATED);
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