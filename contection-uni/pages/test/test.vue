<template>
	<view>
		
		<view class="item-container">
			<input type="text" v-model="sendMessage" required/>
			<button :disabled="selectedDevice.deviceId!==''" @tap="buttonClickOpenBT()">打开蓝牙并开始搜索附近设备</button>
			<button :disabled="selectedService.uuid!==''" @tap="buttonClickGetServiceList()">获取该蓝牙的所有服务</button>
			<button :disabled="selectedCharacteristic.uuid!==''" @tap="buttonClickGetCharacteristicList()">获取该蓝牙的服务的所有特征值</button>
			<button :disabled="selectedCharacteristic.uuid===''" @tap="buttonClickNotifyBLEC12cValueChange()">监听该特征值的变化</button>
			<button @tap="buttonClickWrite()">写入数据</button>
			<button @tap="buttonClickCloseBT()">关闭蓝牙并关闭搜索附近设备</button>
		</view>
		<view class="item-container" v-if="selectedDevice.deviceId===''">
			可连接设备列表
			<view v-for="item in deviceList" :key="item.deviceId" @tap="itemClickSelectDevice(item)" class="item">
				<p>deviceId：{{item.deviceId}}</p>
				<p>RSSI：{{item.RSSI}}</p>
				<p>name：{{item.name}}</p>
				<p>advertisData:{{item.advertisData | arrayBufferToHex}}</p>
				<p>advertisServiceUUIDs:{{item.advertisServiceUUIDs}}</p>
				<p>localName:{{item.localName}}</p>
				<p>serviceData:{{item.serviceData}}</p>
			</view>
		</view>
		
		<view class="item-container" style="color: green;" v-else>
			已连接设备device
			<p>deviceId：{{selectedDevice.deviceId}}</p>
			<p>name：{{selectedDevice.name}}</p>
		</view>
		
		<view class="item-container" v-if="selectedService.uuid===''">
			可选择服务列表
			<view v-for="item in serviceList" :key="item.uuid" @tap="itemClickSelectService(item)" class="item">
				<p>uuid：{{item.uuid}}</p>
				<p>isPrimary：{{item.isPrimary}}</p>
			</view>
		</view>
		<view class="item-container" style="color: red;" v-else>
			已选择服务service
			<p>uuid：{{selectedService.uuid}}</p>
			<p>isPrimary：{{selectedService.isPrimary}}</p>
		</view>
		
		<view class="item-container" v-if="selectedCharacteristic.uuid===''">
			可选择服务的特征列表
			<view v-for="item in characteristicList" :key="item.uuid" @tap="itemClickSelectCharacteristic(item)" class="item">
				<p>uuid：{{item.uuid}}</p>
				<p>properties：{{item.properties}}</p>
			</view>
		</view>
		<view class="item-container" style="color: blue;" v-else>
			已选择服务的特征characteristic（c12c）
			<p>uuid：{{selectedCharacteristic.uuid}}</p>
			<p>properties：{{selectedCharacteristic.properties}}</p>
		</view>
	</view>
</template>

