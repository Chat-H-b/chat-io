export default function Home() {
  return (
    <>
      <div className="overflow-y-hidden max-h-svh min-h-screen flex bg-base-200 ">
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
          <div className="drop-shadow-2xl text-red-700 h-11 navbar flex text-center  bg-base-100">
            <div className="flex justify-evenly w-full text-center">
              <h1 className="font-bold  text-black">Programming</h1>
            </div>
          </div>
          {/* end top bar */}

          {/* main content */}
          <div className="flex relative h-screen flex-col ">
            {/* chat container */}
            <div className="mx-20 mt-20">
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Obi-Wan Kenobi
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            </div>
            {/* ch at container end */}

            {/* input message */}
            <div className=" absolute bottom-16 flex  w-full items-center border-t border-gray-300 p-2">
              <button className="text-gray-500">
                <span className="text-2xl">😊</span> {/* Emoji button */}
              </button>
              <input
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
            </div>
            {/* input message  end */}
          </div>
        </div>
        {/* main content end */}
      </div>
    </>
  );
}
