import {Model, DataTypes, Optional, Sequelize} from 'sequelize'

interface IModelAttributes {
  id: number,
  name: string,
}
interface IModelCreation extends Optional<IModelAttributes, "id"> {}
export interface IModel extends Model<IModelAttributes, IModelCreation>, IModelAttributes {}

export default function (sequelize: Sequelize) {
  return sequelize.define<IModel>("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
  })
}


