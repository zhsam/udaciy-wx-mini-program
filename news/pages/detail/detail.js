Page({
  data: {
    pageId: 1552623252481,
    newsDetail: []
  },
  onLoad(options) {
    if (options.pageId !== undefined){
      this.setData({
        pageId: options.pageId
      })
    }

    this.getNewsDetail()

  },
  getNewsDetail(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.pageId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let result = res.data.result
        // console.log(result)

        // news info
        let newsDetail = []
        newsDetail.push({
          id: result.id,
          title: result.title,
          date: result.date.substring(0, 10),
          time: result.date.substring(11, 16),
          source: result.source,
          firstImage: result.firstImage,
          readCount: result.readCount,
          content: result.content
        })

        // // news content
        // let newsContent = []
        // for (let i = 0; i < Object.keys(result.content).length;i++){
        //   console.log(result.content[i])
        // }

        this.setData({
          newsDetail: newsDetail
        })

        console.log(this.data.newsDetail)

      },
      complete: () => {
        callback && callback()
      }
    })
  }
})