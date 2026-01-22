import { useEffect, useState } from "react";
import Chat from "../components/Chatting-Components/Chat";
import CreateOrOpenChat from "../components/Chatting-Components/CreateOrOpenChat";
import { auth } from "../Firebase/Firebase";

const Chatting = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [chatReady, setChatReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // TODO: replace the dummy data with original data
  const taskId = "task123";
  const otherUserId = "Z9sUE6FiFqhvUEppAu61nolUhjw2";

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

    const chatId = [taskId, currentUser.uid, otherUserId].sort().join("_");

    const ensureChat = async () => {
      try {
        await CreateOrOpenChat({
          chatId,
          taskId,
          userUids: [currentUser.uid, otherUserId],
        });
        setChatReady(true);
      } catch (err) {
        console.error("Failed to open chat", err);
      }
    };

    ensureChat();
  }, [currentUser]);

  if (loading) {
    return <p className="text-center mt-10">Authenticating…</p>;
  }

  if (!chatReady) {
    return <p className="text-center mt-10">Opening chat…</p>;
  }

  const chatId = [taskId, currentUser.uid, otherUserId].sort().join("_");

  return <Chat chatId={chatId} />;
};

export default Chatting;
