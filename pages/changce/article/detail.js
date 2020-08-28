var t = getApp(),
    e = t.requirejs("wxParse/wxParse"),
    a = t.requirejs("core");
Page({
    data: {
        isShareDisplay: false,
        showModal:false,
        shareImg:'',
        aid: 0,
        loading: !1,
        show: !1,
        article: [],
        likenum: 0,
        approot: t.globalData.approot,
        qrCodeUrl:'',//小程序码路径
        // 分享相关
        model: {
            topImageUrl: '',
            mallUrl: 'https://shops.leju315.com/test.png',
            name: '',
            city: '',
            content: '',
            address: '',
            contentImages: [{
                image: ''
              },
              {
                image: ''
              }
            ],
          },
          windowWidth: 0,
          windowHeight: 0,
          totalHeight: 0,
          canvasScale: 1.0,// 画布放大的倍数,因为如果保存的是一倍的分享图片的话，分享图会有点虚。所以保存的时候，canvasScale设置为2.0，wxss 里面的left: 500%;打开注释。就可保存两倍的分享图
        
    },
    onLoad: function(t) {
        let that = this
        // 获取到屏幕的宽高等信息
        wx: wx.getSystemInfo({
        success: function(res) {
          that.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      })

        this.setData({
            aid: t.id
        }), this.getDetail()
    },
    getDetail: function() {
        var t = this;
        var topImageUrl = "model.topImageUrl"
        var name = "model.name"
        var content = "model.content"
        a.get("changce/article/get_detail", {
            id: t.data.aid
        }, function(i) {
            if (!i.article) return a.alert(i.error), !1;
            wx.setNavigationBarTitle({
                title: i.article.article_title
            }), t.setData({
                article: i.article,
                likenum: i.article.likenum,
                show: !0,
                [topImageUrl]: i.article.resp_img,
                [name] : i.article.article_title,
                [content] : i.article.article_content
                
            }), e.wxParse("wxParseData", "html", i.article.article_content, t, "10")
        })
        // 获取小程序码
        wx.request({
          url: 'https://shops.leju315.com/getQrCode.php',
          data:{
            id:t.data.aid
          },
          success:function(res){
            t.qrCodeUrl = 'https://shops.leju315.com/' + res.data
          }
        })
      
    },
    callme: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.target.id
        })
    },
    likeit: function(t) {
        var e = this,
            i = e.data.likenum,
            r = e.data.aid;
        a.get("changce/article/like", {
            id: r
        }, function(t) {
            if (!t.success) return a.alert(t.error), !1;
            1 == t.status ? i++ : i--, e.setData({
                likenum: i
            })
        })
    },
    phone: function(t) {
        a.phone(t)
    },

    onShareAppMessage: function () {
      var that = this
      return {
          title: that.data.model.name,
          desc: that.data.article.resp_desc,
        //   path: '/pages/changce/detail?id=123'
        }
      },
      // 分享到朋友圈
      onShareTimeline:function(res){
        return {
         title:this.data.article.article_title.replace(/<\/?.+?>/g, "").replace(/ /g, ""),
         query:{aid:this.data.aid},
         imageUrl:''
        }
     },

      /**
   * 绘制分享海报
   */
  begainDrawShareImage() {
    wx.showLoading({
      title: '生成海报中...',
    })
    var that = this
    // 适配屏幕
    let scale = this.data.windowWidth / 375.0
    this.setData({ totalHeight: 667* scale})
    // 获取Canvas
    let ctx = wx.createCanvasContext('shareFrends')
    // 放大 因为不放大的话，生成的分享图会模糊。暂时先注释
    // ctx.scale(this.data.canvasScale, this.data.canvasScale)

    // 绘制主背景白色
    // ctx.fillStyle="white"
    ctx.setFillStyle('white')
    // ctx.setFillStyle('#ffffff')
    ctx.fill()
    ctx.fillRect(0, 0, this.data.windowWidth, this.data.windowHeight)
    ctx.draw()
    
    // ctx.stroke()
    // ctx.draw()

    // 标题
    var title = this.data.article.article_title.replace(/<\/?.+?>/g, "").replace(/ /g, "")
    ctx.setFillStyle('#383838');
    ctx.setFontSize(14 * scale);
    this.canvasTextAutoLine(title, ctx, 30 * scale, 30 * scale, 22 * scale, 220 * scale, 1)

    // 作者
    var author = this.data.article.article_date
    ctx.setFillStyle('#949494');
    ctx.setFontSize(10 * scale);
    this.canvasTextAutoLine(author, ctx, 30 * scale, 50 * scale, 22 * scale, 220 * scale, 1)

    var content = this.data.model.content.replace(/<\/?.+?>/g, "").replace(/ /g, "")
    ctx.setFillStyle('#3c3c3c');
    ctx.setFontSize(12 * scale);
    this.canvasTextAutoLine(content, ctx, 30 * scale, 80 * scale, 22 * scale, 220 * scale, 4)
    
    // 首先要绘制顶部的背景图片，因为它在最底层，然后才能绘制其他内容
    let topImageWidth = parseInt(225 * scale) // 因为小数有时候会请求不到图片，所以转成int
    let topImageHeight = parseInt(150 * scale)
    let src1 = this.data.model.topImageUrl 
    wx.getImageInfo({
      src: src1,
      success: function(res) {
        // ctx.setFillStyle('rgb(255,255,255)')
        // ctx.fillRect(0, 0, topImageWidth, topImageHeight)
        // ctx.drawImage(res.path, parseInt(that.data.windowWidth/2 * scale)-150, 130 * scale, topImageWidth, topImageHeight)
        ctx.drawImage(res.path, 20 * scale, 160 * scale, topImageWidth, topImageHeight)

        // 覆盖黑色蒙层
        ctx.draw(true)
        that.drawOtherImage(ctx,scale)
        that.drawOtherContent(ctx,scale)
      
      }
    })
  },
  // 绘制除了图片之外的剩余内容
  drawOtherContent(ctx, scale) {

    // 绘制中间的灰色背景
    // ctx.setFillStyle('rgba(255,255,255)')
    // ctx.fillRect(14 * scale, 230 * scale, 347 * scale, 158 * scale)

    //name
    // ctx.setFillStyle('white');
    // ctx.setFontSize(30 * scale);
    // this.canvasTextAutoLine(this.data.model.name, ctx, 80 * scale, 220 * scale, 35 * scale, 258 * scale, 1)

    // cotent
    // var content = this.data.model.content.replace(/<\/?.+?>/g, "").replace(/ /g, "")
    // ctx.setFillStyle('#3c3c3c');
    // ctx.setFontSize(15 * scale);
    // this.canvasTextAutoLine(content, ctx, 20 * scale, 210 * scale, 22 * scale, 240 * scale, 4)

    // address
    // ctx.setFillStyle('#dadada');
    // ctx.setFontSize(15 * scale);
    // this.canvasTextAutoLine(this.data.model.address, ctx, 30 * scale, 370 * scale, 22 * scale, 305 * scale, 1)

    this.drawNormalText(ctx, '美家智推', 20 * scale, 340 * scale, 14 * scale, '#3C3C3C', 'left', 'middle', scale);
    this.drawNormalText(ctx, '长按扫码阅读', 20 * scale, 365 * scale, 12 * scale, '#9A9CAC', 'left', 'middle', scale);
    // this.drawNormalText(ctx, '查看更多店铺信息和热评', 82 *scale,635*scale, 12*scale, '#9A9CAC', 'left', 'middle', scale);
    ctx.draw(true)
  },

  // 绘制剩余图片
  drawOtherImage(ctx, scale) {
    let that = this
    let mallImageWidth = parseInt(80 * scale)
    let mallImageHeight = parseInt(80 * scale)
    let src1 = that.qrCodeUrl
    wx.getImageInfo({
      src: src1,
      success: function (res) {
        // console.log(that.qrCodeUrl)
        // ctx.setFillStyle('rgb(255,255,255)')
        // ctx.fillRect(parseInt(that.data.windowWidth/2 * scale-40), 300*scale, mallImageWidth, mallImageHeight)
        // ctx.draw(true)
        ctx.drawImage(res.path, parseInt(that.data.windowWidth/2 * scale-40), 310*scale, mallImageWidth, mallImageHeight)
        ctx.draw(true)

        wx.hideLoading({
          complete: (res) => {},
        })
        setTimeout(() => {
          //下面的13以及减26推测是因为在写样式的时候写了固定的zoom: 50%而没有用像素比缩放导致的黑边，所以在生成时进行了适当的缩小生成，这个大家可以自行尝试
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: that.data.windowWidth * that.data.canvasScale,
            height: that.data.totalHeight * that.data.canvasScale,
            canvasId: 'shareFrends',
            success: (res) => {
              that.setData({
                shareImg: res.tempFilePath,
                showModal:true
              })
            }
          })
        }, 200)
      }
    })

    // let cotentImageWidth = parseInt(166 * scale)
    // let cotentImageHeight = parseInt(166 * scale)
    // for (let i = 0; i < this.data.model.contentImages.length; i++){
    //   let imageItem = this.data.model.contentImages[i]
    //   let src1 = imageItem.image + `?imageView/2/w/${cotentImageWidth}/h/${cotentImageHeight}`
    //   wx.getImageInfo({
    //     src: src1,
    //     success: function (res) {
    //       ctx.drawImage(res.path, 15 * scale + i*180*scale, 400 * scale, cotentImageWidth, cotentImageHeight)
    //       ctx.draw(true)
    //     }
    //   })
    // }

    // icon 
    // ctx.setShadow(0, 8 * scale, 20, 'rgba(0,0,0,0.1)')  
    //ctx.drawImage('../../img/mars.png', 13 * scale, 590 * scale, 54*scale, 54*scale)
    // ctx.setShadow(0, 0, 0, 'white')
    //ctx.draw(true)
  },

  // 绘制只有一行的文字
  drawNormalText(ctx, str, x, y, font, style, align, baseLine) {
    ctx.setFontSize(font);
    ctx.setFillStyle(style);
    ctx.setTextAlign(align);
    ctx.setTextBaseline(baseLine);
    ctx.fillText(str, x, y);
  },


  /*
  *  绘制多行文本，自动换行，超出添加...
  *
  str:要绘制的字符串
  canvas:canvas对象
  initX:绘制字符串起始x坐标
  initY:绘制字符串起始y坐标
  lineHeight:字行高，自己定义个值即可
  maxWidth: 文本最大宽度
  row: 最大行数
  */
  canvasTextAutoLine: function(str, ctx, initX, initY, lineHeight, maxWidth, row = 1) {
    initX = initX-10;
    var lineWidth = 0;
    var lastSubStrIndex = 0;
    var currentRow = 1;
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > maxWidth) {
        currentRow++;
        let newStr = str.substring(lastSubStrIndex, i)
        if (currentRow > row && str.length > i) {
          newStr = str.substring(lastSubStrIndex, i - 2) + '...'
        }
        ctx.fillText(newStr, initX, initY);
        initY += lineHeight;
        lineWidth = 0;
        lastSubStrIndex = i;

        if (currentRow > row) {
          break;
        }
      }
      if (i == str.length - 1) {
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
      }
    }
  },
