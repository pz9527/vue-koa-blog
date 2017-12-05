/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reply', {
    content: {
      type: DataTypes.STRING(400),
      allowNull: false
    }
  }, {
    tableName: 'reply'
  });
};
