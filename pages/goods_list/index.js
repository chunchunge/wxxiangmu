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
   // 总页数
   TotalPages: 1,
  data: {
    // 要显示的商品列表
    goods:[],
    titles: [
      "综合",
      "销量",
      "价格"
    ],
    // 要显示的索引
    currentIndex: 0

  },
  titleChange(e){
    // console.log(e);
    const {index}=e.detail;

    this.setData({
      currentIndex:index
    })
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
      const { goods } = this.data;
      // console.log(res);
      this.setData({
      // 当我们做分页了  总的数据 应该是不断 追加的！！！ 
      goods: [...goods, ...res.data.message.goods]
      })
       // 计算总页数
       this.TotalPages = Math.ceil(res.data.message.total / this.Params.pagesize);
    })
  },
      // 滚动条 触底事件
      onReachBottom() {
        // 1 判断还有没有下一页数据
        if (this.Params.pagenum >= this.TotalPages) {
          // 没有下一页数据
          console.log("没有下一页数据");
        } else {
          // 有下一页数据
          this.Params.pagenum++;
          // 发送请求获取下一页的数据
          this.getList();
        }
      },
      // 下拉刷新
    onPullDownRefresh() {
      // console.log("狗丢了怎么办？？？  搜狗搜索！！！");
      this.Params.pagenum=1;
      this.setData({
        goods:[]
      })
      this.getList();
    }
  
})