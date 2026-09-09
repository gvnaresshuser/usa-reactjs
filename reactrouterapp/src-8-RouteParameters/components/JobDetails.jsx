import React from 'react'
import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
const JobDetails = () => {
    const jobDetails = useLoaderData();
  //const { id } = useParams();
  //should match same name as given in route
  //id
  //<Route path=":id" element={<JobDetails />}/>
  //http://localhost:3000/jobs/1
  return (
    <div className="job-details">
      <p>
        <b>Job Title:</b> {jobDetails.title}
      </p>
      <p>
        <b>Salary:</b> {jobDetails.salary}
      </p>
      <p>
        <b>Location:</b> {jobDetails.location}
      </p>
      <p>
        <b>Description: </b> We are looking for a skilled and motivated React JS
        Developer to join our development team. The candidate will be
        responsible for building responsive, user-friendly, and high-performance
        web applications using React JS. Responsibilities Develop and maintain
        modern web applications using React JS. Create reusable and modular UI
        components. Work with React Hooks, React Router, and state management.
        Integrate REST APIs and handle asynchronous data. Work with JavaScript,
        HTML5, CSS3, and responsive design. Collaborate with backend developers,
        UI/UX designers, and other team members. Debug applications and resolve
        performance and functionality issues. Write clean, maintainable, and
        reusable code. Participate in code reviews and follow development best
        practices.
      </p>
      <button type="button">Apply Now</button>
    </div>
  );
}

export default JobDetails;

export const JobDetailsLoader = async ({params}) => {
  const {id} = params;

  //const res = await fetch(`http://localhost:3000/jobs/${id}`);
  const res = await fetch("http://localhost:3000/jobs/" + id);
  return res.json();
}