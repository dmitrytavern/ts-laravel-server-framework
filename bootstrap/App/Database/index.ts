import { Sequelize } from 'sequelize'
import connect from '@database/index'

export interface IDatabase {
	db: Sequelize
	Models: any
}

export default class Database implements IDatabase {
	public db: Sequelize = connect
	public Models: any = []
}