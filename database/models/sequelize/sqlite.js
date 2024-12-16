const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
})

async function testConnectionDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnectionDB()

const User = require('../User')(sequelize)
const Task = require('../Task')(sequelize)
const Auth = require('../Auth')(sequelize)
const TaskOfUser = require('../TaskOfUser')(sequelize)

Auth.belongsTo(User, {
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  },
})

TaskOfUser.belongsTo(User, {
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  },
})

TaskOfUser.belongsTo(Task, {
  foreignKey: {
    name: 'idTask',
    allowNull: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  },
})

module.exports = {
  sequelize: sequelize,
  User: User,
  Task: Task,
  Auth: Auth,
  TaskOfUser: TaskOfUser,
}