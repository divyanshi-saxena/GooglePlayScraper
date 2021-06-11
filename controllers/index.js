const gplay = require('google-play-scraper')
const scrapeData = require('../models/app')
const { updateFunction, cleanupFunction } = require('../services/appService')

module.exports.landing_page = async (req, res) => {
  try {
    const docs = await scrapeData.find({ "isValid": true }).lean()
    console.log('documents fetched from database.. sending to client')
    res.status(200).json({
      status: 'success',
      result: docs
    })
  } catch {
    console.log('error in fetching from database')
    res.status(500).json({
      status: 'failure',
      message: 'failed to fetch data from database.. server error'
    })
  }
}
module.exports.db_update = (req, res) => {
  // let arr = []
  gplay.list({
    collection: gplay.collection.TOP_FREE,
    num: 100
  }).then(async (r) => {
    // console.log('array of objects : ', r)
    let arr = []
    r.forEach(async (re) => {
      let myUrl = `${process.env.ENDPOINT}${re.appId}`
      let url = re.url
      let appId = re.appId
      let developer = re.developer
      let title = re.title
      let icon = re.icon
      let isFree = re.free
      let rating = re.scoreText
      let obj = { url, appId, developer, title, icon, isFree, rating, myUrl }
      arr.push(obj.appId)
      await updateFunction(obj)
    })
    // console.log('Value of array: ', arr)
    await cleanupFunction(arr)
    res.redirect('/')
  }).catch((e) => {
    console.log(e)
    res.status(500).json({
      status: 'failure',
      message: 'server error: ' + e
    })
  })
}

module.exports.details_page = (req, res) => {
  const appId = req.query.pkg
  let obj = {}
  gplay.app({ appId }).then((r) => {
    // console.log('Details: ', r)
    obj = {
      title: r.title,
      isFree: r.free,
      developer: r.developer,
      icon: r.icon,
      url: r.url,
      rating: r.scoreText,
      summary: r.summary,
      desc: r.descriptionHTML,
      installs: r.installs,
      genre: r.genre
      // myUrl: r.myUrl
    }
    res.status(200).json({
      status: 'success',
      result: obj
    })
  }).catch(() => {
    console.log('error in fetching app details for appId: ', appId)
    res.status(500).json({
      status: 'failure',
      message: "error in fetching app details"
    })
  })
}