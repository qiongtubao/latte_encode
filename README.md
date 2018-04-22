# latte_encode
###  描述
    使用到的编码和解码  比如utf8
###  安装
    npm install latte_encode
###  使用
* utf8
```javascript
   var Utf8 = require('latte_encode').utf8;
   var encodeData = Utf8.encode('编码');
   console.log(encodeData); //ç¼ç 
   var decodeData = Utf8.decode(encodeData); 
   console.log(decodeData); //编码
```