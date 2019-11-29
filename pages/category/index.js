import request from "../../request/request"
Page({
  // wxml中 只能找到 data中的变量的数据 
  // data 中应该只存放 视图渲染 要用到的数据  
  // data中的数据越多 页面越卡！！！
  // 视图要使用的全局数据
  data:{
    // 左侧的内容
    leftMenus: [],
    // 右侧的内容 列表
    rightGoods: [],
    currentIndex: 0
  },
  // 全局数据
  Cates: [],
  onLoad(){
    request({url:"categories"}).then(res=>{
      this.Cates = res.data.message;
      this.setData({
        // 获取对象中的某一项
        leftMenus:this.Cates.map(v=>v.cat_name),
        rightGoods:this.Cates[this.data.currentIndex].children
        
      })
      console.log(this.data.rightGoods);
    })
  },
    handleMenuTap(e) {
      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex,
        // 右侧的内容
        rightGoods: this.Cates[currentIndex].children
      })   
      
  }
})