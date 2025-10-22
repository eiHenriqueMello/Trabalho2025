const { Model, DataTypes } = require('sequelize');

class Cidade extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(50),
    }, {
      sequelize,
      tableName: 'cidades',
    });
  }

  static associate(models) {
    this.hasMany(models.Cliente, { foreignKey: 'cidade_id', as: 'clientes' });
  }
}
module.exports = Cidade;