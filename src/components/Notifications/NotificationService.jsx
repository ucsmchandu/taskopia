import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/notifications/get/notifications`,{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markAsRead = async (id) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/notifications/mark/${id}/read`,{},{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/notifications/mark/all/read`,{},{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 30000, // 30 seconds
  });
};

export default { getNotifications, markAsRead, markAllAsRead, useGetNotifications };
