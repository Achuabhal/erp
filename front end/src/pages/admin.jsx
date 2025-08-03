import React, { useState } from 'react';
import { Home, Users, BookUser, GraduationCap, Briefcase, BookOpen, CalendarCheck, FileText, BarChart2, IndianRupee, Bell, FileArchive, Library, Bus, BedDouble, LifeBuoy, ShieldCheck, Menu, X, MoreVertical, Trash2, Edit, Download, Upload, PlusCircle, Eye } from 'lucide-react';

// Mock Data - Expanded for new components
const mockData = {
    dashboard: {
        studentCount: 1325,
        facultyCount: 82,
        nonTeachingStaffCount: 35,
        feeCollection: '₹48,75,000',
        attendance: [
            { name: 'I PUC Science', value: 92 },
            { name: 'II PUC Science', value: 88 },
            { name: 'I PUC Commerce', value: 95 },
            { name: 'II PUC Commerce', value: 85 },
        ],
        performance: [
            { subject: 'Physics', avg: 85 },
            { subject: 'Chemistry', avg: 78 },
            { subject: 'Maths', avg: 81 },
            { subject: 'Biology', avg: 88 },
            { subject: 'Commerce', avg: 75 },
            { name: 'Economics', avg: 80 },
            { name: 'Computer Sci', avg: 91 },
        ],
    },
    users: [
        { id: 1, name: 'Akshay Sharma', role: 'Admin', email: 'akshay.admin@pucollege.edu', status: 'Active' },
        { id: 2, name: 'Priya Verma', role: 'Teacher', email: 'priya.verma@pucollege.edu', status: 'Active' },
        { id: 3, name: 'Rohan Singh', role: 'Student', email: 'rohan.singh@pucollege.edu', status: 'Active' },
        { id: 4, name: 'Anjali Gupta', role: 'Accountant', email: 'anjali.gupta@pucollege.edu', status: 'Inactive' },
        { id: 5, name: 'Suresh Kumar', role: 'Librarian', email: 'suresh.kumar@pucollege.edu', status: 'Active' },
        { id: 6, name: 'Manoj Patel', role: 'Teacher', email: 'manoj.patel@pucollege.edu', status: 'Active' },
        { id: 7, name: 'Kavita Iyer', role: 'Student', email: 'kavita.iyer@pucollege.edu', status: 'Active' },
        { id: 8, name: 'Deepak Rao', role: 'Office Staff', email: 'deepak.rao@pucollege.edu', status: 'Active' },
    ],
    students: [
        { id: 'S001', name: 'Rohan Singh', course: 'Science', year: 'II PUC', admissionDate: '2023-06-15', contact: '9876543210' },
        { id: 'S002', name: 'Meera Desai', course: 'Commerce', year: 'I PUC', admissionDate: '2024-06-20', contact: '9876543211' },
        { id: 'S003', name: 'Arjun Mehta', course: 'Science', year: 'I PUC', admissionDate: '2024-06-21', contact: '9876543212' },
        { id: 'S004', name: 'Sneha Patel', course: 'Commerce', year: 'II PUC', admissionDate: '2023-06-16', contact: '9876543213' },
        { id: 'S005', name: 'Kavita Iyer', course: 'Science', year: 'I PUC', admissionDate: '2024-06-22', contact: '9876543214' },
        { id: 'S006', name: 'Vikram Reddy', course: 'Commerce', year: 'I PUC', admissionDate: '2024-06-22', contact: '9876543215' },
        { id: 'S007', name: 'Nisha Agarwal', course: 'Science', year: 'II PUC', admissionDate: '2023-06-18', contact: '9876543216' },
        { id: 'S008', name: 'Imran Khan', course: 'Commerce', year: 'II PUC', admissionDate: '2023-06-19', contact: '9876543217' },
    ],
    faculty: [
        { id: 'F01', name: 'Dr. Vikram Rao', subject: 'Physics', class: 'II PUC Science', status: 'Active' },
        { id: 'F02', name: 'Mrs. Sunita Menon', subject: 'Chemistry', class: 'I & II PUC Science', status: 'Active' },
        { id: 'F03', name: 'Mr. Rajesh Shah', subject: 'Accountancy', class: 'I & II PUC Commerce', status: 'On Leave' },
        { id: 'F04', name: 'Ms. Geeta Sharma', subject: 'Biology', class: 'I & II PUC Science', status: 'Active' },
        { id: 'F05', name: 'Mr. Anand Kumar', subject: 'Mathematics', class: 'I & II PUC Science', status: 'Active' },
        { id: 'F06', name: 'Mrs. Deepa Hegde', subject: 'Economics', class: 'I & II PUC Commerce', status: 'Active' },
    ],
    courses: [
        { id: 'C01', name: 'Science (PCMB)', duration: '2 Years', head: 'Dr. Vikram Rao' },
        { id: 'C02', name: 'Commerce (CEBA)', duration: '2 Years', head: 'Mr. Rajesh Shah' },
        { id: 'C03', name: 'Science (PCMC)', duration: '2 Years', head: 'Dr. Vikram Rao' },
    ],
    attendance: [
        { id: 1, date: '2024-07-28', class: 'II PUC Science', present: 58, total: 60, percentage: 96.6 },
        { id: 2, date: '2024-07-28', class: 'I PUC Commerce', present: 45, total: 50, percentage: 90 },
        { id: 3, date: '2024-07-27', class: 'II PUC Science', present: 55, total: 60, percentage: 91.7 },
        { id: 4, date: '2024-07-27', class: 'I PUC Science', present: 62, total: 65, percentage: 95.4 },
        { id: 5, date: '2024-07-26', class: 'II PUC Commerce', present: 48, total: 52, percentage: 92.3 },
    ],
    exams: [
        { id: 'E01', name: 'I Mid-Term Exam', date: '2024-09-15', class: 'All', status: 'Scheduled' },
        { id: 'E02', name: 'Annual Exam', date: '2025-03-10', class: 'All', status: 'Upcoming' },
        { id: 'E03', name: 'I Unit Test', date: '2024-07-20', class: 'All', status: 'Completed' },
    ],
    fees: [
        { studentId: 'S001', name: 'Rohan Singh', totalFee: 75000, paid: 75000, balance: 0, status: 'Paid' },
        { studentId: 'S002', name: 'Meera Desai', totalFee: 65000, paid: 32500, balance: 32500, status: 'Partial' },
        { studentId: 'S004', name: 'Sneha Patel', totalFee: 65000, paid: 0, balance: 65000, status: 'Unpaid' },
        { studentId: 'S003', name: 'Arjun Mehta', totalFee: 75000, paid: 75000, balance: 0, status: 'Paid' },
        { studentId: 'S005', name: 'Kavita Iyer', totalFee: 75000, paid: 37500, balance: 37500, status: 'Partial' },
        { studentId: 'S007', name: 'Nisha Agarwal', totalFee: 75000, paid: 75000, balance: 0, status: 'Paid' },
    ],
    notifications: [
        { id: 1, title: 'Holiday Declared', content: 'College will be closed on 2024-08-15 for Independence Day.', date: '2024-08-01', audience: 'All' },
        { id: 2, title: 'Exam Timetable', content: 'Mid-term exam timetable has been published on the portal.', date: '2024-07-30', audience: 'Students' },
        { id: 3, title: 'Faculty Meeting', content: 'A mandatory meeting for all faculty members is scheduled for 2024-08-05.', date: '2024-07-29', audience: 'Faculty' },
        { id: 4, title: 'Fee Payment Reminder', content: 'Last date for fee payment for the first installment is 2024-08-10.', date: '2024-07-28', audience: 'Students' },
    ],
    documents: [
        { id: 1, name: 'Bonafide Certificate Template.docx', type: 'Template', size: '15 KB', lastModified: '2024-01-10' },
        { id: 2, name: 'Academic Calendar 2024-25.pdf', type: 'Academic', size: '250 KB', lastModified: '2024-05-20' },
        { id: 3, name: 'Sports Day Schedule.pdf', type: 'Circular', size: '150 KB', lastModified: '2024-07-15' },
        { id: 4, name: 'Leave Application Form.pdf', type: 'Template', size: '50 KB', lastModified: '2024-02-01' },
    ],
    library: [
        { id: 'B001', title: 'Concepts of Physics', author: 'H.C. Verma', status: 'Available' },
        { id: 'B002', title: 'Accountancy Class 12', author: 'D.K. Goel', status: 'Issued' },
        { id: 'B003', title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', status: 'Available' },
        { id: 'B004', title: 'A Brief History of Time', author: 'Stephen Hawking', status: 'Available' },
        { id: 'B005', title: 'The Intelligent Investor', author: 'Benjamin Graham', status: 'Issued' },
        { id: 'B006', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', status: 'Overdue' },
    ],
    hostel: [
        { id: 'H01', room: '101A', studentId: 'S001', studentName: 'Rohan Singh', status: 'Occupied' },
        { id: 'H02', room: '101B', studentId: null, studentName: '-', status: 'Vacant' },
        { id: 'H03', room: '102A', studentId: 'S003', studentName: 'Arjun Mehta', status: 'Occupied' },
        { id: 'H04', room: '102B', studentId: 'S007', studentName: 'Nisha Agarwal', status: 'Occupied' },
        { id: 'H05', room: '201A', studentId: null, studentName: '-', status: 'Vacant' },
    ],
    transport: [
        { id: 'T01', route: 'Route A - City Center', studentId: 'S002', studentName: 'Meera Desai', status: 'Assigned' },
        { id: 'T02', route: 'Route B - Suburbs', studentId: 'S004', studentName: 'Sneha Patel', status: 'Assigned' },
        { id: 'T03', route: 'Route C - North Zone', studentId: 'S006', studentName: 'Vikram Reddy', status: 'Assigned' },
        { id: 'T04', route: 'Route A - City Center', studentId: 'S008', studentName: 'Imran Khan', status: 'Assigned' },
    ],
    supportTickets: [
        { id: 'TKT001', subject: 'Fee Receipt Error', user: 'Rohan Singh', date: '2024-07-25', status: 'Closed' },
        { id: 'TKT002', subject: 'Login Issue', user: 'Priya Verma', date: '2024-07-28', status: 'Open' },
        { id: 'TKT003', subject: 'Library book not found', user: 'Kavita Iyer', date: '2024-07-29', status: 'Open' },
        { id: 'TKT004', subject: 'Incorrect attendance marked', user: 'Sneha Patel', date: '2024-07-30', status: 'In Progress' },
    ],
    auditLogs: [
        { id: 1, timestamp: '2024-07-28 10:15 AM', user: 'Akshay Sharma', action: 'Deleted user: Anjali Gupta' },
        { id: 2, timestamp: '2024-07-28 09:30 AM', user: 'Admin', action: 'Scheduled new exam: I Mid-Term' },
        { id: 3, timestamp: '2024-07-29 11:00 AM', user: 'Suresh Kumar', action: 'Added new book: A Brief History of Time' },
        { id: 4, timestamp: '2024-07-30 02:45 PM', user: 'Priya Verma', action: 'Updated attendance for II PUC Science' },
        { id: 5, timestamp: '2024-07-31 05:20 PM', user: 'Akshay Sharma', action: 'Sent notification: Fee Payment Reminder' },
    ]
};

// Reusable Components
const Card = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
        {children}
    </div>
);

const StatCard = ({ icon, title, value, color }) => (
    <Card className={`flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </Card>
);

const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button' }) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    return (
        <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Table = ({ headers, data, renderRow }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {headers.map(header => <th key={header} scope="col" className="px-6 py-3">{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item, index) => renderRow(item, index)) : (
                    <tr>
                        <td colSpan={headers.length} className="text-center py-8 text-gray-500 dark:text-gray-400">No data available.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

const FormInput = ({ label, name, defaultValue = '', type = 'text', required = true }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input type={type} name={name} defaultValue={defaultValue} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required={required} />
    </div>
);

const FormSelect = ({ label, name, defaultValue = '', options, required = true }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select name={name} defaultValue={defaultValue} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required={required}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


// Page Components
const Dashboard = () => {
    const { dashboard } = mockData;
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<GraduationCap />} title="Total Students" value={dashboard.studentCount} color="border-blue-500" />
                <StatCard icon={<Briefcase />} title="Total Faculty" value={dashboard.facultyCount} color="border-green-500" />
                <StatCard icon={<Users />} title="Non-Teaching Staff" value={dashboard.nonTeachingStaffCount} color="border-yellow-500" />
                <StatCard icon={<IndianRupee />} title="Fee Collection" value={dashboard.feeCollection} color="border-purple-500" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Attendance Overview</h2>
                    <div className="space-y-4">
                        {dashboard.attendance.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-base font-medium text-gray-600 dark:text-gray-300">{item.name}</span>
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-500">{item.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Subject Performance (Avg %)</h2>
                    <div className="h-64 flex items-end justify-around space-x-2 pt-4">
                        {dashboard.performance.map(p => (
                            <div key={p.subject || p.name} className="flex flex-col items-center w-12 text-center">
                                <div className="w-full bg-green-500 rounded-t-lg" style={{height: `${p.avg}%`}}></div>
                                <span className="text-xs mt-1 text-gray-500 dark:text-gray-400 break-words">{p.subject || p.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const UserManagement = () => {
    const [users, setUsers] = useState(mockData.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
        } else {
            const newUser = { id: Date.now(), ...userData, status: 'Active' };
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };
    
    const headers = ['Name', 'Role', 'Email', 'Status', 'Actions'];
    const renderRow = (user) => (
        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
            <td className="px-6 py-4">{user.role}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                    {user.status}
                </span>
            </td>
            <td className="px-6 py-4 flex space-x-2">
                <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"><Edit size={18} /></button>
                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"><Trash2 size={18} /></button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
                <Button onClick={handleAddNew}><PlusCircle size={18} /> Add New User</Button>
            </div>
            <Card>
                <Table headers={headers} data={users} renderRow={renderRow} />
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput label="Full Name" name="name" defaultValue={editingUser?.name} />
                    <FormInput label="Email" name="email" type="email" defaultValue={editingUser?.email} />
                    <FormSelect label="Role" name="role" defaultValue={editingUser?.role} options={['Admin', 'Teacher', 'Student', 'Accountant', 'Librarian', 'Office Staff']} />
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const CourseManagement = () => {
    const [courses, setCourses] = useState(mockData.courses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

    const handleEdit = (course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };
    const handleAddNew = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };
    const handleDelete = (courseId) => setCourses(courses.filter(c => c.id !== courseId));
    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const courseData = Object.fromEntries(formData.entries());
        if (editingCourse) {
            setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...courseData } : c));
        } else {
            setCourses([...courses, { id: `C${Date.now()}`.slice(-3), ...courseData }]);
        }
        setIsModalOpen(false);
    };

    const headers = ['Course ID', 'Course Name', 'Duration', 'Department Head', 'Actions'];
    const renderRow = (course) => (
        <tr key={course.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{course.id}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{course.name}</td>
            <td className="px-6 py-4">{course.duration}</td>
            <td className="px-6 py-4">{course.head}</td>
            <td className="px-6 py-4 flex space-x-2">
                <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Course & Class Management</h1>
                <Button onClick={handleAddNew}><PlusCircle size={18} /> Add New Course</Button>
            </div>
            <Card>
                <Table headers={headers} data={courses} renderRow={renderRow} />
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCourse ? 'Edit Course' : 'Add New Course'}>
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput label="Course Name" name="name" defaultValue={editingCourse?.name} />
                    <FormInput label="Duration" name="duration" defaultValue={editingCourse?.duration} />
                    <FormInput label="Department Head" name="head" defaultValue={editingCourse?.head} />
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Course</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const AttendanceManagement = () => {
    const [attendance, setAttendance] = useState(mockData.attendance);
    
    const headers = ['Date', 'Class', 'Present', 'Total Students', 'Percentage', 'Actions'];
    const renderRow = (record) => (
        <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{record.date}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{record.class}</td>
            <td className="px-6 py-4">{record.present}</td>
            <td className="px-6 py-4">{record.total}</td>
            <td className="px-6 py-4">
                <span className={`font-semibold ${record.percentage > 90 ? 'text-green-600' : record.percentage > 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {record.percentage.toFixed(1)}%
                </span>
            </td>
            <td className="px-6 py-4">
                <Button variant="secondary" className="py-1 px-2 text-xs"><Eye size={16} /> View Details</Button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Attendance Management</h1>
            <Card>
                <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <FormInput label="Select Date" name="date" type="date" defaultValue="2024-07-28" />
                    <FormSelect label="Select Class" name="class" options={['All Classes', 'I PUC Science', 'II PUC Science', 'I PUC Commerce', 'II PUC Commerce']} />
                    <div className="self-end">
                        <Button>Filter</Button>
                    </div>
                </div>
                <Table headers={headers} data={attendance} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const ExamManagement = () => {
    const [exams, setExams] = useState(mockData.exams);
    
    const headers = ['Exam Name', 'Date', 'Class', 'Status', 'Actions'];
    const renderRow = (exam) => (
        <tr key={exam.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{exam.name}</td>
            <td className="px-6 py-4">{exam.date}</td>
            <td className="px-6 py-4">{exam.class}</td>
            <td className="px-6 py-4">
                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${exam.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : exam.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{exam.status}</span>
            </td>
            <td className="px-6 py-4 flex space-x-2">
                <Button variant="secondary" className="py-1 px-2 text-xs">Enter Marks</Button>
                <Button variant="secondary" className="py-1 px-2 text-xs">View Report</Button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Examination & Results</h1>
                <Button><PlusCircle size={18} /> Schedule Exam</Button>
            </div>
            <Card>
                <Table headers={headers} data={exams} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const FeeManagement = () => {
    const [fees, setFees] = useState(mockData.fees);
    
    const headers = ['Student ID', 'Student Name', 'Total Fee (₹)', 'Amount Paid (₹)', 'Balance (₹)', 'Status', 'Actions'];
    const renderRow = (fee) => (
        <tr key={fee.studentId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{fee.studentId}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{fee.name}</td>
            <td className="px-6 py-4">{fee.totalFee.toLocaleString('en-IN')}</td>
            <td className="px-6 py-4">{fee.paid.toLocaleString('en-IN')}</td>
            <td className="px-6 py-4 font-semibold text-red-600">{fee.balance.toLocaleString('en-IN')}</td>
            <td className="px-6 py-4">
                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' : fee.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{fee.status}</span>
            </td>
            <td className="px-6 py-4">
                <Button variant="primary" className="py-1 px-2 text-xs">Record Payment</Button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Fee Management</h1>
                <Button variant="secondary">View Defaulters</Button>
            </div>
            <Card>
                <Table headers={headers} data={fees} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState(mockData.notifications);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const notifData = Object.fromEntries(formData.entries());
        const newNotification = { 
            id: Date.now(), 
            ...notifData,
            date: new Date().toISOString().split('T')[0]
        };
        setNotifications([newNotification, ...notifications]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Notification & Communication</h1>
                <Button onClick={() => setIsModalOpen(true)}><PlusCircle size={18} /> Send Notification</Button>
            </div>
            <Card>
                <div className="space-y-4">
                    {notifications.map(n => (
                        <div key={n.id} className="p-4 border rounded-lg dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white">{n.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{n.content}</p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <p className="text-xs text-gray-500">{n.date}</p>
                                    <p className="text-xs text-gray-500 mt-1">To: {n.audience}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Send New Notification">
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput label="Title" name="title" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                        <textarea name="content" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                    </div>
                    <FormSelect label="Target Audience" name="audience" options={['All', 'Students', 'Faculty', 'Non-Teaching Staff']} />
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const DocumentManagement = () => {
    const [documents, setDocuments] = useState(mockData.documents);
    
    const headers = ['File Name', 'Type', 'Size', 'Last Modified', 'Actions'];
    const renderRow = (doc) => (
        <tr key={doc.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{doc.name}</td>
            <td className="px-6 py-4">{doc.type}</td>
            <td className="px-6 py-4">{doc.size}</td>
            <td className="px-6 py-4">{doc.lastModified}</td>
            <td className="px-6 py-4 flex space-x-2">
                <Button variant="secondary" className="py-1 px-2 text-xs"><Download size={16} /> Download</Button>
                <Button variant="danger" className="py-1 px-2 text-xs"><Trash2 size={16} /></Button>
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Document Management</h1>
                <Button><Upload size={18} /> Upload Document</Button>
            </div>
            <Card>
                <Table headers={headers} data={documents} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const LibraryManagement = () => {
    const [books, setBooks] = useState(mockData.library);
    
    const headers = ['Book ID', 'Title', 'Author', 'Status', 'Actions'];
    const renderRow = (book) => (
        <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{book.id}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{book.title}</td>
            <td className="px-6 py-4">{book.author}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.status === 'Available' ? 'bg-green-100 text-green-800' : book.status === 'Issued' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{book.status}</span>
            </td>
            <td className="px-6 py-4">
                {book.status === 'Available' ? 
                    <Button variant="primary" className="py-1 px-2 text-xs">Issue Book</Button> :
                    <Button variant="secondary" className="py-1 px-2 text-xs">Return Book</Button>
                }
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Library Management</h1>
                <Button><PlusCircle size={18} /> Add New Book</Button>
            </div>
            <Card>
                <Table headers={headers} data={books} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const HostelManagement = () => {
    const headers = ['Room No.', 'Student ID', 'Student Name', 'Status', 'Actions'];
    const renderRow = (room) => (
        <tr key={room.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{room.room}</td>
            <td className="px-6 py-4">{room.studentId || '-'}</td>
            <td className="px-6 py-4">{room.studentName}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${room.status === 'Occupied' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{room.status}</span>
            </td>
            <td className="px-6 py-4">
                {room.status === 'Vacant' && <Button variant="primary" className="py-1 px-2 text-xs">Assign Room</Button>}
            </td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Hostel Management</h1>
            <Card>
                <Table headers={headers} data={mockData.hostel} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const TransportManagement = () => {
    const headers = ['Route', 'Student ID', 'Student Name', 'Status', 'Actions'];
    const renderRow = (route) => (
        <tr key={route.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{route.route}</td>
            <td className="px-6 py-4">{route.studentId}</td>
            <td className="px-6 py-4">{route.studentName}</td>
            <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{route.status}</span>
            </td>
            <td className="px-6 py-4">
                <Button variant="secondary" className="py-1 px-2 text-xs">Change</Button>
            </td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Transport Management</h1>
            <Card>
                <Table headers={headers} data={mockData.transport} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const SupportHelpdesk = () => {
    const headers = ['Ticket ID', 'Subject', 'User', 'Date', 'Status', 'Actions'];
    const renderRow = (ticket) => (
        <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{ticket.id}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ticket.subject}</td>
            <td className="px-6 py-4">{ticket.user}</td>
            <td className="px-6 py-4">{ticket.date}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.status === 'Open' ? 'bg-green-100 text-green-800' : ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{ticket.status}</span>
            </td>
            <td className="px-6 py-4">
                <Button variant="secondary" className="py-1 px-2 text-xs"><Eye size={16} /> View</Button>
            </td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Support & Helpdesk</h1>
            <Card>
                <Table headers={headers} data={mockData.supportTickets} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const SecurityLogs = () => {
    const headers = ['Timestamp', 'User', 'Action'];
    const renderRow = (log) => (
        <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{log.timestamp}</td>
            <td className="px-6 py-4">{log.user}</td>
            <td className="px-6 py-4 font-mono text-xs">{log.action}</td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Security & Logs</h1>
            <Card>
                <Table headers={headers} data={mockData.auditLogs} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const StudentManagement = () => {
    const headers = ['Admission No', 'Name', 'Course', 'Year', 'Admission Date', 'Actions'];
    const renderRow = (student) => (
        <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.id}</td>
            <td className="px-6 py-4">{student.name}</td>
            <td className="px-6 py-4">{student.course}</td>
            <td className="px-6 py-4">{student.year}</td>
            <td className="px-6 py-4">{student.admissionDate}</td>
            <td className="px-6 py-4 flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
            </td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Management</h1>
                <Button><PlusCircle size={18} /> Add New Student</Button>
            </div>
            <Card>
                <Table headers={headers} data={mockData.students} renderRow={renderRow} />
            </Card>
        </div>
    );
};

const FacultyManagement = () => {
    const headers = ['Faculty ID', 'Name', 'Subject', 'Assigned Class', 'Status', 'Actions'];
    const renderRow = (faculty) => (
        <tr key={faculty.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{faculty.id}</td>
            <td className="px-6 py-4">{faculty.name}</td>
            <td className="px-6 py-4">{faculty.subject}</td>
            <td className="px-6 py-4">{faculty.class}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${faculty.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                    {faculty.status}
                </span>
            </td>
            <td className="px-6 py-4 flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
            </td>
        </tr>
    );
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Faculty Management</h1>
                <Button><PlusCircle size={18} /> Add New Faculty</Button>
            </div>
            <Card>
                <Table headers={headers} data={mockData.faculty} renderRow={renderRow} />
            </Card>
        </div>
    );
};


// Sidebar Component
const Sidebar = ({ activeComponent, setActiveComponent, isOpen, setIsOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, component: 'Dashboard' },
        { name: 'User Management', icon: <Users size={20} />, component: 'UserManagement' },
        { name: 'Student Management', icon: <BookUser size={20} />, component: 'StudentManagement' },
        { name: 'Faculty Management', icon: <Briefcase size={20} />, component: 'FacultyManagement' },
        { name: 'Courses & Classes', icon: <BookOpen size={20} />, component: 'CourseManagement' },
        { name: 'Attendance', icon: <CalendarCheck size={20} />, component: 'AttendanceManagement' },
        { name: 'Exams & Results', icon: <FileText size={20} />, component: 'ExamManagement' },
        { name: 'Fee Management', icon: <IndianRupee size={20} />, component: 'FeeManagement' },
        { name: 'Notifications', icon: <Bell size={20} />, component: 'NotificationCenter' },
        { name: 'Documents', icon: <FileArchive size={20} />, component: 'DocumentManagement' },
        { name: 'Library', icon: <Library size={20} />, component: 'LibraryManagement' },
        { name: 'Hostel', icon: <BedDouble size={20} />, component: 'HostelManagement' },
        { name: 'Transport', icon: <Bus size={20} />, component: 'TransportManagement' },
        { name: 'Support', icon: <LifeBuoy size={20} />, component: 'SupportHelpdesk' },
        { name: 'Security', icon: <ShieldCheck size={20} />, component: 'SecurityLogs' },
    ];

    return (
        <>
            <aside className={`bg-white dark:bg-gray-900 border-r dark:border-gray-800 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}>
                <div className="flex items-center justify-between p-4 h-16 border-b dark:border-gray-800">
                    <div className="flex items-center space-x-2">
                        <GraduationCap className="text-blue-600" size={28} />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">PU College</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
                    {navItems.map(item => (
                        <a
                            key={item.name}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveComponent(item.component);
                                if (window.innerWidth < 1024) setIsOpen(false);
                            }}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${activeComponent === item.component ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            {item.icon}
                            <span className="font-medium text-sm">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </aside>
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>}
        </>
    );
};

// Header Component
const Header = ({ toggleSidebar }) => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 border-b dark:border-gray-800">
            <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                <button onClick={toggleSidebar} className="lg:hidden text-gray-600 dark:text-gray-300">
                    <Menu size={24} />
                </button>
                <div className="lg:hidden"></div> {/* Spacer */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">
                        <Bell size={20} />
                    </button>
                    <div className="flex items-center space-x-3">
                        <img className="w-9 h-9 rounded-full object-cover" src="https://placehold.co/100x100/6366f1/white?text=A" alt="Admin" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                        </div>
                        <button className="text-gray-500 dark:text-gray-400">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};


// Main App Component
export default function App() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard': return <Dashboard />;
            case 'UserManagement': return <UserManagement />;
            case 'StudentManagement': return <StudentManagement />;
            case 'FacultyManagement': return <FacultyManagement />;
            case 'CourseManagement': return <CourseManagement />;
            case 'AttendanceManagement': return <AttendanceManagement />;
            case 'ExamManagement': return <ExamManagement />;
            case 'FeeManagement': return <FeeManagement />;
            case 'NotificationCenter': return <NotificationCenter />;
            case 'DocumentManagement': return <DocumentManagement />;
            case 'LibraryManagement': return <LibraryManagement />;
            case 'HostelManagement': return <HostelManagement />;
            case 'TransportManagement': return <TransportManagement />;
            case 'SupportHelpdesk': return <SupportHelpdesk />;
            case 'SecurityLogs': return <SecurityLogs />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 font-sans">
            <Sidebar 
                activeComponent={activeComponent} 
                setActiveComponent={setActiveComponent}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <div className="lg:ml-64 transition-all duration-300">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
}
