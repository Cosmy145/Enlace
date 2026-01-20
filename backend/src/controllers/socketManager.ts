import { Server } from "socket.io";
import http from "node:http";

interface MessageData {
  data: any;
  sender: string;
  "socket-id-sender": string;
}

let connections: Record<string, string[]> = {}; //stores all the connections for each room
let messages: Record<string, MessageData[]> = {}; //stores message history for each room
let timeOnline: Record<string, number> = {}; //stores the time each user joined the room

interface Offer {
  offererUserName: string;
  offer: any;
  offerIceCandidates: any;
  answererUserName: string | null;
  answer: any;
  answererIceCandidates: any;
}

interface connectedSocket {
  username: string;
  socketId: string;
}

// offers will contain {}
const offers: Record<string, Offer> = {};
const connectedSockets: connectedSocket[] = [];

export const connectToSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["*"],
    },
  });

  io.on("connection", (socket) => {
    const { userName, meetingId } = socket.handshake.auth;
    console.log(`User ${userName} connected to meeting ${meetingId}`);

    socket.join(meetingId);

    // Add to connected sockets list
    connectedSockets.push({
      username: userName,
      socketId: socket.id,
    });

    // Handle existing offer in the meeting
    if (offers[meetingId]) {
      // If there's an offer, this new user is the answerer
      socket.emit("newOfferAwaiting", offers[meetingId]);
    }

    socket.on("newOffer", ({ offer, meetingId }) => {
      console.log(
        `New offer received for meeting ${meetingId} from ${userName}`,
      );
      offers[meetingId] = {
        offererUserName: userName,
        offer,
        offerIceCandidates: [],
        answererUserName: null,
        answer: null,
        answererIceCandidates: [],
      };

      // Broadcast to others in the meeting room
      socket.to(meetingId).emit("newOfferAwaiting", offers[meetingId]);
    });

    socket.on("newAnswer", (offerObj, meetingId, ackFunction) => {
      console.log(`New answer for meeting ${meetingId} from ${userName}`);

      const offerToUpdate = offers[meetingId];
      if (!offerToUpdate) {
        console.log("No OfferToUpdate for meeting", meetingId);
        return;
      }

      // Send back any ICE candidates we've already collected
      if (typeof ackFunction === "function") {
        ackFunction(offerToUpdate.offerIceCandidates);
      }

      offerToUpdate.answer = offerObj.answer;
      offerToUpdate.answererUserName = userName;

      const socketToAnswer = connectedSockets.find(
        (s) => s.username === offerToUpdate.offererUserName,
      );

      if (socketToAnswer) {
        socket
          .to(socketToAnswer.socketId)
          .emit("answerResponse", offerToUpdate);
      } else {
        // Fallback: emit to room
        socket.to(meetingId).emit("answerResponse", offerToUpdate);
      }
    });

    socket.on("sendIceCandidateToSignalingServer", (iceCandidateObj) => {
      const { didIOffer, iceUserName, iceCandidate, meetingId } =
        iceCandidateObj;

      const offerInMeeting = offers[meetingId];
      if (!offerInMeeting) return;

      if (didIOffer) {
        // This ICE is from the Offerer. Add to list and forward to Answerer.
        if (offerInMeeting.offererUserName === iceUserName) {
          offerInMeeting.offerIceCandidates.push(iceCandidate);

          if (offerInMeeting.answererUserName) {
            const socketToSendTo = connectedSockets.find(
              (s) => s.username === offerInMeeting.answererUserName,
            );
            if (socketToSendTo) {
              socket
                .to(socketToSendTo.socketId)
                .emit("receivedIceCandidateFromServer", iceCandidate);
            } else {
              socket
                .to(meetingId)
                .emit("receivedIceCandidateFromServer", iceCandidate);
            }
          }
        }
      } else {
        // This ICE is from the Answerer. Forward to Offerer.
        if (offerInMeeting.answererUserName === iceUserName) {
          offerInMeeting.answererIceCandidates.push(iceCandidate);

          const socketToSendTo = connectedSockets.find(
            (s) => s.username === offerInMeeting.offererUserName,
          );
          if (socketToSendTo) {
            socket
              .to(socketToSendTo.socketId)
              .emit("receivedIceCandidateFromServer", iceCandidate);
          } else {
            socket
              .to(meetingId)
              .emit("receivedIceCandidateFromServer", iceCandidate);
          }
        }
      }
    });

    socket.on("disconnect", () => {
      console.log(`User ${userName} disconnected`);
      const index = connectedSockets.findIndex((s) => s.socketId === socket.id);
      if (index !== -1) {
        connectedSockets.splice(index, 1);
      }

      // Cleanup offer if the offerer disconnects
      if (offers[meetingId] && offers[meetingId].offererUserName === userName) {
        console.log(
          `Offerer ${userName} left, clearing offer for meeting ${meetingId}`,
        );
        delete offers[meetingId];
      }
    });

    // ==========================================
    // LEGACY CODE (Reference)
    // ==========================================

    // socket.on("join-call", (path) => {
    //   // Create the room if it doesn't exist
    //   if (connections[path] === undefined) {
    //     connections[path] = [];
    //   }
    //   connections[path].push(socket.id); // Add the new person to the room
    //   timeOnline[socket.id] = Date.now(); // Record the time the person joined
    //   // Tell everyone in the room about the new person
    //   for (let i = 0; i < connections[path].length; i++) {
    //     io.to(connections[path][i]).emit(
    //       "user-joined",
    //       socket.id,
    //       connections[path]
    //     );
    //   }
    //   // Send the message history to the new person
    //   if (messages[path] !== undefined) {
    //     for (let i = 0; i < messages[path].length; i++) {
    //       io.to(socket.id).emit(
    //         "chat-message",
    //         messages[path][i]["data"],
    //         messages[path][i]["sender"],
    //         messages[path][i]["socket-id-sender"]
    //       );
    //     }
    //   }
    // });
    // WebRTC signalling relay -> used to share socketID and SDP offer/answers and ICE candidates
    //   socket.on("signal", (toId, message) => {
    //     io.to(toId).emit("signal", socket.id, message);
    //   });
    //   // handling chat messages in the user's room
    //   socket.on("chat-message", (data, sender) => {
    //     // finding which room the user is in.
    //     const [matchingRoom, found] = Object.entries(connections).reduce(
    //       ([room, isFound], [roomKey, roomValue]) => {
    //         if (!isFound && roomValue.includes(socket.id)) {
    //           return [roomKey, true]; // returns the room key and true if the socket id is found
    //         }
    //         return [room, isFound]; // returns the room key and false if the socket id is not found
    //       },
    //       ["", false] // initial value: empty room name, not found
    //     );
    //     // This can be used in place of reduce method but reduce() is more functional and concise. and it is immutable too.
    //     // const entry = Object.entries(connections).find(([_, roomValue]) =>
    //     //   roomValue.includes(socket.id)
    //     // );
    //     // const matchingRoom = entry ? entry[0] : "";
    //     // const found = !!entry;
    //     // storing and broadcasting the message
    //     if (found) {
    //       // initialising the message array if it doesn't exist
    //       if (messages[matchingRoom] === undefined) {
    //         messages[matchingRoom] = [];
    //       }
    //       // adding the message to the array
    //       messages[matchingRoom].push({
    //         data,
    //         sender,
    //         "socket-id-sender": socket.id,
    //       });
    //       // broadcasting the message to all users in the room
    //       connections[matchingRoom].forEach((elem) => {
    //         io.to(elem).emit("chat-message", data, sender, socket.id);
    //       });
    //     }
    //   });
    //   // handling disconnection
    //   socket.on("disconnect", () => {
    //     const diffTime = Math.abs(timeOnline[socket.id] - Date.now());
    //     let roomName;
    //     for (const [room, users] of JSON.parse(
    //       JSON.stringify(Object.entries(connections)) //creating a copy of the connections object to avoid mutation
    //     )) {
    //       for (let socketId of users) {
    //         // checking each socket id in the room
    //         if (socketId === socket.id) {
    //           // if the socket id matches the disconnected socket id
    //           roomName = room;
    //           for (let users of connections[roomName]) {
    //             // broadcasting the user left event to all users in the room
    //             io.to(users).emit("user-left", socket.id);
    //           }
    //           const index = connections[roomName].indexOf(socket.id); // removing the disconnected socket id from the room
    //           if (index > -1) {
    //             connections[roomName].splice(index, 1);
    //           }
    //           if (connections[roomName].length === 0) {
    //             // removing the room if it is empty
    //             delete connections[roomName];
    //           }
    //         }
    //       }
    //     }
    //     // Alternative using reduce (like in chat-message):
    //     const [roomToLeave, found] = Object.entries(connections).reduce(
    //       ([room, isFound], [roomKey, roomValue]) => {
    //         if (!isFound && roomValue.includes(socket.id)) {
    //           return [roomKey, true];
    //         }
    //         return [room, isFound];
    //       },
    //       ["", false]
    //     );
    //     if (found) {
    //       // Notify everyone
    //       connections[roomToLeave].forEach((userId) => {
    //         io.to(userId).emit("user-left", socket.id);
    //       });
    //       // Remove user
    //       connections[roomToLeave] = connections[roomToLeave].filter(
    //         (id) => id !== socket.id
    //       );
    //       // Delete if empty
    //       if (connections[roomToLeave].length === 0) {
    //         delete connections[roomToLeave];
    //       }
    //     }
    //     console.log(diffTime);
    //   });
  });
  return io;
};