<script>
	
	import {
		stringToGBK16,						// 字符串直接转GBK16进制字符
		stringToArrayBuffer,			// 字符串转为ArrayBuffer类型
		arrayBufferToHex,					// ArrayBuffer类型转为16进制
		hexToString								// 16进制转为字符串
	} from './filters.js'
	
	export default {
		filters: {
			stringToGBK16,
			stringToArrayBuffer,
			arrayBufferToHex,
			hexToString
		},
		data() {
			return {
				title: '测试蓝牙',
				sendMessage: '',
				receiveMessage: '',
				deviceList: [],
				selectedDevice: {
					deviceId: 'F0:08:D1:DC:67:36',
					name: '',
				},
				serviceList: [],
				selectedService: {
					uuid: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
					isPrimary: true
				},
				characteristicList:[],
				selectedCharacteristic:{
					uuid: '6E400002-B5A3-F393-E0A9-E50E24DCCA9E',
					properties: {}
				}
			}
		},
		onLoad() {
			// this.defaultData();
			this.openBluetoothAdapter();
		},
		methods: {
			defaultData(){
				this.deviceList = []
				this.selectedDevice = {
					deviceId: '',
					name: ''
				},
				this.serviceList = []
				this.selectedService = {
					uuid: '',
					isPrimary: true
				}
				this.characteristicList = []
				this.selectedCharacteristic = {
					uuid: '',
					properties:{}
				}
			},
			//打开蓝牙适配器
			openBluetoothAdapter(){
				uni.openBluetoothAdapter({	//检查本机蓝牙是否打开
				  success:(res)=> {	//本机蓝牙已打开
				    console.log('openBluetoothAdapter success->',res)
						this.createBLEConnection();
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
			closeBluetoothAdapter(){
				uni.closeBluetoothAdapter({
					success: (res) => {
						console.log('closeBluetoothAdapter success->',res);
					},
					fail: (error) => {
						console.log('closeBluetoothAdapter fail->',error);
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
					if(this.deviceList.indexOf(device.deviceId)==-1){	//已搜到设备列表中不包含新搜到的蓝牙设备则加入
						this.deviceList.push(device)
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
					}
				})
			},
			//创建BLE的连接（需要deviceId）
			createBLEConnection(){
				const deviceId = this.selectedDevice.deviceId
				console.log('尝试与'+deviceId+'BLE设备进行连接');
				uni.createBLEConnection({
					deviceId: deviceId,
					success: res => {
						console.log('createBLEConnection success->',res);
						this.setBLEMTU();
						this.stopBluetoothDevicesDiscovery();	//连接完成后停止周围蓝牙的搜索
					},
					fail: error=>{
						console.log('createBLEConnection fail->',error);
					}
				})
			},
			setBLEMTU(){
				const deviceId = this.selectedDevice.deviceId
				console.log('尝试修改'+deviceId+'BLE设备的MTU（最大传输单元）');
				uni.setBLEMTU({
					deviceId,
					mtu: 500,
					success: (res) => {
						console.log('setBLEMTU success->',res);
					},
					fail: (error) => {
						console.log('setBLEMTU fail->',error);
					}
				})
			},
			closeBLEConnection(){
				const deviceId = this.selectedDevice.deviceId
				console.log('尝试与'+deviceId+'BLE设备断开连接');
				uni.closeBLEConnection({
					deviceId,
					success: (res) => {
						console.log('closeBLEConnection success->',res);
					},
					fail: (error) => {
						console.log('closeBLEConnection fail->',error);
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
							this.serviceList = services;
						},
						fail: (error) => {
							console.log('getBLEDeviceServices fail->',error);
						}
					})
				},5*1000)
			},
			//获取该蓝牙的该服务的特征值
			getBLEDeviceCharacteristics(){
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.selectedService.uuid;
				console.log('尝试获取'+deviceId+'设备的'+serviceId+'服务的特征值');
				setTimeout(()=>{
					uni.getBLEDeviceCharacteristics({
						deviceId: deviceId,
						serviceId: serviceId,
						success: (res) => {
							console.log('getBLEDeviceCharacteristics success->',res);
							const characteristics = res.characteristics;
							this.characteristicList = characteristics;  //将该服务的所有特征值存储
							// for (let i = 0; i < characteristics.length; i++) {
							// 	console.log(characteristics[i]);
							// 	this.notifyBLECharacteristicValueChange(characteristics[i].uuid)
							// }
						},
						fail: (error) => {
							console.log('getBLEDeviceCharacteristics fail->',error);
						}
					})
				},0*1000);
			},
			notifyBLECharacteristicValueChange(){
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.selectedService.uuid;
				const c12c = this.selectedCharacteristic.uuid;
				uni.notifyBLECharacteristicValueChange({
					state: true,
					deviceId,
					serviceId,
					characteristicId:'6E400003-B5A3-F393-E0A9-E50E24DCCA9E',		//具有notify功能的c12c的uuid
					success: (res) => {
						console.log('notifyBLECharacteristicValueChange success->',res);
						setTimeout(()=>{
							this.onBLECharacteristicValueChange();
						},0*1000)
					},
					fail: (error) => {
						console.log('notifyBLECharacteristicValueChange fail->',error);
					}
				})
			},
			onBLECharacteristicValueChange(){
				console.log('开始监听特征值的变化');
				uni.onBLECharacteristicValueChange(res=>{
					console.log('onBLECharacteristicValueChange->',res);
					console.log('监听到CharacteristicValue->',arrayBufferToHex(res.value));
				})
			},
			writeBLECharacteristicValue(){
				console.log('尝试向蓝牙设备写入数据');
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.selectedService.uuid;
				const c12c = this.selectedCharacteristic.uuid;
				const id = '0416399';
				let message = stringToGBK16(this.sendMessage);
				const totalMessage = "MSG:" + id + ":" + message + "\r\n";
				const buffer = stringToArrayBuffer(totalMessage);
				console.log('欲发送的整体buffer的长度：'+buffer.byteLength);
				console.log('欲发送的整体buffer的16进制：'+arrayBufferToHex(buffer))
				uni.writeBLECharacteristicValue({
					deviceId,
					serviceId,
					characteristicId: c12c,
					value: buffer,
					success: (res) => {
						console.log('writeBLECharacteristicValue success->',res);
					},
					fail: (error) => {
						console.log('writeBLECharacteristicValue fail->',error);
					}
				})
			},
			//打开蓝牙并开始搜索周围设备
			buttonClickOpenBT(){
				this.openBluetoothAdapter();
			},
			//关闭蓝牙并停止搜索周围设备
			buttonClickCloseBT(){
				this.closeBLEConnection(); 		//断开BLE设备连接
				this.closeBluetoothAdapter();
				this.defaultData();
			},
			//开始获取服务列表
			buttonClickGetServiceList(){
				this.getBLEDeviceServices();
			},
			//开始获取服务的特征值列表
			buttonClickGetCharacteristicList(){
				this.getBLEDeviceCharacteristics()
			},
			//启动特征值变化的监听器
			buttonClickNotifyBLEC12cValueChange(){
				this.notifyBLECharacteristicValueChange();
			},
			//写入数据
			buttonClickWrite(){
				this.writeBLECharacteristicValue();
			},
			itemClickSelectDevice(item){
				this.selectedDevice = item
				this.createBLEConnection()
			},
			itemClickSelectService(item){
				this.selectedService = item
			},
			itemClickSelectCharacteristic(item){
				this.selectedCharacteristic = item
			}
		}
	}
</script>

<style>
	.item-container {
		margin: 20rpx;
	}
	.item {
		margin-top: 10rpx;
	}
</style>
