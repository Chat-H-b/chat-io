import { useEffect, useState } from "react";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home({ socket, url }) {
  const [sendMessage, setSendMessage] = useState(""); // This stores the current message being typed
  const [message, setMessage] = useState([]); // Messages state (unused here)
  const [room, setRoom] = useState([]); // Rooms list state
  const [chats, setChat] = useState([]); // Chat messages state
  const [roomId, setRoomId] = useState(0);
  const { currentTheme, theme, setCurrentTheme } = useContext(themeContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (sendMessage.trim() === "") return;
      console.log(roomId);
      socket.emit("message:new", sendMessage);
      setSendMessage("");
      const { data } = await axios.post(
        `${url}/chat/${roomId}`,
        { sendMessage },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchChat(roomId) {
    try {
      const { data } = await axios.get(`${url}/chat/${roomId}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data);
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRoom() {
    try {
      const { data } = await axios.get(`${url}/room`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data);
      setRoom(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.connect();
    fetchRoom();
    fetchChat();
    socket.on("Welcome", (message) => {
      console.log(message);
    });

    socket.on("message:update", (newMessage) => {
      console.log(newMessage);
      setChat((prev) => [...prev, newMessage]); // Append new message to the chat state
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        data-theme={theme[currentTheme].dataTheme}
        className="overflow-y-hidden max-h-svh min-h-screen flex bg-base-200"
      >
        {/* Sidebar */}
        <div className="h-screen gap-4 drop-shadow-2xl bg-base-100 w-60 flex flex-col bg-w z border">
          <div className="mx-4 flex gap-7 flex-col">
            <button
              onClick={handleLogout}
              className="bg-cyan-500 p-4 rounded-lg w-40 font-bold flex justify-center"
            >
              Logout
            </button>
            <a className="btn text-blue-400 btn-ghost text-xl">Chat Hub</a>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>

            {/* Chat Room List */}
            <ul className="flex flex-col gap-5">
              {room.map((e) => (
                <li key={e.id}>
                  <button
                    className="flex gap-4 border-b-2 pb-2"
                    onClick={() => {
                      return fetchChat(e.id), setRoomId(e.id);
                    }}
                  >
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div className="flex text-slate-500 mt-1 flex-col">
                      <span>{e.name}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="drop-shadow-2xl h-11 navbar flex text-center bg-base-100">
            <h1 className="font-bold text-black">Programming</h1>
            <div>
              {currentTheme === "light" ? (
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  onClick={() => setCurrentTheme("dark")}
                >
                  {/* Light to Dark mode toggle */}
                </svg>
              ) : (
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  onClick={() => setCurrentTheme("light")}
                >
                  {/* Dark to Light mode toggle */}
                </svg>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex relative h-screen flex-col">
            <div className="mx-20 mt-20">
              {chats.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.from === localStorage.username
                      ? "chat chat-end"
                      : "chat chat-start"
                  }
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {msg.from === localStorage.username ? "You" : msg.from}
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">{msg.message_text}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="absolute bottom-16 flex w-full items-center border-t border-gray-300 p-2">
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex items-center"
              >
                <input
                  type="text"
                  placeholder="Type message"
                  className="input input-bordered flex-1 mx-2"
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)} // Update message as it's typed
                />
                <button className="btn w-20 btn-primary ml-2" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
