import request from "@/utils/request";

export function insertMessage(message){
  return request({
    url: 'message-server/message/insertOne',
    method: 'POST',
    data: message
  })
}

export function getMessageListByPlateNumber(plateNumber,currentPage=1,pageSize=5){
  return request({
    url: 'message-server/message/selectListByPlateNumber',
    method: 'GET',
    params:{
      plateNumber,
      currentPage,
      pageSize
    }
  })
}
