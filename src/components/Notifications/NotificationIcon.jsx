import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NotificationPanel from "./NotificationPanel";
import { getNotifications } from "./NotificationService";

const NotificationIcon = () => {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // fetch unread count only
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const data = await getNotifications();
      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="relative cursor-pointer p-2 rounded-full bg-amber-200 hover:bg-gray-100 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />

        {/* Red dot only if unread */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
        )}
      </button>

      {open &&
        createPortal(
          <NotificationPanel
            open={open}
            onClose={() => {
              setOpen(false);
              fetchUnreadCount(); // refresh after closing
            }}
          />,
          document.body,
        )}
    </>
  );
};

export default NotificationIcon;
