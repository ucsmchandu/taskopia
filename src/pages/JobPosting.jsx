import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContextApi/AuthContext";
import PostTaskButton from "../components/JobPostingComponents/PostTaskButton";

const JobPosting = () => {
  const { currentUser } = useAuth();
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
    if (!taskData.taskDescription.trim()) newErrors.taskDescription = "Description is required";
    if (!taskData.taskCategory) newErrors.taskCategory = "Category is required";
    if (!taskData.amount.trim()) newErrors.amount = "Amount is required";
    if (!taskData.location.trim()) newErrors.location = "Location is required";
    if (!taskData.urgencyLevel) newErrors.urgencyLevel = "Urgency level is required";
    if (!taskData.startingDate) newErrors.startingDate = "Starting date is required";
    if (!taskData.endingDate) newErrors.endingDate = "Ending date is required";
    if (!taskData.workingHours) newErrors.workingHours = "Working hours is required";
    if (!taskData.postRemovingDate) newErrors.postRemovingDate = "Post removing date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const sendData = {
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
      console.log(sendData);
      toast.success("Task posted successfully!");
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
            Tell us about your project and find the perfect person to complete it
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl bg-gradient-to-r from-[#f6f5f5] to-[#f6f5f5] shadow-md p-4">
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className=" shadow-md rounded-2xl p-6 space-y-4 bg-gradient-to-r from-[#BADFDB] to-[#7dd9d0]">
            <div className="font-semibold text-lg text-gray-700 mb-2">Basic Information</div>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleData}
              className="w-full p-2 border-2 border-white rounded-md outline-0 placeholder:text-gray-600"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            <input
              type="text"
              name="taskDescription"
              placeholder="Description of the task"
              value={taskData.taskDescription}
              onChange={handleData}
              className="w-full p-2 border-2 border-white rounded-md outline-0"
            />
            {errors.taskDescription && <p className="text-red-500 text-sm">{errors.taskDescription}</p>}
            <select
              name="taskCategory"
              value={taskData.taskCategory}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md outline-0 border-white"
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => <option key={i}>{c}</option>)}
            </select>
            {errors.taskCategory && <p className="text-red-500 text-sm">{errors.taskCategory}</p>}
          </div>

          <div className= " bg-gradient-to-r from-[#f8e994] to-[#edd342] shadow-md rounded-2xl p-6 space-y-4">
            <div className="font-semibold text-lg text-gray-700 mb-2">Job Details</div>
            <input
              type="number"
              name="amount"
              placeholder="Budget"
              value={taskData.amount}
              onChange={handleData}
              min="0"
              className="w-full p-2 border-2 rounded-md outline-0 border-neutral-400 "
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={taskData.location}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md border-neutral-400  outline-0"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            <select
              name="urgencyLevel"
              value={taskData.urgencyLevel}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md outline-0 border-neutral-400 "
            >
              <option value="">Select Urgency</option>
              <option value="urgent">Urgent</option>
              <option value="notUrgent">Not Urgent</option>
            </select>
            {errors.urgencyLevel && <p className="text-red-500 text-sm">{errors.urgencyLevel}</p>}
          </div>

          <div className="bg-gradient-to-r from-[#8CA9FF] to-[#6188fc] shadow-md rounded-2xl p-6 space-y-4">
            <div className="font-semibold text-lg text-gray-900 mb-2">Dates & Working Hours</div>
            <input
              type="date"
              name="startingDate"
              value={taskData.startingDate}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md outline-0 border-white "
            />
            {errors.startingDate && <p className="text-red-500 text-sm">{errors.startingDate}</p>}
            <input
              type="date"
              name="endingDate"
              value={taskData.endingDate}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md border-white outline-0 "
            />
            {errors.endingDate && <p className="text-red-500 text-sm">{errors.endingDate}</p>}
            <input
              type="date"
              name="postRemovingDate"
              value={taskData.postRemovingDate}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md border-white outline-0 "
            />
            {errors.postRemovingDate && <p className="text-red-500 text-sm">{errors.postRemovingDate}</p>}
            <input
              type="number"
              name="workingHours"
              placeholder="Working Hours per Day"
              value={taskData.workingHours}
              onChange={handleData}
              className="w-full p-2 border-2 rounded-md border-white outline-0 "
            />
            {errors.workingHours && <p className="text-red-500 text-sm">{errors.workingHours}</p>}
          </div>

          <div className="bg-gradient-to-r from-[#f3a065] to-[#f4802d] shadow-md rounded-2xl p-6">
            <div className="font-semibold text-lg text-white mb-2">Attachments (optional)</div>
            <input
              type="file"
              name="attachments"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleData}
              className="w-full border-2 outline-0 border-amber-700 rounded-md p-2"
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
              {loading ? <PostTaskButton text={"Posting..."}/> : <PostTaskButton text={"Post Job"}/>}
            </p>
          </div>
        </form>

        <div className="flex-1 flex flex-col gap-6 lg:sticky lg:top-20">
          <div className=" shadow-md rounded-2xl p-6 space-y-4 bg-gradient-to-r from-[#DDF6D2] to-[#a2ea86]">
            <h2 className="font-semibold text-lg text-center">Task Preview</h2>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-medium">{taskData.title || "Task title will appear here"}</p>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="text-success font-bold text-lg">${taskData.amount || "0"}</p>
              <p className="text-sm text-gray-500">Category</p>
              <p>{taskData.taskCategory || "Not selected"}</p>
            </div>
          </div>

          <div className=" shadow-md rounded-2xl p-6 space-y-3 bg-gradient-to-r from-[#f59393] to-[#dc5757] ">
            <h2 className="font-semibold text-lg text-white text-center">Tips for Success</h2>
            <ul className="list-disc list-inside text-gray-080 space-y-1">
              <li>Write a clear, detailed description</li>
              <li>Set a fair budget for quality work</li>
              <li>Be specific about requirements</li>
              <li>Include relevant files and examples</li>
              <li>Respond quickly to proposals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
