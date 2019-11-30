import request from "../../request/request";
Page({
  // wxml中 只能找到 data中的变量的数据
  // data 中应该只存放 视图渲染 要用到的数据
  // data中的数据越多 页面越卡！！！
  // 视图要使用的全局数据
  data: {
    // 左侧的内容
    leftMenus: [],
    // 右侧的内容 列表
    rightGoods: [],
    currentIndex: 0,
    // 右侧滚动条的高度
    scrollTop: 0
  },
  // 全局数据
  Cates: [],
  onLoad() {
    // ! 获取缓存中的数据  默认值 是空字符串 
    const cates = wx.getStorageSync('cates');
    if (!cates) {
      console.log("没数据 发送请求");
      this.getCates();
    } else {
      // console.log("有数据");
      // 判断数据有没有过期 10s
      if (Date.now() - cates.time > 10 * 1000) {
        // 数据过期了
        console.log("数据过期了");
       
        this.getCates();
      } else {
        // 没有过期
        console.log("没有过期");
        this.Cates = cates.list;
        this.setData({
          leftMenus: this.Cates.map(v => v.cat_name),
          // 右侧的内容
          rightGoods: this.Cates[this.data.currentIndex].children
        })
      }
    }
  },
  getCates(){
    request({ url: "categories" }).then(res => {
      this.Cates = res.data.message;
      this.setData({
        // 获取对象中的某一项
        leftMenus: this.Cates.map(v => v.cat_name),
        rightGoods: this.Cates[this.data.currentIndex].children
      });
      console.log(this.data.rightGoods);
      wx.setStorageSync("cates", { list: this.Cates, time: Date.now() });
    });
  },
  handleMenuTap(e) {
    const currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex,
      // 右侧的内容
      rightGoods: this.Cates[currentIndex].children,
      // 控制右侧列表的滚动条的 距离的！！
      scrollTop: 0
    });
  }
});
