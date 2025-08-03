import React, { createContext, useContext,useState, useEffect } from "react";
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
 ShieldCheck, Clock3,
  Home,
  BadgePercent,
  ListChecks,
  RotateCcw,
  BarChart2,
  FileClock,
  UserPlus,
  Mail,
BadgeCheck,
  Zap,
  RefreshCw,
  BarChart3,
  AlertCircle,
  GraduationCap,
  Layers,
  CreditCard,
  Users,
  Settings,
  BookOpen,
  DollarSign,
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






// Main Module Components


const FeeStructureManagement = () => {
  const [selectedMode, setSelectedMode] = useState("Course-wise");

  const feeStructureData = {
    modes: ["Course-wise", "Semester-wise", "Year-wise"],
    specialStructures: ["Scholarships", "Management Quota", "NRI"],
    structures: {
      "Course-wise": [
        { name: "Tuition", amount: 50000 },
        { name: "Hostel", amount: 30000 },
        { name: "Library", amount: 5000 },
        { name: "Transport", amount: 8000 },
        { name: "Exam", amount: 2000 },
      ],
      "Semester-wise": [
        { name: "Tuition", amount: 25000 },
        { name: "Hostel", amount: 15000 },
        { name: "Library", amount: 2500 },
        { name: "Transport", amount: 4000 },
        { name: "Exam", amount: 1000 },
      ],
      "Year-wise": [
        { name: "Tuition", amount: 48000 },
        { name: "Hostel", amount: 28000 },
        { name: "Library", amount: 4500 },
        { name: "Transport", amount: 7500 },
        { name: "Exam", amount: 1800 },
      ],
      "Scholarships": [
        { name: "Tuition Waiver", amount: -20000 },
        { name: "Hostel Waiver", amount: -10000 },
      ],
      "Management Quota": [
        { name: "Tuition", amount: 70000 },
        { name: "Hostel", amount: 40000 },
        { name: "Donation", amount: 100000 },
      ],
      "NRI": [
        { name: "Tuition", amount: 120000 },
        { name: "Hostel", amount: 50000 },
        { name: "International Fee", amount: 25000 },
      ],
    },
  };

  const currentStructure = feeStructureData.structures[selectedMode];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Fee Structure Management
      </h2>

      {/* Mode Selection Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[...feeStructureData.modes, ...feeStructureData.specialStructures].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-4 py-2 rounded-full border ${
              selectedMode === mode
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Fee Categories Display */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Fee Categories - <span className="text-blue-500">{selectedMode}</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentStructure && currentStructure.map((category) => (
            <div
              key={category.name}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm"
            >
              <h4 className="font-semibold text-gray-800">{category.name}</h4>
              <p className="text-sm text-gray-600">
                ₹{Math.abs(category.amount).toLocaleString()}{" "}
                {category.amount < 0 && <span className="text-green-600">(Discount)</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const StudentFeeAssignment = () => {
  const [assignmentMode, setAssignmentMode] = useState("batch"); // or 'individual'
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [studentId, setStudentId] = useState("");

  const feeStructures = {
    "BCA-1-Scholarship": [
      { name: "Tuition", amount: 25000 },
      { name: "Exam", amount: 2000 },
    ],
    "BCA-1-Regular": [
      { name: "Tuition", amount: 50000 },
      { name: "Exam", amount: 2000 },
    ],

    "BCA-1-Management": [
      { name: "Tuition", amount: 100000 },
      { name: "Exam", amount: 2000 },
    ],
    "MBA-2-NRI": [
      { name: "Tuition", amount: 100000 },
      { name: "Hostel", amount: 40000 },
      { name: "Transport", amount: 12000 },
    ],
  };

  const getFeeStructure = () => {
    const key = `${selectedCourse}-${selectedYear}-${admissionType}`;
    return feeStructures[key] || [];
  };

  const handleAssignFees = () => {
    const assignedTo = assignmentMode === "batch" ? `${selectedCourse} Year ${selectedYear}` : `Student ID ${studentId}`;
    alert(`Fees assigned to ${assignedTo} for ${admissionType} admission.`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Student Fee Assignment</h2>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setAssignmentMode("batch")}
          className={`px-4 py-2 rounded-md ${assignmentMode === "batch" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Assign by Batch
        </button>
        <button
          onClick={() => setAssignmentMode("individual")}
          className={`px-4 py-2 rounded-md ${assignmentMode === "individual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Assign Individually
        </button>
      </div>

      {assignmentMode === "batch" ? (
        <>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
            </select>

            <select
              value={admissionType}
              onChange={(e) => setAdmissionType(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Select Admission Type</option>
              <option value="Regular">Regular</option>
                            <option value="management">management</option>

              <option value="Scholarship">Scholarship</option>
              <option value="NRI">NRI</option>
            </select>
          </div>
        </>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="p-2 w-full border rounded-md"
          />
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-medium text-gray-700 mb-2">Assigned Fee Structure:</h3>
        {getFeeStructure().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getFeeStructure().map((item) => (
              <div key={item.name} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h4 className="text-gray-800 font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">₹{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No fee structure selected.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleAssignFees}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Assign Fees
        </button>
      </div>
    </div>
  );
};






const FeeCollection = () => {
  const [paymentMode, setPaymentMode] = useState("Online");
  const [amountPaid, setAmountPaid] = useState("");
  const totalFee = 105000;
  const amountDue = totalFee - parseFloat(amountPaid || 0);

  const handleGenerateReceipt = () => {
    alert("Receipt Generated");
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Fee Collection</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Student ID</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Enter student ID or name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Total Fee</label>
          <input
            type="text"
            value={`₹${totalFee.toLocaleString()}`}
            disabled
            className="w-full border rounded-md p-2 mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount Paid</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border rounded-md p-2 mt-1"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Amount Due</label>
          <input
            type="text"
            value={`₹${amountDue.toLocaleString()}`}
            disabled
            className="w-full border rounded-md p-2 mt-1 bg-gray-100 text-red-600"
          />
        </div>

        {/* ✅ Use custom Button here */}
        <Button onClick={handleGenerateReceipt}>Generate Receipt</Button>
      </div>
    </div>
  );
};

// ✅ Custom Button component inside same file
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



const ConcessionScholarship = () => {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("Merit-based");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!studentId || !amount || !reason) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      studentId,
      type,
      amount,
      reason,
    };

    console.log("Submitting concession:", payload);
    alert("Concession submitted successfully!");
    // Submit to backend here
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Concession / Scholarship Management
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            className="w-full border rounded-md p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Concession Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-md p-2 mt-1"
          >
            <option value="Merit-based">Merit-based</option>
            <option value="Caste-based">Caste-based</option>
            <option value="Income-based">Income-based</option>
            <option value="Sports Quota">Sports Quota</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Concession Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-md p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reason / Remarks</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for concession"
            className="w-full border rounded-md p-2 mt-1"
            rows={3}
          ></textarea>
        </div>

        <Button onClick={handleSubmit}>Submit Concession</Button>
      </div>
    </div>
  );
};






const InstallmentPlanning = () => {
  const [studentId, setStudentId] = useState("");
  const [installments, setInstallments] = useState([
    { amount: "", dueDate: "", reminder: false },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...installments];
    updated[index][field] = field === "reminder" ? !updated[index].reminder : value;
    setInstallments(updated);
  };

  const addInstallment = () => {
    setInstallments([...installments, { amount: "", dueDate: "", reminder: false }]);
  };

  const removeInstallment = (index) => {
    const updated = [...installments];
    updated.splice(index, 1);
    setInstallments(updated);
  };

  const handleSubmit = () => {
    if (!studentId.trim()) {
      alert("Please enter a valid Student ID before submitting.");
      return;
    }

    console.log("Student ID:", studentId);
    console.log("Submitted Installments:", installments);
    alert("Installment plan created!");
    // Optionally post to backend using Axios
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-blue-600">Installment Planning</h2>

      {/* Student ID input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Student ID</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="w-full p-2 border rounded"
        />
      </div>

      {installments.map((inst, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-4 rounded-xl bg-gray-50">
          <div>
            <label className="block text-sm font-medium mb-1">Installment Amount</label>
            <input
              type="number"
              value={inst.amount}
              onChange={(e) => handleChange(idx, "amount", e.target.value)}
              placeholder="₹ Amount"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> Due Date
            </label>
            <input
              type="date"
              value={inst.dueDate}
              onChange={(e) => handleChange(idx, "dueDate", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={inst.reminder}
                onChange={() => handleChange(idx, "reminder")}
              />
              <Bell className="w-4 h-4 text-gray-500" /> Send Reminder
            </label>
            {installments.length > 1 && (
              <button
                onClick={() => removeInstallment(idx)}
                className="text-red-500 text-sm ml-auto"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          onClick={addInstallment}
          className="text-blue-600 font-medium hover:underline"
        >
          + Add Installment
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Plan
        </button>
      </div>
    </div>
  );
};






const LateFeeFineManagement = () => {
  const [fineRules, setFineRules] = useState([
    { daysLate: "", fineAmount: "", recurrence: "Once" },
  ]);
  const [studentId, setStudentId] = useState("");

  const addRule = () => {
    setFineRules([
      ...fineRules,
      { daysLate: "", fineAmount: "", recurrence: "Once" },
    ]);
  };

  const removeRule = (index) => {
    const updated = [...fineRules];
    updated.splice(index, 1);
    setFineRules(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...fineRules];
    updated[index][field] = value;
    setFineRules(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Fine Rules:", { studentId, fineRules });
    alert("Late Fee Rules Saved!");
    // You can integrate API POST call here
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6 mt-8">
      <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
        <AlarmClock className="w-5 h-5" />
        Late Fee & Fine Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {fineRules.map((rule, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border p-4 rounded-xl bg-gray-50"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Days Late</label>
            <input
              type="number"
              value={rule.daysLate}
              onChange={(e) => handleChange(idx, "daysLate", e.target.value)}
              placeholder="e.g., 5"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fine Amount (₹)</label>
            <input
              type="number"
              value={rule.fineAmount}
              onChange={(e) => handleChange(idx, "fineAmount", e.target.value)}
              placeholder="e.g., 200"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className=" text-sm font-medium mb-1 flex items-center gap-1">
              <Settings className="w-4 h-4" /> Recurrence
            </label>
            <select
              value={rule.recurrence}
              onChange={(e) => handleChange(idx, "recurrence", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Once</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="flex justify-end mt-2 md:mt-0">
            {fineRules.length > 1 && (
              <button
                onClick={() => removeRule(idx)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Rule
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between flex-col md:flex-row gap-4">
        <button
          onClick={addRule}
          className="text-blue-600 font-medium hover:underline"
        >
          + Add Rule
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Save Rules
        </button>
      </div>
    </div>
  );
};




const RefundAdjustmentManagement = () => {
  const [refunds, setRefunds] = useState([
    { studentId: "", type: "Cancellation", amount: "", reason: "" },
  ]);

  const addRefund = () => {
    setRefunds([
      ...refunds,
      { studentId: "", type: "Cancellation", amount: "", reason: "" },
    ]);
  };

  const removeRefund = (index) => {
    const updated = [...refunds];
    updated.splice(index, 1);
    setRefunds(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...refunds];
    updated[index][field] = value;
    setRefunds(updated);
  };

  const handleSubmit = () => {
    console.log("Refund & Adjustment Requests:", refunds);
    alert("Refund and Adjustments Submitted!");
    // Optional: send to backend
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6 mt-8">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Undo2 className="w-5 h-5" />
        Refund & Adjustment Management
      </h2>

      {refunds.map((entry, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border p-4 rounded-xl bg-gray-50"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              type="text"
              value={entry.studentId}
              onChange={(e) => handleChange(idx, "studentId", e.target.value)}
              placeholder="e.g., STU1234"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={entry.type}
              onChange={(e) => handleChange(idx, "type", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Cancellation">Cancellation</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Excess Payment Adjustment">Excess Payment Adjustment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              value={entry.amount}
              onChange={(e) => handleChange(idx, "amount", e.target.value)}
              placeholder="e.g., 500"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <input
              type="text"
              value={entry.reason}
              onChange={(e) => handleChange(idx, "reason", e.target.value)}
              placeholder="e.g., Dropped course"
              className="w-full p-2 border rounded"
            />
          </div>

          {refunds.length > 1 && (
            <button
              onClick={() => removeRefund(idx)}
              className="text-red-500 text-sm ml-auto mt-2 md:col-span-4"
            >
              Remove Entry
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          onClick={addRefund}
          className="text-green-700 font-medium hover:underline"
        >
          + Add Refund/Adjustment
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Submit Requests
        </button>
      </div>
    </div>
  );
};







const ReportsAnalytics = () => {
  const reportItems = [
    {
      icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
      title: "Daily Collection Reports",
      description: "Track fees collected each day across all channels.",
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      title: "Fee Due Reports",
      description: "Identify students with upcoming or overdue payments.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-yellow-500" />,
      title: "Outstanding & Defaulter Reports",
      description:
        "Monitor pending dues and list students who defaulted on fee payments.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-purple-500" />,
      title: "Student-wise / Course-wise Analysis",
      description:
        "Generate reports filtered by department, course, or individual students.",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Department-wise Reports",
      description:
        "Analyze fee trends and collection summaries department-wise.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6 mt-8">
      <h2 className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Reports & Analytics
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {reportItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="mr-4">{item.icon}</div>
            <div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};







const PaymentGatewayIntegration = () => {
  const gateways = [
    {
      name: "Razorpay",
      icon: "/images/gateways/razorpay.webp",
    },
    {
      name: "Paytm",
      icon: "/images/gateways/paytm.webp",
    },
    {
      name: "Google Pay",
      icon: "/images/gateways/gpay.webp",
    },
  ];

  const features = [
    {
      icon: <BadgeCheck className="w-6 h-6 text-green-600" />,
      title: "Seamless Integration",
      description: "Connect with popular gateways like Razorpay, Paytm, Stripe, and more.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
      title: "Auto Payment Update",
      description: "Fees automatically marked as paid on successful transaction.",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Real-time Notifications",
      description: "Receive instant confirmation and receipts via SMS/Email.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Gateway Integration
      </h2>

      {/* Gateway Logos */}
      <div className="flex flex-wrap items-center gap-6">
        {gateways.map((gateway, idx) => (
          <div
            key={idx}
            className="w-28 h-16 p-2 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={gateway.icon}
              alt={gateway.name}
              className="max-h-10 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Gateway Features */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-start p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="mr-3">{item.icon}</div>
            <div>
              <h4 className="text-md font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





const SMSNotifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    dueDateReminder: true,
    receiptConfirmation: true,
    pendingPaymentAlert: false,
  });

  const handleToggle = (key) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sendTestNotification = (type) => {
    alert(`Test ${type} notification sent!`);
  };

  return (
    <div className="p-6 rounded-2xl shadow bg-white space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
        <BellRing className="w-6 h-6 text-blue-600" />
        Notification Settings
      </h2>

      <div className="space-y-4">
        {[
          {
            key: 'dueDateReminder',
            label: 'Upcoming Due Date Reminder (SMS/Email)',
          },
          {
            key: 'receiptConfirmation',
            label: 'Payment Receipt Confirmation',
          },
          {
            key: 'pendingPaymentAlert',
            label: 'Pending Payment Alert',
          },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <span className="text-gray-700">{label}</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings[key]}
                onChange={() => handleToggle(key)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={() => sendTestNotification('SMS')}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <Mail className="inline-block w-4 h-4 mr-2" />
          Send Test Notification
        </button>
      </div>
    </div>
  );
};








const mockAuditLogs = [
  {
    timestamp: "2025-07-27 10:15 AM",
    user: "Admin (admin@erp.edu)",
    action: "Refund Processed",
    details: "₹300 refunded to Roll No. 2302 due to withdrawal from course.",
  },
  {
    timestamp: "2025-07-26 05:42 PM",
    user: "Accountant (fees@erp.edu)",
    action: "Late Fee Adjusted",
    details: "₹50 waived for Roll No. 2219 citing special request.",
  },
  {
    timestamp: "2025-07-26 02:13 PM",
    user: "System",
    action: "Auto Email Alert",
    details: "Fee due alert sent to 120 students for August 2025 dues.",
  },
  {
    timestamp: "2025-07-25 04:00 PM",
    user: "Admin (admin@erp.edu)",
    action: "Fee Structure Edited",
    details: "Updated Semester 3 structure for BBA with revised tuition fee.",
  },
];

const AuditHistoryLogs = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Audit & History Logs</h2>
      <div className="bg-white shadow rounded-xl p-4">
        <ScrollArea>
          <Table>
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-semibold">Date</th>
                <th className="text-left px-4 py-2 text-sm font-semibold">User</th>
                <th className="text-left px-4 py-2 text-sm font-semibold">Action</th>
                <th className="text-left px-4 py-2 text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-t">
                <td className="px-4 py-2">2025-07-27</td>
                <td className="px-4 py-2">Admin</td>
                <td className="px-4 py-2">Fee Adjustment</td>
                <td className="px-4 py-2">Adjusted ₹100 in Invoice #243</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">2025-07-26</td>
                <td className="px-4 py-2">Accountant</td>
                <td className="px-4 py-2">Refund</td>
                <td className="px-4 py-2">Refunded ₹500 to Student ID 1045</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};



// Assuming `Card`, `CardContent`, and icons are already imported at top

const AccessControl = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");

  const modulesByRole = {
    Admin: [
      "Fee Structure",
      "Student Fees",
      "Fee Collection",
      "Concession Scholarship",
      "Installment Planning",
      "Fine Management",
      "Refund",
      "Reports",
      "Payment",
      "Notifications",
      "Audit History",
      "Access Control",
    ],
    Accountant: [
      "Fee Collection",
      "Fine Management",
      "Reports",
      "Refund",
      "Audit History",
    ],
    Student: [
      "Fee Structure",
      "Installment Planning",
      "Payment",
    ],
    Parent: ["Fine Management", "Payment", "Installment Planning"],
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Access Control & Permissions</h2>

          <div className="mb-4">
            <label className="mr-2 font-medium">Select Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border p-2 rounded"
            >
              {Object.keys(modulesByRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Modules Accessible:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {modulesByRole[selectedRole].map((mod, index) => (
                <li key={index}>{mod}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};







// Main App Component
export default function App() {
  const [activePage, setActivePage] = useState("FeeStructure");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
{ name: "Fee Structure", icon: <Layers size={20} /> },
    { name: "Student Fees", icon: <UserPlus size={20} /> },
    { name: "Fee Collection", icon: < Wallet size={20} /> },
    { name: "Concession Scholarship", icon: <BadgePercent size={20} /> },
    { name: "Installment Planning", icon: <ListChecks size={20} /> },
    { name: "Fine Management", icon: <AlertTriangle size={20} /> }, 
{ name: "Refund", icon: <RotateCcw size={20} /> },  
    { name: "Reports", icon: <BarChart2 size={20} /> }, 
    { name: "Payment", icon: <CreditCard size={20} /> },
        { name: "Notifications", icon: <BellRing size={20} /> },
        { name: "Audit History", icon: <FileClock  size={20} /> },

        

  ];

  const renderPage = () => {
  switch (activePage) {
    case "Fee Structure":
      return <FeeStructureManagement />;
      case "Student Fees":
      return <StudentFeeAssignment />;
      case "Fee Collection":
      return <FeeCollection />;
      case "Concession Scholarship":
      return <ConcessionScholarship />;
      case "Installment Planning":
      return <InstallmentPlanning />;
      case "Fine Management":
      return <LateFeeFineManagement />;
       case "Refund":
      return <RefundAdjustmentManagement />;
      case "Reports":
      return <ReportsAnalytics />;  
      case "Payment":
      return <PaymentGatewayIntegration/>;  
case "Notifications":
      return <SMSNotifications />;
case "Audit History":
      return <AuditHistoryLogs />;
      case "Access":
      return <AccessControl />;

    default:
      return <FeeStructureManagement />;
  }
};


  const Sidebar = ({ items }) => (
    <aside
      className={`bg-white shadow-sm h-full flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b h-26 ${
          isSidebarOpen ? "" : "justify-center"
        }`}
      >


        {isSidebarOpen ? (
          <div className="flex items-center gap-2 pl-4 pt-4">
            <Wallet  className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <h1 className="!text-2xl font-semibold text-gray-900 leading-tight mt-[-3px]">
          Fee Management <br /> ERP
        </h1>
        
          </div>
        ) : (
          <div className="flex justify-center pt-4">
            <Wallet  className="w-8 h-8 text-blue-600" strokeWidth={2.2} />
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
        <header className="flex items-center justify-between p-4 bg-white border-b h-26">
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
