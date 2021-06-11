import React from 'react'
import StarRatings from 'react-star-ratings'

const Application = ({ apps, loading }) => {
  if (loading) {
    return <h2>loading...</h2>
  }
  return (
    <div className="row">
      {apps.map(app => {
        return (
          <div className="col-6 my-3" key={app.appId}>
            <div className="card mx-auto bg-light text-center flex-row flex-wrap border-light" style={{ boxShadow: "5px 5px 25px 0 rgb(46 61 73 / 20%)", borderRadius: "15px"}}>
              <div className="row g-0">

                {/* APP ICON */}
                <div className="col-md-5">
                  <img src={app.icon} alt="icon" className="img-responsive w-100 my-auto" style={{borderRadius: "15px"}} />
                </div>

                {/* APP DESCRIPTION */}
                <div className="col-md-7 px-1">
                  <div className="card-body px-2 d-flex flex-column justify-content-between h-100">

                    {/* APP NAME, DEVELOPER NAME, RATING */}
                    <div>
                      <h5 className="card-title text-capitalize text-wrap">{app.title}</h5>
                      <p className="card-text text-wrap">{app.developer}</p>
                      <div className="d-flex justify-content-around">
                        <StarRatings rating={parseFloat(app.rating)} numberOfStars={5} starRatedColor="#ffc30b" starEmptyColor="#c0c0c0" starDimension="20px" />
                      </div>
                    </div>
      
                    {/* BUTTON TO GO TO APP DETAILS PAGE */}
                    <div>
                      <a href={app.myUrl} className="btn btn-outline-warning text-uppercase mt-auto w-100">details</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Application