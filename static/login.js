var username = document.querySelector("input[name='username']");
var password = document.querySelector("input[name='password']");
var msg = document.querySelector(".msg")
    //验证码
var code;
var checkCode = document.getElementById("code")
var myCode = document.getElementById("myCode")
var submit = document.getElementById("submit");

//用户名，密码验证
var input = document.querySelectorAll("input");
var span = document.querySelectorAll("span");
var msg = document.querySelector(".msg");
input[0].onfocus = function() {
        layer.tips('长度要求在5-15之间', '.login__input', {
            tips: [3, 'yelow'],
            time: 1000,
        })
    }
    // $("input[name='username']").blur(function() {
    //     layer.tips('用户名不能为空', '.login__input', {
    //         tips: [3, 'white'],
    //         time: 1000,
    //     }); //下面
    // })
input[0].onblur = function() {
    if (/(?!^([a-zA-Z]+|\d+|[_]+)$)^[\w~!_?]{5,15}$|^1[3-9]\d{9}$/.test(input[0].value)) {
        layer.tips('验证通过', '.login__input', {
            tips: [3, 'yelow'],
            time: 1000,
        })

    } else {
        layer.tips('验证不通过', '.login__input', {
            tips: [3, 'yelow'],
            time: 1000,
        })
    }
}

input[1].onfocus = function() {
    document.querySelectorAll("span")[1].innerHTML = "长度要求在8-20之间"
    span[1].style.color = "#ccc"
    span[0].innerHTML = "";
}
input[1].onblur = function() {
        var num = input[1].value.length;
        var color = "red"
        if (/(?!^([a-zA-Z]+|\d+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/.test(input[1].value)) {
            span[1].innerHTML = "验证通过"
            span[1].style.color = "green";
        } else {
            span[1].innerHTML = "密码格式有误"
            span[1].style.color = "red"
        }
    }
    //验证码生成
function createCode() {
    code = '';
    var codeLength = 4;

    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];

    }
    checkCode.value = code;
}
createCode();
checkCode.onclick = function() {
    createCode();
}
document.querySelector("button").onclick = function() {
    var data = "username=" + username.value + "&password=" + password.value;
    var inputCode = document.getElementById("myCode").value.toUpperCase();

    if (myCode.value.length <= 0) {
        layer.alert("请输入验证码！");
        console.log(123);
        return false;

    }

    if (inputCode != code) {
        layer.alert("验证码输入错误" + code + ":" + inputCode)
        createCode();
        return false;
    }

    //调用封装好的ajax函数处理
    ajax("/login", function(data) {
        console.log(data.msg)
            // msg.innerHTML = (data.msg);
        alert(data.msg);
        if (data.status == 'ok') {
            location = "/index.html";
        }
    }, "POST", data)
}