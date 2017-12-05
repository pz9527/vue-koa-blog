module.exports = function(sequelize, DataTypes) {
    return sequelize.define('cate', {
        content: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    }, {
        tableName: 'cate'
    });
};