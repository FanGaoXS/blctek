export function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}

function str2ab(str) {
	var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
	bufView[i] = str.charCodeAt(i);
	}
return buf;
}