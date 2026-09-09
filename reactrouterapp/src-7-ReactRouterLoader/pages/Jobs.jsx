import React from 'react'
import { useLoaderData,Link } from 'react-router-dom';
const Jobs = () => {
    const jobsData = useLoaderData();
  return (
    <div className="jobs">
      {jobsData.map((job) => (
        <Link key={job.id}>
          <h4>{job.title}</h4>
          <p>{job.location}</p>
        </Link>
      ))}
    </div>
  );
}

export default Jobs;

export const jobsLoader = async () => {
    const res = await fetch('http://localhost:3000/jobs')
    return res.json();
  
}