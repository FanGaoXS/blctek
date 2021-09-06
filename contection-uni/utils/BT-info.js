/**
 * 利用storage本地化存储蓝牙信息
 */
import BT_CONFIG from './BT-config.js'
const BTKey = 'bluetooth-blctek';

/**
 * info like :
 *  {
				deviceId: '',
				name: ''
		}
 */

export function setBTInfo(info){
	const devInfo = {
		deviceId: BT_CONFIG.deviceId,
		name: BT_CONFIG.name
	}
	return uni.setStorageSync(BTKey,devInfo);
}

export function getBTInfo(){
	return uni.getStorageSync(BTKey);
}

export function removeBTInfo(){
	return uni.removeStorageSync(BTKey);
}