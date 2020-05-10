module.exports = (sequelize, Sequelize) => {
    const EmployeeModel = sequelize.define("MasterEmployee", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName:{
            type: Sequelize.STRING
        },
        LastName:{
            type: Sequelize.STRING
        },
        Address:{
            type: Sequelize.STRING
        },
        Email:{
            type: Sequelize.STRING
        },
        PhoneNumber:{
            type: Sequelize.STRING
        }
    },{
        tableName: "MasterEmployee",
        timestamps: false,
        freezeTableName: true,
    });
    return EmployeeModel;
};
