import { API } from "@/api/Axios";
import {
  Camera,
  FileTypeCornerIcon,
  Heart,
  Image,
  MedalIcon,
  PlusCircle,
  Share2,
  Text,
  Type,
  User,
  Video,
  Calendar,
  Tag,
  BookOpen,
  Users,
  MessageCircle,
  Paperclip,
  Clock,
  Send,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SAssessmentDetails = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [newMessage, setNewMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    const getAssessment = async () => {
      try {
        const res = await API.get(`/api/classes/class/assessments/${id}`);
        setAssessment(res.data.assessment || {});
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching assessments");
      }
    };
    getAssessment();
  }, [id]);

  // Demo discussions data
  const discussions = [
    { id: 1, user: "John", message: "Where is the teacher waiting us?", timestamp: "2 hours ago" },
    {
      id: 2,
      user: "Alexander",
      message: "He is in his office right now. he said i will message you once i finish my work.",
      timestamp: "1 hour ago",
    },
    { id: 3, user: "Natan", message: "Is there anybody who felt difficulty on this assignment?", timestamp: "30 mins ago" },
    { id: 4, user: "Hewan", message: "No everything is perfect.", timestamp: "15 mins ago" },
  ];

  // Demo submissions data
  const submissions = [
    { id: 1, name: "Alice Johnson", submittedAt: "2026-07-14 14:30", score: 95 },
    { id: 2, name: "Bob Smith", submittedAt: "2026-07-14 13:15", score: 87 },
    { id: 3, name: "Carol White", submittedAt: "2026-07-14 12:00", score: 92 },
    { id: 4, name: "David Brown", submittedAt: "2026-07-14 11:45", score: 78 },
    { id: 5, name: "Eve Davis", submittedAt: "2026-07-14 10:30", score: 88 },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle send message logic
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getTabContent = () => {
    let filteredSubmissions = submissions;
    if (activeTab === "first5") {
      filteredSubmissions = submissions.slice(0, 5);
    } else if (activeTab === "last5") {
      filteredSubmissions = submissions.slice(-5);
    }
    return filteredSubmissions;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto pb-32">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-foreground">{assessment.title || "Assessment Title"}</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setIsLiked(!isLiked)}>
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-foreground"} />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Share2 size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Assessment Card */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-border mb-4">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Due Date</p>
              <p className="font-medium text-foreground">{assessment.dueDate || "2026-07-20"}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <Users size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Submissions</p>
              <p className="font-medium text-foreground">{assessment.submissions?.length || 0} students</p>
            </div>
          </div> */}

          <div className="flex items-center gap-3">
            <Clock size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Time Remaining</p>
              <p className="font-medium text-primary">3 days</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-foreground mb-2">
              <BookOpen size={18} />
              Description
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {assessment.description || "Complete the assignment according to the given instructions."}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-semibold text-foreground mb-2">
              <Text size={18} />
              Instructions
            </h3>
            <p className="text-foreground/80 leading-relaxed">{assessment.instructions || "Follow the guidelines and submit before the deadline."}</p>
          </div>

          {assessment.content && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Content</h3>
              <div className="text-foreground/80">{assessment.content}</div>
            </div>
          )}
        </div>
      </div>

      {/* Attachments Section */}
      <div className="mb-6 card">
        <h2 className="text-lg font-semibold text-foreground mb-3">Your Attachments</h2>
        <div className="grid grid-cols-1 gap-3 max-w-100">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
            <FileTypeCornerIcon size={24} className="text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">assignment-guide.pdf</p>
              <p className="text-xs text-muted-foreground">2.4 MB</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
            <Image size={24} className="text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">diagram.png</p>
              <p className="text-xs text-muted-foreground">1.2 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3 p-3 bg-white">
          <div className="flex gap-2 items-center">
            <Users size={18} className="text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Submissions</h2>
            <p className="w-1 h-1 bg-gray-600 mx-3 dark:bg-white rounded-full"></p>
            <span className="text-sm text-muted-foreground">{assessment.submissions?.length || 0} students submitted</span>

            <p className="w-1 h-1 bg-gray-600 mx-3 dark:bg-white rounded-full"></p>

            <button className="cursor-pointer">Hide students</button>
          </div>
          <div className="flex gap-3 items-center"></div>
        </div>

        <div className="flex gap-2 flex-wrap p-3 bg-white">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "all" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted-hover"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Submissions
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "first5" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted-hover"
            }`}
            onClick={() => setActiveTab("first5")}
          >
            First 5 Students
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "last5" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted-hover"
            }`}
            onClick={() => setActiveTab("last5")}
          >
            Last 5 Submissions
          </button>
        </div>

        <div className="space-y-2">
          {getTabContent().map((sub) => (
            <div key={sub.id} className="flex justify-between items-center p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                  {sub.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.submittedAt}</p>
                </div>
              </div>
              {sub.score && (
                <div className="flex items-center gap-1">
                  <MedalIcon size={16} className="text-primary" />
                  <span className="font-semibold text-foreground">{sub.score}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Discussions Section */}
      <div className="mb-6 p-3 bg-white">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
          <MessageCircle size={20} />
          Discussions
        </h2>

        <div className="space-y-3">
          {discussions.map((disc) => (
            <div key={disc.id} className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-semibold text-xs">
                  {disc.user.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{disc.user}</p>
                  <p className="text-xs text-muted-foreground">{disc.timestamp}</p>
                </div>
              </div>
              <p className="text-foreground/80 text-sm ml-11">{disc.message}</p>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              type="text"
              className="input flex-1"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="btn btn-primary flex gap-2 items-center" onClick={handleSendMessage}>
              <Send size={18} />
              <span className="text-xl -translate-y-1">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Message Input */}
      <div className="fixed bottom-0 w-full bg-card border-t border-border p-3 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 mb-2 flex-wrap">
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <PlusCircle size={18} />
              <span>Add</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <Type size={18} />
              <span>Text</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <Paperclip size={18} />
              <span>File</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <Camera size={18} />
              <span>Camera</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <Image size={18} />
              <span>Gallery</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors">
              <Video size={18} />
              <span>Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAssessmentDetails;
