import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContextApi/AuthContext";
import PostTaskButton from "../../components/JobPostingComponents/PostTaskButton";
import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// post task
const usePostTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/tasks/upload/task`,
        formData,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Task Posted successfully");
      queryClient.invalidateQueries({ queryKey: ["hostTasksData"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      navigate("/host/dashboard");
      window.scrollTo(0, 0);
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

// reverse geocoding
const getLocationName = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const SECTIONS = [
  { id: "basics", label: "Basics" },
  { id: "details", label: "Budget & location" },
  { id: "schedule", label: "Schedule" },
  { id: "files", label: "Attachments" },
];

// shared tailwind fragments — neutral, glass-only palette, no color tints
const FIELD =
  "w-full px-3.5 py-3 rounded-xl bg-white/60 border border-black/10 text-[#1f1f1f] placeholder-[#9a9a9a] transition focus:outline-none focus:border-[#1f1f1f]/40 focus:bg-white/85 focus:ring-4 focus:ring-black/5";
const FIELD_ERROR = "border-[#b3392c] focus:border-[#b3392c]";
const LABEL = "text-sm font-medium mb-1.5 block text-[#5c5c5c]";
const ERROR_TEXT = "text-sm mt-1 text-[#b3392c]";
const GLASS =
  "bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_10px_36px_rgba(0,0,0,0.06)] rounded-2xl";
const GLASS_STRONG =
  "bg-white/70 backdrop-blur-2xl border border-white/70 shadow-[0_14px_44px_rgba(0,0,0,0.08)] rounded-2xl";

const JobPosting = () => {
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [activeSection, setActiveSection] = useState("basics");

  const sectionRefs = useRef({});

  // get the location name from the api
  const {
    data: locationName,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["hostLocationName", coordinates.lat, coordinates.lng],
    queryFn: () => getLocationName(coordinates.lat, coordinates.lng),
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!coordinates.lat && !!coordinates.lng,
  });

  const { currentUser } = useAuth();
  const createTask = usePostTask();

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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

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
    if (!locationAllowed || !coordinates.lat || !coordinates.lng) {
      newErrors.locationAccess = "Location access is required to post a task";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateWithAI = async () => {
    const promptText = aiPrompt.trim();

    if (!promptText) {
      toast.error("Please enter a simple task prompt first");
      return;
    }

    setAiLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/ai/api/post-task`,
        { userPrompt: promptText },
        { withCredentials: true },
      );

      const aiData = data || {};

      setTaskData((prev) => ({
        ...prev,
        title: aiData.taskTitle || prev.title,
        taskDescription: aiData.taskDescription || prev.taskDescription,
        taskCategory: aiData.category || prev.taskCategory,
        amount: aiData.taskBudget ? String(aiData.taskBudget) : prev.amount,
        workingHours: aiData.estimatedTimeHours
          ? String(aiData.estimatedTimeHours)
          : prev.workingHours,
      }));

      toast.success("AI suggestions applied");
    } catch (err) {
      const msg =
        '{"error":{"code":503,"message":"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.","status":"UNAVAILABLE"}}';
      console.error(err);
      const m = err.response?.data?.details;
      if (m && m.toString() === msg) {
        toast.error(
          "Currently our model facing high traffic, please try again after some time.",
        );
      } else {
        toast.error(
          err.response?.data?.error || "Failed to generate AI suggestions",
        );
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationAllowed) {
      toast.error("Please allow location access to post a task");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firebaseId", currentUser?.uid);
      formData.append("email", currentUser?.email);
      formData.append("title", taskData.title.trim());
      formData.append("taskDescription", taskData.taskDescription.trim());
      formData.append("taskCategory", taskData.taskCategory);
      formData.append("address", taskData.location.trim());
      formData.append("amount", taskData.amount.trim());
      formData.append("urgencyLevel", taskData.urgencyLevel);
      formData.append("startingDate", taskData.startingDate);
      formData.append("endingDate", taskData.endingDate);
      formData.append("workingHours", taskData.workingHours.trim());
      formData.append("postRemovingDate", taskData.postRemovingDate);
      formData.append(
        "attachments",
        taskData.attachments ? taskData.attachments : "",
      );
      formData.append("lat", coordinates?.lat);
      formData.append("lng", coordinates?.lng);

      createTask.mutate(formData);

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

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocationAllowed(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoordinates({ lat, lng });
        setLocationAllowed(true);
      },
      (error) => {
        console.error(error);
        setLocationAllowed(false);
        toast.error("Location access is required to post a task");
      },
    );
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#eef0f2] text-[#1f1f1f] px-4 lg:px-12 py-10 overflow-x-hidden">
      {/* pure glass depth — soft white highlights only, no color */}
      <div className="pointer-events-none fixed -top-40 -right-32 w-[560px] h-[560px] rounded-full blur-[100px] opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-44 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)]" />
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-30 bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)]" />

      <div className="relative">
        {/* Hero */}
        <section className="max-w-6xl mx-auto pt-16 pb-10">
          <p className="text-sm font-medium mb-3 text-[#6b6b6b]">New task</p>
          <h1 className="text-4xl lg:text-5xl font-semibold mb-3 tracking-tight text-[#1f1f1f]">
            Tell us what needs doing
          </h1>
          <p className="text-base lg:text-lg max-w-xl text-[#5c5c5c]">
            A clear brief gets better replies. Fill in the details below, or
            describe it in your own words and let AI draft it for you.
          </p>
        </section>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[180px_1fr_340px] gap-6 items-start">
          {/* Section rail */}
          <nav className={`hidden lg:flex flex-col gap-1 sticky top-32 p-3 ${GLASS}`}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-full text-sm text-left transition ${
                  activeSection === s.id
                    ? "bg-white/80 border border-white/80 text-[#1f1f1f] font-semibold"
                    : "text-[#6b6b6b] hover:bg-white/50 border border-transparent"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    activeSection === s.id ? "bg-[#1f1f1f]" : "bg-[#b5b5b5]"
                  }`}
                />
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mobile section pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`bg-white/60 backdrop-blur-md border border-white/70 rounded-full px-4 py-2 text-sm whitespace-nowrap ${
                  activeSection === s.id ? "font-semibold text-[#1f1f1f]" : "text-[#6b6b6b]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`p-6 lg:p-10 ${GLASS_STRONG}`}>
            {/* AI assist — same glass treatment, no color tint */}
            <div className="rounded-xl p-5 mb-8 bg-white/50 border border-white/70">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-[#1f1f1f] text-white">
                  AI
                </span>
                <p className="text-sm font-semibold text-[#1f1f1f]">
                  Describe it in one line
                </p>
              </div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. I need someone to help move furniture between two houses this weekend"
                rows={3}
                className={`${FIELD} resize-none mb-3`}
              />
              <button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={aiLoading}
                className="bg-[#1f1f1f] text-white rounded-full px-6 py-2.5 text-sm font-semibold transition hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? "Drafting..." : "Draft with AI"}
              </button>
            </div>

            {/* Basics */}
            <div id="basics" ref={(el) => (sectionRefs.current.basics = el)}>
              <h3 className="text-xl font-semibold mb-5 text-[#1f1f1f]">Basics</h3>

              <div className="mb-5">
                <label className={LABEL}>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="What's the task called?"
                  value={taskData.title}
                  onChange={handleData}
                  className={`${FIELD} ${errors.title ? FIELD_ERROR : ""}`}
                />
                {errors.title && <p className={ERROR_TEXT}>{errors.title}</p>}
              </div>

              <div className="mb-5">
                <label className={LABEL}>Description</label>
                <textarea
                  name="taskDescription"
                  placeholder="What does the work involve?"
                  value={taskData.taskDescription}
                  onChange={handleData}
                  rows={4}
                  className={`${FIELD} resize-none ${errors.taskDescription ? FIELD_ERROR : ""}`}
                />
                {errors.taskDescription && (
                  <p className={ERROR_TEXT}>{errors.taskDescription}</p>
                )}
              </div>

              <div>
                <label className={LABEL}>Category</label>
                <input
                  type="text"
                  name="taskCategory"
                  placeholder="e.g. Customer service, Design"
                  value={taskData.taskCategory}
                  onChange={handleData}
                  className={`${FIELD} ${errors.taskCategory ? FIELD_ERROR : ""}`}
                />
                {errors.taskCategory && (
                  <p className={ERROR_TEXT}>{errors.taskCategory}</p>
                )}
              </div>
            </div>

            {/* Budget & location */}
            <div
              id="details"
              ref={(el) => (sectionRefs.current.details = el)}
              className="mt-8 pt-8 border-t border-black/10"
            >
              <h3 className="text-xl font-semibold mb-5 text-[#1f1f1f]">
                Budget & location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={LABEL}>Budget</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={taskData.amount}
                    onChange={handleData}
                    min="0"
                    className={`${FIELD} ${errors.amount ? FIELD_ERROR : ""}`}
                  />
                  {errors.amount && <p className={ERROR_TEXT}>{errors.amount}</p>}
                </div>

                <div>
                  <label className={LABEL}>Urgency</label>
                  <select
                    name="urgencyLevel"
                    value={taskData.urgencyLevel}
                    onChange={handleData}
                    className={`${FIELD} ${errors.urgencyLevel ? FIELD_ERROR : ""}`}
                  >
                    <option value="">Select urgency</option>
                    <option value="urgent">Urgent</option>
                    <option value="notUrgent">Not urgent</option>
                  </select>
                  {errors.urgencyLevel && (
                    <p className={ERROR_TEXT}>{errors.urgencyLevel}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={LABEL}>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Where does this need to happen?"
                  value={taskData.location}
                  onChange={handleData}
                  className={`${FIELD} ${errors.location ? FIELD_ERROR : ""}`}
                />
                {errors.location && <p className={ERROR_TEXT}>{errors.location}</p>}
                {!locationAllowed && (
                  <p className="text-xs mt-2 text-[#9a9a9a]">
                    We use your device location to confirm this task is genuine
                    — allow location access in your browser if you haven't
                    already.
                  </p>
                )}
              </div>
            </div>

            {/* Schedule */}
            <div
              id="schedule"
              ref={(el) => (sectionRefs.current.schedule = el)}
              className="mt-8 pt-8 border-t border-black/10"
            >
              <h3 className="text-xl font-semibold mb-5 text-[#1f1f1f]">Schedule</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={LABEL}>Start date</label>
                  <input
                    type="date"
                    name="startingDate"
                    value={taskData.startingDate}
                    onChange={handleData}
                    className={`${FIELD} ${errors.startingDate ? FIELD_ERROR : ""}`}
                  />
                  {errors.startingDate && (
                    <p className={ERROR_TEXT}>{errors.startingDate}</p>
                  )}
                </div>

                <div>
                  <label className={LABEL}>End date</label>
                  <input
                    type="date"
                    name="endingDate"
                    value={taskData.endingDate}
                    onChange={handleData}
                    className={`${FIELD} ${errors.endingDate ? FIELD_ERROR : ""}`}
                  />
                  {errors.endingDate && (
                    <p className={ERROR_TEXT}>{errors.endingDate}</p>
                  )}
                </div>

                <div>
                  <label className={LABEL}>Working hours per day</label>
                  <input
                    type="number"
                    min="0"
                    name="workingHours"
                    placeholder="0"
                    value={taskData.workingHours}
                    onChange={handleData}
                    className={`${FIELD} ${errors.workingHours ? FIELD_ERROR : ""}`}
                  />
                  {errors.workingHours && (
                    <p className={ERROR_TEXT}>{errors.workingHours}</p>
                  )}
                </div>

                <div>
                  <label className={LABEL}>Post removes itself on</label>
                  <input
                    type="date"
                    name="postRemovingDate"
                    value={taskData.postRemovingDate}
                    onChange={handleData}
                    className={`${FIELD} ${errors.postRemovingDate ? FIELD_ERROR : ""}`}
                  />
                  {errors.postRemovingDate && (
                    <p className={ERROR_TEXT}>{errors.postRemovingDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div
              id="files"
              ref={(el) => (sectionRefs.current.files = el)}
              className="mt-8 pt-8 border-t border-black/10"
            >
              <h3 className="text-xl font-semibold mb-5 text-[#1f1f1f]">
                Attachments
              </h3>
              <p className="text-sm mb-3 text-[#9a9a9a]">
                Optional — a photo or document helps people understand the job
                faster.
              </p>
              <input
                type="file"
                name="attachments"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleData}
                className={`${FIELD} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:cursor-pointer file:bg-[#1f1f1f] file:text-white hover:file:bg-[#333]`}
              />
            </div>

            {errors.locationAccess && (
              <p className="text-sm mt-6 text-center text-[#b3392c]">
                {errors.locationAccess}
              </p>
            )}

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading || createTask.isPending || !locationAllowed}
                className="bg-[#1f1f1f] text-white rounded-full px-9 py-3.5 font-semibold transition hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createTask.isPending ? (
                  <PostTaskButton text={"Posting..."} />
                ) : (
                  <PostTaskButton text={"Post job"} />
                )}
              </button>
            </div>
          </form>

          {/* Preview + tips */}
          <aside className="space-y-5 lg:sticky lg:top-32">
            <div className={`p-6 ${GLASS}`}>
              <h2 className="text-lg font-semibold mb-4 text-[#1f1f1f]">Preview</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1 text-[#9a9a9a]">Title</p>
                  <p className="font-medium text-[#1f1f1f]">
                    {taskData.title || "Untitled task"}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10">
                  <p className="text-xs mb-1 text-[#9a9a9a]">Budget</p>
                  <p className="text-3xl font-semibold text-[#1f1f1f]">
                    ${taskData.amount || "0"}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex flex-wrap gap-2">
                  <span className="bg-white/60 backdrop-blur-md border border-white/70 rounded-full px-3 py-1 text-xs text-[#5c5c5c]">
                    {taskData.taskCategory || "No category yet"}
                  </span>
                  {taskData.urgencyLevel && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        taskData.urgencyLevel === "urgent"
                          ? "bg-[#b3392c]/10 text-[#b3392c] border-[#b3392c]/20"
                          : "bg-white/60 backdrop-blur-md text-[#5c5c5c] border-white/70"
                      }`}
                    >
                      {taskData.urgencyLevel === "urgent" ? "Urgent" : "Not urgent"}
                    </span>
                  )}
                </div>

                {taskData.location && (
                  <div className="pt-3 border-t border-black/10">
                    <p className="text-xs mb-1 text-[#9a9a9a]">Location</p>
                    <p className="text-sm text-[#5c5c5c]">{taskData.location}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`p-6 ${GLASS}`}>
              <h2 className="text-lg font-semibold mb-4 text-[#1f1f1f]">
                Tips for a good post
              </h2>
              <div className="space-y-3">
                {[
                  "Write a clear, specific description",
                  "Set a fair budget for the work involved",
                  "Say exactly what you need done",
                  "Attach a photo or file when it helps",
                  "Reply to offers quickly",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2.5 text-sm text-[#5c5c5c]">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-white/70 border border-white/80 text-[#1f1f1f] flex items-center justify-center text-[10px] flex-shrink-0">
                      ✓
                    </span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;