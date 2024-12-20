const { Sequelize } = require('sequelize')

// Не читает global
console.log(global.config)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
})

const User = require('../User')(sequelize)
const Task = require('../Task')(sequelize)
const Auth = require('../Auth')(sequelize)
const TaskOfUser = require('../TaskOfUser')(sequelize)

async function testConnectionDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnectionDB()

// Связь между таблицами, но видимо CASCADE в sequalize не работает как надо
// Пока не смог найти решение

Auth.belongsTo(User, {
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
})

TaskOfUser.belongsTo(User, {
  as: 'Task',
  foreignKey: {
    name: 'idUser',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
})

TaskOfUser.belongsTo(Task, {
  foreignKey: {
    name: 'idTask',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
})

module.exports = {
  sequelize: sequelize,
  User: User,
  Task: Task,
  Auth: Auth,
  TaskOfUser: TaskOfUser,
}
