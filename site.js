// 引入Express框架
const express = require('express');
// 使用框架创建web服务器
const app = express();
// 声明静态资源目录
app.use("/", express.static("views"));

app.use("/static", express.static("static"))
app.use("/layer", express.static("layer"))
    // 引入body-parser模块
const bodyParser = require('body-parser');

// 配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));
//引入mysql模块
var mysql = require('mysql');
//编写数据库链接数据
var mysql_user = {
    //地址
    host: 'localhost',
    //用户名
    user: 'root',
    //密码 
    password: 'root',
    //要链接的数据库名字    就是开始创建的那个表的名字
    database: 'lml'
};
//建立数据库链接
var connection = mysql.createConnection(mysql_user);
//链接数据库
connection.connect(function(err) {
    //链接错误执行
    if (err) {
        console.log('[错误]' + err);
        connection.end();
        return;
    };
    //否则链接成功
    console.log('......链接成功......');
});

// 假设用户数据信息为(实际项目中应该从数据库查询得到):
/* var users = [{
        username: '张三',
        password: "123"
    },
    {
        username: '李四',
        password: "123"
    },
    {
        username: '王五',
        password: "123"
    },
]; */

var user = [];
setInterval(() => {
    connection.query('select * from user2', (err, results) => {
        user = results; // 把查询到的数据，存到数组中
    });
}, 1000);

// connection.query('insert into user2 (username ,password) values ("lupeng" , "123456")');
// console.log(users)
// 创建路由接收用户请求
app.get('/chkUsername', (request, response) => {
    //接收get数据
    var data = request.query;
    console.log(data);
    //判断是否存在该用户
    // users = user.split(";")
    console.log(typeof(user));

    console.log(user);
    var result = { status: 'ok', msg: '用户名可以使用' };
    for (var i = 0; i < user.length; i++) {
        if (data.username == user[i].username && data.password == user[i].password) {
            result = { status: "ok", msg: "登录成功" };
        }
        if (data.username == "") {
            result = {
                status: 'error',
                msg: '用户名不能为空'
            }
        };
        if (user[i].username == data.username) {
            result = {
                status: 'error',
                msg: '用户名已存在'
            }

        }

    }

    // 对客户端做出响应,send方法会根据内容的类型自动设置请求头
    response.send(result);
});
//路由
app.post("/login", function(request, response) {
    //接收post请求的数据
    var data = request.body;

    var result = { status: "error", msg: "用户名或密码不正确" };
    for (var i = 0; i < user.length; i++) {
        if (data.username == user[i].username && data.password == user[i].password) {
            result = { status: "ok", msg: "登录成功" };
        }
    }

    // 响应结果给浏览器
    response.send(result);
})

app.post("/regsiter", function(request, response) {
        //接收post请求的数据
        var data = request.body;
        console.log(data);
        var db = 'insert into user2 (username ,password) value (' + "'" + data.username + "'" + ',' + "'" + data.password + "'" + ')'
        var result = { status: "ok", msg: "注册成功" };
        for (var i = 0; i < user.length; i++) {
            if (data.username == user[i].username) {
                result = { status: "error", msg: "用户名已被注册" };
            } else {
                connection.query(db);
                console.log(user);
                console.log("......注册成功......")
                break;
            }
        }

        // 响应结果给浏览器
        response.send(result);
    })
    /* //判断是否存在该用户
        var result = { status: 'ok', msg: '用户名可以使用' };
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == data.username) {
                result = { status: 'error', msg: '用户名已存在' };
                break;
            }
        }

        // 对客户端做出响应,send方法会根据内容的类型自动设置请求头
        response.send(result);
    }); */
    // 程序监听3000端口
app.listen(3000);

/* connection.query("select * from user2", function selectTable(err, rows, fields) {
    if (err) {
        throw err;
    }
    if (rows) {
        for (var i = 0; i < rows.length; i++) {
            // request.json(rows);

            console.log(rows[i].username, rows[i].password);
        }
        console.log(rows)
        user = rows;
        // console.log(user)
    }
}); */
//路由
/* app.post("/getUser", function(request, response) {
    mysql_user.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT * FROM user2', function(error, results, fields) {
            // And done with the connection.
            res.json(results);
            // console.log(results)
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
})

connection.end(); */






console.log("......web服务正在运行......")