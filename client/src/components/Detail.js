import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import parse from 'html-react-parser'
import axios from 'axios'
import '../App.css';
import StarRatings from 'react-star-ratings'

const Detail = () => {
  const pkg = queryString.parse(window.location.search).pkg
  const [dev, setDev] = useState('')
  const [icon, setIcon] = useState('')
  const [isFree, setIsFree] = useState(true)
  const [rating, setRating] = useState(0.0)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [desc, setDesc] = useState('')
  const [installs, setInstalls] = useState('')
  const [genre, setGenre] = useState('')

  useEffect(() => {
    const appDetail = async () => {
      const response = await axios.get(`/api/appDetails?pkg=${pkg}`)
      console.log('response ', response.data)
      setDev(response.data.result.developer)
      setIcon(response.data.result.icon)
      setIsFree(response.data.result.isFree)
      setRating(parseFloat(response.data.result.rating))
      setTitle(response.data.result.title)
      setUrl(response.data.result.url)
      setSummary(response.data.result.summary)
      setDesc(parse(response.data.result.desc))
      console.log(desc)
      setInstalls(response.data.result.installs)
      setGenre(response.data.result.genre)
    }
    appDetail()
  }, [desc, pkg])

  return (
    <div>
      <div className="container bg-light" style={{boxShadow: "5px 5px 25px 0 rgb(46 61 73 / 20%)", borderRadius: "15px"}} >
        <div className="row flex-nowrap">

          {/* DISPLAYS IMAGE */}
          <div className="col-4 m-3 p-3">
            <img src={icon} alt="icon" className="img-responsive w-100" style={{borderRadius: "15px", boxShadow: "1px 3px 1px #9E9E9E"}} />
          </div>

          {/* DISPLAYS DETAILS */}
          <div className="col-8 m-3 p-5">

            <div>
              <h3>{title}</h3>
              <p className="text-uppercase">{dev}</p>
            </div>

            <div className="mt-10">
              <p>
                <span> {genre} </span>
                <span> &#9864; </span>
                <span> {isFree ? "FREE" : "PAID"} </span>
                <span> &#9864; </span>
                <span> {installs} downloads </span>
              </p>
              <div className="d-flex justify-content-start mb-4">
                <StarRatings rating={rating} numberOfStars={5} starRatedColor="#ffc30b" starEmptyColor="#c0c0c0" starDimension="20px" />
              </div>
            </div>

            <div className="mt-auto w-100" >
              <p>{summary}</p>
              <p>For full details, click <span><a href={url}>here</a></span></p>
            </div>

          </div>

        </div>

        {/* FULL DESCRIPTION OF APP */}
        <div className="row">
          <div className="col m-3 p-5">
            <h2 className="mb-5">Description</h2>
            <div>{desc}</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Detail