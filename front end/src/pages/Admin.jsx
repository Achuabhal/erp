import React, { createContext, useContext,useState, useEffect ,useRef} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";





import {
 ShieldCheck, Clock3,UserCog,UserMinus,Activity,
  Home,
  BadgePercent,Pencil, Trash2,
  ListChecks,
  RotateCcw,
  BarChart2,
  FileClock,
  UserPlus,
  LayoutDashboard,Ticket,
  Mail,
BadgeCheck,
  Zap,
  RefreshCw,
  BarChart3,
  AlertCircle,
  GraduationCap,
  Layers,
  CreditCard, Edit2, 
  Users,
  Settings,
  BookOpen,
  DollarSign,NotebookPen,
  User,
  CalendarDays,
  Bot,
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,
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
  ToggleRight,
  Banknote,
  AlarmClock,
  Undo2,
BellRing,
Wallet
} from "lucide-react";


const dummyReports = [
  {
    id: 1,
    name: "Riya Mehta",
    roll: "STU001",
    class: "Class 10 - A",
    attendance: "92%",
    academics: {
      Math: 88,
      Science: 91,
      English: 85,
    },
    fees: {
      paid: 15000,
      due: 3000,
    },
  },
  {
    id: 2,
    name: "Aryan Patel",
    roll: "STU002",
    class: "Class 9 - B",
    attendance: "85%",
    academics: {
      Math: 72,
      Science: 69,
      English: 80,
    },
    fees: {
      paid: 12000,
      due: 0,
    },
  },
];




const dummyUsers = [
  { id: 1, name: "Rohan Kelaskar", email: "rohan@example.com", role: "student" },
  { id: 2, name: "Neha Mehta", email: "neha@example.com", role: "hod" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", role: "teacher" },
];





const dummyStudent = {
  name: "Rohan K",
  rollNumber: "xxxxxxxxx1795",
  class: "MCA",
  examDate: "12 August 2025",
  center: "Christ Academy Institute for Advanced Studies",
  subjects: ["Maths", "Physics", "Chemistry", "English", "Computer Science"],
};





const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // "admin", "student", "accountant", "parent"

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);



const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    {children}
  </label>
);



const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-gray-800">{children}</h2>
);


const CardFooter = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-md ${className}`}>
    {children}
  </div>
);



const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">{children}</p>
);



const CardHeader = ({ children }) => (
  <div className="p-4 bg-gray-100 border-b border-gray-200 rounded-t-xl">
    {children}
  </div>
);


const CardContent = ({ children }) => (
  <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
    {children}
  </div>
);

const ScrollArea = ({ children, height = "300px" }) => (
  <div className="overflow-y-auto" style={{ maxHeight: height }}>
    {children}
  </div>
);



const Table = ({ children }) => (
  <table className="min-w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
    {children}
  </table>
);


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




const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles =
    "px-4 py-2 rounded-xl text-white font-semibold shadow transition duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
  };

  return ( 
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};




// Main Module Components


const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <Users className="text-blue-500 w-10 h-10 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-lg font-semibold">1,240</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <GraduationCap className="text-green-500 w-10 h-10 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Teachers</p>
            <p className="text-lg font-semibold">86</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <Briefcase className="text-purple-500 w-10 h-10 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total HODs</p>
            <p className="text-lg font-semibold">12</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center mb-2">
            <UserPlus className="text-green-500 w-6 h-6 mr-2" />
            <p className="font-semibold">Add User</p>
          </div>
          <p className="text-sm text-gray-600">Create a new Student, Teacher, or HOD profile.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center mb-2">
            <UserCog className="text-yellow-500 w-6 h-6 mr-2" />
            <p className="font-semibold">Edit User</p>
          </div>
          <p className="text-sm text-gray-600">Modify existing user details and permissions.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center mb-2">
            <UserMinus className="text-red-500 w-6 h-6 mr-2" />
            <p className="font-semibold">Remove User</p>
          </div>
          <p className="text-sm text-gray-600">Delete Student, Teacher, or HOD accounts.</p>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl shadow p-4 mt-4">
        <div className="flex items-center mb-3">
          <Activity className="text-blue-600 w-6 h-6 mr-2" />
          <h3 className="text-lg font-semibold">Recent Activity Logs</h3>
        </div>
        <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1">
          <li>Added new student: Priya S.</li>
          <li>Updated HOD details: Dr. Sharma</li>
          <li>Deleted teacher: Rakesh Kumar</li>
        </ul>
      </div>
    </div>
  );
};







const AssignClassesSubjects = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="rounded-xl shadow">
        <CardHeader className="bg-gray-50 rounded-t-xl border-b">
          <div className="flex items-start gap-4">
            <NotebookPen className="text-blue-600 mt-1" />
            <div>
              <CardTitle className="text-lg">Assign Classes, Subjects & Sections</CardTitle>
              <CardDescription>
                Allocate students and teachers to specific academic units
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <Label htmlFor="class">Class</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Class 5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Science" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="sst">Social Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="section">Section</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Section A" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="justify-end border-t bg-gray-50 rounded-b-xl px-6 py-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Assign
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};




const HallTicketGenerator = () => {
  const ticketRef = useRef();

  const generatePDF = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${dummyStudent.name}_HallTicket.pdf`);
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white border rounded shadow p-6" ref={ticketRef}>
        <h2 className="text-xl font-bold text-center text-blue-700 mb-4">Examination Hall Ticket</h2>

        <div className="mb-2"><strong>Name:</strong> {dummyStudent.name}</div>
        <div className="mb-2"><strong>Roll Number:</strong> {dummyStudent.rollNumber}</div>
        <div className="mb-2"><strong>Class:</strong> {dummyStudent.class}</div>
        <div className="mb-2"><strong>Exam Date:</strong> {dummyStudent.examDate}</div>
        <div className="mb-2"><strong>Exam Center:</strong> {dummyStudent.center}</div>

        <div className="mt-4">
          <strong>Subjects:</strong>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {dummyStudent.subjects.map((sub, idx) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 mt-6 text-center">
          *Please bring a valid ID card and arrive 30 minutes before the exam.
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Download Hall Ticket
        </button>
      </div>
    </div>
  );
};







