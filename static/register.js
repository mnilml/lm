var code;
var checkCode = document.getElementById("code")
var myCode = document.getElementById("myCode")
var submit = document.getElementById("submit");

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

    var inputCode = document.getElementById("myCode").value.toUpperCase();

    if (myCode.value.length <= 0) {
        alert("请输入验证码！");
        console.log(123);
        return false;

    }

    if (inputCode != code) {
        alert("验证码输入错误" + code + ":" + inputCode)
        createCode();
        return false;
    }
}