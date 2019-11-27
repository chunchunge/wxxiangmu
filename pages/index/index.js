
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
         wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            success: (result) => {
                // console.log(result.data.message);
                this.setData({
                    swiperList:result.data.message
                })
            }
        }),
        // 导航请求
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
            success: (result) => {
                // console.log(result.data.message);
                 this.setData({
                    navsList:result.data.message
                })
            },
        }),
        // 请求楼层
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
            success: (result) => {
                console.log(result.data.message);
                this.setData({
                    floorList:result.data.message
                })
            },
        });
          
    }
})
