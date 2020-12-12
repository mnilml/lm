/*
 * AJAX请求
 * @param  {string}  url            请求的URL地址
 * @param  {function}  callback     回调函数
 * @param  {string}  type           请求方式（GET或POST）
 * @param  {string}  data           POST方式发送的数据
 */
function ajax(url, callback, type = "GET", data = "") {
    // 1.初始化XHR对象
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        var xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 5 ,6
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 2.声明请求地址以及请求方式
    if (type == "GET") {
        xhr.open("GET", url, true);
        // 3.发送请求
        xhr.send();
    } else {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // 3.发送请求
        xhr.send(data);
    }

    // 4.监听Ajax的状态，接收服务器响应数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log(xhr.responseText);
            // 将接收到的json字符串转为json对象
            var data = JSON.parse(xhr.responseText);
            // 接收到数据后操作DOM，将结果显示在页面
            callback(data);
        }
    }
}