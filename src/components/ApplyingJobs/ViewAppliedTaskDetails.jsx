import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  FileText,
  Mail,
  MessageCircle,
  X,
  CheckCircle,
  SquareCheck,
  IndianRupee,
  Info,
  Ban,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import RatingForm from "../Ratings/RatingForm";

// to get the task details
const getTaskDetails = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/application/details/me/${id}`,
      { withCredentials: true },
    );
    return res.data.tasks;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return null;
  }
};

// to cancel the application
const useCancelApplication = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/application/tasks/application/${id}/cancel`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Task is cancelled Successfully");
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allyAppliedTasks"] });
      queryClient.invalidateQueries({ queryKey: ["allyAppliedTaskDetails"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      navigate("/applied-tasks");
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err?.response?.data?.message}`);
    },
  });
};

// to send the request completion
const useRequestCompletion = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/application/tasks/request/task/completion/${taskId}`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Request completion send successfully.");
      console.log("task completion req:", res);
      queryClient.invalidateQueries({ queryKey: ["allyAppliedTasks"] });
      queryClient.invalidateQueries({ queryKey: ["allyAppliedTaskDetails", id] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err?.response?.data?.message}`);
    },
  });
};

const GLASS =
  "bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_10px_36px_rgba(0,0,0,0.06)] rounded-2xl";
const GLASS_STRONG =
  "bg-white/70 backdrop-blur-2xl border border-white/70 shadow-[0_14px_44px_rgba(0,0,0,0.08)] rounded-2xl";
const GLASS_CHIP =
  "bg-white/60 backdrop-blur-md border border-white/70 text-[#5c5c5c]";

const ACCENT = "#8a6a2f"; // brass — reserved for primary actions + live data
const ACCENT_SOFT = "bg-[#8a6a2f]/10 border-[#8a6a2f]/25 text-[#6f5626]";
const ACCENT_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a6a2f]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef0f2]";

// neutral badge per status; rejected keeps semantic red, accepted/completed
// get the brass accent so progress reads at a glance, applied stays neutral
const statusColors = {
  applied: `${GLASS_CHIP}`,
  accepted: `${ACCENT_SOFT} border`,
  rejected: "bg-[#b3392c]/10 text-[#b3392c] border border-[#b3392c]/20",
  completed: "bg-[#1f1f1f] text-white border border-[#1f1f1f]",
};

// Small label/value row used throughout — keeps the muted label and the
// bold, backend-sourced value visually distinct and consistent.
const DataRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-black/10 last:border-b-0">
    <span className="text-xs sm:text-sm text-[#6b6b6b]">{label}</span>
    <span className="font-semibold text-[#1f1f1f] text-sm sm:text-base text-right">
      {value}
    </span>
  </div>
);

// Circular icon badge used to anchor each sub-section heading.
const SectionIcon = ({ Icon }) => (
  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#8a6a2f]/10 text-[#8a6a2f] flex-shrink-0">
    <Icon size={14} />
  </span>
);

const AppliedTasksPage = () => {
  const { taskId } = useParams();
  //   console.log(taskId);
  const createCancelApplication = useCancelApplication();
  const createRequestCompletion = useRequestCompletion(taskId);

  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["allyAppliedTaskDetails", taskId],
    queryFn: () => getTaskDetails(taskId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  // console.log(tasks);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const cancelApplication = () => {
    const cfrm = confirm("Are you want to withdraw the application ?");
    if (cfrm) {
      createCancelApplication.mutate(tasks?._id);
    } else return;
  };

  const confirmRequestCompletion = () => {
    const cfrm = confirm("Are you sure about to send the request?");
    if (cfrm) {
      createRequestCompletion.mutate(taskId);
    } else return;
  };
  // console.log(tasks?.task?.isDeleted)

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex min-h-screen flex-col items-center justify-center h-40 space-y-3 bg-[#eef0f2]">
          <div className="w-12 h-12 border-4 border-[#1f1f1f]/20 border-t-[#1f1f1f] rounded-full animate-spin"></div>
          <p className="text-[#1f1f1f] font-semibold">Loading your Tasks...</p>
        </div>
      )}
      {!isPending && !isFetching && !isError && !tasks && (
        <div className="flex min-h-screen flex-col justify-center items-center bg-[#eef0f2]">
          <p className="text-xl sm:text-2xl text-[#6b6b6b] italic mt-30">
            Nothing here yet - Apply for tasks!
          </p>

          <Link
            to="/job/listings"
            className={`text-sm w-fit mt-6 px-5 py-2.5 rounded-full font-medium bg-[#1f1f1f] text-white hover:bg-[#333] transition ${ACCENT_RING}`}
          >
            Apply Task
          </Link>
        </div>
      )}

      {!isPending && !isFetching && !isError && tasks && (
        <div className="relative min-h-screen mt-20 bg-[#eef0f2]">
          {/* pure glass depth — soft white highlights only, no color */}
          <div className="pointer-events-none fixed -top-40 -right-32 w-[560px] h-[560px] rounded-full blur-[100px] opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
          <div className="pointer-events-none fixed -bottom-44 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)]" />

          {/* Header */}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f1f1f]">
              Applied Tasks
            </h1>
            <p className="text-[#6b6b6b] mt-2 text-sm sm:text-base">
              Track your task applications
            </p>
          </div>

          {/* Main Content */}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div key={tasks?._id} className={`${GLASS_STRONG} mb-6`}>
              {/* Header Section */}
              <div className="border-b border-black/10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#1f1f1f] mb-2">
                      {tasks?.task?.taskTitle}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className={`text-xs sm:text-sm px-3 py-1 rounded-md ${GLASS_CHIP}`}>
                        {tasks?.task?.taskCategory}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-md border ${
                          tasks?.task?.urgency === "urgent"
                            ? "text-[#b3392c] border-[#b3392c]/20 bg-[#b3392c]/10"
                            : "text-[#5c5c5c] border-black/10 bg-white/50"
                        }`}
                      >
                        {tasks?.task?.urgency}
                      </span>
                      {tasks?.task?.isDeleted === true && (
                        <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-md border text-[#b3392c] border-[#b3392c]/20 bg-[#b3392c]/10 inline-flex items-center gap-1">
                          <Ban size={12} />
                          Task Deleted
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Budget is the single most important number on the page —
                      it now carries the accent so it reads instantly. */}
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[#8a6a2f] mb-1 inline-flex items-center gap-0.5">
                      <IndianRupee size={22} strokeWidth={2.5} />
                      {tasks?.task?.budget}
                    </div>
                    <div className="text-xs sm:text-sm text-[#9a9a9a]">Budget</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-[#5c5c5c]">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-xs sm:text-sm">
                      Applied {formatDate(tasks?.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-md ${
                      statusColors[tasks?.status]
                    } inline-flex w-fit`}
                  >
                    <span className="text-xs sm:text-sm font-semibold capitalize">
                      {tasks?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                {/* Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <SectionIcon Icon={FileText} />
                    <h3 className="text-sm font-semibold text-[#3a3a3a]">
                      Task Description
                    </h3>
                  </div>
                  <p className="text-[#1f1f1f] leading-relaxed pl-9">
                    {tasks?.task?.description}
                  </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  {/* Left Column - Host Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <SectionIcon Icon={User} />
                      <h3 className="text-xs sm:text-sm font-semibold text-[#3a3a3a]">
                        Host Information
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8a6a2f]/10 border border-[#8a6a2f]/25 flex items-center justify-center text-[#8a6a2f] font-bold text-sm sm:text-base">
                          {tasks?.host?.firstName[0]}
                          {tasks?.host?.lastName[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1f1f1f] text-sm sm:text-base">
                            {tasks?.host?.firstName} {tasks?.host?.lastName}
                          </div>
                          <div className="text-xs sm:text-sm text-[#9a9a9a]">
                            Task Host
                          </div>
                        </div>
                        <div className="ml-auto sm:ml-4 w-fit">
                          <Link
                            to={`/host/public/profile/${tasks?.host?._id}`}
                            className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer inline-flex items-center gap-2 transition border border-black/10 text-[#1f1f1f] bg-white/70 hover:bg-white hover:border-[#8a6a2f]/40 hover:text-[#8a6a2f] ${ACCENT_RING}`}
                          >
                            <User size={16} />
                            View Profile
                          </Link>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-black/10 space-y-3">
                        <div className="flex items-start gap-3 text-xs sm:text-sm">
                          <MapPin
                            size={16}
                            className="text-[#9a9a9a] mt-0.5 flex-shrink-0"
                          />
                          <div className="text-[#1f1f1f] font-medium">
                            <div>{tasks?.host?.addressDetails?.address}</div>
                            <div>
                              {tasks?.host?.addressDetails?.city},{" "}
                              {tasks?.host?.addressDetails?.state} -{" "}
                              {tasks?.host?.addressDetails?.pinCode}
                            </div>
                            <div className="text-xs text-[#9a9a9a] mt-1 font-normal">
                              {tasks?.host?.addressDetails?.landMark}
                            </div>
                          </div>
                        </div>

                        {tasks?.task?.email && (
                          <div className="flex items-center gap-3 text-xs sm:text-sm">
                            <Mail
                              size={16}
                              className="text-[#9a9a9a] flex-shrink-0"
                            />
                            <span className="text-[#1f1f1f] font-medium break-all">
                              {tasks?.task?.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Task Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <SectionIcon Icon={Clock} />
                      <h3 className="text-xs sm:text-sm font-semibold text-[#3a3a3a]">
                        Task Details
                      </h3>
                    </div>

                    <div className="space-y-0">
                      <DataRow
                        label="Working Hours"
                        value={`${tasks?.task?.workingHours} hour(s)`}
                      />

                      {/* <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Total Applicants
                        </span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {tasks?.task?.tasksCount}
                        </span>
                      </div> */}

                      <DataRow
                        label="Start Date"
                        value={formatDate(tasks?.task?.startingDate)}
                      />

                      <DataRow
                        label="End Date"
                        value={formatDate(tasks?.task?.endingDate)}
                      />

                      <DataRow
                        label="Application Status"
                        value={
                          <span className="capitalize">{tasks?.status}</span>
                        }
                      />

                      <DataRow
                        label="Task Status"
                        value={
                          <span className="capitalize">
                            {tasks?.task?.status === "completion_requested"
                              ? "Completion requested"
                              : tasks?.task?.status}
                          </span>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Message */}
                {tasks.coverMessage && (
                  <div className={`mb-6 sm:mb-8 p-4 sm:p-5 ${GLASS} border-l-4 border-l-[#8a6a2f]/40`}>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#3a3a3a] tracking-wide mb-2">
                      Your Cover Message
                    </h3>
                    <p className="text-sm sm:text-base text-[#1f1f1f] italic">
                      "{tasks?.coverMessage}"
                    </p>
                  </div>
                )}

                {/* Attachment */}
                {tasks?.task?.attachments && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#3a3a3a] tracking-wide mb-3">
                      Task Attachment
                    </h3>
                    <img
                      src={tasks?.task?.attachments}
                      alt="Task attachment"
                      className="w-full h-60 sm:h-80 object-cover rounded-lg border border-white/70"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-black/10">
                  {(tasks?.status === "applied" ||
                    tasks?.status === "accepted") &&
                  !tasks?.task?.isDeleted &&
                  tasks?.task?.status !== "completed" ? (
                    <>
                      {/* Destructive action: kept red for instant recognition,
                          but outlined so it doesn't out-compete the primary
                          "Chat with Host" action below when both are shown. */}
                      <button
                        disabled={createCancelApplication.isPending}
                        onClick={cancelApplication}
                        className={`flex-1 bg-white/70 border-2 border-[#b3392c]/40 cursor-pointer hover:bg-[#b3392c] hover:text-white hover:border-[#b3392c] text-[#b3392c] font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${ACCENT_RING}`}
                      >
                        {createCancelApplication.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Canceling...
                          </span>
                        ) : (
                          <>
                            <X size={18} />
                            Cancel Application
                          </>
                        )}
                      </button>

                      {tasks?.status === "accepted" && (
                        <Link
                          to={`/chat/${taskId}/${tasks?.host?.firebaseUid}`}
                          className={`flex-1 flex justify-center items-center gap-2 bg-[#1f1f1f] cursor-pointer hover:bg-[#333] text-white font-semibold py-3 px-6 rounded-lg shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-colors text-sm sm:text-base ${ACCENT_RING}`}
                        >
                          <MessageCircle size={18} />
                          Chat with Host
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      {tasks?.task.isDeleted === true ? (
                        <p className={`flex-1 text-[#1f1f1f] font-medium py-3 px-6 rounded-lg transition-colors text-sm sm:text-base inline-flex items-center justify-center gap-2 ${GLASS_CHIP}`}>
                          <Info size={16} />
                          Host Deleted This Task
                        </p>
                      ) : tasks?.task?.status === "completed" ? (
                        <button
                          disabled
                          className="flex-1 bg-[#1f1f1f] text-white font-semibold py-3 px-6 rounded-lg text-sm sm:text-base inline-flex items-center justify-center gap-2 cursor-default"
                        >
                          <CheckCircle size={18} />
                          {tasks?.task?.status}
                        </button>
                      ) : (
                        <button
                          disabled
                          className={`flex-1 text-[#1f1f1f] font-medium py-3 px-6 rounded-lg text-sm sm:text-base inline-flex items-center justify-center gap-2 cursor-default ${GLASS_CHIP}`}
                        >
                          <CheckCircle size={18} />
                          {tasks?.status}
                        </button>
                      )}
                    </>
                  )}

                  {/* req completion button — the accent color marks this as
                      the primary, forward-moving action on the page. */}
                  {tasks?.task.isDeleted === false &&
                    tasks?.task?.isActive === true &&
                    tasks?.task?.status === "assigned" &&
                    tasks?.status === "accepted" && (
                      <>
                        <button
                          disabled={createRequestCompletion.isPending}
                          onClick={confirmRequestCompletion}
                          style={{ backgroundColor: ACCENT }}
                          className={`flex-1 flex flex-row items-center justify-center gap-2 text-white hover:brightness-110 cursor-pointer font-semibold py-3 px-6 rounded-lg shadow-[0_6px_18px_rgba(138,106,47,0.35)] transition disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base ${ACCENT_RING}`}
                        >
                          {createRequestCompletion.isPending ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <>
                              <SquareCheck size={18} />
                              <span>Request completion</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                </div>

                {tasks?.task?.status === "completed" && (
                  <RatingForm taskId={tasks?.task?._id} title="Rate the host" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppliedTasksPage;