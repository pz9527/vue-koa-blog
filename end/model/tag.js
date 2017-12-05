/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag', {
    content: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'tag'
  });
};
