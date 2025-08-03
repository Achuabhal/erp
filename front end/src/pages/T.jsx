import React, { useState, useEffect } from 'react';

// HELPER: Icon Components (using inline SVG for portability)
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);


import { School } from 'lucide-react';

const HomeIcon = (props) => <Icon path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...props} />;
const BookOpenIcon = (props) => <Icon path="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" {...props} />;
const MessageSquareIcon = (props) => <Icon path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" {...props} />;
const BarChart3Icon = (props) => <Icon path="M3 3v18h18M18 17V9M13 17V5M8 17v-3" {...props} />;
const UserIcon = (props) => <Icon path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" {...props} />;
const ShieldCheckIcon = (props) => <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" {...props} />;
const BellIcon = (props) => <Icon path="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" {...props} />;
const MenuIcon = (props) => <Icon path="M3 12h18M3 6h18M3 18h18" {...props} />;
const ChevronDownIcon = (props) => <Icon path="m6 9 6 6 6-6" {...props} />;
const SearchIcon = (props) => <Icon path="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" {...props} />;
const UploadCloudIcon = (props) => <Icon path="M16 16l-4-4-4 4M12 12v9M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" {...props} />;
const DownloadIcon = (props) => <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" {...props} />;
const EditIcon = (props) => <Icon path="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" {...props} />;
const LockIcon = (props) => <Icon path="M12 11V7a4 4 0 0 1 8 0v4M3 11h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V11z" {...props} />;
const SendIcon = (props) => <Icon path="m22 2-7 20-4-9-9-4Z" {...props} />;
const PaperclipIcon = (props) => <Icon path="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" {...props} />;
const MicIcon = (props) => <Icon path="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" {...props} />;
const LogOutIcon = (props) => <Icon path="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" {...props} />;
const FilterIcon = (props) => <Icon path="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" {...props} />;
const XIcon = (props) => <Icon path="M18 6 6 18M6 6l12 12" {...props} />;


// Mock Data
const mockData = {
    teacher: {
        name: "Dr. Evelyn Reed",
        subject: "Computer Science",
        department: "Dept. of Information Technology",
        avatar: `https://i.pravatar.cc/150?u=evelynreed`,
    },
    quickStats: [
        { label: "Total Students", value: "128", change: "+5%", changeType: "increase" },
        { label: "Today's Classes", value: "4", change: "-1", changeType: "decrease" },
        { label: "Attendance %", value: "92%", change: "+1.2%", changeType: "increase" },
        { label: "Upcoming Tasks", value: "3", change: "+1", changeType: "increase" },
    ],
    notifications: [
        { type: "Admin", message: "Faculty meeting scheduled for 25th July.", time: "2h ago", read: false },
        { type: "Approval", message: "Your request for leave on 28th July has been approved.", time: "1d ago", read: true },
        { type: "Placement", message: "Infosys campus drive on 1st August. Inform eligible students.", time: "3d ago", read: true },
    ],
    timetable: {
        "Monday": [
            { time: "09:00 - 10:00", subject: "Data Structures", room: "CS-301", type: "Lecture" },
            { time: "11:00 - 12:00", subject: "Project Mentoring", room: "Lab-II", type: "Practical" },
        ],
        "Tuesday": [
            { time: "10:00 - 11:00", subject: "Algorithms", room: "CS-302", type: "Lecture" },
            { time: "14:00 - 16:00", subject: "Data Structures Lab", room: "Lab-I", type: "Practical" },
        ],
        "Wednesday": [
            { time: "09:00 - 10:00", subject: "Data Structures", room: "CS-301", type: "Lecture" },
        ],
        "Thursday": [
            { time: "10:00 - 11:00", subject: "Algorithms", room: "CS-302", type: "Lecture" },
        ],
        "Friday": [
             { time: "14:00 - 16:00", subject: "Data Structures Lab", room: "Lab-I", type: "Practical" },
        ]
    },
    students: Array.from({ length: 120}, (_, i) => ({
        id: `STU${101 + i}`,
        name: `Student ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?u=student${i}`,
        attendance: Math.floor(Math.random() * 30 + 70),
        marks: Math.floor(Math.random() * 60 + 40),
    })),
    assignments: [
        { id: 1, title: "API Design Document", submitted: 20, total: 25, deadline: "2024-07-30", late: 2 },
        { id: 2, title: "Linked List Implementation", submitted: 25, total: 25, deadline: "2024-07-25", late: 0 },
    ]
};

