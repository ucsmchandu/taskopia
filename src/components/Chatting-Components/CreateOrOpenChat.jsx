import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../Firebase/Firebase";

const CreateOrOpenChat = async ({ chatId, taskId, userUids }) => {
  if (!chatId || !taskId || !Array.isArray(userUids)) {
    throw new Error("Invalid chat data");
  }

  if (userUids.some((uid) => !uid)) {
    throw new Error("Invalid user UID");
  }

  const chatRef = doc(firestore, "chats", chatId);

  await setDoc(
    chatRef,
    {
      taskId,
      users: userUids,
      createdAt: serverTimestamp(),
    },
    { merge: true } // safe if doc already exists
  );

  return chatId;
};

export default CreateOrOpenChat;
