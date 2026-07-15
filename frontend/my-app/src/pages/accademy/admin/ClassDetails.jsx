import { API } from "@/api/Axios";
import AssessmentForm from "@/components/pages/AssessmentForm";
import QuizForm from "@/components/pages/QuizForm";
import UploadForm from "@/pages/TeacherDashboard/Resources1";
import { BookOpen, Plus, X, Users, UserPlus, Trash2, Edit2, Check, ChevronRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ClassDetails = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [classRoom, setClassRoom] = useState({});
  const [loadingClass, setLoadingClass] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [addingStudent, setAddingStudent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [groups, setGroups] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectionMode, setSelectionMode] = useState(false);
  const [editGroupMode, setEditGroupMode] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [assessmentMdal, setAssessmentModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectionModeType, setSelectionModeType] = useState("");
  const [activeGroupId, setActiveGroupId] = useState(null);

  // Fetch class
  useEffect(() => {
    const getClass = async () => {
      try {
        setLoadingClass(true);
        const res = await API.get(`/api/classes/${id}`);
        setClassRoom(res.data.classRoom);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingClass(false);
      }
    };
    getClass();
  }, [id]);

  // Fetch students
  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoadingStudents(true);
        const res = await API.get(`/api/students/${id}`);
        setStudents(res.data.students);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStudents(false);
      }
    };
    getStudents();
  }, [id]);

  // Fetch groups
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await API.get(`/api/classes/${id}/groups`);
        setGroups(res.data.groups || []);
      } catch (error) {
        console.log(error);
        setGroups([]);
      }
    };
    getGroups();
  }, [id]);

  // Fetch Quizzes
  useEffect(() => {
    try {
      const getQuizzes = async () => {
        const res = await API.get(`/api/classes/${id}/quizzes`);
        setQuizzes(res.data.quizzes || []);
      };
      getQuizzes();
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching quizzes");
    }
  }, [id]);

  // Fetch assessments
  useEffect(() => {
    try {
      const getQuizzes = async () => {
        const res = await API.get(`/api/classes/${id}/assessments`);
        setAssessments(res.data.assessments || []);
      };
      getQuizzes();
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching assessments");
    }
  }, [id]);

  // Calculate stats
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active" || s.status === "Active").length;
  const totalGroups = groups.length;
  const avgAttendance = students.length > 0 ? Math.round(students.reduce((acc, s) => acc + (s.attendance || 0), 0) / students.length) : 0;

  // Add Student to class
  const addStudent = async () => {
    try {
      setAddingStudent(true);
      const res = await API.post(`/api/students`, {
        classId: id,
        department: classRoom.department,
      });
      alert(res.data.message);
      const studentsRes = await API.get(`/api/students/${id}`);
      setStudents(studentsRes.data.students);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error adding student");
    } finally {
      setAddingStudent(false);
    }
  };

  // GROUP CONTROLLER
  const toggleSelection = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const cancelSelection = () => {
    setSelectionMode(false);
    setSelectedStudents([]);
    setGroupName("");
    setEditGroupMode(false);
    setActiveGroupId(null);
  };

  const startEditingGroup = () => {
    setEditGroupMode(true);
  };

  const removeStudent = async (studentId, groupId) => {
    try {
      await API.delete(`/api/classes/${id}/groups/${groupId}/remove-student`, {
        data: {
          groupId,
          studentId,
        },
      });
      const groupsRes = await API.get(`/api/classes/${id}/groups`);
      setGroups(groupsRes.data.groups || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error removing student");
    }
  };

  const addStudentToGroup = async () => {
    try {
      await API.post(`/api/classes/${id}/groups/${activeGroupId}/add-student`, {
        studentsIds: selectedStudents,
      });

      setSelectionMode(false);
      setSelectedStudents([]);
      setActiveGroupId(null);

      const groupsRes = await API.get(`/api/classes/${id}/groups`);
      setGroups(groupsRes.data.groups || []);

      const studentsRes = await API.get(`/api/students/${id}`);
      setStudents(studentsRes.data.students);

      alert("Students added to group successfully!");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error adding students to group");
    }
  };

  const createGroupOnServer = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    try {
      await API.post(`/api/classes/${id}/groups`, {
        groupName: groupName,
        students: selectedStudents,
        classId: classRoom._id,
      });

      setSelectionMode(false);
      setSelectedStudents([]);
      setGroupName("");

      const groupsRes = await API.get(`/api/classes/${id}/groups`);
      setGroups(groupsRes.data.groups || []);

      const studentsRes = await API.get(`/api/students/${id}`);
      setStudents(studentsRes.data.students);

      alert("Group created successfully!");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error creating group");
    }
  };

  const deleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await API.delete(`/api/classes/${id}/groups/${groupId}/delete`, {
        data: {
          groupId,
        },
      });
      const groupsRes = await API.get(`/api/classes/${id}/groups`);
      setGroups(groupsRes.data.groups || []);
      setEditGroupMode(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error deleting group");
    }
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.accountId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.accountId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "assigned") return matchesSearch && student.group !== null;
    if (filterStatus === "unassigned") return matchesSearch && student.group === null;
    return matchesSearch;
  });

  // ASSESSMENTS
  const deleteAss = async (assId) => {
    await API.delete(`/api/classes/${id}/assessments/${assId}`);
  };

  if (loadingClass) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-foreground/60">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (selectionMode) {
    const unassignedStudents = students.filter((stu) => stu.group === null);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectionModeType === "create-group" ? "Create A Group" : "Add Students to Group"}
            </h2>
            <button onClick={cancelSelection} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>

          {selectionModeType === "create-group" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground/70 mb-2">Group Name</label>
              <input
                type="text"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="input py-2 px-3"
              />
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold text-foreground/80 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Select Students to Add
            </h3>
            <p className="text-sm text-foreground/60 mt-1">{unassignedStudents.length} unassigned students available</p>
          </div>

          {unassignedStudents.length === 0 ? (
            <div className="text-center py-8 text-foreground/60">
              <Users className="w-12 h-12 mx-auto text-foreground/20 mb-2" />
              <p>No unassigned students available</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {unassignedStudents.map((stu) => (
                <div
                  key={stu._id}
                  onClick={() => toggleSelection(stu._id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedStudents.includes(stu._id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{stu.accountId.name}</h3>
                      <p className="text-sm text-foreground/60">{stu.accountId.email}</p>
                    </div>
                    {selectedStudents.includes(stu._id) && (
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border">
            <button
              onClick={selectionModeType === "create-group" ? createGroupOnServer : addStudentToGroup}
              disabled={selectedStudents.length === 0 || (selectionModeType === "create-group" && !groupName.trim())}
              className={`btn btn-primary ${
                selectedStudents.length === 0 || (selectionModeType === "create-group" && !groupName.trim()) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {selectionModeType === "create-group" ? "Create Group" : "Add to Group"}
            </button>
            <button onClick={cancelSelection} className="btn btn-outline">
              Cancel
            </button>
            {selectedStudents.length > 0 && (
              <span className="ml-auto text-sm text-foreground/60">
                {selectedStudents.length} student{selectedStudents.length > 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (quizModal) {
    return <QuizForm classId={classRoom._id} />;
  }

  if (assessmentMdal) {
    return <AssessmentForm classId={classRoom._id} groupId={activeGroupId} />;
  }

  if (uploadModal) {
    return <UploadForm classId={classRoom._id} groupId={activeGroupId} />;
  }

  return (
    <div className="">
      {/* Class Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Class Details</h1>
        <div className="flex flex-col flex-wrap gap-4 text-sm text-foreground/70">
          <span>
            <strong>Department:</strong> {classRoom?.department || "Not specified"}
          </span>
          <span>
            <strong>Section:</strong> {classRoom?.section || "Not specified"}
          </span>
          <span>
            <strong>Total Students:</strong> {students.length}
          </span>
        </div>

        <button onClick={() => setUploadModal(true)} className="btn btn-primary">
          Upload
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card hover:shadow-lg transition-shadow">
          <div className="stat-label text-xs font-medium uppercase tracking-wider text-foreground/60 mb-1">Total Students</div>
          <div className="stat-value text-2xl font-bold text-foreground">{totalStudents}</div>
        </div>
        <div className="card hover:shadow transition-shadow">
          <div className="stat-label text-xs font-medium uppercase tracking-wider text-foreground/60 mb-1">Active</div>
          <div className="stat-value text-2xl font-bold text-success">{activeStudents}</div>
        </div>
        <div className="card hover:shadow transition-shadow">
          <div className="stat-label text-xs font-medium uppercase tracking-wider text-foreground/60 mb-1">Groups</div>
          <div className="stat-value text-2xl font-bold text-primary">{totalGroups}</div>
        </div>
        <div className="card hover:shadow transition-shadow">
          <div className="stat-label text-xs font-medium uppercase tracking-wider text-foreground/60 mb-1">Avg. Attendance</div>
          <div className="stat-value text-2xl font-bold text-foreground">
            {avgAttendance}
            <span className="text-sm font-normal text-foreground/60 ml-1">%</span>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="mb-8 card">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            All Students
          </h2>
          <button onClick={addStudent} disabled={addingStudent} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-1" />
            {addingStudent ? "Adding..." : "Add Student"}
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-9 py-1 md:py-2"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input max-w-45 py-1.5 md:py-2">
            <option value="all">All Students</option>
            <option value="assigned">Assigned to Group</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        {/* Students Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto small-scrollbar">
            <table className="w-full">
              <thead className="bg-muted border-border">
                <tr>
                  {/* <th>ID</th> */}
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Student</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Email</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Status</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Grade</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Attendance</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Joined</th>
                  <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingStudents ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-foreground/60">
                      Loading students...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-foreground/60">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      {/* <td>{student._id}</td> */}
                      <td className="p-3 font-medium text-foreground">{student.accountId?.name || "Unknown"}</td>
                      <td className="p-3 text-foreground/70">{student.accountId?.email || "No email"}</td>
                      <td className="p-3">
                        <span className={`badge ${student.group !== null ? "badge-success" : "badge-warning"}`}>
                          {student.group !== null ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 text-foreground">{student.grade || "—"}</td>
                      <td className="p-3 text-foreground">{student.attendance || 0}%</td>
                      <td className="p-3 text-foreground/70">{student.createdAt?.split("T")[0] || "—"}</td>
                      <td className="p-3">
                        <button className="text-foreground/40 hover:text-foreground transition-colors">⋯</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Groups Section */}
      <div className="card">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-secondary" />
            Groups
          </h2>
          <div className="flex gap-2">
            {editGroupMode && (
              <button onClick={() => setEditGroupMode(false)} className="btn btn-outline">
                Done Editing
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setSelectionMode(true);
                setSelectionModeType("create-group");
              }}
              className="btn bg-muted border border-border-muted hover:bg-muted-hover mr-3"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Group
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.length === 0 ? (
            <div className="col-span-full card text-center py-12 text-foreground/60">
              <BookOpen className="w-16 h-16 mx-auto text-foreground/20 mb-4" />
              <p>No groups created yet</p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group._id || group.name} className="card hover:shadow transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      {group.name}
                      <span className="badge badge-info text-xs">{group.students?.length || 0} members</span>
                    </h3>
                  </div>
                  <div className="flex gap-1">
                    {editGroupMode && (
                      <>
                        <button
                          onClick={() => deleteGroup(group._id)}
                          className="p-1.5 text-error hover:bg-error/10 rounded transition-colors"
                          title="Delete group"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectionMode(true);
                            setSelectionModeType("add-student");
                            setActiveGroupId(group._id);
                          }}
                          className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors"
                          title="Add student"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {!editGroupMode && (
                      <button
                        onClick={startEditingGroup}
                        className="p-1.5 text-foreground/40 hover:text-foreground rounded transition-colors"
                        title="Edit group"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {group.students?.map((stu) => (
                    <div key={stu._id} className="flex items-center justify-between bg-muted p-2 rounded">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-foreground/30" />
                        <span className="text-sm text-foreground/80">{stu.accountId.name}</span>
                      </div>
                      {editGroupMode && (
                        <button
                          onClick={() => removeStudent(stu._id, group._id)}
                          className="p-1 text-error hover:bg-error/10 rounded transition-colors"
                          title="Remove student"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quizzes */}
      <div className="card mt-8">
        <header className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold mb-4">Quizzes</h2>
          <button className="btn btn-primary" onClick={() => setQuizModal(true)}>
            Create Quiz
          </button>
        </header>

        {quizzes.length === 0 ? (
          <div className="card">
            <div className="flex flex-col gap- items-center justify-center p-5 text-gray-500">
              <BookOpen size={40} className="" />
              <h2 className="text-lg font-semibold italic">No quizzes yet !</h2>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-muted p-4 rounded">
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                <p className="text-sm text-foreground/80">{quiz.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assessments section */}
      <div className="card mt-8">
        <header className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold mb-4">ASSESSMENTS</h2>
          <button className="btn btn-primary" onClick={() => setAssessmentModal(true)}>
            Add Assignment
          </button>
        </header>

        {/* Tabs */}
        <div>
          <button>All</button>
          <button>Individual</button>
          <button>Group</button>
        </div>
        {assessments.length === 0 ? (
          <div className="card">
            <div className="flex flex-col gap- items-center justify-center p-5 text-gray-500">
              <BookOpen size={40} className="" />
              <h2 className="text-lg font-semibold italic">No quizzes yet !</h2>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((ass) => (
              <Link to={`/teacher/assessments/${ass._id}`} key={ass._id} className="bg-muted p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{ass.title}</h3>
                  <p className="text-sm text-foreground/80">{ass.description}</p>
                </div>
                <div>
                  <X onClick={() => deleteAss(ass._id)} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;

{
  /* <div>
  <div className="w-full h-30 grid grid-cols-5 gap-3 py-5">
    <p className="bg-[#2563EB] text-white flex items-center justify-center ">Primary</p>

    <p className="bg-[#1D4ED8] text-white flex items-center justify-center ">Hover</p>

    <p className="bg-[#1E40AF] text-white flex items-center justify-center ">Prressed</p>

    <p className="bg-[#DBEAFE] flex items-center justify-center ">Light tint</p>

    <p className="bg-[#10B981] text-white flex items-center justify-center ">Accent</p>

    <p className="bg-[#F59E0B] text-white flex items-center justify-center ">Warning</p>

    <p className="bg-[#EF4444] text-white flex items-center justify-center ">Error</p>

    <p className="bg-[#0EA5E9] text-white flex items-center justify-center ">Information</p>
  </div>

 
  <h2 className="font-bold italic text-2xl mt-5">Light Mode</h2>
  <div className="w-full h-30 grid grid-cols-5 gap-3 py-5">
    <p className="bg-[#F8FAFC]  flex items-center justify-center ">Background</p>

    <p className="bg-[#FFFFFF]  flex items-center justify-center ">Surface</p>

    <p className="bg-[#F1F5F9]  flex items-center justify-center ">Secondary surface</p>

    <p className="bg-[#E2E8F0]  flex items-center justify-center ">Border</p>

    <p className="text-[#0F172A]  flex items-center justify-center text-">secondary Text</p>

    <p className="text-[#94A3B8]  flex items-center justify-center ">Secondary text</p>

    <p className="bg-[#dfe5ee]  flex items-center justify-center ">Muted</p>
  </div>

 
  <h2 className="font-bold italic text-2xl mt-5">Dark Mode</h2>
  <div className="w-full h-30 grid grid-cols-5 gap-3 py-5 bg-[#0F172A] p-2 mb-5 mr-10">
    <p className="bg-[#111827] text-white  flex items-center justify-center  border border-[#94A3B8]">Surface</p>

    <p className="bg-[#1E293B]  text-white  flex items-center justify-center ">Card</p>

    <p className="bg-[#334155] text-white  flex items-center justify-center ">Muted</p>

    <p className="text-[#F8FAFC]  flex items-center justify-center ">Primary Text</p>

    <p className="text-[#F8FAFC]  flex items-center justify-center ">Secondary Text</p>

    <p className="bg-[#94A3B8] text-  flex items-center justify-center ">Border</p>
  </div>
</div>; 
*/
}
