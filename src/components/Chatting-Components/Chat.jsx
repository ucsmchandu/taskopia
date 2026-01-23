import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp, 
} from "firebase/firestore";
import { firestore, auth } from "../../Firebase/Firebase";
import { Send, MessageCircle, CheckCheck, ArrowRightLeft } from "lucide-react";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const messagesContainerRef = useRef(null);

  /* auth */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  /* listen messages */
  useEffect(() => {
    if (!currentUser || !chatId) return;

    const q = query(
      collection(firestore, "chats", chatId, "messages"),
      orderBy("createdAt", "asc"),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(msgs);
      setLoading(false);
    });

    return unsub;
  }, [chatId, currentUser]);

  /* scroll messages container only */
  useEffect(() => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }, 0);
    }
  }, [messages]);

  /* send message */
  const sendMessage = async () => {
    if (!text.trim() || !currentUser) return;

    await addDoc(collection(firestore, "chats", chatId, "messages"), {
      senderId: currentUser.uid,
      text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  
  if (!currentUser || loading) {
    return (
      <div className="flex items-center justify-center h-[100dvh] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-700 font-semibold tracking-wide">
            {loading ? "Loading messages…" : "Authenticating…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-25 items-stretch h-[80dvh] overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <div className="flex flex-col w-full max-w-2xl h-full overflow-hidden bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <MessageCircle size={22} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-lg flex flex-row items-start font-bold text-slate-900 tracking-tight">
                <span className="mr-1">Ally</span> <ArrowRightLeft size={16} className="relative top-2"/> <span className="ml-1">Host Chat</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Direct conversation
              </p>
            </div>
          </div>
        </div>
        {/* MESSAGES */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser.uid
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-3xl text-[15px] leading-relaxed break-words shadow-sm ${
                  msg.senderId === currentUser.uid
                    ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.senderId === currentUser.uid && (
                  <div className="flex justify-end mt-1.5 opacity-90">
                    <CheckCheck size={14} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* INPUT */}
        <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-md border-t border-slate-200/60 shadow-lg">
          <div className="flex items-end gap-2 px-3 py-3 sm:px-4 sm:py-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Message the host…"
              className="flex-1 px-5 py-3.5 border-2 border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-[15px] text-slate-900 placeholder:text-slate-400 transition-all bg-slate-50/50"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!text.trim()}
              className="p-3.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/40 disabled:opacity-40 disabled:shadow-none active:scale-95 transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
