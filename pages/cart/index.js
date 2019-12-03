import regeneratorRuntime from "../../lib/runtime/runtime";
import { getSetting, chooseAddress, openSetting } from "../../utils/wxAsync";
Page({
  // handleFinalGet(){
  //  wx.getSetting({
  //     success: (result) => {
  //     // 获取是否获取授权信息
  //     const auth=result.authSetting['scope.address'];
  //       // 当auth为undifinr或者为true时都可直接获取用户的地址
  //       if(auth===undefined||auth===true){
  //         wx.chooseAddress({
  //           success: (result1) => {
  //             console.log(result1);
  //           }
  //         });
  //       }else{
  //         // 用户曾经点击过拒绝
  //         wx.openSetting({
  //           success: (result2) => {
  //             // 直接获取收货地址
  //            wx.chooseAddress({
  //               success: (result1) => {
  //                 console.log(result1);
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  // }
  data: {
    // 用户收货地址
    address: {},
    // 购物车数组
    carts:[]
  },
  onLoad(){
    const carts=wx.getStorageSync("carts")||[];
    this.setData({
      carts
    })
  },
  // 监听页面的显示
  onShow() {
    // address = { 对象 } || 空字符串
    const address = wx.getStorageSync("address") || {};
    this.setData({
      address
    });
  },
  async handleFinalGet() {
    // 获取用户的授权状态
    const auth = (await getSetting()).authSetting["scope.address"];
    if (auth === false) {
      await openSetting();
    }
    const res = await chooseAddress();
    // 把数据存到缓存中
    wx.setStorageSync("address", res);
  }
});
