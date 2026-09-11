import React from 'react'
import { Outlet } from 'react-router-dom';

const JobsLayout = () => {
  return (
    <div>
    <h2>Jobs Openings</h2>
    <p>List of current job openings in our company.</p>
    <Outlet/>
    </div>
  )
}

export default JobsLayout