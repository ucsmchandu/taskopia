/*
task id #automatic

task title
task description
task type #category
location (remote or in person)

amount for the task
urgency level
time and date (to display until the owner wants after to remove it from the website)
time and date (to start the work for the student)
any image (optional)

*/

import React, { useState } from "react";
import {useAuth} from '../AuthContextApi/AuthContext'
const JobPosting = () => {
    const {currentUser}=useAuth();
    console.log(currentUser);
  const [taskData, setTaskData] = useState({
    title: "",
    taskDescription: "",
    taskCategory: "",
    location: "",
    amount: "",
    urgencyLevel: "",
    startingDate: "", //for work
    endingDate: "", //for work
    workingHours: "", //how many hours of work per day if in person work
    postRemovingDate: "", //to remove the post from the website
    attachments: null, //optional
  });
  // for the errors
  const [errors, setErrors] = useState({});
  // for the loading
  const [laoding, setLoading] = useState(false);

  // categories
  const categories = [
    "Design",
    "Writing",
    "Marketing",
    "Programming",
    "Administrative",
    "Translation",
    "Data Entry",
    "Customer Service",
    "Research",
    "Other",
  ];

  const handleData = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") setTaskData({ ...taskData, [name]: files[0] });
    else setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendData = {
        title: taskData.title.trim(),
        taskDescription: taskData.taskDescription.trim(),
        taskCategory: taskData.taskCategory.trim(),
        location:taskData.location.trim() ,
        amount: taskData.amount.trim(),
        urgencyLevel: taskData.urgencyLevel.trim(),
        startingDate:taskData.startingDate.trim() , //for work
        endingDate: taskData.endingDate.trim(), //for work
        workingHours: taskData.workingHours.trim(), //how many hours of work per day if in person work
        postRemovingDate: taskData.postRemovingDate.trim(), //to remove the post from the website
        attachments: null, //optional
      };
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return;
    }
  };

  return <div></div>;
};

export default JobPosting;
