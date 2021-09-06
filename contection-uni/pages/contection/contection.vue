<template>
	<view class="app-container">
		<view>
			<u-toast ref="uToast" />
			<u-modal 
				v-model="isModalOpen" 
				title="蓝牙状态"
				mask-close-able>
				<view class="modal-content-container">
					<p>
						deviceId:
						<text selectable>{{selectedDevice.deviceId}}</text>
					</p>
					<p>
						name:
						<text selectable>{{selectedDevice.name}}</text>
					</p>
					<p>
						service:
						<text selectable>{{service.uuid}}</text>
					</p>
					<p>
						notifyC12c:
						<text selectable>{{c12c.notify.uuid}}</text>
					</p>
					<p>
						writeC12c:
						<text selectable>{{c12c.write.uuid}}</text>
					</p>
				</view>
			</u-modal>
		</view>
		<view class="contect-container">
			<view class="input-container">
				<u-input
					type="text"
					clearable
					v-model="sendMessage"
					placeholder="请输入消息"
					maxlength="14"
					border
					:cursor-spacing="150"
					trim>
				</u-input>
			</view>
			<view class="tips-container">
				<text>你仅可以输入14个汉字</text>
			</view>
			<view class="button-container">
				<u-button 
					ripple
					:loading="isButtonLoading"
					:throttle-time="1000"
					@click="buttonClickSend()"
					
					type="success">确认发送</u-button>
			</view>
			<view class="button-container">
				<u-button 
					ripple
					v-if="isBTContected"
					:throttle-time="500"
					@click="isModalOpen = true"
					type="primary">查看蓝牙状态</u-button>
				<u-button
					ripple
					v-if="isBTContected"
					:throttle-time="500"
					style="margin-top: 40rpx;"
					@click="buttonClickRemoveBT()"
					type="warning">清除已连接蓝牙</u-button>
				<u-button
					ripple
					v-else
					:throttle-time="500"
					type="primary">连接新的蓝牙</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {
		getBTInfo,
		setBTInfo,
		removeBTInfo
	} from '@/utils/BT-info.js'
	
	import BT_CONFIG from '@/utils/BT-config.js'
	
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
				receiverId:'0416399',
				sendMessage: '',
				isButtonLoading: false,
				isBTContected: false,
				isModalOpen: false,
				selectedDevice: {
					deviceId: '',
					name: ''
				},
				service: {	//可用服务
					uuid: ''
				},
				c12c: {
					notify: {	//通知特征
						uuid: ''
					},
					write: {	//可写特征
						uuid: ''
					}
				}
			}
		},
		onLoad() {
			this.fetchData()
			this.openBluetoothAdapter()
		},
		onUnload(){	//页面卸载
			this.closeBT()	//关闭蓝牙（关闭BLE设备的连接和蓝牙的连接）
		},
		onPullDownRefresh() {
			this.fetchData()
			this.closeBT();
			this.openBluetoothAdapter()
			uni.stopPullDownRefresh();
		},
		methods: {
			
			//拉取data
			fetchData(){
				setBTInfo()
				const BTInfo = getBTInfo()
				this.selectedDevice.deviceId = BTInfo.deviceId
				this.selectedDevice.name = BTInfo.name
				this.service.uuid = BT_CONFIG.availableService.uuid
				this.c12c.notify.uuid = BT_CONFIG.availableService.notifyC12c.uuid
				this.c12c.write.uuid = BT_CONFIG.availableService.writeC12c.uuid
			},
			
			//打开蓝牙适配器
			openBluetoothAdapter(){
				uni.openBluetoothAdapter({	//检查本机蓝牙是否打开
				  success:(res)=> {	//本机蓝牙已打开
				    console.log('openBluetoothAdapter success->',res)
						if(this.selectedDevice.deviceId != ''){		//说明之前已经连接过
							// 直接连接设备
							this.createBLEConnection();
						} else {		//说明之前没有连接过
							// 开始搜索设备
							this.startBluetoothDeviceDiscovery()	//开始搜索周围蓝牙
						}
				  },
					fail:(error)=>{		//本机蓝牙未打开
						console.log('openBluetoothAdapter fail->',error)
						this.$refs.uToast.show({
							title: '本机蓝牙未打开',
							type: 'error',
							position: 'center'
						})	//提示用户蓝牙未打开
						this.onBluetoothAdapterStateChange();	//启用蓝牙状态监听器（监听蓝牙是否打开）
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
			onBluetoothAdapterStateChange(){
				uni.onBluetoothAdapterStateChange(res=>{
					console.log('adapterState changed, now is', res)
					if(res.available) {	//如果available为true说明用户已经打开
						if(this.selectedDevice.deviceId != ''){		//说明之前已经连接过
							// 直接连接设备
							this.createBLEConnection();
						} else {		//说明之前没有连接过
							// 开始搜索设备
							this.startBluetoothDeviceDiscovery()	//开始搜索周围蓝牙
						}
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
						setTimeout(()=>{
							this.notifyBLECharacteristicValueChange()	//监听特征值变化（打开特征值监听器）
						},1*1000);
						this.setBLEMTU();			//修改最大传输字节数
						this.stopBluetoothDevicesDiscovery();	//连接完成后停止周围蓝牙的搜索
						this.isBTContected = true
						this.$refs.uToast.show({
							title: '蓝牙设备已连接',
							type: 'success',
							position: 'center'
						})	//提示用户蓝牙未打开
					},
					fail: error=>{
						console.log('createBLEConnection fail->',error);
					}
				})
			},
			//关闭与BLE设备的连接
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
			setBLEMTU(){
				const deviceId = this.selectedDevice.deviceId
				console.log('尝试修改'+deviceId+'BLE设备的MTU（最大传输单元）');
				uni.setBLEMTU({
					deviceId,
					mtu: 200,	//最大传输字节数（单位字节）
					success: (res) => {
						console.log('setBLEMTU success->',res);
					},
					fail: (error) => {
						console.log('setBLEMTU fail->',error);
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
			//搜索到外围设备（将需要的deviceId存储起来）
			onBluetoothDeviceFound(){
				let i = 0;
				//开启后搜索到每搜索到一个蓝牙设备执行一次
				uni.onBluetoothDeviceFound(res=>{
					// console.log(res);	//返回新搜索到的设备列表 Array<Object>
					/* const device = res.devices[0];	//搜到的设备
					console.log("device: ",device);
					if(this.deviceList.indexOf(device.deviceId)==-1){	//已搜到设备列表中不包含新搜到的蓝牙设备则加入
						this.deviceList.push(device)
					} */
				})
			},
			notifyBLECharacteristicValueChange(){
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.service.uuid;
				const c12c = this.c12c.notify.uuid;	//可通知的特征
				uni.notifyBLECharacteristicValueChange({
					state: true,
					deviceId,
					serviceId,
					characteristicId:c12c,				//具有notify功能的c12c的uuid
					success: (res) => {
						console.log('notifyBLECharacteristicValueChange success->',res);
						this.onBLECharacteristicValueChange();
					},
					fail: (error) => {
						console.log('notifyBLECharacteristicValueChange fail->',error);
						setTimeout(()=>{
							this.notifyBLECharacteristicValueChange()
						},1*1000)
					}
				})
			},
			onBLECharacteristicValueChange(){
				console.log('开始监听特征值的变化');
				uni.onBLECharacteristicValueChange(res=>{
					console.log('onBLECharacteristicValueChange->',res);
					const value = res.value
					const hex = arrayBufferToHex(value);
					console.log('监听到CharacteristicValue->',hex);
				})
			},
			writeBLECharacteristicValue(){
				this.isButtonLoading = true;
				console.log('尝试向蓝牙设备写入数据');
				const deviceId = this.selectedDevice.deviceId;
				const serviceId = this.service.uuid;
				const c12c = this.c12c.write.uuid;
				const id = this.receiverId;
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
						this.$refs.uToast.show({
							title: '消息发送成功',
							type: 'success',
							position: 'center'
						})	//提示用户消息发送成功
						this.sendMessage = ''
					},
					fail: (error) => {
						console.log('writeBLECharacteristicValue fail->',error);
						this.$refs.uToast.show({
							title: '消息发送失败，你可以尝试下拉刷新页面',
							icon: false,
							type: 'error',
							position: 'center'
						})	//提示用户发送失败
					},
					complete:() => {
						console.log('complete');
						this.isButtonLoading = false;
					}
				})
			},
			closeBT(){
				this.closeBLEConnection()
				this.closeBluetoothAdapter()
			},
			buttonClickSend(){
				this.writeBLECharacteristicValue()
			},
			buttonClickRemoveBT(){
				removeBTInfo()
			}
		}
	}
</script>

<style lang="scss">
	/* page {
		background-color: ;
	} */
	.contect-container {
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 800rpx;
	}
	.input-container {
		background-color: $uni-bg-color-grey;
	}
	.tips-container {
		margin-top: 40rpx;
		color: $uni-color-error;
		text-align: center;
		font-size: $uni-font-size-base;
	}
	.button-container {
		margin-top: 40rpx;
	}
	.modal-content-container {
		padding: 50rpx;
	}
</style>
