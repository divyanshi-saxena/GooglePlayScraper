import React, { useState, useEffect } from 'react'
import Application from './Application'
import Pagination from './Pagination'
import axios from 'axios'
import { Button } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import '../App.css';

function Home() {
  const [apps, setApps] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [appsPerPage] = useState(10)
  
  const db_update = () => {
    axios.get(`/api/db_update`, { crossdomain: true }).then((response) => {
      if (response.data.status === 'success') {
        console.log('success response : ', response)
        setApps(response.data.result)
      }
      else if (response.data.status === 'failure') {
        console.log('failed response : ', response)
        setErrorMsg(response.data.message)
      }
      else {
        console.log('failure : ', response)
      }
    })
  }
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // console.log(`env var : ${process.env.REACT_APP_SERVER_ENDPOINT}`)
      const response = await axios.get(`/api/`)
      console.log('response ', response)
      if (response.data.status === 'success') {
        console.log('success response : ', response)
        setApps(response.data.result)
      }
      else if (response.data.status === 'failure') {
        console.log('failed response : ', response)
        setErrorMsg(response.data.message)
      }
      else {
        console.log('failure : ', response)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const indexOfLastApp = currentPage * appsPerPage
  const indexOfFirstApp = indexOfLastApp - appsPerPage
  const currentApps = apps.slice(indexOfFirstApp, indexOfLastApp)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container mt-5 py-4">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-10">
          <h1 className="text-primary display-4 fw-bold">GOOGLE PLAY TOP FREE APPS</h1>
        </div>
        <div className="col-2">
          <Button onClick={() => db_update()} className="align-self-end display-3 fw-bold">Update</Button>
        </div>
      </div>
      <div className="mb-5 py-2"></div>
      <Application apps={currentApps} loading={loading} />
      <div className="mb-5"></div>
      <Pagination appsPerPage={appsPerPage} totalApps={apps.length} paginate={paginate} />
    </div>
  )
}

export default Home
