import React, { useState, useMemo } from 'react';
import { Shield, Users, UserCheck, Bell, BarChart2, BookOpen, UserCog, LogOut, ChevronDown, Search, AlertTriangle, X } from 'lucide-react';

// Mock Data
const mockData = {
  teachers: [
    { id: 'T1', name: 'Aarav Sharma', email: 'aarav.sharma@puc.edu' },
    { id: 'T2', name: 'Vivaan Singh', email: 'vivaan.singh@puc.edu' },
    { id: 'T3', name: 'Aditya Kumar', email: 'aditya.kumar@puc.edu' },
    { id: 'T4', name: 'Arjun Gupta', email: 'arjun.gupta@puc.edu' },
    { id: 'T5', name: 'Sai Patel', email: 'sai.patel@puc.edu' },
    { id: 'T6', name: 'Reyansh Reddy', email: 'reyansh.reddy@puc.edu' },
    { id: 'T7', name: 'Ishaan Verma', email: 'ishaan.verma@puc.edu' },
    { id: 'T8', name: 'Vihaan Joshi', email: 'vihaan.joshi@puc.edu' },
    { id: 'T9', name: 'Krishna Nair', email: 'krishna.nair@puc.edu' },
    { id: 'T10', name: 'Rohan Mehta', email: 'rohan.mehta@puc.edu' },
    { id: 'T11', name: 'Aanya Reddy', email: 'aanya.reddy@puc.edu' },
    { id: 'T12', name: 'Diya Sharma', email: 'diya.sharma@puc.edu' },
    { id: 'T13', name: 'Pari Singh', email: 'pari.singh@puc.edu' },
    { id: 'T14', name: 'Anika Gupta', email: 'anika.gupta@puc.edu' },
    { id: 'T15', name: 'Myra Kumar', email: 'myra.kumar@puc.edu' },
    { id: 'T16', name: 'Saanvi Patel', email: 'saanvi.patel@puc.edu' },
    { id: 'T17', name: 'Kiara Verma', email: 'kiara.verma@puc.edu' },
    { id: 'T18', name: 'Aarohi Joshi', email: 'aarohi.joshi@puc.edu' },
    { id: 'T19', name: 'Amaira Nair', email: 'amaira.nair@puc.edu' },
    { id: 'T20', name: 'Eva Mehta', email: 'eva.mehta@puc.edu' },
    { id: 'T21', name: 'Zoya Khan', email: 'zoya.khan@puc.edu' },
    { id: 'T22', name: 'Kabir Das', email: 'kabir.das@puc.edu' },
    { id: 'T23', name: 'Aryan Menon', email: 'aryan.menon@puc.edu' },
    { id: 'T24', name: 'Zara Begum', email: 'zara.begum@puc.edu' },
    { id: 'T25', name: 'Yusuf Ahmed', email: 'yusuf.ahmed@puc.edu' },
    { id: 'T26', name: 'Noor Fatima', email: 'noor.fatima@puc.edu' },
    { id: 'T27', name: 'Imran Ali', email: 'imran.ali@puc.edu' },
    { id: 'T28', name: 'Samira Rao', email: 'samira.rao@puc.edu' },
    { id: 'T29', name: 'Ravi Pillai', email: 'ravi.pillai@puc.edu' },
    { id: 'T30', name: 'Priya Iyer', email: 'priya.iyer@puc.edu' },
  ],
  hods: [
    { id: 'HOD1', name: 'Dr. Evelyn Reed', department: 'Science' },
    { id: 'HOD2', name: 'Mr. Samuel Green', department: 'Commerce' },
    { id: 'HOD3', name: 'Ms. Clara Bell', department: 'Arts' },
  ],
  nonTeachingStaff: 20,
  classes: [
    { id: 'C1', name: 'I PUC A', stream: 'Science', classTeacherIds: ['T1', 'T7'] },
    { id: 'C2', name: 'I PUC B', stream: 'Science', classTeacherIds: ['T5'] },
    { id: 'C3', name: 'I PUC C', stream: 'Commerce', classTeacherIds: ['T12', 'T15', 'T20'] },
    { id: 'C4', name: 'II PUC A', stream: 'Science', classTeacherIds: ['T2'] },
    { id: 'C5', name: 'II PUC B', stream: 'Commerce', classTeacherIds: ['T15'] },
    { id: 'C6', name: 'II PUC C', stream: 'Arts', classTeacherIds: [] },
  ],
  alerts: [
    { id: 'A1', type: 'Attendance', severity: 'high', message: 'I PUC A attendance dropped to 72% this week.' },
    { id: 'A2', type: 'Exams', severity: 'medium', message: 'Low performance in Physics for II PUC A in the last mock test.' },
    { id: 'A3', type: 'Staff', severity: 'low', message: 'Mr. Davis (T7) has not marked attendance for 2 days.' },
    { id: 'A4', type: 'Academics', severity: 'high', message: 'Upcoming: JEE Main registration deadline in 3 days.' },
  ],
  examResults: [
    { id: 'E1', year: 2023, examName: 'JEE Main', classId: 'C4', totalAppeared: 50, totalPassed: 25, subjectPerformance: [{ subject: 'Physics', passRate: 55 }, { subject: 'Chemistry', passRate: 60 }, { subject: 'Math', passRate: 45 }] },
    { id: 'E2', year: 2023, examName: 'NEET', classId: 'C4', totalAppeared: 45, totalPassed: 35, subjectPerformance: [{ subject: 'Physics', passRate: 80 }, { subject: 'Chemistry', passRate: 75 }, { subject: 'Biology', passRate: 82 }] },
    { id: 'E3', year: 2023, examName: 'CET', classId: 'C5', totalAppeared: 60, totalPassed: 30, subjectPerformance: [{ subject: 'Business', passRate: 50 }, { subject: 'Accounts', passRate: 60 }] },
    { id: 'E4', year: 2024, examName: 'JEE Main', classId: 'C4', totalAppeared: 52, totalPassed: 18, subjectPerformance: [{ subject: 'Physics', passRate: 40 }, { subject: 'Chemistry', passRate: 45 }, { subject: 'Math', passRate: 35 }] },
    { id: 'E5', year: 2024, examName: 'NEET', classId: 'C4', totalAppeared: 48, totalPassed: 40, subjectPerformance: [{ subject: 'Physics', passRate: 85 }, { subject: 'Chemistry', passRate: 88 }, { subject: 'Biology', passRate: 90 }] },
    { id: 'E6', year: 2024, examName: 'CET', classId: 'C5', totalAppeared: 65, totalPassed: 45, subjectPerformance: [{ subject: 'Business', passRate: 70 }, { subject: 'Accounts', passRate: 65 }] },
    { id: 'E7', year: 2024, examName: 'CET', classId: 'C2', totalAppeared: 55, totalPassed: 20, subjectPerformance: [{ subject: 'Physics', passRate: 38 }, { subject: 'Chemistry', passRate: 42 }] },
  ]
};

