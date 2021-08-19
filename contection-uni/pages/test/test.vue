<template>
	<view>
		<h2>蓝牙适配器是否可用：{{BluetoothAdapter.isAvailable}}</h2>
		<h2>蓝牙适配器是否处于搜索状态：{{BluetoothAdapter.isDiscovering}}</h2>
		<input type="text" v-model="message" placeholder="请输入内容"/>
		<button @tap="buttonOpenBluetoothAdapter()">打开蓝牙适配器模块</button>
		<button @tap="buttonCloseBluetoothAdapter()">关闭蓝牙适配器模块</button>
		<button @tap="buttonClick()">发送指令</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '测试蓝牙',
				message: '',
				BluetoothAdapter:{
					isAvailable: false,
					isDiscovering: false
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			/* uni.onBluetoothAdapterStateChange(function(res){
				console.log('蓝牙适配器状态->',res);
				this.BluetoothAdapter.isAvailable = res.available
				this.BluetoothAdapter.isDiscovering = res.discovering
				console.log(this.BluetoothAdapter);
			}) */
		},
		methods: {
			buttonOpenBluetoothAdapter(){
				console.log('OpenBluetoothAdapter');
				uni.openBluetoothAdapter({
				  success(res) {
				    console.log('打开蓝牙适配器成功->',res)
				  },
					fail(error){
						console.log('打开蓝牙适配器失败->',error)
					},
					complete(res){
						console.log('打开蓝牙适配器->',res)
						uni.onBluetoothAdapterStateChange(function(res){
							console.log('蓝牙适配器状态->',res);
							/* this.BluetoothAdapter.isAvailable = res.available
							this.BluetoothAdapter.isDiscovering = res.discovering
							console.log(this.BluetoothAdapter); */
						})
					}
				})
			},
			buttonCloseBluetoothAdapter(){
				console.log('CloseBluetoothAdapter');
				uni.closeBluetoothAdapter({
				  success(res) {
				    console.log(res)
				  },
					fail(error){
						console.log(error);
					}
				})
			},
			buttonClick(){
				console.log('test');
			}
		}
	}
</script>

<style>

</style>
