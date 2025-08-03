import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Home,
  BookOpen,
  DollarSign,
  User,
  Bot,
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,CalendarDays,
  Search,
  Menu,
  X,
  Upload,
  Download,
  Paperclip,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronsUpDown,
  AlertTriangle,
  Info,
  ToggleLeft,
  ToggleRight,GraduationCap,
} from "lucide-react";

// Mock Data
const studentData = {
  name: "Alex Thompson",
  department: "Computer Science & Engineering",
  profilePic: "https://placehold.co/100x100/E2E8F0/4A5568?text=AT",
  stats: {
    attendance: 82,
    latestResult: "8.5 GPA",
    feeDue: "None",
    upcomingEvents: 3,
    placementUpdates: 2,
  },
};

const teachers = [
  "Dr. Evelyn Reed",
  "Prof. Ben Carter",
  "Dr. Chloe Green",
  "Prof. David Shaw",
];

const mockChatData = {
  "Dr. Evelyn Reed": [
    {
      from: "student",
      text: "Hello Ma'am, I had a doubt in today's class.",
      time: "10:00 AM",
    },
    { from: "teacher", text: "Sure, go ahead!", time: "10:10 AM" },
  ],
  "Prof. Ben Carter": [],
};

const notifications = [
  {
    id: 1,
    type: "assignment",
    text: "New assignment posted for CS-301.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "fee",
    text: "Semester fee payment is due next week.",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "interview",
    text: "TechCorp interview scheduled for Friday.",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "announcement",
    text: "College will be closed for a national holiday.",
    time: "3 days ago",
  },
];

const dayWiseTimetable = {
  Monday: [
    { time: "9-10 AM", subject: "Data Structures", teacher: "Dr. Evelyn Reed" },
    { time: "10-11 AM", subject: "Algorithms", teacher: "Prof. Ben Carter" },
  ],
  Tuesday: [
    {
      time: "11-12 PM",
      subject: "Database Systems",
      teacher: "Dr. Chloe Green",
    },
    {
      time: "2-3 PM",
      subject: "Operating Systems",
      teacher: "Prof. David Shaw",
    },
  ],
  Wednesday: [
    { time: "9-10 AM", subject: "Data Structures", teacher: "Dr. Evelyn Reed" },
    { time: "10-11 AM", subject: "Algorithms", teacher: "Prof. Ben Carter" },
  ],
  Thursday: [
    {
      time: "11-12 PM",
      subject: "Database Systems",
      teacher: "Dr. Chloe Green",
    },
    {
      time: "2-3 PM",
      subject: "Operating Systems",
      teacher: "Prof. David Shaw",
    },
  ],
  Friday: [
    { time: "1-2 PM", subject: "Project Lab", teacher: "Dr. Evelyn Reed" },
  ],
  Saturday: [],
  Sunday: [],
};

const assignments = [
  {
    id: 1,
    subject: "Data Structures",
    title: "Binary Tree Implementation",
    dueDate: "2024-08-15",
    status: "Submitted",
    feedback:
      "Good work. A bit more optimization possible in the search function.",
  },
  {
    id: 2,
    subject: "Database Systems",
    title: "Normalization Assignment",
    dueDate: "2024-08-20",
    status: "Pending",
    feedback: null,
  },
  {
    id: 3,
    subject: "Operating Systems",
    title: "Process Scheduling Simulation",
    dueDate: "2024-08-10",
    status: "Graded",
    feedback: "Excellent implementation of the FCFS algorithm.",
  },
];

const grades = [
  {
    subject: "Data Structures",
    internal: 25,
    external: 65,
    total: 90,
    grade: "A+",
    credits: 4,
  },
  {
    subject: "Algorithms",
    internal: 22,
    external: 60,
    total: 82,
    grade: "A",
    credits: 4,
  },
  {
    subject: "Database Systems",
    internal: 28,
    external: 70,
    total: 98,
    grade: "O",
    credits: 3,
  },
  {
    subject: "Operating Systems",
    internal: 20,
    external: 55,
    total: 75,
    grade: "B+",
    credits: 3,
  },
];

const attendanceData = [
  { name: "Jan", Attendance: 90 },
  { name: "Feb", Attendance: 85 },
  { name: "Mar", Attendance: 74 },
  { name: "Apr", Attendance: 92 },
  { name: "May", Attendance: 88 },
  { name: "Jun", Attendance: 72 },
];

const subjectAttendance = [
  { subject: "Data Structures", percentage: 95 },
  { subject: "Algorithms", percentage: 85 },
  { subject: "Database Systems", percentage: 72 },
  { subject: "Operating Systems", percentage: 91 },
];

const financeDetails = {
  total: 120000,
  paid: 75000,
  due: 45000,
  installments: [
    {
      name: "Installment 1",
      amount: 50000,
      status: "Paid",
      dueDate: "2024-07-01",
    },
    {
      name: "Installment 2",
      amount: 50000,
      status: "Paid",
      dueDate: "2024-01-15",
    },
    {
      name: "Installment 3",
      amount: 25000,
      status: "Due",
      dueDate: "2024-08-30",
    },
  ],
  history: [
    {
      id: 1,
      date: "2024-07-01",
      amount: 50000,
      type: "Installment 1",
      receipt: "#",
    },
    {
      id: 2,
      date: "2024-01-15",
      amount: 25000,
      type: "Partial - Inst. 2",
      receipt: "#",
    },
  ],
};

const jobListings = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Innovate Inc.",
    location: "Remote",
  },
  {
    id: 2,
    role: "Backend Engineer",
    company: "Data Solutions",
    location: "New York",
  },
  {
    id: 3,
    role: "UI/UX Designer",
    company: "Creative Minds",
    location: "San Francisco",
  },
];

const calendarEvents = [
  { id: 1, title: "Mid-Term Exams", date: "2024-09-05", type: "academic" },
  {
    id: 2,
    title: 'Tech Fest "Innovate"',
    date: "2024-09-20",
    type: "cultural",
  },
  {
    id: 3,
    title: "Placement Drive: TechCorp",
    date: "2024-08-25",
    type: "placement",
  },
];

// Helper Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({ icon, title, value, color }) => (
  <Card className="flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </Card>
);

