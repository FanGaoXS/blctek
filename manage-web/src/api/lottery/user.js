import request from "@/utils/request";

export function removeUser(id){
  return request({
    url: 'lottery-server/user/removeUser',
    method: 'GET',
    params: {
      id
    }
  })
}

export function selectUserList(){
  return request({
    url: 'lottery-server/user/selectUserList',
    method: 'GET',
  })
}
