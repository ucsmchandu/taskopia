import { useState } from "react";
import { Check, X, User, Clock, Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// ================= API =================
const getApplications = async (taskId) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_BACKEND_BASE
    }/taskopia/u1/api/application/tasks/${taskId}/applicants`,
    { withCredentials: true }
  );
  return res.data?.applications ?? [];
};

const updateApplicationStatus = async ({ id, status }) => {
  const res = await axios.patch(
    `${
      import.meta.env.VITE_BACKEND_BASE
    }/taskopia/u1/api/application/tasks/application/${id}/status`,
    { status },
    { withCredentials: true }
  );
  return res.data;
};

// ================= COMPONENT =================
const Applications = () => {
  const { id: taskId } = useParams();
  const [filter, setFilter] = useState("all");
  const [activeAppId, setActiveAppId] = useState(null); // ⭐ NEW
  const queryClient = useQueryClient();

  // -------- Fetch --------
  const {
    data: applications = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["hostApplications", taskId],
    queryFn: () => getApplications(taskId),
    staleTime: 5 * 60 * 1000,
  });

  // -------- Mutation --------
  const mutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["hostApplications", taskId]);
      setActiveAppId(null); // ⭐ RESET
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Action failed");
      setActiveAppId(null); // ⭐ RESET
    },
  });

  // -------- Handlers --------
  const acceptApplication = (appId) => {
    if (confirm("Are you sure you want to accept this application?")) {
      setActiveAppId(appId); // ⭐ SET ACTIVE
      mutation.mutate({ id: appId, status: "accepted" });
    }
  };

  const rejectApplication = (appId) => {
    if (confirm("Are you sure you want to reject this application?")) {
      setActiveAppId(appId); // ⭐ SET ACTIVE
      mutation.mutate({ id: appId, status: "rejected" });
    }
  };

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((a) => a.status === filter);

  // -------- Page Loading --------
  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
        <h1 className="text-3xl font-semibold mb-2">Applications</h1>
        <p className="text-gray-500 mb-6">
          Review and manage candidate applications
        </p>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["all", "applied", "accepted", "rejected"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === t
                  ? "bg-gray-900 text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="bg-white p-10 border rounded-lg text-center">
            <p className="text-gray-500">No applications found</p>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {filtered.map((app) => {
            const isActive = mutation.isPending && activeAppId === app._id;

            return (
              <div
                key={app._id}
                className="bg-white border rounded-lg p-5 flex gap-4"
              >
                <div className="hidden sm:flex w-11 h-11 rounded-full bg-gray-100 items-center justify-center">
                  <User size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold">
                      {app.applicant.firstName} {app.applicant.lastName}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                      {app.status}
                    </span>
                  </div>

                  <div className="flex gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                      {app.applicant.rating?.average ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(app.createdAt).toDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{app.coverMessage}</p>

                  {app.status === "applied" && (
                    <div className="flex gap-2">
                      {/* ACCEPT */}
                      <button
                        onClick={() => acceptApplication(app._id)}
                        disabled={isActive}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-md flex items-center gap-1"
                      >
                        {isActive ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Check size={14} /> Accept
                          </>
                        )}
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() => rejectApplication(app._id)}
                        disabled={isActive}
                        className="px-3 py-1.5 border rounded-md flex items-center gap-1"
                      >
                        {isActive ? (
                          <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <X size={14} /> Reject
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Applications;