const ExamTimetableManager = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Mid Term - Mathematics",
      class: "Class 10",
      date: "2025-09-15",
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: 2,
      title: "Mid Term - Science",
      class: "Class 10",
      date: "2025-09-17",
      time: "10:00 AM - 12:00 PM",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    date: "",
    time: "",
  });

  const handleAdd = () => {
    if (!formData.title || !formData.class || !formData.date || !formData.time) return;
    setExams([...exams, { id: Date.now(), ...formData }]);
    setFormData({ title: "", class: "", date: "", time: "" });
  };

  const handleDelete = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Exam Timetable Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Exam Title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          className="border p-2 rounded"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Time (e.g. 10:00 AM - 12:00 PM)"
          className="border p-2 rounded"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-4"
          onClick={handleAdd}
        >
          Add Exam
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-t text-sm">
                <td className="px-4 py-2">{exam.title}</td>
                <td className="px-4 py-2">{exam.class}</td>
                <td className="px-4 py-2">{exam.date}</td>
                <td className="px-4 py-2">{exam.time}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:underline">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(exam.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {exams.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No exams scheduled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};






const FeeStructureManager = () => {
  const [structures, setStructures] = useState([
    {
      id: 1,
      class: "Class 10",
      term: "2025 - Term 1",
      fees: [
        { category: "Tuition", amount: 12000 },
        { category: "Lab", amount: 3000 },
        { category: "Transport", amount: 5000 },
      ],
      totalPaid: 15000,
      totalDue: 5000,
    },
    {
      id: 2,
      class: "Class 9",
      term: "2025 - Term 1",
      fees: [
        { category: "Tuition", amount: 11000 },
        { category: "Sports", amount: 2000 },
      ],
      totalPaid: 13000,
      totalDue: 0,
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Fee Structure & Payments</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {structures.map((structure) => (
          <div key={structure.id} className="bg-white p-5 rounded shadow">
            <h3 className="text-lg font-bold text-teal-700 mb-2">
              {structure.class} - {structure.term}
            </h3>

            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="text-left py-1">Category</th>
                  <th className="text-left py-1">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {structure.fees.map((fee, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-1">{fee.category}</td>
                    <td className="py-1">₹{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center text-sm mt-4">
              <span className="text-green-600 font-medium">
                Paid: ₹{structure.totalPaid}
              </span>
              <span
                className={
                  structure.totalDue > 0
                    ? "text-red-600 font-medium"
                    : "text-gray-500"
                }
              >
                Due: ₹{structure.totalDue}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm flex items-center gap-1">
                <CreditCard size={14} />
                Update Payment
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300 text-sm flex items-center gap-1">
                <BadgeCheck size={14} />
                View History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};








const StudentReportViewer = () => {
  const [reports] = useState(dummyReports);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Student Detailed Reports</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((student) => (
          <div key={student.id} className="bg-white p-5 rounded-lg shadow">
            <div className="mb-2">
              <h3 className="text-lg font-bold text-teal-700">{student.name}</h3>
              <p className="text-gray-600 text-sm">{student.class}</p>
              <p className="text-gray-400 text-xs">Roll No: {student.roll}</p>
            </div>

            {/* Attendance */}
            <div className="flex items-center gap-2 text-sm mt-4">
              <User className="text-blue-500" size={16} />
              <span>Attendance: </span>
              <span className="font-medium text-gray-800">{student.attendance}</span>
            </div>

            {/* Fee Status */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <CreditCard className="text-green-500" size={16} />
              <span>Fees Paid: </span>
              <span className="font-semibold text-green-700">₹{student.fees.paid}</span>
              <span className="ml-4">Due: </span>
              <span className={student.fees.due > 0 ? "text-red-600 font-medium" : "text-gray-500"}>
                ₹{student.fees.due}
              </span>
            </div>

            {/* Academic Performance */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm mb-1">
                <BookOpen className="text-purple-600" size={16} />
                <span>Academic Scores:</span>
              </div>
              <ul className="ml-6 text-sm text-gray-700 list-disc">
                {Object.entries(student.academics).map(([subject, score]) => (
                  <li key={subject}>
                    {subject}: <span className="font-medium">{score}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




const NotificationSender = () => {
  const [role, setRole] = useState("all");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      setStatus("Message cannot be empty.");
      return;
    }

    // Simulate API
    setStatus(`✅ Notification sent to ${role === "all" ? "All Users" : role.toUpperCase()} successfully.`);
    setMessage("");
    setRole("all");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <BellRing className="text-orange-600" />
        <h2 className="text-2xl font-semibold">Send Notifications</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-5 space-y-4">
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Send To</label>
          <select
            className="w-full border rounded p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="hod">HODs</option>
          </select>
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border rounded p-2 h-28 resize-none"
            placeholder="Type your notification..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Action Button */}
        <div className="text-right">
          <button
            onClick={handleSend}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            <Send size={16} />
            Send
          </button>
        </div>

        {/* Status */}
        {status && <p className="text-sm text-green-600">{status}</p>}
      </div>
    </div>
  );
};





const AccessControlManager = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [editingId, setEditingId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleEdit = (userId, currentRole) => {
    setEditingId(userId);
    setNewRole(currentRole);
  };

  const handleSave = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    setEditingId(null);
    setNewRole("");
  };

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-purple-600" />
        <h2 className="text-2xl font-semibold">Manage User Roles & Permissions</h2>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {editingId === user.id ? (
                    <select
                      className="border rounded px-2 py-1"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="cashier">Cashier</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  ) : (
                    <span className="capitalize">{user.role}</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {editingId === user.id ? (
                    <button
                      onClick={() => handleSave(user.id)}
                      className="text-green-600 font-medium"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user.id, user.role)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};






// Main App Component
export default function App() {
  const [activePage, setActivePage] = useState("Admin Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
{ name: "Admin Dashboard", icon: <LayoutDashboard size={20} /> },
 { name: "Assign Classes", icon: <NotebookPen size={20} /> },
    { name: "Hall Tickets", icon: <Ticket size={20} /> },
    { name: "Exam time Table", icon: <CalendarDays size={20} /> },
    { name: "fees", icon: <Wallet size={20} /> },
    { name: "student report", icon: <BarChart2 size={20} /> },
    { name: "notifications", icon: <Bell size={20} /> },
    { name: "access control", icon: <ShieldCheck size={20} /> },


        

  ];

  const renderPage = () => {
  switch (activePage) {
    case "Admin Dashboard":
      return <AdminDashboard />;
      case "Assign Classes":
        return <AssignClassesSubjects />;
      case "Hall Tickets":
  return <HallTicketGenerator/>;
    case "Exam time Table":
  return <ExamTimetableManager/>;
    case "fees":
  return <FeeStructureManager/>;
   case "student report":
  return <StudentReportViewer/>;
  case "notifications":
  return <NotificationSender/>;
  case "access control":
  return <AccessControlManager/>;
    default:
      return <AdminDashboard />;
  }
};


  const Sidebar = ({ items }) => (
    <aside
      className={`bg-white shadow-sm h-full flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b h-16 ${
          isSidebarOpen ? "" : "justify-center"
        }`}
      >
        {isSidebarOpen && (
          <h1 className="text-xl font-bold text-blue-600">Admin Management ERP</h1>
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
      <div className="hidden lg:block">
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
        <header className="flex items-center justify-between p-4 bg-white border-b h-16">
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
