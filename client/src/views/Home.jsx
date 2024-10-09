import { useEffect, useState } from "react";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Home({ socket }) {
  const [messages, setMesssages] = useState([]);
  const [message_text, setMessage_Text] = useState("");
  const { currentTheme, theme, setCurrentTheme } = useContext(themeContext);
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  
  const { roomId } = useParams()

  async function fetchMessage() {
      try {

        const { data } = await axios.get(`http://localhost:3000/chat/${id}`)

        const dataMessages = data.map((msg) => ({
          ...msg,
          User: { username: localStorage.username },
          createdAt: msg.createdAt
        }))
        // console.log(data);
        setMesssages(dataMessages)
      } catch (error) {
        console.log(error);
      }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newMessage = {
        message_text,
        roomId,
        User: { username: localStorage.username }
      }

      socket.emit("message:new", newMessage);

      setMesssages((prev) => [...prev, newMessage]);

      await axios.post(`http://localhost:3000/chat/${id}`)
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    fetchMessage()

    socket.emit("join-room", { username: localStorage.username })

    

    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();

    socket.on("Welcome", (message) => {
      console.log(message);
    });

    socket.on("message:update", (newMessage) => {
      console.log(newMessage);

      setMesssage((prev) => {
        return [...prev, newMessage];
      });
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
        className="overflow-y-hidden max-h-svh min-h-screen flex bg-base-200 ">
        {/* side bar */}

        <div className=" h-screen gap-4 drop-shadow-2xl bg-base-100 w-60 flex flex-col bg-w  z border text-white">
          <div className="mx-4 flex  gap-7 flex-col">
            <div>
              <div className="">
                <a className="btn text-blue-400 btn-ghost text-xl">Chat Hub</a>
              </div>
              <div className="flex-none  gap-2">
                <div className="form-control ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                  />
                </div>
              </div>
            </div>
            {/* chat section */}
            <div>
              <ul className="flex flex-col gap-5">
                {/* grup chat */}
                <li>
                  <div className="flex gap-4  border-b-2 pb-2">
                    {/* avatar */}
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    {/* end avatar */}
                    <div className="flex text-slate-500 mt-1 flex-col">
                      <span>Hactiv 8</span>
                      <p className="text-sm">how it's going on..</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-4   border-b-2 pb-2">
                    {/* avatar */}
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    {/* end avatar */}
                    <div className="flex text-slate-500 mt-1 flex-col">
                      <span>Hactiv 8</span>
                      <p className="text-sm">how it's going on..</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-4   border-b-2 pb-2">
                    {/* avatar */}
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    {/* end avatar */}
                    <div className="flex text-slate-500 mt-1 flex-col">
                      <span>Hactiv 8</span>
                      <p className="text-sm">how it's going on..</p>
                    </div>
                  </div>
                </li>
                {/* end group chat */}
              </ul>
            </div>
          </div>
        </div>
        {/* side bar end */}
        {/* top bar */}
        <div className="w-full">
          <div className="drop-shadow-2xl  h-11 navbar flex text-center  bg-base-100">
            <div className="flex justify-evenly w-full text-center">
              <h1 className="font-bold  text-black">Programming</h1>
            </div>
            <div>
              {currentTheme == "light" ? (
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setCurrentTheme("dark")}>
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() => setCurrentTheme("light")}>
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </div>
          </div>

          {/* end top bar */}

          {/* main content */}
          <div className="flex relative h-screen flex-col ">
            {/* chat container */}
            <div className="mx-20 mt-20">
              {message.map((msg) => {
                return (
                  <div
                    className={
                      msg.from == localStorage.username
                        ? "chat chat-end"
                        : "chat chat-start"
                    }>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {msg.from == localStorage.username ? "You" : msg.from}
                      {/* {msg.from} */}
                      <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">{msg.message}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                );
              })}
            </div>
            {/* ch at container end */}

            {/* input message */}

            <div className=" absolute bottom-16 flex  w-full items-center border-t border-gray-300 p-2">
              <form onSubmit={handleSubmit} className="">
                <button className="text-gray-500">
                  <span className="text-2xl">😊</span> {/* Emoji button */}
                </button>
                <input
                  onChange={(e) => setSendMessage(e.target.value)}
                  type="text"
                  placeholder="Type message"
                  className="input input-bordered flex-1 mx-2"
                />
                <button className="text-gray-500">
                  {/* <Microphone className="w-5 h-5" /> Microphone icon */}
                </button>
                <button className="text-gray-500 ml-2">
                  {/* <Paperclip className="w-5 h-5" /> Attachment icon */}
                </button>
                <button className="btn w-20 btn-primary ml-2">Send</button>{" "}
                {/* Send button */}
              </form>
            </div>
            {/* input message  end */}
          </div>
        </div>
        {/* main content end */}
      </div>
    </>
  );
}
