import React from "react";
import { useEffect, useState } from "react";
import { API } from "../api/Axios";
import { Bot, Loader, Send, Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ChatInterface = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

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
    setLoading(true);
    try {
      const res = await API.get("/api/chats");
      setChats(res.data);
    } catch (error) {
      console.log(error.response?.data?.error.message || error.message || "Error fetching chats");
    } finally {
      setLoading(false);
    }
  };

  //send message to bot
  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userInput.trim()) {
      setLoading(false);
      return; // Don't send empty messages
    }

    try {
      const res = await API.post("/api/chats", {
        message: userInput,
        chatId: currentChat?._id,
      });
      setCurrentChat(res.data);
      setMessages(res.data.messages);
      setUserInput(""); // Clear input after sending
      fetchChats();
    } catch (error) {
      console.log(error.response?.data?.error.message || error.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId) => {
    setLoading(true);
    try {
      await API.delete(`/api/chats/${chatId}`);
      fetchChats();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="p-5 border border-green-500 rounded-xl m-3 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold my-5 border-b text-center">Your Personal Assistant</h2>

        {/* CHAT HISTORY */}
        {chats.map((chat, i) => (
          <div
            key={i}
            className={`group flex items-center justify-between p-2 hover:bg-gray-100 ${currentChat?._id === chat._id && "bg-blue-100"}`}
            onClick={() => loadChat(chat._id)}
          >
            <h2>{chat.messages[0].content.split(" ").slice(0, 5).join(" ") || "New chat"}</h2>
            <button
              onClick={() => deleteChat(chat._id)}
              className="text-red-500 p-2 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100"
              size={15}
            >
              <Trash size={15} />
            </button>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-4 mt-5 text-center text-gray-500">
            <Bot className="mx-auto mb-2" size={40} />
            <h2 className="text-lg">Welcome to the personal assistant!</h2>
            <p className="text-sm text-muted-foreground">Start a new conversation by typing below!</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex my-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`${msg.role === "user" ? "p-2 border bg-gray-100 rounded-xl border-blue-500" : "p-4 rounded-lg border border-gray-300 bg-white"}`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="inline-block mb-2">
            <div className="flex gap-2 items-center py-1.5 px-3 rounded-lg border border-gray-300 bg-white">
              <div className="inline-block p-1 rounded bg-black">
                <Bot className="text-white" />{" "}
              </div>
              <p className="flex gap-1 items-center ml-2 text-gray-500">
                <Loader className="animate-spin" size={18} />
                thinking
              </p>
            </div>
          </div>
        )}

        {/* INPUT AREA */}
        <form onSubmit={sendMessage} className="w-full flex gap-2 items-center">
          <input
            type="text"
            required
            name="userInput"
            id="userInput"
            placeholder="type here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />

          <button type="submit" disabled={loading} className="p-3 bg-black rounded-md cursor-pointer disabled:cursor-not-allowed">
            {loading ? "Sending..." : <Send className="text-white" size={15} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
