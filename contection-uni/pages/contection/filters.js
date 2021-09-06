import GBK from '@/static/assets/gbk.min.js'

//字符串转gbk16进制
export function stringToGBK16(str){
	// 字符串转为gbk10进制数组
	const gbk10Array = GBK.encode(str);
	let resultVal = '';
	for (let i = 0; i < gbk10Array.length; i++) {
		// console.log(gbk10Array[i]);  //10进制
		let chs = gbk10Array[i].toString(16)
		if (chs.length < 2) chs = "0" + chs;
		resultVal += chs;
	}
	// console.log(resultVal);
	return resultVal;
}

//字符串直接转为ArrayBuffer类型
export function stringToArrayBuffer(str) {
	// 首先将字符串转为16进制
	let bytesArray = GBK.encode(str)
	// console.log(bytesArray)
	return new Uint8Array(bytesArray).buffer
}

//ArrayBuffer类型直接转为16进制
export function arrayBufferToHex(buffer) {
	const hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function (bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
	)
	return hexArr.join('')
}

//字符串转16进制
export function stringToHex(str) {
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
function hexToString(hexCharCodeStr) {
　　const trimedStr = hexCharCodeStr.trim();
　　const rawStr = 
　　trimedStr.substr(0,2).toLowerCase() === "0x"
　　? 
　　trimedStr.substr(2) 
　　: 
　　trimedStr;
　　const len = rawStr.length;
　　if(len % 2 !== 0) {
　　　　alert("Illegal Format ASCII Code!");
　　　　return "";
　　}
　　let curCharCode;
　　let resultStr = [];
　　for(let i = 0; i < len;i = i + 2) {
　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
　　　　resultStr.push(String.fromCharCode(curCharCode));
　　}
　　return resultStr.join("");
}