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

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  //  Auth listener
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  //  Listen to messages
  useEffect(() => {
    if (!currentUser || !chatId) return;

    const q = query(
      collection(firestore, "chats", chatId, "messages"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          pending: doc.metadata.hasPendingWrites, //  important
        }));

        setMessages(msgs);
        setLoading(false); // ALWAYS stop loading after first snapshot
      },
    );

    return unsubscribe;
  }, [chatId, currentUser]);

  //  Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim() || !currentUser) return;

    await addDoc(collection(firestore, "chats", chatId, "messages"), {
      senderId: currentUser.uid,
      text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  if (!currentUser) {
    return <p className="text-center mt-10">Authenticating…</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading messages…</p>;
  }

  const styles = {
    container: {
      width: "400px",
      margin: "40px auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      height: "500px",
    },
    messagesBox: {
      flex: 1,
      padding: "10px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    message: {
      padding: "8px 12px",
      borderRadius: "12px",
      maxWidth: "70%",
      fontSize: "14px",
    },
    inputBox: {
      display: "flex",
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    input: {
      flex: 1,
      padding: "8px",
      fontSize: "14px",
    },
    button: {
      marginLeft: "8px",
      padding: "8px 14px",
      cursor: "pointer",
    },
  };

  // console.log(messages)
  return (
    <div style={styles.container}>
      <div style={styles.messagesBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf:
                msg.senderId === currentUser.uid ? "flex-end" : "flex-start",
              background:
                msg.senderId === currentUser.uid ? "#DCF8C6" : "#FFFFFF",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