// Reusable Tailwind CSS class strings
const btnPrimaryClasses = "bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center";
const btnSecondaryClasses = "bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center";
const btnSecondarySmClasses = "bg-white text-gray-700 font-semibold px-3 py-1 text-sm rounded-md border border-gray-300 shadow-sm hover:bg-gray-50";
const inputFieldClasses = "bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const labelClasses = "block text-sm font-medium text-gray-600 mb-1";
const tagClasses = "bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full";


// Main Components
const App = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardOverview />;
            case 'academics': return <AcademicManagement />;
            case 'communication': return <CommunicationTools />;
            case 'performance': return <StudentPerformanceInsights />;
            case 'profile': return <ProfileAndTeachingInfo />;
            case 'security': return <SecurityAndAccess />;
            default: return <DashboardOverview />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex font-sans text-gray-800">
            <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className={`flex-1 transition-all duration-300 md:ml-20 ${isSidebarOpen && 'md:ml-64'}`}>
                <Header teacher={mockData.teacher} setSidebarOpen={setSidebarOpen} />
                <main className="p-4 md:p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

const Sidebar = ({ activeView, setActiveView, isOpen, setOpen }) => {
    const navItems = [
        { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
        { id: 'academics', icon: BookOpenIcon, label: 'Academics' },
        { id: 'communication', icon: MessageSquareIcon, label: 'Communication' },
        { id: 'performance', icon: BarChart3Icon, label: 'Performance' },
        { id: 'profile', icon: UserIcon, label: 'Profile' },
        { id: 'security', icon: ShieldCheckIcon, label: 'Security' },
    ];

    const handleNavClick = (id) => {
        setActiveView(id);
        if (window.innerWidth < 768) {
            setOpen(false);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>}

            <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 ${isOpen ? 'md:w-64' : 'md:w-20'}`}>
                
<div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
  <span className={`flex items-center gap-2 font-bold text-xl text-indigo-600 transition-opacity ${!isOpen && 'md:opacity-0 md:hidden'}`}>
    <School className="w-6 h-6" /> ERP
  </span>
  <button
    onClick={() => setOpen(!isOpen)}
    className="p-2 text-gray-500 rounded-lg hover:bg-gray-100"
  >
    {isOpen ? <XIcon /> : <MenuIcon />}
  </button>
</div>
                <nav className="mt-6">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id} className="px-3">
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                    className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                                        activeView === item.id
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className={`ml-4 whitespace-nowrap transition-opacity ${!isOpen && 'md:opacity-0 md:hidden'}`}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                 <div className={`absolute bottom-0 w-full px-3 mb-4`}>
                     <a
                         href="#"
                         className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 text-gray-500 hover:bg-red-50 hover:text-red-600`}
                     >
                         <LogOutIcon className="w-5 h-5" />
                         <span className={`ml-4 whitespace-nowrap transition-opacity ${!isOpen && 'md:opacity-0 md:hidden'}`}>Logout</span>
                     </a>
                 </div>
            </div>
        </>
    );
};

