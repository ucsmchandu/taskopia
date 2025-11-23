import { useState } from "react";
import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Paperclip,
  UploadCloud,
  DollarSign,
  ListChecks,
} from "lucide-react";


export default function JobApply() {

  const [fileName, setFileName] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mt-25">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl w-full max-w-2xl p-8 text-stone-900">
        <h1 className="text-3xl font-semibold text-stone-800 mb-6 text-center">
         Apply For Task
        </h1>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Task Title</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-white/40 border border-gray-300 outline-0"
              placeholder="e.g., Fix kitchen sink leak"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows="3"
              className="w-full p-3 rounded-xl bg-white/40 border border-gray-300 outline-0"
              placeholder="Explain the task details..."
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select className="w-full p-3 rounded-xl bg-white/40 border border-gray-300 outline-0">
              <option>Cleaning</option>
              <option>Repair</option>
              <option>Delivery</option>
              <option>Home Service</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Budget</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 border border-stone-300/40">
                <DollarSign size={18} />
                <input
                  type="number"
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Location</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 border border-stone-300/40">
                <MapPin size={18} />
                <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="City, Area..."
                />
              </div>
            </div>
          </div>

          {/* <div>
            <label className="block font-medium mb-2">Urgency</label>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map((u) => (
                <button
                  key={u}
                  type="button"
                  className="p-3 rounded-xl bg-white/40 hover:bg-white/60 border border-stone-300/40 text-sm font-medium"
                >
                  {u}
                </button>
              ))}
            </div>
          </div> */}

          {/* <div>
            <label className="block font-medium mb-1">Working Dates</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/40 border border-stone-300/40">
                  <Calendar size={18} />
                  <input type="date" className="w-full bg-transparent outline-none" />
                </div>
              ))}
            </div>
          </div> */}

          <div>
            <label className="block font-medium mb-1">
              Working Hours per Day
            </label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 border border-stone-300/40">
              <Clock size={18} />
              <input
                type="number"
                className="w-full bg-transparent outline-none"
                placeholder="Hours"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block font-medium mb-1">
              Attachments (optional)
            </label>

            <label
              htmlFor="fileInput"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-100/40 transition"
            >
              <UploadCloud size={22} />
              <span className="text-gray-600">
                {fileName ? fileName : "Choose a file"}
              </span>
            </label>

            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <p className="text-xs text-gray-400 mt-1">
              Maximum file size: 10MB
            </p>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer p-4 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 text-white font-semibold shadow-xl hover:opacity-90"
          >
            Post Task
          </button>
        </form>
      </div>
    </div>
  );
}
