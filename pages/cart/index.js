
Page({
  handleFinalGet(){
   wx.getSetting({
      success: (result) => {
      // 获取是否获取授权信息
      const auth=result.authSetting['scope.address'];
        // 当auth为undifinr或者为true时都可直接获取用户的地址
        if(auth===undefined||auth===true){
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1);
              
            }
          });
            
        }else{
          // 用户曾经点击过拒绝
          wx.openSetting({
            success: (result2) => {
              // 直接获取收货地址
             wx.chooseAddress({
                success: (result1) => {
                  console.log(result1);
                  
                }
              });
                
            }
          });
            
        }
      }
    });
       
  }
})