import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContextApi/AuthContext";
import PostTaskButton from "../../components/JobPostingComponents/PostTaskButton";
import axios from "axios";
import { useQueryClient,useMutation } from "@tanstack/react-query";

const usePostTask=()=>{
  const queryClient=useQueryClient();

  return useMutation({
    mutationFn:async(formData)=>{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/tasks/upload/task`,formData,{withCredentials:true});
      return res.data;
    },
    onSuccess:(res)=>{
      toast.success("Task Posted successfully");
      //TODO: here invalidate the query
      // console.log(res);
      window.scrollTo(0,0);
    },
    onError:(err)=>{
      console.log(err);
      toast.error("something went wrong");
    }
  })
}

const JobPosting = () => {
  const { currentUser } = useAuth();
  const createTask=usePostTask();
  // console.log(currentUser.email);
  // console.log(currentUser.uid); firebase uid for the user  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firebaseId", currentUser?.uid);
      formData.append("email", currentUser?.email);
      formData.append("title", taskData.title.trim());
      formData.append("taskDescription", taskData.taskDescription.trim());
      formData.append("taskCategory", taskData.taskCategory);
      formData.append("location", taskData.location.trim());
      formData.append("amount", taskData.amount.trim());
      formData.append("urgencyLevel", taskData.urgencyLevel);
      formData.append("startingDate", taskData.startingDate);
      formData.append("endingDate", taskData.endingDate);
      formData.append("workingHours", taskData.workingHours.trim());
      formData.append("postRemovingDate", taskData.postRemovingDate);
      formData.append(
        "attachments",
        taskData.attachments ? taskData.attachments : ""
      );
      
      // const formValues = Object.fromEntries(formData.entries());
      // console.log(formValues);

      createTask.mutate(formData);

      // toast.success("Task posted successfully!");
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
    <div className="min-h-screen px-4 lg:px-12 py-10 bg-slate-50">
      <section className="py-8 mb-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Post a Task</h1>
          <p className="text-slate-600 text-lg">
            Tell us about your project and find the perfect person to complete it
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div className="bg-white shadow rounded-xl p-6 space-y-5">
              <h3 className="font-semibold text-lg text-slate-800">
                Basic Information
              </h3>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={taskData.title}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Description
                </label>
                <textarea
                  name="taskDescription"
                  placeholder="Description of the task"
                  value={taskData.taskDescription}
                  onChange={handleData}
                  rows={4}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {errors.taskDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.taskDescription}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Category
                </label>
                <select
                  name="taskCategory"
                  value={taskData.taskCategory}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
                {errors.taskCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.taskCategory}</p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6 space-y-5">
              <h3 className="font-semibold text-lg text-slate-800">
                Job Details
              </h3>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Budget
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Budget"
                  value={taskData.amount}
                  onChange={handleData}
                  min="0"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={taskData.location}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Urgency
                </label>
                <select
                  name="urgencyLevel"
                  value={taskData.urgencyLevel}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select Urgency</option>
                  <option value="urgent">Urgent</option>
                  <option value="notUrgent">Not Urgent</option>
                </select>
                {errors.urgencyLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.urgencyLevel}</p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6 space-y-5">
              <h3 className="font-semibold text-lg text-slate-800">
                Dates & Working Hours
              </h3>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Task starting date
                </label>
                <input
                  type="date"
                  name="startingDate"
                  value={taskData.startingDate}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.startingDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.startingDate}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  End date
                </label>
                <input
                  type="date"
                  name="endingDate"
                  value={taskData.endingDate}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.endingDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.endingDate}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Automatic Post Delete Date
                </label>
                <input
                  type="date"
                  name="postRemovingDate"
                  value={taskData.postRemovingDate}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.postRemovingDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.postRemovingDate}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Working Hours per Day
                </label>
                <input
                  type="number"
                  min="0"
                  name="workingHours"
                  placeholder="Working Hours per Day"
                  value={taskData.workingHours}
                  onChange={handleData}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.workingHours && (
                  <p className="text-red-600 text-sm mt-1">{errors.workingHours}</p>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">
                Attachments (optional)
              </h3>

              <input
                type="file"
                name="attachments"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleData}
                className="w-full p-2 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              />
            </div>

            <div className="flex justify-center">
              <div
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg text-white font-semibold ${
                  loading ? "bg-slate-400 cursor-not-allowed":""
                }`}
              >
                {createTask.isPending ? (
                  <PostTaskButton text={"Posting..."} />
                ) : (
                  <PostTaskButton text={"Post Job"} />
                )}
              </div>
            </div>
          </form>

          <div className="lg:w-96 space-y-6">
            <div className="bg-white shadow rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-xl text-slate-800 text-center">
                Task Preview
              </h2>

              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">
                    Title
                  </p>
                  <p className="font-semibold text-slate-900">
                    {taskData.title || "Task title will appear here"}
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">
                    Budget
                  </p>
                  <p className="text-blue-600 font-bold text-2xl">
                    ${taskData.amount || "0"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">
                    Category
                  </p>
                  <p className="font-semibold text-slate-800">
                    {taskData.taskCategory || "Not selected"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 shadow rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg text-white text-center">
                Tips for Success
              </h2>

              <ul className="space-y-2 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Write a clear, detailed description</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Set a fair budget for quality work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Be specific about requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Include relevant files and examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Respond quickly to proposals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;