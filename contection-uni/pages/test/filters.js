	import GBK from '@/static/assets/gbk.min.js'
	
	//字符串转gbk16进制
  function stringToGBK16(str){
    // 字符串转为gbk10进制数组
    const gbk10Array = GBK.encode(str);
    let resultVal = '';
    for (let i = 0; i < gbk10Array.length; i++) {
      // console.log(gbk10Array[i]);  //10进制
      resultVal += gbk10Array[i].toString(16);
    }
    console.log(resultVal);
    return resultVal;
  }

  //字符串直接转为ArrayBuffer类型
  function stringToArrayBuffer(str) {
    // 首先将字符串转为16进制
    let val = ""
    for (let i = 0; i < str.length; i++) {
      if (val === '') {
        val = str.charCodeAt(i).toString(16)
      } else {
        val += ',' + str.charCodeAt(i).toString(16)
      }
    }
    // 将16进制转化为ArrayBuffer
    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    })).buffer
  }

  //ArrayBuffer类型直接转为16进制
  function arrayBufferToHex(buffer) {
    const hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('')
  }

  //字符串转16进制
  function stringToHex(str) {
    if(str === "")
      return "";
    var hexCharCode = [];
    // hexCharCode.push("0x");
    for(var i = 0; i < str.length; i++) {
      hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
  }

  //16进制转字符串
  function hexToString(hex,encoding) {
    const trimedStr = hex.trim();
    const rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    const len = rawStr.length;
    if (len % 2 !== 0) {
      alert("Illegal Format ASCII Code!");
      return "";
    }
    let curCharCode;
    let resultStr = [];
    for (let i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(curCharCode);
    }
    // encoding为空时默认为utf-8
    let bytesView = new Uint8Array(resultStr);
    let str = new TextDecoder(encoding).decode(bytesView);
    return str;
  }