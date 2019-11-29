
/* 
* 1 轮播图 
    0 在页面的onLoad事件中来发送异步请求 
    1 发送异步请求或者数据 ？
    2 把数据动态渲染出来
      1 利用 swiper标签
      2 利用 image标签 
! 2 
? 3 
 */
//  引入统一发送异步请求的函数
import request from "../../request/request";
Page({
    data :{
        // 轮播图数组
        swiperList:[],
        // 导航数组
        navsList:[],
        // 楼层数组
        floorList:[]
    },
    onLoad(){
        // 发送异步请求
        request({ url: "home/swiperdata" })
        .then(result =>{
                // console.log(result.data.message);
                this.setData({
                    swiperList:result.data.message
                })
            
        }),
        // 导航请求
        request({ url: "home/catitems" })
      .then(result => {
                // console.log(result.data.message);
                 this.setData({
                    navsList:result.data.message
                })
            
        }),
        // 请求楼层
        request({ url: "home/floordata" })
      .then(result => {
                console.log(result.data.message);
                this.setData({
                    floorList:result.data.message
                })
            
        });
          
    }
})
