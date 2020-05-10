const db = require("../models");
const Employee = db.employeeModel;
const sequelize = db.sequelize;

exports.getAll = (req, res) => {
    //SELECT * FROM MasterEmployee
    Employee.findAll({ 
        raw: true,
    })
    .then(data => {
        res.status(200).send({ responseCode: 200, responseMessage: "Ok", responseData: data });
    })
    .catch(err => {
        res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
    })
};

exports.getByID = (req, res) => {
    var id = req.params.id;
    //SELECT * FROM MasterEmployee where ID = $1
    Employee.findAll({ 
        where: {
            ID: id
        }
    })
    .then(data => {
        res.status(200).send({ responseCode: 200, responseMessage: "Ok", responseData: data });
    })
    .catch(err => {
        res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
    })
};

exports.insert = (req, res) => {
    var body = req.body;
    //validate value
    if(!body.FirstName || !body.LastName || !body.Address || !body.Email || !body.PhoneNumber){
        res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: null });
    }else{
        var data = {
            FirstName: body.FirstName,
            LastName: body.LastName,
            Address: body.Address,
            Email: body.Email,
            PhoneNumber: body.PhoneNumber
        };
        //save data
        //INSERT INTO MasterEmployee (FirstName, LastName, Address, Email, PhoneNumber) VALUES ($1, $2, $3, $4, $5)  
        Employee.create(data)
        .then(returnData => {
            res.status(200).send({ responseCode: 200, responseMessage: "Success", responseData: returnData })
        }).catch(err => {
            res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
        });
    }
}

exports.update = (req, res) => {
    var body = req.body;
    var id = req.params.id;

    //check exists before update 
    Employee.findAll({ 
        where: {
            ID: id
        }
    })
    .then(data => {
        if(!body.FirstName || !body.LastName || !body.Address || !body.Email || !body.PhoneNumber){
            res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: null });
        }else{
            //UPDATE MasterEmployee SET FirstName = $2, LastName = $3, Address = $4, Email = $5, PhoneNumber = $6 WHERE ID = $1
            Employee.update({
                FirstName: body.FirstName,
                LastName: body.LastName,
                Address: body.Address,
                Email: body.Email,
                PhoneNumber: body.PhoneNumber
            }, {
                where: {
                    ID: id
                }
            })
            .then(returnData => {
                res.status(200).send({ responseCode: 200, responseMessage: "Success", responseData: null })
            }).catch(err => {
                res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ responseCode: 500, responseMessage: "Data not found", responseData: err.message });
    })
}

exports.delete = (req, res) => {
    var id = req.params.id;
    //check exist data
    Employee.findAll({ 
        where: {
            ID: id
        }
    })
    .then(dataSelect => {
        if(dataSelect.length === 0){
            res.status(500).send({ responseCode: 500, responseMessage: "Data not found", responseData: null });
        }else{
            //DELETE FROM MasterEmployee WHERE ID = $1
            Employee.destroy({ 
                where: {
                    ID: id
                }
            })
            .then(data => {
                res.status(200).send({ responseCode: 200, responseMessage: "Ok", responseData: data });
            })
            .catch(err => {
                res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
            })
        }
    })
    .catch(err => {
        res.status(500).send({ responseCode: 500, responseMessage: "Error", responseData: err.message });
    })

    
};



