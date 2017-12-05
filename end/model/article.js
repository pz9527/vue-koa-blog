/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article', {
        title: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }
    }, {
        tableName: 'article'
    });
};