const Header = ({ teacher, setSidebarOpen }) => {
    const unreadCount = Array.isArray(mockData?.notifications)
        ? mockData.notifications.filter(n => !n.read).length
        : 0;

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-20 border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                 <button onClick={() => setSidebarOpen(true)} className="text-gray-500 md:hidden">
                     <MenuIcon />
                 </button>
                 <div className="relative hidden md:block">
                     <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input type="text" placeholder="Search students, subjects..." className="bg-gray-100 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 </div>
                <div className="flex items-center space-x-4">
                    <button className="relative text-gray-500 hover:text-gray-800">
                        <BellIcon />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <div className="flex items-center space-x-2">
                        <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="hidden md:block">
                            <p className="font-semibold text-sm">{teacher.name}</p>
                            <p className="text-xs text-gray-500">{teacher.department}</p>
                        </div>
                        <button className="text-gray-500">
                            <ChevronDownIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Section Components
const Card = ({ children, className = '' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
        {children}
    </div>
);

const DashboardOverview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-xl">
                <h1 className="text-3xl font-bold">Welcome back, {mockData.teacher.name}!</h1>
                <p className="mt-2 text-indigo-100">Your assigned subject: {mockData.teacher.subject}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockData.quickStats.map(stat => (
                    <Card key={stat.label}>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <div className={`mt-1 text-xs flex items-center ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.changeType === 'increase' ? '▲' : '▼'} {stat.change}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h2 className="font-bold text-lg mb-4">Today's Timetable</h2>
                    <div className="space-y-4">
                        {mockData.timetable["Monday"].length > 0 ? mockData.timetable["Monday"].map((item, index) => (
                             <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                 <div>
                                     <p className="font-semibold">{item.subject}</p>
                                     <p className="text-sm text-gray-500">{item.time}</p>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                     <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.room}</span>
                                     <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.type === 'Lecture' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>{item.type}</span>
                                 </div>
                             </div>
                        )) : (
                            <p className="text-center text-gray-500 py-4">No classes scheduled for today.</p>
                        )}
                    </div>
                </Card>
                <Card>
                    <h2 className="font-bold text-lg mb-4">Notifications</h2>
                    <ul className="space-y-3">
                        {mockData.notifications.map((notif, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                                <div>
                                    <p className="text-sm">{notif.message}</p>
                                    <p className="text-xs text-gray-400">{notif.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const AcademicManagement = () => {
    const [activeTab, setActiveTab] = useState('Attendance');
    const tabs = ['Timetable', 'Attendance', 'Assignments', 'Marks & Exams'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Timetable': return <TimetableViewer />;
            case 'Attendance': return <AttendanceManagement />;
            case 'Assignments': return <AssignmentManagement />;
            case 'Marks & Exams': return <MarksAndExamUploads />;
            default: return <AttendanceManagement />;
        }
    };

    return (
        <Card>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 px-2 whitespace-nowrap border-b-2 font-medium text-sm ${
                                activeTab === tab
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            {renderContent()}
        </Card>
    );
};

const TimetableViewer = () => {
    const [view, setView] = useState('daily');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">My Timetable</h3>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setView('daily')} className={`px-3 py-1 text-sm rounded-md ${view === 'daily' ? 'bg-white shadow-sm' : ''}`}>Daily</button>
                    <button onClick={() => setView('weekly')} className={`px-3 py-1 text-sm rounded-md ${view === 'weekly' ? 'bg-white shadow-sm' : ''}`}>Weekly</button>
                </div>
            </div>
            {view === 'daily' ? (
                <div className="space-y-4">
                    <h4 className="font-semibold text-md">Today (Monday)</h4>
                    {mockData.timetable["Monday"].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                           <div>
                               <p className="font-semibold">{item.subject}</p>
                               <p className="text-sm text-gray-500">{item.time}</p>
                           </div>
                           <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.room}</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.type === 'Lecture' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>{item.type}</span>
                           </div>
                       </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {days.map(day => (
                        <div key={day} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-center mb-3">{day}</h4>
                            <div className="space-y-3">
                                {mockData.timetable[day]?.map((item, index) => (
                                    <div key={index} className="bg-white p-2 rounded-md shadow-sm text-xs">
                                        <p className="font-semibold">{item.subject}</p>
                                        <p className="text-gray-500">{item.time}</p>
                                        <p className="text-blue-600">{item.room}</p>
                                    </div>
                                )) || <p className="text-center text-xs text-gray-400">No classes</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const AttendanceManagement = () => {
    const [attendance, setAttendance] = useState(() => {
        const initialState = {};
        mockData.students.forEach(s => {
            initialState[s.id] = 'present';
        });
        return initialState;
    });

    const handleStatusChange = (studentId, status) => {
        setAttendance(prev => ({...prev, [studentId]: status}));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Mark Attendance</h3>
                <div className="flex items-center flex-wrap gap-2">
                    <input type="date" defaultValue="2024-07-29" className={`${inputFieldClasses} w-auto`}/>
                    <select className={`${inputFieldClasses} w-auto`}>
                        <option>Select Class</option>
                        <option>CS-A</option>
                        <option>CS-B</option>
                        <option>IT-A</option>
                    </select>
                    <select className={`${inputFieldClasses} w-auto`}>
                        <option>Select Subject</option>
                        <option>Data Structures</option>
                        <option>Algorithms</option>
                    </select>
                </div>
            </div>
             <div className="flex flex-wrap gap-2 justify-between items-center mb-6 border-t pt-4 mt-4">
                 <div className="flex items-center flex-wrap gap-2">
                     <button className={btnSecondaryClasses}><UploadCloudIcon className="w-4 h-4 mr-2"/> Bulk Upload (CSV)</button>
                     <button className={btnSecondaryClasses}><EditIcon className="w-4 h-4 mr-2"/> Edit Previous</button>
                 </div>
                 <button className={btnPrimaryClasses}><DownloadIcon className="w-4 h-4 mr-2"/> Export Report</button>
             </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="p-3">Student ID</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.students.slice(0, 120).map(student => (
                            <tr key={student.id} className="border-b">
                                <td className="p-3 font-mono">{student.id}</td>
                                <td className="p-3 flex items-center gap-3">
                                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                                    {student.name}
                                </td>
                                <td className="p-3 text-center">
                                    <div className="inline-flex rounded-lg shadow-sm">
                                        <button onClick={() => handleStatusChange(student.id, 'present')} className={`px-3 py-1 text-xs rounded-l-lg ${attendance[student.id] === 'present' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-50'}`}>Present</button>
                                        <button onClick={() => handleStatusChange(student.id, 'absent')} className={`px-3 py-1 text-xs ${attendance[student.id] === 'absent' ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-50'}`}>Absent</button>
                                        <button onClick={() => handleStatusChange(student.id, 'leave')} className={`px-3 py-1 text-xs rounded-r-lg ${attendance[student.id] === 'leave' ? 'bg-yellow-500 text-white' : 'bg-white hover:bg-gray-50'}`}>Leave</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <button className={btnPrimaryClasses}>Submit Attendance</button>
            </div>
        </div>
    );
};

const GradingModal = ({ assignment, student, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
            <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">Grade Submission</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon /></button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-gray-500">Grading for: <strong>{student.name}</strong> ({student.id})</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">Student's Submission:</p>
                    <a href="#" className="text-indigo-600 hover:underline flex items-center gap-2 mt-2">
                        <PaperclipIcon className="w-4 h-4"/>
                        <span>submission_final.pdf</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <label className={labelClasses}>Marks Awarded</label>
                        <input type="number" placeholder="e.g., 85" className={inputFieldClasses} />
                    </div>
                </div>
                <div>
                    <label className={labelClasses}>Feedback (Written or Audio)</label>
                    <div className="relative">
                        <textarea placeholder="Provide constructive feedback..." className={`${inputFieldClasses} h-28 pr-12`}></textarea>
                        <button className="absolute top-3 right-3 p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Record Audio Feedback">
                            <MicIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-xl flex justify-end gap-2">
                <button onClick={onClose} className={btnSecondaryClasses}>Cancel</button>
                <button onClick={onClose} className={btnPrimaryClasses}>Submit Grade</button>
            </div>
        </div>
    </div>
);


const AssignmentManagement = () => {
    const [gradingInfo, setGradingInfo] = useState(null);

    const handleGradeClick = (assignment) => {
        // In a real app, you'd probably select a specific student to grade.
        // Here, we'll just pick a mock student.
        setGradingInfo({ assignment, student: mockData.students[0] });
    };
    
    return (
        <div>
            {gradingInfo && <GradingModal assignment={gradingInfo.assignment} student={gradingInfo.student} onClose={() => setGradingInfo(null)} />}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Assignments</h3>
                <button className={btnPrimaryClasses}><UploadCloudIcon className="w-4 h-4 mr-2"/> Upload New Assignment</button>
            </div>
            <div className="space-y-4">
                {mockData.assignments.map(ass => (
                    <Card key={ass.id} className="!p-4">
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div>
                                <h4 className="font-bold">{ass.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">Deadline: {ass.deadline}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-sm font-semibold">Submissions</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: `${(ass.submitted/ass.total)*100}%`}}></div>
                                    </div>
                                    <p className="text-xs text-right mt-1">{ass.submitted}/{ass.total}</p>
                                </div>
                                {ass.late > 0 && <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">{ass.late} Late</span>}
                                <button onClick={() => handleGradeClick(ass)} className={btnSecondaryClasses}>Grade Submissions</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const MarksAndExamUploads = () => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Internal Assessment 1 - Mark Entry</h3>
            <div className="flex items-center gap-2">
                <button className={btnSecondaryClasses}><UploadCloudIcon className="w-4 h-4 mr-2"/> Import Excel</button>
                <button className={btnPrimaryClasses}><LockIcon className="w-4 h-4 mr-2"/> Lock Marks</button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="p-3">Student ID</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Marks (out of 50)</th>
                        <th className="p-3">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.students.slice(0, 120).map(student => (
                        <tr key={student.id} className="border-b">
                            <td className="p-3 font-mono">{student.id}</td>
                            <td className="p-3">{student.name}</td>
                            <td className="p-3">
                                <input type="number" defaultValue={Math.floor(Math.random() * 40 + 10)} className={`w-20 ${inputFieldClasses} !py-1`}/>
                            </td>
                            <td className="p-3 font-bold text-indigo-600">A</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CommunicationTools = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
            <Card className="lg:col-span-2 flex flex-col">
                <h3 className="font-bold text-lg mb-4">Direct Messaging</h3>
                <div className="flex-1 bg-gray-50 rounded-lg p-4 space-y-4 overflow-y-auto">
                    {/* Chat messages */}
                    <div className="flex items-end gap-2">
                        <img src={mockData.students[5].avatar} alt={mockData.students[5].name} className="w-8 h-8 rounded-full" />
                        <div className="bg-white p-3 rounded-lg rounded-bl-none max-w-md shadow-sm">
                            <p className="text-sm">Hello Dr. Reed, I have a doubt regarding the last assignment. Could you please clarify the scope of the API documentation?</p>
                        </div>
                    </div>
                     <div className="flex items-end gap-2 justify-end">
                         <div className="bg-indigo-500 text-white p-3 rounded-lg rounded-br-none max-w-md shadow-sm">
                             <p className="text-sm">Certainly. You need to focus on the REST endpoints, expected request/response formats, and authentication methods. No need for a full sequence diagram.</p>
                         </div>
                         <img src={mockData.teacher.avatar} alt={mockData.teacher.name} className="w-8 h-8 rounded-full" />
                     </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><PaperclipIcon className="w-5 h-5"/></button>
                    <input type="text" placeholder="Type your message..." className={`flex-1 ${inputFieldClasses}`}/>
                    <button className={`${btnPrimaryClasses} !p-2 !rounded-full`}><SendIcon className="w-5 h-5"/></button>
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-lg mb-4">New Announcement</h3>
                <div className="space-y-3">
                    <input type="text" placeholder="Subject" className={`${inputFieldClasses} w-full`}/>
                    <select className={`${inputFieldClasses} w-full`}>
                        <option>Target: All Classes</option>
                        <option>Target: CS-A</option>
                        <option>Target: CS-B</option>
                    </select>
                    <textarea placeholder="Message..." className={`${inputFieldClasses} w-full h-24`}></textarea>
                    <button className={`${btnPrimaryClasses} w-full`}>Post Announcement</button>
                </div>
            </Card>
        </div>
    );
};

const StudentPerformanceInsights = () => {
    const [filter, setFilter] = useState('all');
    
    const filteredStudents = () => {
        switch(filter) {
            case 'low_attendance': return mockData.students.filter(s => s.attendance < 75);
            case 'low_marks': return mockData.students.filter(s => s.marks < 40);
            default: return mockData.students;
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <h3 className="font-bold text-lg mb-4">Subject-wise Marks Distribution</h3>
                    <div className="flex items-end h-64 space-x-4 p-4 border rounded-lg bg-gray-50">
                        {['DSA', 'Algo', 'OS', 'DBMS', 'CN'].map((subject) => (
                            <div key={subject} className="flex-1 flex flex-col items-center justify-end">
                                <div className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-colors text-white flex items-center justify-center text-xs font-bold" style={{ height: `${Math.random() * 70 + 25}%` }}>
                                    {Math.floor(Math.random() * 20 + 75)}
                                </div>
                                <p className="text-xs mt-2">{subject}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="lg:col-span-2">
                    <h3 className="font-bold text-lg mb-4">At-Risk Students</h3>
                     <p className="text-sm text-gray-500 mb-4">Low attendance or marks.</p>
                    <ul className="space-y-2">
                        {mockData.students.filter(s => s.attendance < 80 || s.marks < 50).slice(0, 3).map(s => (
                            <li key={s.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="font-semibold">{s.name}</p>
                                        <p className="text-xs text-red-700">Att: {s.attendance}% / Marks: {s.marks}</p>
                                    </div>
                                </div>
                                <button className={btnSecondarySmClasses}>Alert</button>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Student List</h3>
                    <div className="flex items-center gap-2">
                        <FilterIcon className="w-5 h-5 text-gray-500"/>
                        <select onChange={(e) => setFilter(e.target.value)} className={inputFieldClasses}>
                            <option value="all">All Students</option>
                            <option value="low_attendance">Below 75% Attendance</option>
                            <option value="low_marks">Below 40% Marks</option>
                        </select>
                        <button className={btnSecondaryClasses}><DownloadIcon className="w-4 h-4 mr-2"/> Export</button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left">
                         <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                             <tr>
                                 <th className="p-3">Student Name</th>
                                 <th className="p-3">Attendance</th>
                                 <th className="p-3">Avg. Marks</th>
                                 <th className="p-3">Performance Trend</th>
                             </tr>
                         </thead>
                         <tbody>
                             {filteredStudents().slice(0, 5).map(student => (
                                 <tr key={student.id} className="border-b hover:bg-gray-50">
                                     <td className="p-3 flex items-center gap-3">
                                         <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                                         {student.name}
                                     </td>
                                     <td className={`p-3 font-semibold ${student.attendance < 75 ? 'text-red-500' : 'text-green-600'}`}>{student.attendance}%</td>
                                     <td className={`p-3 font-semibold ${student.marks < 40 ? 'text-red-500' : 'text-gray-800'}`}>{student.marks}/100</td>
                                     <td className="p-3 text-green-500">▲ Improving</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
            </Card>
        </div>
    );
};

const ProfileAndTeachingInfo = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Edit Profile Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" defaultValue={mockData.teacher.name} className={`${inputFieldClasses} w-full`} />
                </div>
                <div>
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" defaultValue="e.reed@university.edu" className={`${inputFieldClasses} w-full`} />
                </div>
                <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input type="tel" defaultValue="+1 234 567 890" className={`${inputFieldClasses} w-full`} />
                </div>
                <div>
                    <label className={labelClasses}>Department</label>
                    <input type="text" defaultValue={mockData.teacher.department} className={`${inputFieldClasses} w-full`} disabled />
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className={btnPrimaryClasses}>Save Changes</button>
                </div>
            </form>
        </Card>
        <div className="space-y-6">
            <Card>
                <h3 className="font-bold text-lg mb-4">Assigned Subjects</h3>
                <div className="flex flex-wrap gap-2">
                    <span className={tagClasses}>Data Structures</span>
                    <span className={tagClasses}>Algorithms</span>
                    <span className={tagClasses}>Operating Systems</span>
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-lg mb-4">Teaching Materials</h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"><span>DS_Module1.pdf</span> <DownloadIcon className="w-4 h-4 text-gray-500"/></div>
                    <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"><span>Algo_Intro.pptx</span> <DownloadIcon className="w-4 h-4 text-gray-500"/></div>
                </div>
                 <button className={`${btnSecondaryClasses} w-full mt-4`}>Upload New Material</button>
            </Card>
        </div>
    </div>
);

const SecurityAndAccess = () => (
    <Card>
        <h3 className="font-bold text-lg mb-4">Security & Access Control</h3>
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold">Two-Factor Authentication (2FA)</h4>
                <div className="flex items-center justify-between mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">2FA is enabled for sensitive actions.</p>
                    <button className={btnSecondarySmClasses}>Manage Settings</button>
                </div>
            </div>
            <div>
                <h4 className="font-semibold">Action Log</h4>
                <p className="text-sm text-gray-500 mb-2">Recent changes made to grades or attendance.</p>
                <ul className="space-y-2 text-sm">
                    <li className="p-3 bg-gray-50 rounded-md">
                        <span className="font-mono text-xs bg-yellow-100 text-yellow-800 p-1 rounded">UPDATE</span> Mark for <strong>Student 105</strong> in IA1 changed to <strong>45/50</strong>. <span className="text-gray-400 float-right">1h ago</span>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-md">
                        <span className="font-mono text-xs bg-green-100 text-green-800 p-1 rounded">SUBMIT</span> Attendance for <strong>Data Structures</strong> marked. <span className="text-gray-400 float-right">4h ago</span>
                    </li>
                </ul>
            </div>
        </div>
    </Card>
);

export default App;