const StatusChip = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  const statusClasses = {
    Submitted: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Graded: "bg-green-100 text-green-800",
    Due: "bg-red-100 text-red-800",
    Paid: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`${baseClasses} ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// Main Module Components
const DashboardOverview = () => (
  <div className="space-y-8">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={studentData.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white"
        />
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {studentData.name.split(" ")[0]}!
          </h1>
          <p className="text-blue-100">{studentData.department}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        icon={<BarChart size={24} className="text-green-600" />}
        title="Attendance"
        value={`${studentData.stats.attendance}%`}
        color="bg-green-100"
      />
      <StatCard
        icon={<FileText size={24} className="text-blue-600" />}
        title="Latest Results"
        value={studentData.stats.latestResult}
        color="bg-blue-100"
      />
      <StatCard
        icon={<DollarSign size={24} className="text-red-600" />}
        title="Fee Due"
        value={
          financeDetails.due > 0
            ? `₹${financeDetails.due.toLocaleString()}`
            : "None"
        }
        color={financeDetails.due > 0 ? "bg-red-100" : "bg-green-100"}
      />
      <StatCard
        icon={<Calendar size={24} className="text-yellow-600" />}
        title="Upcoming Events"
        value={studentData.stats.upcomingEvents}
        color="bg-yellow-100"
      />
      <StatCard
        icon={<Briefcase size={24} className="text-purple-600" />}
        title="Placement Updates"
        value={studentData.stats.placementUpdates}
        color="bg-purple-100"
      />
    </div>

    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-blue-100 rounded-full">
              <Bell size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700">{n.text}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const Academics = () => {
  const [activeTab, setActiveTab] = useState("Timetable");
  const tabs = ["Timetable", "Assignments", "Marks & Grades", "Attendance"];

  const renderContent = () => {
    switch (activeTab) {
      case "Timetable":
        return <TimetableViewer />;
      case "Assignments":
        return <AssignmentManager />;
      case "Marks & Grades":
        return <MarksAndGrades />;
      case "Attendance":
        return <AttendanceTracker />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-1">{renderContent()}</div>
    </div>
  );
};

const TimetableViewer = () => {
  const [view, setView] = useState("Day");
  const [currentDay, setCurrentDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Timetable</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView("Day")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "Day" ? "bg-white shadow" : ""
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView("Week")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "Week" ? "bg-white shadow" : ""
            }`}
          >
            Week
          </button>
        </div>
      </div>
      {view === "Day" && (
        <div>
          <select
            value={currentDay}
            onChange={(e) => setCurrentDay(e.target.value)}
            className="mb-4 p-2 border rounded-md w-full md:w-auto"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <div className="space-y-3">
            {dayWiseTimetable[currentDay]?.length > 0 ? (
              dayWiseTimetable[currentDay].map((slot, i) => (
                <div
                  key={i}
                  className="p-4 bg-blue-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-blue-800">{slot.subject}</p>
                    <p className="text-sm text-blue-600">{slot.teacher}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {slot.time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 p-4">No classes today!</p>
            )}
          </div>
        </div>
      )}
      {view === "Week" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">Day</th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Schedule
                </th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b">
                  <td className="p-3 font-medium text-gray-800">{day}</td>
                  <td className="p-3">
                    {dayWiseTimetable[day]?.length > 0 ? (
                      dayWiseTimetable[day]
                        .map((s) => `${s.time}: ${s.subject}`)
                        .join(", ")
                    ) : (
                      <span className="text-gray-400">No classes</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

const AssignmentManager = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-800 mb-4">Assignments</h2>
    <div className="space-y-4">
      {assignments.map((a) => (
        <div key={a.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">{a.title}</h3>
              <p className="text-sm text-gray-500">
                {a.subject} | Due: {a.dueDate}
              </p>
            </div>
            <StatusChip status={a.status} />
          </div>
          {a.feedback && (
            <p className="text-sm mt-2 p-2 bg-gray-100 rounded-md">
              <strong>Feedback:</strong> {a.feedback}
            </p>
          )}
          <div className="flex space-x-4 mt-3">
            <button className="flex items-center space-x-2 text-sm text-blue-600 hover:underline">
              <Upload size={16} /> <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-blue-600 hover:underline">
              <Download size={16} /> <span>Download</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const MarksAndGrades = () => {
  const [activeTab, setActiveTab] = useState("Results");
  const tabs = ["Results", "GPA Calculator"];

  const gradeToPoint = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    P: 4,
    F: 0,
  };

  const totalCredits = grades.reduce((acc, g) => acc + g.credits, 0);
  const totalPoints = grades.reduce(
    (acc, g) => acc + gradeToPoint[g.grade] * g.credits,
    0
  );
  const gpa = (totalPoints / totalCredits).toFixed(2);

  const GpaCalculator = () => {
    const [subjects, setSubjects] = useState([{ credits: "", grade: "" }]);
    const [calculatedGpa, setCalculatedGpa] = useState(null);

    const handleSubjectChange = (index, field, value) => {
      const newSubjects = [...subjects];
      newSubjects[index][field] = value;
      setSubjects(newSubjects);
    };

    const addSubject = () =>
      setSubjects([...subjects, { credits: "", grade: "" }]);

    const calculate = () => {
      let totalCredits = 0;
      let totalPoints = 0;
      subjects.forEach((s) => {
        const credits = parseFloat(s.credits);
        const point = gradeToPoint[s.grade];
        if (!isNaN(credits) && point !== undefined) {
          totalCredits += credits;
          totalPoints += credits * point;
        }
      });
      setCalculatedGpa(
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
      );
    };

    return (
      <div className="space-y-4">
        {subjects.map((s, i) => (
          <div key={i} className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Credits"
              value={s.credits}
              onChange={(e) =>
                handleSubjectChange(i, "credits", e.target.value)
              }
              className="p-2 border rounded-md w-1/3"
            />
            <select
              value={s.grade}
              onChange={(e) => handleSubjectChange(i, "grade", e.target.value)}
              className="p-2 border rounded-md w-2/3"
            >
              <option value="">Select Grade</option>
              {Object.keys(gradeToPoint).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={addSubject}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add another subject
        </button>
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={calculate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Calculate GPA
          </button>
          {calculatedGpa !== null && (
            <p className="text-xl font-bold">
              Estimated GPA:{" "}
              <span className="text-blue-600">{calculatedGpa}</span>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Marks & Grades</h2>
        {activeTab === "Results" && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Overall CGPA</p>
            <p className="text-2xl font-bold text-blue-600">{gpa}</p>
          </div>
        )}
      </div>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Results" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Subject
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Credits
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Grade
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Total Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium text-gray-800">{g.subject}</td>
                  <td className="p-3 text-gray-600">{g.credits}</td>
                  <td className="p-3 font-bold text-blue-600">{g.grade}</td>
                  <td className="p-3 font-bold text-gray-800">{g.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <GpaCalculator />
      )}
    </Card>
  );
};

const AttendanceTracker = () => {
  const overallAttendance = studentData.stats.attendance;
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Attendance Tracker
      </h2>
      {overallAttendance < 75 && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg mb-4 flex items-center space-x-3">
          <AlertTriangle size={20} />
          <p>
            <strong>Overall Alert:</strong> Your attendance is below 75%. Please
            ensure you meet the minimum requirement.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">Monthly Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Attendance" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">
            Subject-wise Attendance
          </h3>
          <div className="space-y-3">
            {subjectAttendance.map((sub) => (
              <div key={sub.subject} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">{sub.subject}</p>
                  <p
                    className={`font-bold ${
                      sub.percentage < 75 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {sub.percentage}%
                  </p>
                </div>
                {sub.percentage < 75 && (
                  <div className="flex items-start space-x-2 mt-2 text-xs text-red-700 bg-red-50 p-2 rounded-md">
                    <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>
                      Warning: Low attendance. Please consult your subject
                      teacher or attend remedial classes.
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const Finance = () => {
  const [reminders, setReminders] = useState(true);
  const paidPercentage = (financeDetails.paid / financeDetails.total) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <p className="text-sm text-gray-500">Total Fees</p>
          <p className="text-3xl font-bold text-gray-800">
            ₹{financeDetails.total.toLocaleString()}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-3xl font-bold text-green-600">
            ₹{financeDetails.paid.toLocaleString()}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">Amount Due</p>
          <p className="text-3xl font-bold text-red-600">
            ₹{financeDetails.due.toLocaleString()}
          </p>
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Installment Plan
        </h2>
        <div className="space-y-2 mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${paidPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-right">
            {paidPercentage.toFixed(0)}% Paid
          </p>
        </div>
        <div className="space-y-3">
          {financeDetails.installments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.name}{" "}
                  <span className="text-xs text-gray-500">
                    (Due: {item.dueDate})
                  </span>
                </p>
                <p className="font-bold text-lg text-gray-800">
                  ₹{item.amount.toLocaleString()}
                </p>
              </div>
              <StatusChip status={item.status} />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Bell className="text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">Fee Reminders</p>
              <p className="text-xs text-gray-500">
                Enable in-app and email notifications for upcoming fee
                deadlines.
              </p>
            </div>
          </div>
          <button onClick={() => setReminders(!reminders)}>
            {reminders ? (
              <ToggleRight size={36} className="text-blue-600" />
            ) : (
              <ToggleLeft size={36} className="text-gray-400" />
            )}
          </button>
        </div>
      </Card>
    </div>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: studentData.name,
    email: "alex.t@university.edu",
    phone: "+91 12345 67890",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving data:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: studentData.name,
      email: "alex.t@university.edu",
      phone: "+91 12345 67890",
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Profile & Documents</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-700">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                name="name"
                type="text"
                value={profileData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-2 border rounded-md mt-1 transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Department</label>
              <input
                type="text"
                value={studentData.department}
                className="w-full p-2 border rounded-md mt-1 bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-2 border rounded-md mt-1 transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-2 border rounded-md mt-1 transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
          </div>
          {isEditing && (
            <div className="flex space-x-4 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">My Documents</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg flex items-center justify-between">
              <span className="text-sm">Student ID Card</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Download size={18} />
              </button>
            </div>
            <div className="p-3 border rounded-lg flex items-center justify-between">
              <span className="text-sm">Admit Card</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Download size={18} />
              </button>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500">Upload Documents</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drag & drop or click to upload
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AITools = () => {
  const [activeTool, setActiveTool] = useState("CV");

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTool("CV")}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTool === "CV" ? "bg-white shadow" : "text-gray-600"
          }`}
        >
          CV Analyzer
        </button>
        <button
          onClick={() => setActiveTool("Study")}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTool === "Study" ? "bg-white shadow" : "text-gray-600"
          }`}
        >
          Study Bot
        </button>
        <button
          onClick={() => setActiveTool("Prep")}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTool === "Prep" ? "bg-white shadow" : "text-gray-600"
          }`}
        >
          Placement Prep
        </button>
      </div>
      {activeTool === "CV" && <CVAnalyzer />}
      {activeTool === "Study" && <StudyBot />}
      {activeTool === "Prep" && <PlacementPrepBot />}
    </div>
  );
};

const CVAnalyzer = () => {
  const score = 88; // Mock score
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        CV Analyzer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl">
          <Upload size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            Upload your resume to get instant feedback.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload CV
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-600"
                strokeWidth="3"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-purple-700">
              {score}%
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Your CV Score
          </p>
          <div className="mt-4 w-full space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Keywords:</span>{" "}
              <span className="font-semibold text-green-600">Excellent</span>
            </p>
            <p className="flex justify-between">
              <span>Formatting:</span>{" "}
              <span className="font-semibold text-yellow-600">Good</span>
            </p>
            <p className="flex justify-between">
              <span>Impact:</span>{" "}
              <span className="font-semibold text-green-600">Excellent</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const StudyBot = () => (
  <Card className="h-[60vh] flex flex-col">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Study Bot</h2>
    <div className="flex-grow bg-gray-50 rounded-lg p-4 space-y-4 overflow-y-auto">
      <div className="flex justify-start">
        <div className="bg-white p-3 rounded-lg max-w-xs shadow-sm">
          Hello! How can I help you with your studies today?
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs shadow-sm">
          Explain the concept of normalization in databases.
        </div>
      </div>
    </div>
    <div className="mt-4 flex space-x-2">
      <input
        type="text"
        placeholder="Ask a question..."
        className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-shrink-0">
        <Send size={20} />
      </button>
    </div>
  </Card>
);

const PlacementPrepBot = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
      Placement Prep Bot
    </h2>
    <div className="p-6 border rounded-xl bg-gray-50">
      <p className="text-gray-500 text-center mb-2">Aptitude Question</p>
      <p className="text-lg text-gray-800 text-center">
        If a train 110 meters long passes a telegraph pole in 3 seconds, then
        the time taken by it to cross a railway platform 165 meters long is:
      </p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="p-3 border rounded-lg hover:bg-gray-100">
          7.5 seconds
        </button>
        <button className="p-3 border rounded-lg hover:bg-gray-100">
          10 seconds
        </button>
        <button className="p-3 border rounded-lg hover:bg-gray-100">
          12.5 seconds
        </button>
        <button className="p-3 border rounded-lg hover:bg-gray-100">
          15 seconds
        </button>
      </div>
    </div>
    <div className="flex justify-center space-x-4 mt-4">
      <span className="flex items-center space-x-1 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
        <ThumbsUp size={14} /> Correct!
      </span>
      <span className="flex items-center space-x-1 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
        <ThumbsDown size={14} /> Try Again
      </span>
    </div>
  </Card>
);

const PlacementPortal = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Job Listings</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Role, Company"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            className="p-2 border rounded-md"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Filter
          </button>
        </div>
        <div className="space-y-4">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-gray-800">{job.role}</h3>
                <p className="text-sm text-gray-500">
                  {job.company} - {job.location}
                </p>
              </div>
              <button className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
                Apply
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Application Tracker
        </h2>
        <div className="space-y-3 text-sm">
          <p className="flex justify-between">
            <span>Innovate Inc.</span>
            <StatusChip status="Submitted" />
          </p>
          <p className="flex justify-between">
            <span>Data Solutions</span>
            <StatusChip status="Pending" />
          </p>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Quiz Leaderboard
        </h2>
        <div className="space-y-3 text-sm">
          <p className="flex justify-between items-center">
            <span>1. Sarah Jenkins</span>{" "}
            <span className="font-bold">1500 pts</span>
          </p>
          <p className="flex justify-between items-center bg-blue-50 p-2 rounded-md">
            <span>2. Alex Thompson</span>{" "}
            <span className="font-bold">1450 pts</span>
          </p>
          <p className="flex justify-between items-center">
            <span>3. Mike Ross</span>{" "}
            <span className="font-bold">1420 pts</span>
          </p>
        </div>
      </Card>
    </div>
  </div>
);

const CalendarAndEvents = () => {
  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Calendar & Events</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors group">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sync with Google Calendar</span>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Sync exams and deadlines
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calendarEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg"
          >
            <h3 className="font-bold text-purple-800">{event.title}</h3>
            <p className="text-sm text-purple-600">{event.date}</p>
            <p className="text-xs text-gray-500 mt-2">15 days left</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Communication = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-800 mb-4">Communication Hub</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 border-r pr-4">
        <h3 className="font-semibold text-gray-700 mb-2">Messages</h3>
        <div className="space-y-2">
          <div className="p-2 bg-blue-100 rounded-lg cursor-pointer">
            <p className="font-medium text-blue-800">Dr. Evelyn Reed</p>
            <p className="text-xs text-blue-600 truncate">
              Okay, I'll check your submission...
            </p>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <p className="font-medium text-gray-700">Placement Cell</p>
            <p className="text-xs text-gray-500 truncate">
              Reminder: Resume submission deadline...
            </p>
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <h3 className="font-semibold text-gray-700 mb-2">Announcements</h3>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="font-medium text-yellow-800">Admin Office</p>
            <p className="text-sm text-yellow-700">
              Fee portal will be down for maintenance on Sunday.
            </p>
          </div>
          <div className="p-3 bg-green-50 border-l-4 border-green-400">
            <p className="font-medium text-green-800">CSE Department</p>
            <p className="text-sm text-green-700">
              Guest lecture on "AI in Modern Computing" this Friday.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const Reports = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-800 mb-6">
      Reports & Certificates
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Download Documents</h3>
        <div className="space-y-3">
          <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
            <FileText className="text-blue-600" />
            <span>Semester Marksheets</span>
          </button>
          <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
            <FileText className="text-green-600" />
            <span>Bonafide Certificate</span>
          </button>
          <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
            <FileText className="text-purple-600" />
            <span>Attendance Certificate</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Request Documents</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="doc-type" className="text-sm text-gray-600">
              Document Type
            </label>
            <select id="doc-type" className="w-full p-2 mt-1 border rounded-md">
              <option>Transfer Certificate (TC)</option>
              <option>Migration Certificate</option>
              <option>Course Completion Certificate</option>
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="text-sm text-gray-600">
              Reason for Request
            </label>
            <textarea
              id="reason"
              rows="3"
              className="w-full p-2 mt-1 border rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  </Card>
);

//student and teacher messaging

const StudentMessaging = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [messages, setMessages] = useState(mockChatData[selectedTeacher] || []);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessages(mockChatData[selectedTeacher] || []);
  }, [selectedTeacher]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      from: "student",
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    mockChatData[selectedTeacher] = updated;
    setNewMessage("");
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Message a Teacher
      </h2>
      <div className="mb-4">
        <select
          className="p-2 border rounded-md"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          {teachers.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 h-60 overflow-y-auto p-4 rounded-lg space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "student" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-md text-sm max-w-xs ${
                msg.from === "student"
                  ? "bg-blue-100 text-right"
                  : "bg-green-100"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          className="flex-grow border p-2 rounded-l-md"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-md"
        >
          <Send size={16} />
        </button>
      </div>
    </Card>
  );
};

//od application

const ODApplication = () => {
  const [teacher, setTeacher] = useState(teachers[0]);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Pending");

  const handleSubmit = () => {
    if (!reason.trim()) return alert("Please provide a reason");
    setSubmitted(true);
    // Simulate status update by teacher after 2 seconds
    setTimeout(() => setStatus("Approved"), 2000);
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4 text-gray-800">OD Application</h2>
      {!submitted ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Teacher</label>
            <select
              className="w-full border p-2 rounded-md"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            >
              {teachers.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              className="w-full border p-2 rounded-md"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Explain your OD request..."
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit OD Request
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            Submitted to: <strong>{teacher}</strong>
          </p>
          <p className="text-sm text-gray-700">
            Reason: <em>{reason}</em>
          </p>
          <StatusChip status={status} />
        </div>
      )}
    </Card>
  );
};











const studentTimetable = {
  studentName: "Aman Kumar",
  class: "10",
  section: "A",
  timetable: {
    Monday: [
      { time: "9:00 - 10:00", subject: "Mathematics", teacher: "Mrs. Sharma" },
      { time: "10:00 - 11:00", subject: "Science", teacher: "Mr. Rao" },
    ],
    Tuesday: [
      { time: "9:00 - 10:00", subject: "English", teacher: "Mrs. Das" },
      { time: "10:00 - 11:00", subject: "Mathematics", teacher: "Mrs. Sharma" },
    ],
    Wednesday: [
      { time: "9:00 - 10:00", subject: "Science", teacher: "Mr. Rao" },
      { time: "10:00 - 11:00", subject: "Computer", teacher: "Mr. Iyer" },
    ],
    Thursday: [
      { time: "9:00 - 10:00", subject: "English", teacher: "Mrs. Das" },
      { time: "10:00 - 11:00", subject: "Mathematics", teacher: "Mrs. Sharma" },
    ],
    Friday: [
      { time: "9:00 - 10:00", subject: "Science", teacher: "Mr. Rao" },
      { time: "10:00 - 11:00", subject: "Computer", teacher: "Mr. Iyer" },
    ],
  },
};

const StudentTimetable = () => {
  const days = Object.keys(studentTimetable.timetable);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">Current Semester Timetable</h2>
          <p className="text-sm text-gray-500">
            Timetable for {studentTimetable.studentName} (Class {studentTimetable.class}-{studentTimetable.section})
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) =>
              studentTimetable.timetable[day].map((slot, index) => (
                <tr
                  key={`${day}-${index}`}
                  className={
                    day === today ? "bg-blue-50 border-t" : "border-t"
                  }
                >
                  {index === 0 && (
                    <td
                      rowSpan={studentTimetable.timetable[day].length}
                      className="px-4 py-2 font-semibold text-gray-700"
                    >
                      {day}
                    </td>
                  )}
                  <td className="px-4 py-2">{slot.time}</td>
                  <td className="px-4 py-2">{slot.subject}</td>
                  <td className="px-4 py-2">{slot.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};






// Main App Component
export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Academics", icon: <BookOpen size={20} /> },
    { name: "Finance & Fees", icon: <DollarSign size={20} /> },
    { name: "Profile & Docs", icon: <User size={20} /> },
    { name: "AI Tools", icon: <Bot size={20} /> },
{ name: "Time Table", icon: <CalendarDays size={20} /> },
    { name: "Placement Portal", icon: <Briefcase size={20} /> },
    { name: "Calendar & Events", icon: <Calendar size={20} /> },
    { name: "Communication", icon: <MessageSquare size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
    { name: "OD Application", icon: <FileText size={20} /> },
    { name: "Message Teacher", icon: <MessageSquare size={20} /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardOverview />;
      case "Academics":
        return <Academics />;
      case "Finance & Fees":
        return <Finance />;
      case "Profile & Docs":
        return <Profile />;
      case "AI Tools":
        return <AITools />;
         case "Time Table":
        return <StudentTimetable/>;
      case "Placement Portal":
        return <PlacementPortal />;
      case "Calendar & Events":
        return <CalendarAndEvents />;
      case "Communication":
        return <Communication />;
      case "Reports":
        return <Reports />;
      case "OD Application":
        return <ODApplication />;
      case "Message Teacher":
        return <StudentMessaging />;
      default:
        return <DashboardOverview />;
    }
  };

  const Sidebar = ({ items }) => (
    <aside
      className={`bg-white shadow-sm h-full flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b h-24 ${
          isSidebarOpen ? "" : "justify-center"
        }`}
      >
      {isSidebarOpen ? (
  <div className="flex items-center gap-2 pl-4 pt-4">
    <GraduationCap className="w-8 h-8 text-blue-600" strokeWidth={2} />
    <h1 className="!text-2xl font-semibold text-gray-900 leading-tight mt-[-2px]">
  Student <br /> ERP
</h1>

  </div>
) : (
  <div className="flex justify-center pt-4">
    <GraduationCap className="w-8 h-8 text-blue-600" strokeWidth={2.2} />
  </div>
)}



        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-full hover:bg-gray-100 hidden lg:block"
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      {/* FIXED: Added overflow-y-auto for scrollability on smaller screens */}
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActivePage(item.name);
              if (isMobileMenuOpen) setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activePage === item.name
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            } ${isSidebarOpen ? "" : "justify-center"}`}
          >
            {item.icon}
            {isSidebarOpen && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (

<div className="flex h-screen bg-gray-50 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex  lg:w-64 lg:flex-col lg:h-full lg:bg-white lg:shadow">
  <Sidebar items={menuItems} />
</div>


      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          isMobileMenuOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`relative w-64 h-full bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar items={menuItems} />
        </div>
        {isMobileMenuOpen && (
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b h-24">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
            >
              <Menu />
            </button>
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell />
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={studentData.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {studentData.name}
                </p>
                <p className="text-xs text-gray-500">
                  {studentData.department.split(" ")[0]} Engg.
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
