const Sequelize = require('sequelize')
const  blog = new Sequelize(
    'blog', // 数据库名
    'root',   // 用户名
    'xqwxhs',   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        dialectOptions: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            supportBigNumbers: true,
            bigNumberStrings: true
        },
        'host': 'localhost', // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
        'define': {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            'underscored': true,
            'timestamp':true
        }
    }
)
//blog.sync({force:true})
module.exports = blog