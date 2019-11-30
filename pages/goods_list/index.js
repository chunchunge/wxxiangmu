import request from "../../request/request";
Page({
   // 全局的接口参数
   Params: {
    // 查询关键字 "小米"
    query: "",
    // 分类id
    cid: -1,
    // 页码 第几页 
    pagenum: 1,
    // 页容量 -> 每一页可以放几条数据
    pagesize: 10
  },
  
  data: {
    // 要显示的商品列表
    goods:[]
  },
  onLoad(options) {
    this.Params.cid = options.cid;

    this.getList();
  },
   // 获取商品列表数据
   getList() {
    request({
      url: "goods/search",
      data: this.Params
    })
    .then(res=>{
      console.log(res);
      this.setData({
        goods:res.data.message.goods
      })
    })
  }
})