// 保存图片
saveImage(){
    var that = this
    wx.getSetting({
      success(res) {
          if (res.authSetting['scope.writePhotosAlbum']) {
              that.saveImageToPhotos();
          } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
              wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                      that.saveImageToPhotos();
                  },
                  fail(){
                      wx.showToast({
                          title: '您没有授权，无法保存到相册',
                          icon: 'none'
                      })
                  }
              })
          }else {
              wx.openSetting({
                  success(res) {
                      if (res.authSetting['scope.writePhotosAlbum']) {
                          that.saveImageToPhotos();
                      }else{
                          wx.showToast({
                              title:'您没有授权，无法保存到相册',
                              icon:'none'
                          })
                      }
                  }
              })
          }
      }
  })
  },
  saveImageToPhotos: function (tempFilePath) {
    let that = this
    wx.canvasToTempFilePath({
      fileType:'jpg',
      x: 0,
      y: 0,
      width: that.data.windowWidth * that.data.canvasScale,
      height: that.data.totalHeight * that.data.canvasScale,
      canvasId: 'shareFrends',
      success: function (res) {
        // that.saveImageToPhotos(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '保存成功，从相册中分享到朋友圈吧',
              icon: 'none',
              duration: 4000
            })
          },
          fail: function (res) {
              wx.showToast({
                title: '图片保存失败',
                icon: 'none',
                duration: 2000
              })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '图片生成失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 隐藏悬浮框
  hideModal(){
    this.setData(
      {
      showModal:false
    }
    )
  }
});