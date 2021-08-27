<template>
	<view>
		<button @tap="buttonOpenBluetoothAdapter()">打开蓝牙并开始搜索附近蓝牙</button>
		<button @tap="stopBluetoothDevicesDiscovery()">关闭蓝牙</button>
		<view v-for="item in devicesList" :key="item.id" style="margin-top: 20rpx;">
			蓝牙设备id：{{item.deviceId}}
			蓝牙信号强度：{{item.RSSI}}
			蓝牙设备名称：{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
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
					console.log(device);
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
				
			}
		}
	}
</script>

<style>

</style>
