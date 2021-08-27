<template>
	<view>
		<button @tap="buttonOpenBluetoothAdapter()">开始搜索附近设备</button>
		<button @tap="buttonGetBluetoothDevices()">获取已发现或者已连接的蓝牙设备</button>
		<button @tap="stopBluetoothDevicesDiscovery()">停止搜索</button>
		<view v-for="item in devicesList" :key="item.id" style="margin-top: 20rpx;">
			<view>蓝牙设备id：{{item.deviceId}}</view>
			<view>蓝牙信号强度：{{item.RSSI}}</view>
			<view>蓝牙设备名称：{{item.name}}</view>
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
				devicesList: []
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
					/*console.log('name->',device.name);
					console.log('deviceId->',device.deviceId);
					console.log('RSSI->',device.RSSI);
					console.log('advertisServiceUUIDs->',device.advertisServiceUUIDs);
					console.log('localName->',device.localName);
					console.log('serviceData->',device.serviceData);*/
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
			// 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
			buttonGetBluetoothDevices(){
				uni.getBluetoothDevices({
					success: res=>{
						console.log('getBluetoothDevices success->',res);
						console.log(res.devices);
					},
					fail: error=>{
						console.log('getBluetoothDevices fail->',error);
					}
				})
			}
		}
	}
</script>

<style>

</style>
