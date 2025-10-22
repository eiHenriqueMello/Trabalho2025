const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(100),
    }, {
      sequelize,
      tableName: 'categorias',
    });
  }

  static associate(models) {
    this.hasMany(models.Produto, { foreignKey: 'categoria_id', as: 'produtos' });
  }
}
module.exports = Categoria;