// Helper functions
const getTeacherById = (id) => mockData.teachers.find(t => t.id === id);
const getClassById = (id) => mockData.classes.find(c => c.id === id);

// Main App Component
export default function App() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [userRole, setUserRole] = useState('Super Admin');

  const totalStaff = mockData.teachers.length + mockData.nonTeachingStaff;

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardOverview totalStaff={totalStaff} userRole={userRole} />;
      case 'Class Teachers':
        return <ClassTeachersSection />;
      case 'Alerts':
        return <AlertsAndNotifications />;
      case 'Reports & Analytics':
        return <ReportsAndAnalytics />;
      case 'User Roles':
        return <UserRolesAccessControl userRole={userRole} />;
      default:
        return <DashboardOverview totalStaff={totalStaff} userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar setActiveView={setActiveView} activeView={activeView} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

// Sidebar Component
const Sidebar = ({ setActiveView, activeView, userRole }) => {
  const navItems = [
    { name: 'Dashboard', icon: Shield, roles: ['Super Admin', 'Admin', 'Principal', 'HOD'] },
    { name: 'Class Teachers', icon: UserCheck, roles: ['Super Admin', 'Admin', 'Principal'] },
    { name: 'Alerts', icon: Bell, roles: ['Super Admin', 'Admin', 'Principal', 'HOD'] },
    { name: 'Reports & Analytics', icon: BarChart2, roles: ['Super Admin', 'Admin', 'Principal'] },
    { name: 'User Roles', icon: UserCog, roles: ['Super Admin'] },
  ];

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold text-indigo-600 border-b">
        PUC Portal
      </div>
      <nav className="flex-1 px-4 py-4">
        {navItems.map(item => (
          item.roles.includes(userRole) && (
            <a
              key={item.name}
              href="#"
              onClick={() => setActiveView(item.name)}
              className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                activeView === item.name
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-indigo-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-4 font-medium">{item.name}</span>
            </a>
          )
        ))}
      </nav>
      <div className="p-4 border-t">
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-100 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span className="ml-4 font-medium">Logout</span>
        </a>
      </div>
    </aside>
  );
};

