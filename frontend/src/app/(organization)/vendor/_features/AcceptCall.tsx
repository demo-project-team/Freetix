"use client";

import { useVendor } from "@/provider/VendorProvider";
import axios from "axios";
import { PhoneCall, PhoneOff, Mic, MicOff } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface CallData {
  roomId: string;
  callerId: string;
  receiverId: string;
}

interface SignalData {
  signal: RTCSessionDescriptionInit | RTCIceCandidateInit;
  roomId: string;
  from: string;
}

let socket: Socket | undefined;

const CallComp = () => {

  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call" | "incoming">("idle");
  const [currentCallData, setCurrentCallData] = useState<CallData | null>(null);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
const {vendor} = useVendor()
  useEffect(() => {
    if (!vendor?.id) return;

    if (!socket) {
      socket = io("http://localhost:8080");
    }

    const setupSocketListeners = () => {
      socket?.on("connect", () => {
        socket?.emit("register-user", vendor.id);
      });

      socket?.on("incoming-call", (data: CallData) => {
        setCallStatus("incoming");
        setCurrentCallData(data);
      });

      socket?.on("call-accepted", async () => {
        setCallStatus("in-call");
        if (currentCallData?.roomId) {
          try {
            await setupMediaStream();
            createPeerConnection();
            await createAndSendOffer();
          } catch (error) {
            console.error("Error setting up call:", error);
          }
        }
      });

      socket?.on("call-rejected", () => {
        setCallStatus("idle");
        setCurrentCallData(null);
        closeMediaConnections();
      });

      socket?.on("call-ended", () => {
        setCallStatus("idle");
        setCurrentCallData(null);
        closeMediaConnections();
      });

      socket?.on("call-signal", async (data: SignalData) => {
        try {
          if (!peerConnectionRef.current) {
            await setupMediaStream();
            createPeerConnection();
          }

          if ("type" in data.signal && data.signal.type === "offer") {
            await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.signal));
            const answer = await peerConnectionRef.current?.createAnswer();
            await peerConnectionRef.current?.setLocalDescription(answer);
            socket?.emit("call-signal", {
              roomId: currentCallData?.roomId,
              signal: answer,
              from: vendor.id,
            });
          } else if ("type" in data.signal && data.signal.type === "answer") {
            await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.signal));
          } else if ("candidate" in data.signal) {
            await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.signal));
          }
        } catch (error) {
          console.error("Error handling signal:", error);
        }
      });
    };

    setupSocketListeners();

    return () => {
      closeMediaConnections();
      socket?.off("incoming-call");
      socket?.off("call-accepted");
      socket?.off("call-rejected");
      socket?.off("call-ended");
      socket?.off("call-signal");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor?.id]);

  const setupMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
    } catch (error) {
      console.error("Error accessing audio devices:", error);
      throw error;
    }
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate && currentCallData?.roomId) {
        socket?.emit("call-signal", {
          roomId: currentCallData.roomId,
          signal: event.candidate,
          from: vendor?.id,
        });
      }
    };

    peerConnectionRef.current = pc;
  };

  const createAndSendOffer = async () => {
    if (!peerConnectionRef.current || !currentCallData?.roomId) return;

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    socket?.emit("call-signal", {
      roomId: currentCallData.roomId,
      signal: offer,
      from: vendor?.id,
    });
  };

  const closeMediaConnections = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    localStreamRef.current?.getTracks().forEach(track => track.stop());
    localStreamRef.current = null;
  };

  const toggleAudio = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (track) {
      track.enabled = !audioEnabled;
      setAudioEnabled(track.enabled);
    }
  };


  const acceptCall = async () => {
    if (!currentCallData) return;

    try {
      await setupMediaStream();
      createPeerConnection();
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };

  const endCall = async () => {
    if (!currentCallData) return;

    const endpoint = callStatus === "incoming" ? "reject" : "end";
    try {
      await axios.post(`http://localhost:8080/api/call/${endpoint}`, {
        callId: currentCallData.roomId,
        userId: vendor?.id,
      });

      closeMediaConnections();
      setCallStatus("idle");
      setCurrentCallData(null);
    } catch (error) {
      console.error(`Error ${endpoint}ing call:`, error);
    }
  };

  if (!vendor?.id) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center">
        {(callStatus === "calling" || callStatus === "in-call" || callStatus === "incoming") && (
          <>
            {callStatus === "incoming" && (
              <button onClick={acceptCall} title="Accept Call">
                <PhoneCall className="text-green-500" />
              </button>
            )}
            <button onClick={endCall} title="End Call">
              <PhoneOff className="text-red-500" />
            </button>
            <button onClick={toggleAudio} title={audioEnabled ? "Mute" : "Unmute"}>
              {audioEnabled ? <Mic /> : <MicOff />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallComp;
