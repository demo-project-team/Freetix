// // components/ChatBox.tsx
// "use client";

// import { useState } from "react";


// const ChatBox = ({ userId }: { userId: string }) => {
//   const socket = useSocket(userId);
//   const [to, setTo] = useState("");
//   const [message, setMessage] = useState("");

//   const sendMessage = () => {
//     if (!socket) return;

//     socket.emit("private-message", {
//       from: userId,
//       to,
//       message,
//     });

//     setMessage("");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Recipient userId"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Type a message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatBox;
