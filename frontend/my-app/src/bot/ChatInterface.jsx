import React from "react";
import { useEffect, useState } from "react";
import API from "../api/Axios";
import { Send, Trash } from "lucide-react";

const ChatInterface = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(null);

  //fetch chats
  useEffect(() => {
    fetchChats();
  }, []);

  const loadChat = async (chatId) => {
    const res = await API.get(`/api/chats/${chatId}`);
    setCurrentChat(res.data);
    setMessages(res.data.messages);
  };

  const fetchChats = async () => {
    try {
      const res = await API.get("/api/chats");
      setChats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //send message to bot
  const sendMessage = async () => {
    try {
      await API.post("/api/chats", {
        userMessage: userInput,
        chatId: currentChat._id,
      });
      fetchChats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 border border-green-500 rounded-xl">
      <h2 className="text-3xl font-semibold my-5 border-b text-center">Your Personal Assistant</h2>

      {/* CHAT HISTORY */}
      {chats.map((chat, i) => (
        <div key={i} className={`group p-1 hover:bg-blue-50 ${currentChat._id === chat._id && "bg-blue-100"}`} onClick={() => loadChat(chat._id)}>
          <h2>{chat.messages[0].content.charAt(0)}</h2>
          <button>
            <Trash className="text-red-500 opacity-0 group-hover:opacity-100" size={15} />
          </button>
        </div>
      ))}

      {messages.map((msg, i) => (
        <div key={i} className={`${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`${msg.role === "user" ? "p-1 bg-gray-200 rounded-xl border-blue-500" : "p-4 rounded-lg border border-gray-300 bg-white"}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}

      {/* INPUT AREA */}
      <form onSubmit={sendMessage} className="w-full flex gap-2">
        <input
          type="text"
          name="userInput"
          id="userInput"
          placeholder="type here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="p-2 border border-gray-300"
        />

        <button type="submit" className="p-1 bg-black rounded-md">
          <Send className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
