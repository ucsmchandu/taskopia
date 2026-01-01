import { useState } from "react";
import { Check, X, User, Clock, Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// get applications
const getApplications = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/${id}/applicants`,
      { withCredentials: true }
    );
    return res.data?.applications ?? [];
  } catch (err) {
    console.log(err);
    return null;
  }
};

// updating the application status
const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }) => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE}/`,
        { status },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hostApplications"]);
      toast.success("Changes saved successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });
};

const fakeApplications = [
  {
    _id: "app1",
    task: "task123",
    host: "host123",
    coverMessage: "I've done similar work before — can start immediately.",
    status: "applied",
    createdAt: "2025-01-01",
    applicant: {
      _id: "u001",
      firstName: "Ravi",
      lastName: "Kumar",
      rating: 4.6,
    },
  },
  {
    _id: "app2",
    task: "task123",
    host: "host123",
    coverMessage: "I'm reliable and available full day.",
    status: "accepted",
    createdAt: "2025-01-03",
    applicant: {
      _id: "u002",
      firstName: "Priya",
      lastName: "Sharma",
      rating: 4.9,
    },
  },
  {
    _id: "app3",
    task: "task123",
    host: "host123",
    coverMessage: "I live nearby and have flexible timing.",
    status: "applied",
    createdAt: "2025-01-05",
    applicant: {
      _id: "u003",
      firstName: "Arun",
      lastName: "Verma",
      rating: 4.3,
    },
  },
];

const Applications = () => {
  const { id } = useParams();
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["hostApplications"],
  //   queryFn: () => getApplications(id),
  //   staleTime: 5 * 60 * 1000,
  //   gcTime: 30 * 60 * 1000,
  //   retry: 2,
  //   refetchOnReconnect: true,
  //   enabled: true,
  //   placeholderData: null,
  // });

  const updateStatus = useUpdateApplicationStatus();
  // console.log(data);

  const [filter, setFilter] = useState("all");

  // const handleStatusChange = (id, newStatus) => {
  //   setApplications((prev) =>
  //     prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
  //   );
  // };

  const { data = fakeApplications } = useQuery({
    queryKey: ["hostApplications", id],
    queryFn: () => getApplications(id),
    enabled: false, // change this after data is validate
  });

  const filtered =
    filter === "all" ? data : data.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
        <h1 className="text-2xl font-semibold mb-2">Applications</h1>
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
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="bg-white p-10 text-center border rounded-lg">
            <p className="text-gray-500">No applications found</p>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-lg p-5 flex gap-4"
            >
              <div className="hidden sm:flex w-11 h-11 rounded-full bg-gray-100 items-center justify-center">
                <User className="text-gray-400" size={18} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">
                    {app.applicant.firstName} {app.applicant.lastName}
                  </h3>

                  <span className="px-2 py-1 text-xs rounded bg-gray-100">
                    {app.status}
                  </span>
                </div>

                <div className="flex gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    {app.applicant.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(app.createdAt).toDateString()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{app.coverMessage}</p>

                <div className="flex gap-2">
                  
                  <button
                    className="px-3 py-1.5 border rounded-md text-sm"
                    onClick={() =>
                      console.log("Profile ID:", app.applicant._id)
                    }
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() =>
                      updateStatus.mutate({
                        applicationId: app._id,
                        status: "accepted",
                      })
                    }
                    className="px-3 py-1.5 rounded-md text-sm bg-green-600 text-white flex items-center gap-1"
                  >
                    <Check size={14} /> Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus.mutate({
                        applicationId: app._id,
                        status: "rejected",
                      })
                    }
                    className="px-3 py-1.5 rounded-md text-sm border flex items-center gap-1"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
