import { connectedUsers, io } from "../socket";

export const initiateCall = async (callerId: string, receiverId: string) => {
    console.log(`📞 Call initiated from ${callerId} to ${receiverId}`);
    const roomId = `call_${callerId}_${receiverId}_${Date.now()}`;
    if (connectedUsers.has(receiverId)) {
      io.to(receiverId).emit("incoming-call", {
        callerId,
        roomId,
        timestamp: new Date(),
      });
      
      console.log(`🔔 Notified ${receiverId} about incoming call`);
    } else {
      console.log(`⚠️ Receiver ${receiverId} is not online`);
    }
    return {
      status: "success",
      message: `Call from ${callerId} to ${receiverId} initiated successfully`,
      roomId
    };
  };

  export const acceptCall = (callId: string, userId: string) => {
    console.log(`✅ Call ${callId} accepted by ${userId}`);
    io.to(callId).emit("call-accepted", { userId });
    return { status: "success", message: "Call accepted" };
  };
  
  export const rejectCall = (callId: string, userId: string) => {
    console.log(`❌ Call ${callId} rejected by ${userId}`);
    io.to(callId).emit("call-rejected", { userId });
    return { status: "success", message: "Call rejected" };
  };
  
  export const endCall = (callId: string, userId: string) => {
    console.log(`🔚 Call ${callId} ended by ${userId}`);
    io.to(callId).emit("call-ended", { userId });
    return { status: "success", message: "Call ended" };
  };