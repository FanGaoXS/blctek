<template>
	<view>
		<view style="color: red;">
			<h2>已经连接的设备</h2>
			<view>deviceId: {{selectedDevice.deviceId}}</view>
			<view>name: {{selectedDevice.name}}</view>
		</view>
		<input type="text" v-model="message" />
		<button @tap="buttonOpenBluetoothAdapter()">开始搜索附近设备</button>
		<!-- <button @tap="buttonGetBluetoothDevices()">获取已发现或者已连接的蓝牙设备</button> -->
		<button @tap="buttonGetBLEDeviceServices()">获取当前已经连接BLE设备的可用服务</button>
		<button @tap="stopBluetoothDevicesDiscovery()">停止搜索</button>
		<button @tap="buttonSendMessage()">发送消息</button>
		<view v-for="item in devicesList" :key="item.id" style="margin-top: 20rpx;" @tap="buttonItemClick(item)">
			<view>deviceId：{{item.deviceId}}</view>
			<view>RSSI：{{item.RSSI}}</view>
			<view>name：{{item.name}}</view>
			<view>advertisData:{{item.advertisData | ab2hex}}</view>
			<view>advertisServiceUUIDs:{{item.advertisServiceUUIDs}}</view>
			<view>localName:{{item.localName}}</view>
			<view>serviceData:{{item.serviceData}}</view>
		</view>
	</view>
</template>

