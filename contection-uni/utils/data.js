const devices = [
	{
		deviceId: "F0:08:D1:DC:67:36",
		name: "BLERepeater",
		RSSI: -66,
		localName: "BLERepeater",
		advertisServiceUUIDs: []
	},
	{
		deviceId: "94:B9:7E:87:C2:DE",
		name: "BDmsg_TEST00",
		RSSI: -61,
		localName: "BDmsg_TEST00",
		advertisServiceUUIDs: []
	}
]


const services = [
	{
		uuid: "00001801-0000-1000-8000-00805F9B34FB",
		isPrimary: true,
		characteristics: [
			{
				uuid: "00002A05-0000-1000-8000-00805F9B34FB",
				properties: {
					read: false,
					write: false,
					notify: false,
					indicate: true
				}
			}
		]
	}, 
	{
		uuid: "00001800-0000-1000-8000-00805F9B34FB",
		isPrimary: true,
		characteristics: [
			{
				uuid: "00002A00-0000-1000-8000-00805F9B34FB",
				properties: { //只可读
					read: true,
					write: false,
					notify: false,
					indicate: false
				}
			}, 
			{
				uuid: "00002A01-0000-1000-8000-00805F9B34FB",
				properties: {	//只可读
					read: true,
					write: false,
					notify: false,
					indicate: false
				}
			}, 
			{
				uuid: "00002AA6-0000-1000-8000-00805F9B34FB",
				properties: {	//只可读
					read: true,
					write: false,
					notify: false,
					indicate: false
				}
			}
		]
	}, 
	{
		uuid: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
		isPrimary: true,
		characteristics: [
			{	//只可通知
				uuid: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E",
				properties: {
					read: false,
					write: false,
					notify: true,
					indicate: false
				}
			}, 
			{	//只可写
				uuid: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
				properties: {
					read: false,
					write: true,
					notify: false,
					indicate: false
				}
			}
		]
	},
],