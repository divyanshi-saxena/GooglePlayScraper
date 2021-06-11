const gplay = require('google-play-scraper')
const scrapeData = require('../models/app')

module.exports.firstFetch = () => {
  gplay.list({
    collection: gplay.collection.TOP_FREE,
    num: 100
  }).then((res) => {
    res.forEach(async (re) => {
      let myUrl = `${process.env.ENDPOINT}${re.appId}`
      let url = re.url
      let appId = re.appId
      let developer = re.developer
      let title = re.title
      let icon = re.icon
      let isFree = re.free
      let rating = re.scoreText
      let obj = { url, appId, developer, title, icon, isFree, rating, myUrl }
      try {
        await scrapeData.create(obj)
      } catch (e) {
        console.log('firstFetch: error in populating database')
      }
    })
  }).catch(() => {
    console.log('firstFetch: error in scraping data from google play store')
  })
}

module.exports.updateFunction = async (obj) => {
  try {
    const data = await scrapeData.find({ "appId": obj.appId }).lean()
    // console.log("obj", obj)
    // console.log("data", data);
    if (data.length == 0) {
      try {
        await scrapeData.create(obj)
        console.log('updateFunction: document created for appID: ', obj.appId)
      } catch {
        console.log('updateFunction: database error in creating new document')
      }
    }
    else if (data.length > 0) {
      // console.log(data[0])
      if (data[0].isValid == false && parseFloat(data[0].rating) != parseFloat(obj.rating)) {
        try {
          const newData = await scrapeData.findOneAndUpdate({ "appId": obj.appId }, { rating: obj.rating, isValid: true }, { new: true }).lean()
          console.log('updateFunction: rating and validity updated for appId: ', newData.appId)
        } catch {
          console.log('updateFunction: database error in updating RATING & VALIDITY of existing document')
        }
      }
      else if (data[0].isValid == true && parseFloat(data[0].rating) != parseFloat(obj.rating)) {
        try {
          const newData = await scrapeData.findOneAndUpdate({ "appId": obj.appId }, { rating: obj.rating }, { new: true }).lean()
          console.log('updateFunction: rating updated for appId: ', newData.appId)
        } catch {
          console.log('updateFunction: database error in updating RATING of existing document')
        }
      }
      else if (data[0].isValid == false && parseFloat(data[0].rating) == parseFloat(obj.rating)) {
        try {
          const newData = await scrapeData.findOneAndUpdate({ "appId": obj.appId }, { isValid: true }, { new: true }).lean()
          console.log('updateFunction: validity updated: ', newData.appId)
        } catch {
          console.log('updateFunction: database error in updating VALIDITY of existing document')
        }
      }
      else {
        // console.log('updateFunction: data up-to-date for appId: ', obj.appId)
      }
    }
  } catch (e) {
    console.log('updateFunction: database error in finding document')
  }
}

module.exports.cleanupFunction = async (arr) => {
  try {
    const invalidDocs = await scrapeData.find({ "appId": { $nin: arr } }).lean()
    if (invalidDocs.length > 0) {
      invalidDocs.forEach(async (doc) => {
        try {
          await scrapeData.findOneAndUpdate({ $and: [{ "appId": doc.appId }, { "isValid": true }] }, { isValid: false }, { new: true }).lean()
          console.log('cleanupFunction: validity set to "false" for appId: ', doc.appId)
        } catch {
          console.log('cleanupFunction: error in updating validity to "false" for appId: ', doc.appId)
        }
      })
    }
    else {
      console.log('cleanupFunction: no invalid docs present')
    }
  } catch (e) {
    console.log('cleanupFunction: error in fetching invalid documents from database')
  }
}