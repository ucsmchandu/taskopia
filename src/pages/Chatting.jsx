import { useEffect, useState } from "react";
import Chat from "../components/Chatting-Components/Chat";
import CreateOrOpenChat from "../components/Chatting-Components/CreateOrOpenChat";
import { auth } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";

const Chatting = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [chatReady, setChatReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // TODO: replace the dummy data with original data
  // const taskId = "task123";
  const {taskId,hostId}=useParams();
  // console.log(hostId)
  // console.log(id)
  // const hostId = "";

  // Wait for auth
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Ensure chat exists after auth (even on refresh)
  useEffect(() => {
    if (!currentUser) return;

    const chatId = [taskId, currentUser.uid, hostId].sort().join("_");

    const ensureChat = async () => {
      try {
        await CreateOrOpenChat({
          chatId,
          taskId,
          userUids: [currentUser.uid, hostId],
        });
        setChatReady(true);
      } catch (err) {
        console.error("Failed to open chat", err);
      }
    };

    ensureChat();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Authenticating…</p>
        </div>
      </div>
    );
  }

  if (!chatReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Opening chat…</p>
        </div>
      </div>
    );
  }

  const chatId = [taskId, currentUser.uid, hostId].sort().join("_");

  return <Chat chatId={chatId} />;
};

export default Chatting;
