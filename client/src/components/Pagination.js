import React from 'react'

const Pagination = ({ appsPerPage, totalApps, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalApps / appsPerPage); i++){
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul className="pagination justify-content-end">
        {pageNumbers.map(page => (
          <li className="page-item" key={page}>
            <a onClick={() => paginate(page)} href="#" className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination