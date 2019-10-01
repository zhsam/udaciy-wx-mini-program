//index.js
//获取应用实例
const app = getApp()

const pageMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data: {
    pageList:['国内','国际','财经','娱乐','军事','体育','其他'],
    pageIndex: 0,
    newsList: []
  },
  onLoad(){
    this.getNewsList()
  },
  getNewsList(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: pageMap[this.data.pageList[this.data.pageIndex]]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let result = res.data.result
        let newsList = []
        for (let i = 0; i < result.length; i ++){
          newsList.push({
            index: i,
            id: result[i].id,
            date: result[i].date.substring(0, 10),
            time: result[i].date.substring(11, 16),
            title: result[i].title,
            img: result[i].firstImage,
            source: result[i].source
          })
        }
        
        this.setData({
          newsList: newsList
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
