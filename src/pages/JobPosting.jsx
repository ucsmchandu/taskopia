import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContextApi/AuthContext";
import PostTaskButton from "../components/JobPostingComponents/PostTaskButton";
import axios from "axios";
const JobPosting = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser.email);
  // console.log(currentUser.uid); firebase uid for the user  // TODO :pass this into the data
  const [taskData, setTaskData] = useState({
    title: "",
    taskDescription: "",
    taskCategory: "",
    location: "",
    amount: "",
    urgencyLevel: "",
    startingDate: "",
    endingDate: "",
    workingHours: "",
    postRemovingDate: "",
    attachments: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // TODO : need to implement the other related categories
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

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = "Title is required";
    if (!taskData.taskDescription.trim())
      newErrors.taskDescription = "Description is required";
    if (!taskData.taskCategory) newErrors.taskCategory = "Category is required";
    if (!taskData.amount.trim()) newErrors.amount = "Amount is required";
    if (!taskData.location.trim()) newErrors.location = "Location is required";
    if (!taskData.urgencyLevel)
      newErrors.urgencyLevel = "Urgency level is required";
    if (!taskData.startingDate)
      newErrors.startingDate = "Starting date is required";
    if (!taskData.endingDate) newErrors.endingDate = "Ending date is required";
    if (!taskData.workingHours)
      newErrors.workingHours = "Working hours is required";
    if (!taskData.postRemovingDate)
      newErrors.postRemovingDate = "Post removing date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const sendData = {
        firebaseId:currentUser?.uid,
        email:currentUser?.email, 
        title: taskData.title.trim(),
        taskDescription: taskData.taskDescription.trim(),
        taskCategory: taskData.taskCategory.trim(),
        location: taskData.location.trim(),
        amount: taskData.amount.trim(),
        urgencyLevel: taskData.urgencyLevel.trim(),
        startingDate: taskData.startingDate.trim(),
        endingDate: taskData.endingDate.trim(),
        workingHours: taskData.workingHours.trim(),
        postRemovingDate: taskData.postRemovingDate.trim(),
        attachments: taskData.attachments,
      };
      // console.log(sendData);
      // here comes the api to post the data for the backend
      const res=await axios.post('http://localhost:3000/taskopia/u1/api/owner/task/upload-task',sendData);
      console.log(res);
      // TODO : add the firebaseUid,email in the sending data 
      toast.success("Task posted successfully!");
      setTaskData({
        title: "",
        taskDescription: "",
        taskCategory: "",
        location: "",
        amount: "",
        urgencyLevel: "",
        startingDate: "",
        endingDate: "",
        workingHours: "",
        postRemovingDate: "",
        attachments: null,
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  px-4 lg:px-12 py-10 bg-gray-50">
      <section className="py-6 bg-secondary/30 mb-8 mt-20 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Post a Task</h1>
          <p className="text-gray-600 text-lg">
            Tell us about your project and find the perfect person to complete
            it
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl bg-gradient-to-r from-[#f6f5f5] to-[#f6f5f5] shadow-md p-4">
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200">
            <div className="font-semibold text-lg text-gray-800 mb-2">
              Basic Information
            </div>

            <label className="text-sm font-medium text-gray-600 ml-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 placeholder:text-gray-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            <label className="text-sm font-medium text-gray-600 ml-1">
              Description
            </label>
            <input
              type="text"
              name="taskDescription"
              placeholder="Description of the task"
              value={taskData.taskDescription}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 placeholder:text-gray-400"
            />
            {errors.taskDescription && (
              <p className="text-red-500 text-sm">{errors.taskDescription}</p>
            )}

            <label className="text-sm font-medium text-gray-600 ml-1">
              Category
            </label>
            <select
              name="taskCategory"
              value={taskData.taskCategory}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>
            {errors.taskCategory && (
              <p className="text-red-500 text-sm">{errors.taskCategory}</p>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200">
            <div className="font-semibold text-lg text-gray-800 mb-2">
              Job Details
            </div>

            <label className="text-sm font-medium text-gray-600 ml-1">
              Budget
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Budget"
              value={taskData.amount}
              onChange={handleData}
              min="0"
              className="w-full p-2 border rounded-md outline-0 border-gray-400 placeholder:text-gray-400"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}

            <label className="text-sm font-medium text-gray-600 ml-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={taskData.location}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 placeholder:text-gray-400"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}

            <label className="text-sm font-medium text-gray-600 ml-1">
              Urgency
            </label>
            <select
              name="urgencyLevel"
              value={taskData.urgencyLevel}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 bg-white"
            >
              <option value="">Select Urgency</option>
              <option value="urgent">Urgent</option>
              <option value="notUrgent">Not Urgent</option>
            </select>
            {errors.urgencyLevel && (
              <p className="text-red-500 text-sm">{errors.urgencyLevel}</p>
            )}
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
            <div className="font-semibold text-lg text-gray-800 mb-2">
              Dates & Working Hours
            </div>

            <label
              htmlFor=""
              className="text-sm font-medium text-gray-600 ml-1"
            >
              Task starting date
            </label>
            <input
              type="date"
              name="startingDate"
              value={taskData.startingDate}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400  transition"
            />
            {errors.startingDate && (
              <p className="text-red-600 text-sm">{errors.startingDate}</p>
            )}

            <label
              htmlFor=""
              className="text-sm font-medium text-gray-600 ml-1"
            >
              End date
            </label>
            <input
              type="date"
              name="endingDate"
              value={taskData.endingDate}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 transition"
            />
            {errors.endingDate && (
              <p className="text-red-600 text-sm">{errors.endingDate}</p>
            )}

            <label
              htmlFor=""
              className="text-sm font-medium text-gray-600 ml-1"
            >
              Automatic Post Delete Date
            </label>
            <input
              type="date"
              name="postRemovingDate"
              value={taskData.postRemovingDate}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 transition"
            />
            {errors.postRemovingDate && (
              <p className="text-red-600 text-sm">{errors.postRemovingDate}</p>
            )}

            <label
              htmlFor=""
              className="text-sm font-medium text-gray-600 ml-1"
            >
              Working Hours per Day
            </label>
            <input
              type="number"
              name="workingHours"
              placeholder="Working Hours per Day"
              value={taskData.workingHours}
              onChange={handleData}
              className="w-full p-2 border rounded-md outline-0 border-gray-400 transition"
            />
            {errors.workingHours && (
              <p className="text-red-600 text-sm">{errors.workingHours}</p>
            )}
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 space-y-3">
            <div className="font-semibold text-lg text-gray-800 mb-2">
              Attachments (optional)
            </div>

            <input
              type="file"
              name="attachments"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleData}
              className=" cursor-pointer
      w-full p-2 border rounded-md 
      outline-none border-gray-300 
      file:bg-blue-600 file:text-white file:py-1 file:px-3 file:rounded-md file:border-none
      hover:border-blue-400 focus:border-blue-500 transition
    "
            />
          </div>

          <div className="flex justify-center">
            <p
              type="submit"
              disabled={loading}
              className={` cursor-pointer px-6 py-3 rounded-lg text-white font-semibold ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <PostTaskButton text={"Posting..."} />
              ) : (
                <PostTaskButton text={"Post Job"} />
              )}
            </p>
          </div>
        </form>

        <div className="flex-1 flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="shadow-md rounded-2xl p-6 space-y-5 bg-gradient-to-r from-[#DDF6D2] to-[#a2ea86]">
            <h2 className="font-semibold text-xl text-gray-800 text-center tracking-wide">
              Task Preview
            </h2>

            <div className="space-y-4 text-center">
              <div>
                <p className="text-xs text-gray-600 uppercase font-medium tracking-wide">
                  Title
                </p>
                <p className="font-semibold text-gray-900 text-base">
                  {taskData.title || "Task title will appear here"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-medium tracking-wide">
                  Budget
                </p>
                <p className="text-green-700 font-extrabold text-2xl">
                  ${taskData.amount || "0"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-medium tracking-wide">
                  Category
                </p>
                <p className="font-semibold text-gray-800 text-base">
                  {taskData.taskCategory || "Not selected"}
                </p>
              </div>
            </div>
          </div>

          <div className="shadow-md rounded-2xl p-6 space-y-4 bg-gradient-to-r from-[#aaa1ea] to-[#469ced]">
            <h2 className="font-semibold text-lg text-white text-center tracking-wide">
              Tips for Success
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li className="text-white/90 font-medium">
                Write a clear, detailed description
              </li>
              <li className="text-white/90 font-medium">
                Set a fair budget for quality work
              </li>
              <li className="text-white/90 font-medium">
                Be specific about requirements
              </li>
              <li className="text-white/90 font-medium">
                Include relevant files and examples
              </li>
              <li className="text-white/90 font-medium">
                Respond quickly to proposals
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