<script>
	
	import {
		ab2hex
		} from './filters.js'
	
	export default {
		filters: {
			ab2hex
		},
		data() {
			return {
				title: '测试蓝牙',
				message: '',
				devicesList: [],
				selectedDevice: {
					deviceId: undefined,
					name: undefined,
				},
				serviceId: undefined,
				characteristics:[]
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.stopBluetoothDevicesDiscovery()	//关闭蓝牙
		},
		methods: {
			//打开蓝牙适配器
			buttonOpenBluetoothAdapter(){
				uni.openBluetoothAdapter({	//检查本机蓝牙是否打开
				  success:(res)=> {	//本机蓝牙已打开
				    console.log('openBluetoothAdapter success->',res)
						this.startBluetoothDeviceDiscovery()	//开始搜索周围蓝牙
				  },
					fail:(error)=>{		//本机蓝牙未打开
						console.log('openBluetoothAdapter fail->',error)
						uni.showToast({
							title: '蓝牙适配器打开失败，请检查本机蓝牙是否打开',
							position: 'center'
						})
					}
				})
			},
			//开始搜索周围的蓝牙
			startBluetoothDeviceDiscovery(){
				uni.startBluetoothDevicesDiscovery({
					// services:['','',''] //搜索的主services蓝牙的uuid（主要搜索这部分蓝牙）
					success:(res)=>{	//开始搜索周围蓝牙成功
						console.log('startBluetoothDevicesDiscovery success->',res);
						this.onBluetoothDeviceFound();	//进行搜索
					},
					fail:(error)=> {		//开始搜索周围蓝牙失败
						console.log('startBluetoothDevicesDiscovery fail->',error);
					}
				})
			},
			//搜索到外围设备（将需要的deviceId存储起来）
			onBluetoothDeviceFound(){
				let i = 0;
				//开启后搜索到每搜索到一个蓝牙设备执行一次
				uni.onBluetoothDeviceFound(res=>{
					// console.log(res);	//返回新搜索到的设备列表 Array<Object>
					const device = res.devices[0];	//搜到的设备
					console.log("device: ",device);
					if(this.devicesList.indexOf(device.deviceId)==-1){	//已搜到设备列表中不包含新搜到的蓝牙设备则加入
						this.devicesList.push(device)
					}
				})
			},
			stopBluetoothDevicesDiscovery(){
				uni.stopBluetoothDevicesDiscovery({
					success(res) {	//关闭蓝牙发现器成功
						console.log('stopBluetoothDevicesDiscovery success->',res);
					},
					fail(error) {		//关闭蓝牙发现器失败
						console.log('stopBluetoothDevicesDiscovery fail->',error);
					},
					complete:() => {
						uni.stopPullDownRefresh();
						this.devicesList = []
					}
				})
			},
			//创建BLE的连接（需要deviceId）
			createBLEConnection(){
				const deviceId = this.selectedDevice.deviceId
				console.log('尝试与'+deviceId+'设备进行连接');
				uni.createBLEConnection({
					deviceId: deviceId,
					success: res => {
						console.log('createBLEConnection success->',res);
						this.stopBluetoothDevicesDiscovery();	//连接完成后停止周围蓝牙的搜索
					},
					fail: error=>{
						console.log('createBLEConnection fail->',error);
					}
				})
			},
			//获取当前BLE设备的可用服务
			getBLEDeviceServices(){
				const deviceId = this.selectedDevice.deviceId;
				console.log('尝试获取'+deviceId+'设备的可用服务');
				setTimeout(()=>{
					uni.getBLEDeviceServices({
						deviceId:deviceId,
						success: (res) => {
							console.log('getBLEDeviceServices success->',res);
							const services = res.services;
							for (let i = 0; i < services.length; i++) {
								console.log(services[i]);
								if(services[i].uuid.indexOf('6E40')!=-1){
									this.serviceId = services[i].uuid; //存储服务的uuid
									break;
								}
							}
							this.getBLEDeviceCharacteristics();
						},
						fail: (error) => {
							console.log('getBLEDeviceServices fail->',error);
						}
					})
				},1000*10)
			},
			//获取该蓝牙的该服务的特征值
			getBLEDeviceCharacteristics(){
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.serviceId
				console.log('尝试获取'+deviceId+'设备的'+serviceId+'服务的特征值');
				setTimeout(()=>{
					uni.getBLEDeviceCharacteristics({
						deviceId: deviceId,
						serviceId: serviceId,
						success: (res) => {
							console.log('getBLEDeviceCharacteristics success->',res);
							const characteristics = res.characteristics;
							this.characteristics = characteristics;  //将该服务的所有特征值存储
							// for (let i = 0; i < characteristics.length; i++) {
							// 	console.log(characteristics[i]);
							// 	this.notifyBLECharacteristicValueChange(characteristics[i].uuid)
							// }
						},
						fail: (error) => {
							console.log('getBLEDeviceCharacteristics fail->',error);
						}
					})
				},10*1000);
			},
			notifyBLECharacteristicValueChange(characteristicId){
				const deviceId = this.selectedDevice.deviceId
				const serviceId = this.serviceId
				console.log('尝试通知'+characteristicId);
				uni.notifyBLECharacteristicValueChange({
					state: true,
					deviceId: deviceId,
					serviceId: serviceId,
					characteristicId: characteristicId,
					success: (res) => {
						console.log('notifyBLECharacteristicValueChange success->',res);
					},
					fail: (error) => {
						console.log('notifyBLECharacteristicValueChange fail->',error);
					}
				})
			},
			writeBLECharacteristicValue(characteristicId){
				const deviceId = this.selectedDevice.deviceId
				const serviceId = this.serviceId
				console.log('尝试向'+characteristicId+'写入');
				const buffer = new ArrayBuffer(8)
				const dataView = new DataView(buffer)
				console.log(dataView);
				uni.writeBLECharacteristicValue({
					deviceId,
					serviceId,
					characteristicId,
					value: buffer,
					success: (res) => {
						console.log('writeBLECharacteristicValue success->',res);
					},
					fail: (error) => {
						console.log('writeBLECharacteristicValue fail->',error);
					}
				})
			},
			//点击单个设备时的操作
			buttonItemClick(item){
				// console.log(item);
				this.selectedDevice.deviceId = item.deviceId;
				this.selectedDevice.name = item.name;
				this.createBLEConnection();
			},
			buttonGetBLEDeviceServices(){
				this.getBLEDeviceServices();
			},
			buttonSendMessage(){
				let characteristicId = '';
				for (let i = 0; i < this.characteristics.length; i++) {
					if(this.characteristics[i].uuid.indexOf('6E400002')!=-1) {
						characteristicId = this.characteristics[i].uuid
					}
				}
				this.writeBLECharacteristicValue(characteristicId)
			}
		}
	}
</script>

<style>

</style>
