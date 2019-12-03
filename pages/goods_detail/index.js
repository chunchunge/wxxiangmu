import request from "../../request/request";
Page({
  data: {
    goodsInfo:{}
  },
  onLoad: function (options) {
    this.getDetail(options.goods_id);
  },

  // 获取商品的详情数据
  getDetail(goods_id) {
    request({
      url: "goods/detail",
      data: {
        goods_id
      }
    }).then(res => {
      console.log(res);
      this.setData({
        goodsInfo:res.data.message
      })
    })
  },
  handlePreviewImg(e){
      // 当前被点击的大图片路径
      const current = e.currentTarget.dataset.src;
     // 要预览的整个图片列表
     const urls = this.data.goodsInfo.pics.map(v => v.pics_big);
     // 开始预览
     wx.previewImage({
       current,
       urls
     });
  },
  handleGoodsAdd(){
    // 首先获取购物车里面的数据
    let carts=wx.getStorageSync("carts")||[];
    const index = carts.findIndex(v => v.goods_id === this.data.goodsInfo.goods_id);
    // 判断所添加的商品是否已经存在
    if(index===-1){
      // 不存在的话就添加
      carts.unshift({
        ...this.data.goodsInfo,
        nums:1
      })
    }else{
// 已经存在的话就将数量++
carts[index].nums++;
    }
      
       // 4 重新添加到缓存中
    wx.setStorageSync("carts", carts);

    wx.showToast({
      title: '添加成功',
      mask: true
    });

  }
})