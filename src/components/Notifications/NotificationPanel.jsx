import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigation } from "lucide-react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "./NotificationService";
import { Link } from "react-router-dom";

const NotificationPanel = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotifications();
      // console.log(res)
      const data = res ? res.filter((r) => r.isRead === false) : [];
      // console.log(data);
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/20 z-[9998]" />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          absolute top-14 right-2 sm:right-0
          w-[92vw] sm:w-[360px]
          max-h-[70vh]
          bg-white
          shadow-2xl
          rounded-2xl
          border
          z-[9999]
          flex flex-col
          animate-in fade-in slide-in-from-top-2 duration-200
        "
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 bg-white/90 backdrop-blur
                        border-b px-4 py-3 rounded-t-2xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base sm:text-lg">
              Notifications
            </h2>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs sm:text-sm cursor-pointer text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button onClick={onClose}>
                <X className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-900" />
              </button>
            </div>
          </div>

          {unreadCount > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {unreadCount} unread notification
              {unreadCount > 1 && "s"}
            </p>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
          {loading ? (
            /* Spinner */
            <div className="flex justify-center items-center py-12">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="font-medium">No notifications</p>
              <p className="text-sm">You’re all caught up </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                className={`
                  cursor-pointer rounded-xl border
                  bg-white p-4
                  transition-all duration-200
                  hover:shadow-lg hover:-translate-y-0.5
                  ${
                    !n.isRead
                      ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                      : "border-gray-200"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {!n.isRead && (
                    <span className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                  )}

                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {n.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-1 relative top-12 hover:underline cursor-pointer ">
                    <Navigation size={16} className="" />
                    <Link to={`${n?.link}`} className="cursor-pointer">
                      Open
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