// Header Component
const Header = ({ userRole, setUserRole }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const roles = ['Super Admin', 'Admin', 'Principal', 'HOD'];

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userRole}</h1>
            <div className="relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                    <span>Change Role</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                        {roles.map(role => (
                            <a
                                key={role}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setUserRole(role);
                                    setDropdownOpen(false);
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                            >
                                {role}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

// Dashboard Overview Component
const DashboardOverview = ({ totalStaff, userRole }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InfoCard icon={Users} title="Total Teachers" value={mockData.teachers.length} color="blue" />
        <InfoCard icon={UserCog} title="Heads of Dept." value={mockData.hods.length} color="green" />
        <InfoCard icon={Users} title="Total Staff" value={totalStaff} color="purple" />
      </div>

      {userRole === 'Super Admin' && <CompetitiveExamOverview />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Class Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.classes.map(cls => <ClassCard key={cls.id} cls={cls} />)}
            </div>
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">HOD List</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <ul>
                    {mockData.hods.map(hod => (
                        <li key={hod.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <div>
                                <p className="font-semibold text-gray-800">{hod.name}</p>
                                <p className="text-sm text-gray-500">{hod.department}</p>
                            </div>
                            <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">{hod.department.slice(0,3).toUpperCase()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Card
const InfoCard = ({ icon: Icon, title, value, color }) => {
    const colors = {
        blue: 'from-blue-500 to-blue-400',
        green: 'from-green-500 to-green-400',
        purple: 'from-purple-500 to-purple-400',
    };
    return (
        <div className={`bg-gradient-to-br ${colors[color]} text-white p-6 rounded-xl shadow-lg flex items-center justify-between`}>
            <div>
                <p className="text-lg font-medium">{title}</p>
                <p className="text-4xl font-bold">{value}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Icon className="w-8 h-8" />
            </div>
        </div>
    );
};

// Class Summary Card
const ClassCard = ({ cls }) => {
  const teachers = cls.classTeacherIds.map(id => getTeacherById(id)).filter(Boolean);
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold text-gray-800">{cls.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{cls.stream}</p>
      <div className="border-t pt-3 space-y-2">
        <p className="font-semibold text-gray-700">Class Teachers:</p>
        {teachers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {teachers.map(teacher => (
              <span key={teacher.id} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{teacher.name}</span>
            ))}
          </div>
        ) : (
          <p className="text-sm font-semibold text-red-500">Not Assigned</p>
        )}
      </div>
    </div>
  );
};


// Competitive Exam Overview Component
const CompetitiveExamOverview = () => {
    const [year, setYear] = useState('2024');
    const [exam, setExam] = useState('All');
    const [className, setClassName] = useState('All');

    const uniqueYears = [...new Set(mockData.examResults.map(r => r.year))];
    const uniqueExams = ['All', ...new Set(mockData.examResults.map(r => r.examName))];
    const uniqueClasses = ['All', ...new Set(mockData.examResults.map(r => getClassById(r.classId)?.name))];

    const filteredResults = useMemo(() => {
        return mockData.examResults.filter(r => 
            (year === 'All' || r.year.toString() === year) &&
            (exam === 'All' || r.examName === exam) &&
            (className === 'All' || getClassById(r.classId)?.name === className)
        );
    }, [year, exam, className]);

    const lowPerformers = filteredResults.filter(r => (r.totalPassed / r.totalAppeared) * 100 < 40);

    const getPerformanceColor = (percentage) => {
        if (percentage < 40) return 'bg-red-500';
        if (percentage < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Competitive Exam Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select value={year} onChange={e => setYear(e.target.value)} className="p-2 border rounded-lg">
                    {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={exam} onChange={e => setExam(e.target.value)} className="p-2 border rounded-lg">
                    {uniqueExams.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                <select value={className} onChange={e => setClassName(e.target.value)} className="p-2 border rounded-lg">
                    {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-3 font-semibold text-gray-600">Exam</th>
                            <th className="p-3 font-semibold text-gray-600">Class</th>
                            <th className="p-3 font-semibold text-gray-600">Appeared</th>
                            <th className="p-3 font-semibold text-gray-600">Passed</th>
                            <th className="p-3 font-semibold text-gray-600">Pass %</th>
                            <th className="p-3 font-semibold text-gray-600">Subject Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map(r => {
                            const passPercentage = ((r.totalPassed / r.totalAppeared) * 100).toFixed(1);
                            return (
                                <tr key={r.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{r.examName}</td>
                                    <td className="p-3 text-gray-600">{getClassById(r.classId)?.name}</td>
                                    <td className="p-3 text-gray-600">{r.totalAppeared}</td>
                                    <td className="p-3 text-gray-600">{r.totalPassed}</td>
                                    <td className="p-3 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${getPerformanceColor(passPercentage)}`}></span>
                                            {passPercentage}%
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap gap-1">
                                            {r.subjectPerformance.map(sp => (
                                                <span key={sp.subject} className={`text-xs px-2 py-1 rounded-full text-white ${getPerformanceColor(sp.passRate)}`}>
                                                    {sp.subject}: {sp.passRate}%
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                 {filteredResults.length === 0 && <p className="text-center text-gray-500 py-4">No data matches your filters.</p>}
            </div>
            {lowPerformers.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center"><AlertTriangle className="w-5 h-5 mr-2"/>Low Performance Alerts</h3>
                    <div className="bg-red-50 p-4 rounded-lg">
                        <ul className="list-disc list-inside space-y-1">
                            {lowPerformers.map(r => (
                                <li key={r.id} className="text-red-800">
                                    <strong>{getClassById(r.classId)?.name}</strong> has a pass rate of only <strong>{((r.totalPassed / r.totalAppeared) * 100).toFixed(1)}%</strong> in <strong>{r.examName} ({r.year})</strong>.
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

// Class Teachers Section Component
const ClassTeachersSection = () => {
  const [classes, setClasses] = useState(mockData.classes);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClass, setEditingClass] = useState(null);

  const handleUpdateAssignments = (classId, teacherIds) => {
    setClasses(classes.map(c => c.id === classId ? { ...c, classTeacherIds: teacherIds } : c));
    setEditingClass(null);
  };

  const filteredClasses = classes.filter(c => {
    const assignedTeachers = c.classTeacherIds.map(id => getTeacherById(id)?.name || '').join(' ');
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignedTeachers.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Class Teachers</h2>
      <div className="mb-4 relative">
          <input 
              type="text"
              placeholder="Search by class, teacher, or stream..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">Class</th>
              <th className="p-4 font-semibold text-gray-600">Stream</th>
              <th className="p-4 font-semibold text-gray-600">Assigned Teachers</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map(cls => (
              <ClassTeacherRow 
                key={cls.id} 
                cls={cls} 
                onManage={() => setEditingClass(cls)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {editingClass && (
        <TeacherAssignmentModal 
            classToEdit={editingClass}
            allTeachers={mockData.teachers}
            onClose={() => setEditingClass(null)}
            onSave={handleUpdateAssignments}
        />
      )}
    </div>
  );
};

// Row for Class Teacher Table
const ClassTeacherRow = ({ cls, onManage }) => {
    const assignedTeachers = cls.classTeacherIds.map(id => getTeacherById(id)).filter(Boolean);

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">{cls.name}</td>
            <td className="p-4 text-gray-600">{cls.stream}</td>
            <td className="p-4 text-gray-600">
                {assignedTeachers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {assignedTeachers.slice(0, 2).map(t => (
                            <span key={t.id} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{t.name}</span>
                        ))}
                        {assignedTeachers.length > 2 && (
                            <span className="text-xs bg-gray-300 text-gray-900 px-2 py-1 rounded-full">+{assignedTeachers.length - 2} more</span>
                        )}
                    </div>
                ) : (
                    <span className="text-red-500 font-medium">Unassigned</span>
                )}
            </td>
            <td className="p-4 text-center">
                <button onClick={onManage} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600">
                    Manage
                </button>
            </td>
        </tr>
    );
};

// Teacher Assignment Modal Component
const TeacherAssignmentModal = ({ classToEdit, allTeachers, onClose, onSave }) => {
    const [selectedIds, setSelectedIds] = useState(classToEdit.classTeacherIds || []);

    const handleToggleTeacher = (teacherId) => {
        setSelectedIds(prev => 
            prev.includes(teacherId) ? prev.filter(id => id !== teacherId) : [...prev, teacherId]
        );
    };

    const handleSave = () => {
        onSave(classToEdit.id, selectedIds);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">Manage Teachers for {classToEdit.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X /></button>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allTeachers.map(teacher => (
                            <label key={teacher.id} className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={selectedIds.includes(teacher.id)}
                                    onChange={() => handleToggleTeacher(teacher.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-gray-700">{teacher.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
}


// Alerts and Notifications Component
const AlertsAndNotifications = () => {
  const getAlertStyle = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Alerts & Notifications</h2>
      <div className="space-y-4">
        {mockData.alerts.map(alert => (
          <div key={alert.id} className={`p-4 rounded-lg border-l-4 flex items-center justify-between ${getAlertStyle(alert.severity)}`}>
            <div>
              <p className="font-bold text-gray-800">{alert.type} Alert</p>
              <p className="text-gray-600">{alert.message}</p>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-800">Dismiss</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reports and Analytics Component
const ReportsAndAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportCard title="Teacher Performance" description="Download individual or overall teacher performance reports." />
        <ReportCard title="Departmental Performance" description="View performance across streams for various exams." />
        <ReportCard title="Student Pass/Fail Analysis" description="Analyze pass/fail percentages per subject and class." />
        <ReportCard title="Custom Report Generator" description="Create custom reports based on various filters." />
      </div>
    </div>
  );
};

const ReportCard = ({ title, description }) => (
    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-indigo-700">{title}</h3>
        <p className="text-gray-600 mt-2 mb-4">{description}</p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors w-full">Generate</button>
    </div>
);


// User Roles & Access Control Component
const UserRolesAccessControl = ({ userRole }) => {
  if (userRole !== 'Super Admin') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You do not have permission to view this page. Please contact a Super Admin.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Roles & Access Control</h2>
      <p className="text-gray-600">As a <span className="font-bold text-indigo-600">Super Admin</span>, you can manage all aspects of the system.</p>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Key Permissions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Manage all teacher and staff data.</li>
            <li>Assign/reassign HODs and Class Teachers.</li>
            <li>Set alert thresholds for attendance and exam performance.</li>
            <li>Define role permissions for Admin, Principal, and HOD roles.</li>
            <li>View audit logs for all major system changes.</li>
        </ul>
      </div>
    </div>
  );
};
