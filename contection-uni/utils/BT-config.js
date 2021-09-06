const BT_CONFIG = {
	deviceId: "F0:08:D1:DC:67:36",
	// deviceId: "94:B9:7E:87:C2:DE",
	name: "BLERepeater",
	availableService: {	//可用的服务
		uuid: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
		writeC12c: {	//可写的特征
			uuid: '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'
		},
		notifyC12c:{	//可通知的特征
			uuid: '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'
		},
	}
}

export default BT_CONFIG