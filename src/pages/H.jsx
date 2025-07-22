import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// --- MOCK DATA --- //
const facultyData = [
    { id: 1, name: 'Dr. Evelyn Reed', photo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=ER', subject: 'Quantum Physics', workload: 18, status: 'Active' },
    { id: 2, name: 'Dr. Samuel Grant', photo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=SG', subject: 'Organic Chemistry', workload: 22, status: 'Active' },
    { id: 3, name: 'Prof. Alisha Chen', photo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AC', subject: 'Data Structures', workload: 20, status: 'On Leave' },
    { id: 4, name: 'Dr. Ben Carter', photo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=BC', subject: 'Thermodynamics', workload: 16, status: 'Active' },
];

const workloadData = [
    { name: 'Dr. Reed', value: 18 },
    { name: 'Dr. Grant', value: 22 },
    { name: 'Prof. Chen', value: 20 },
    { name: 'Dr. Carter', value: 16 },
];

const scheduleApprovals = [
    { id: 1, faculty: 'Dr. Samuel Grant', request: 'Swap PHY101 (Mon 10am) with CHE102 (Wed 2pm)', status: 'Pending' },
    { id: 2, faculty: 'Prof. Alisha Chen', request: 'Request for substitution in CS201 lab on Friday', status: 'Pending' },
];

const departmentKPIs = {
    attendance: [
        { name: 'S1', attendance: 85 }, { name: 'S2', attendance: 88 }, { name: 'S3', attendance: 91 },
        { name: 'S4', attendance: 86 }, { name: 'S5', attendance: 92 }, { name: 'S6', attendance: 94 },
    ],
    marks: [
        { name: 'S1', avg: 72 }, { name: 'S2', avg: 78 }, { name: 'S3', avg: 75 },
        { name: 'S4', avg: 81 }, { name: 'S5', avg: 85 }, { name: 'S6', avg: 82 },
    ],
    teacherImpact: [
        { name: 'Jan', 'Dr. Reed': 4.5, 'Dr. Grant': 4.2, 'Prof. Chen': 4.8 },
        { name: 'Feb', 'Dr. Reed': 4.6, 'Dr. Grant': 4.4, 'Prof. Chen': 4.7 },
        { name: 'Mar', 'Dr. Reed': 4.7, 'Dr. Grant': 4.3, 'Prof. Chen': 4.9 },
        { name: 'Apr', 'Dr. Reed': 4.6, 'Dr. Grant': 4.5, 'Prof. Chen': 4.8 },
    ],
    placements: [
        { year: '2021', count: 85 }, { year: '2022', count: 92 },
        { year: '2023', count: 105 }, { year: '2024', count: 110 },
    ],
    batchPerformance: [
        { batch: '2024 Mech', subject: 'Thermo', score: 88 }, { batch: '2024 Mech', subject: 'Fluid Mech', score: 76 }, { batch: '2024 Mech', subject: 'SOM', score: 81 },
        { batch: '2024 CSE', subject: 'DSA', score: 92 }, { batch: '2024 CSE', subject: 'OS', score: 85 }, { batch: '2024 CSE', subject: 'DBMS', score: 88 },
        { batch: '2023 CSE', subject: 'DSA', score: 89 }, { batch: '2023 CSE', subject: 'OS', score: 91 }, { batch: '2023 CSE', subject: 'DBMS', score: 84 },
        { batch: '2023 ECE', subject: 'Signals', score: 75 }, { batch: '2023 ECE', subject: 'Networks', score: 68 }, { batch: '2023 ECE', subject: 'VLSI', score: 72 },
    ]
};

const studentsAtRisk = [
    { id: 'S1023', name: 'John Doe', attendance: 65, marks: 55, risk: 'High' },
    { id: 'S1045', name: 'Jane Smith', attendance: 72, marks: 61, risk: 'Medium' },
    { id: 'S1011', name: 'Peter Jones', attendance: 80, marks: 58, risk: 'Medium' },
    { id: 'S1089', name: 'Mary Williams', attendance: 68, marks: 75, risk: 'Low' },
];

const electiveRequests = [
    { student: 'Alice Johnson', current: 'Advanced AI', requested: 'Blockchain Tech', status: 'Pending' },
    { student: 'Bob Brown', current: 'Robotics', requested: 'IoT Fundamentals', status: 'Pending' },
];

const academicReportsQueue = [
    { id: 1, faculty: 'Dr. Evelyn Reed', report: 'Monthly Course Progress - Quantum Physics', date: '2024-07-20', status: 'Pending' },
    { id: 2, faculty: 'Dr. Ben Carter', report: 'Lab Utilization Report - Thermo Lab', date: '2024-07-19', status: 'Pending' },
];

const documentsData = [
    { id: 1, name: 'Syllabus_CS_2024.pdf', type: 'Syllabus', version: 2.1, date: '2024-07-15' },
    { id: 2, name: 'LabManual_Physics.pdf', type: 'Lab Manual', version: 1.5, date: '2024-07-10' },
    { id: 3, name: 'Curriculum_Guide_2024.pdf', type: 'Curriculum', version: 3.0, date: '2024-07-05' },
];

const marksApprovals = [
    { id: 1, faculty: 'Dr. Samuel Grant', subject: 'CHE102 Internal Assessment 1', status: 'Pending' },
    { id: 2, faculty: 'Dr. Ben Carter', subject: 'MECH201 Mid-term Exam', status: 'Pending' },
];

// --- SVG ICONS --- //
const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
    timetable: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    analytics: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8a6 6 0 0 0-6-6"></path><path d="M13 13a6 6 0 0 0 6 6"></path></svg>,
    docs: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    comms: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    ai: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="12" width="8" height="8" rx="2"></rect><path d="M12 12v8h4"></path><path d="M20 12v-4h-4"></path><path d="M16 4h4v4"></path><path d="M18 18h2v2h-2z"></path><path d="M6 6h2v2H6z"></path></svg>,
    access: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    bell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    user: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    check: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    x: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    upload: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
};


// --- REUSABLE COMPONENTS --- //
const Card = ({ title, children, className }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);

const TooltipButton = ({ children, tooltip, onClick, className }) => (
    <div className="relative group">
        <button onClick={onClick} className={className}>
            {children}
        </button>
        <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {tooltip}
        </div>
    </div>
);


// --- PAGE COMPONENTS --- //
const DepartmentControlPanel = () => {
    const PIE_COLORS = ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card title="Faculty Directory">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Faculty</th>
                                    <th scope="col" className="px-6 py-3">Primary Subject</th>
                                    <th scope="col" className="px-6 py-3">Workload (hrs/wk)</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facultyData.map(f => (
                                    <tr key={f.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                            <img className="w-10 h-10 rounded-full mr-4" src={f.photo} alt={f.name} />
                                            {f.name}
                                        </td>
                                        <td className="px-6 py-4">{f.subject}</td>
                                        <td className="px-6 py-4">{f.workload}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${f.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {f.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card title="Workload Distribution">
                    <div style={{ width: '100%', height: 200 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={workloadData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                    {workloadData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Subject Assignment">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="faculty" className="block mb-2 text-sm font-medium text-gray-700">Faculty</label>
                            <select id="faculty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                                <option>Select Faculty</option>
                                {facultyData.map(f => <option key={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                            <select id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                                <option>Select Subject</option>
                                <option>CS301: Advanced Algorithms</option>
                                <option>ME402: Fluid Dynamics</option>
                                <option>CH205: Physical Chemistry II</option>
                            </select>
                        </div>
                        <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Assign Subject</button>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-3">
                <Card title="Approval Queue: Schedule Changes">
                    <ul className="divide-y divide-gray-200">
                        {scheduleApprovals.map(req => (
                            <li key={req.id} className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{req.faculty}</p>
                                    <p className="text-sm text-gray-500">{req.request}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <TooltipButton tooltip="Approve Request" className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">{icons.check}</TooltipButton>
                                    <TooltipButton tooltip="Reject Request" className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">{icons.x}</TooltipButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const TimetableAndPlanning = () => {
    const [showClashModal, setShowClashModal] = useState(false);
    
    const timeSlots = ["9-10 AM", "10-11 AM", "11-12 PM", "1-2 PM", "2-3 PM"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const schedule = {
        Monday: { "9-10 AM": "CS101", "11-12 PM": "MA101" },
        Tuesday: { "10-11 AM": "PH102", "2-3 PM": "CS101 Lab" },
        Wednesday: { "9-10 AM": "CS101", "1-2 PM": "EE100" },
        Thursday: { "10-11 AM": "PH102", "2-3 PM": "CS101 Lab" },
        Friday: { "11-12 PM": "MA101" }
    };

    return (
        <div className="space-y-6">
            {showClashModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold text-red-600">Clash Detected!</h3>
                        <p className="mt-2 text-gray-600">Dr. Samuel Grant is already assigned to 'CHE102' at this time slot.</p>
                        <p className="mt-1 text-sm text-gray-500">Room C-201 is also occupied.</p>
                        <button onClick={() => setShowClashModal(false)} className="mt-4 w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600">Acknowledge</button>
                    </div>
                </div>
            )}
            <Card title="Department Timetable Builder (S3 CSE)">
                <p className="text-sm text-gray-500 mb-4">Drag and drop subjects to build the timetable. This is a visual representation.</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 font-semibold">Time</th>
                                {days.map(day => <th key={day} className="border border-gray-300 p-2 font-semibold">{day}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map(slot => (
                                <tr key={slot}>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">{slot}</td>
                                    {days.map(day => (
                                        <td key={`${day}-${slot}`} className="border border-gray-300 p-2 h-20 text-center relative group">
                                            {schedule[day]?.[slot] ? (
                                                <div className="bg-indigo-100 text-indigo-800 p-2 rounded-md h-full flex items-center justify-center cursor-move">
                                                    {schedule[day][slot]}
                                                </div>
                                            ) : (
                                                <div className="h-full"></div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => setShowClashModal(true)} className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Simulate Clash</button>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <Card title="Event & Guest Lecture Approvals">
                    <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800">Guest Lecture: AI in Healthcare</p>
                            <p className="text-sm text-gray-500">Proposed by: Dr. Evelyn Reed | Date: 25th Oct</p>
                            <div className="mt-3 flex space-x-2">
                               <button className="text-sm bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600">Approve</button>
                               <button className="text-sm bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600">Reject</button>
                            </div>
                        </div>
                         <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800">Workshop: Robotics Arm</p>
                            <p className="text-sm text-gray-500">Proposed by: Dr. Ben Carter | Date: 15th Nov</p>
                            <div className="mt-3 flex space-x-2">
                               <button className="text-sm bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600">Approve</button>
                               <button className="text-sm bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600">Reject</button>
                            </div>
                        </div>
                    </div>
                </Card>
                 <Card title="Academic Calendar">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <button className="text-gray-600">&lt;</button>
                            <h4 className="font-semibold">October 2024</h4>
                            <button className="text-gray-600">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 text-center text-sm text-gray-500">
                            <div className="font-semibold">Su</div><div className="font-semibold">Mo</div><div className="font-semibold">Tu</div><div className="font-semibold">We</div><div className="font-semibold">Th</div><div className="font-semibold">Fr</div><div className="font-semibold">Sa</div>
                            {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                <div key={day} className={`p-2 rounded-full relative ${day === 18 ? 'bg-indigo-500 text-white' : ''} ${day === 25 ? 'bg-purple-200' : ''}`}>
                                    {day}
                                    {day === 25 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></div>}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm">
                            <p><span className="font-semibold text-purple-600">Oct 25:</span> Guest Lecture on AI</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const DepartmentAnalytics = () => {
    const getPerformanceColor = (score) => {
        if (score >= 90) return 'bg-green-200 text-green-800';
        if (score >= 80) return 'bg-blue-200 text-blue-800';
        if (score >= 70) return 'bg-yellow-200 text-yellow-800';
        return 'bg-red-200 text-red-800';
    };

    const uniqueBatches = [...new Set(departmentKPIs.batchPerformance.map(item => item.batch))];
    const uniqueSubjects = [...new Set(departmentKPIs.batchPerformance.map(item => item.subject))];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg></div>
                    <div>
                        <p className="text-sm text-gray-500">Avg. Attendance</p>
                        <p className="text-2xl font-bold text-gray-800">90.5%</p>
                    </div>
                </div>
                 <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg></div>
                    <div>
                        <p className="text-sm text-gray-500">Avg. Marks</p>
                        <p className="text-2xl font-bold text-gray-800">79.8</p>
                    </div>
                </div>
                 <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                    <div>
                        <p className="text-sm text-gray-500">Faculty Count</p>
                        <p className="text-2xl font-bold text-gray-800">{facultyData.length}</p>
                    </div>
                </div>
                 <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg></div>
                    <div>
                        <p className="text-sm text-gray-500">Placements '24</p>
                        <p className="text-2xl font-bold text-gray-800">110</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Average Attendance Across Semesters">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={departmentKPIs.attendance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="attendance" fill="#6366F1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Internal/External Marks Average">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={departmentKPIs.marks}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avg" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            
            <Card title="Batch Performance Heatmap" className="lg:col-span-2">
                <p className="text-sm text-gray-500 mb-4">Performance score of batches across different subjects. Green indicates high performance, red indicates low.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 font-semibold text-left">Batch / Subject</th>
                                {uniqueSubjects.map(s => <th key={s} className="p-3 font-semibold">{s}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueBatches.map(batch => (
                                <tr key={batch} className="border-b">
                                    <td className="p-3 font-semibold text-left">{batch}</td>
                                    {uniqueSubjects.map(subject => {
                                        const item = departmentKPIs.batchPerformance.find(p => p.batch === batch && p.subject === subject);
                                        return (
                                            <td key={`${batch}-${subject}`} className="p-3">
                                                {item ? (
                                                    <span className={`px-3 py-1 font-bold rounded-md ${getPerformanceColor(item.score)}`}>
                                                        {item.score}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Teacher Impact (Student Feedback Score)">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={departmentKPIs.teacherImpact}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[4, 5]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Dr. Reed" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Dr. Grant" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="Prof. Chen" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Placement Statistics">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={departmentKPIs.placements}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8B5CF6" name="Students Placed"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const DocumentsAndCompliance = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Upload Documents">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <span className="text-gray-500">{icons.upload}</span>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">Syllabus, Lab Manuals, Curriculum (PDF, DOCX)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                </Card>
                <Card title="Submit Accreditation Reports">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="report-type" className="block mb-2 text-sm font-medium text-gray-700">Report Type</label>
                            <select id="report-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                                <option>NAAC Report</option>
                                <option>NBA Report</option>
                                <option>Internal Audit Report</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="report-file" className="block mb-2 text-sm font-medium text-gray-700">Upload File</label>
                            <input type="file" id="report-file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Submit to Admin</button>
                    </div>
                </Card>
            </div>
            <Card title="Department Documents">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Document Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Version</th>
                                <th className="px-6 py-3">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentsData.map(doc => (
                                <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-indigo-600 hover:underline cursor-pointer">{doc.name}</td>
                                    <td className="px-6 py-4">{doc.type}</td>
                                    <td className="px-6 py-4">{doc.version}</td>
                                    <td className="px-6 py-4">{doc.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card title="Approval Queue: Academic Reports from Teachers">
                <ul className="divide-y divide-gray-200">
                    {academicReportsQueue.map(req => (
                        <li key={req.id} className="py-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{req.report}</p>
                                <p className="text-sm text-gray-500">Submitted by {req.faculty} on {req.date}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TooltipButton tooltip="Approve Report" className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">{icons.check}</TooltipButton>
                                <TooltipButton tooltip="Reject Report" className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">{icons.x}</TooltipButton>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const AITools = () => {
    return (
        <div className="space-y-6">
            <Card title="AI-Powered Tools">
                <p className="text-gray-600">Leverage AI to optimize department operations and support student success.</p>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Teaching Load Optimizer">
                    <p className="text-sm text-gray-500 mb-4">AI suggestions for balancing faculty workload. Red indicates overload, green indicates optimal.</p>
                    <ul className="space-y-3">
                        {facultyData.map(f => (
                            <li key={f.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{f.name}</p>
                                    <p className="text-sm text-gray-600">Current: {f.workload} hrs/wk</p>
                                </div>
                                {f.workload > 20 ? (
                                    <div className="text-right">
                                        <p className="font-bold text-red-500">Overloaded</p>
                                        <p className="text-xs text-red-400">Suggest: Reduce by {f.workload - 20} hrs</p>
                                    </div>
                                ) : f.workload < 18 ? (
                                    <div className="text-right">
                                        <p className="font-bold text-yellow-500">Underloaded</p>
                                        <p className="text-xs text-yellow-400">Suggest: Increase by {18 - f.workload} hrs</p>
                                    </div>
                                ) : (
                                    <div className="text-right">
                                        <p className="font-bold text-green-500">Balanced</p>
                                        <p className="text-xs text-green-400">Optimal Load</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card title="Student Dropout Predictor">
                    <p className="text-sm text-gray-500 mb-4">Students flagged as at-risk based on attendance and marks.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Student</th>
                                    <th className="px-4 py-3">Attendance</th>
                                    <th className="px-4 py-3">Avg. Marks</th>
                                    <th className="px-4 py-3">Risk Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsAtRisk.map(s => (
                                    <tr key={s.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{s.name}</td>
                                        <td className="px-4 py-3">{s.attendance}%</td>
                                        <td className="px-4 py-3">{s.marks}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 font-semibold text-xs rounded-full ${s.risk === 'High' ? 'bg-red-200 text-red-800' : s.risk === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                                {s.risk}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                
                <div className="lg:col-span-2">
                    <Card title="Auto Report Generator">
                        <p className="text-sm text-gray-500 mb-4">Generate formatted PDF reports for accreditations like NAAC/NBA with a single click.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                <span>Generate NAAC Report</span>
                            </button>
                             <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                <span>Generate NBA Report</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const CommunicationTools = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Department-wide Announcement" className="lg:col-span-2">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Target Audience</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input id="teachers" type="radio" name="target" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" defaultChecked />
                                <label htmlFor="teachers" className="ml-2 text-sm font-medium text-gray-900">All Teachers</label>
                            </div>
                            <div className="flex items-center">
                                <input id="students" type="radio" name="target" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" />
                                <label htmlFor="students" className="ml-2 text-sm font-medium text-gray-900">All Students</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Write your announcement here..."></textarea>
                    </div>
                    <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Send Announcement</button>
                </div>
            </Card>

            <Card title="Elective Change Requests">
                <ul className="divide-y divide-gray-200">
                    {electiveRequests.map((req, i) => (
                        <li key={i} className="py-3">
                            <p className="font-semibold">{req.student}</p>
                            <p className="text-sm text-gray-600">From: <span className="font-medium text-gray-800">{req.current}</span></p>
                            <p className="text-sm text-gray-600">To: <span className="font-medium text-gray-800">{req.requested}</span></p>
                            <div className="mt-2 flex space-x-2">
                                <button className="text-xs bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600">Approve</button>
                                <button className="text-xs bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card title="Budget / Resource Request">
                 <form className="space-y-4">
                    <div>
                        <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-700">Item/Resource</label>
                        <input type="text" id="item" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="e.g., New Oscilloscopes for Physics Lab" />
                    </div>
                    <div>
                        <label htmlFor="justification" className="block mb-2 text-sm font-medium text-gray-700">Justification</label>
                        <textarea id="justification" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Briefly explain why this is needed..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Submit to Admin</button>
                </form>
            </Card>
            
            <Card title="Placement Cell Coordination" className="lg:col-span-2">
                <p className="text-sm text-gray-500 mb-4">Send a direct message to the placement cell.</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="placement-message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                        <textarea id="placement-message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Requesting placement stats for the CSE department..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Send Message</button>
                </form>
            </Card>
        </div>
    );
};

const AccessRights = () => {
    return (
        <div className="space-y-6">
            <Card title="Access Level & Permissions">
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-r-lg" role="alert">
                    <p className="font-bold">Department-Level Access</p>
                    <p>You have full administrative access for the <span className="font-semibold">Computer Science Department</span> only. You can view and manage all faculty, students, and academic data within your department.</p>
                </div>
            </Card>

            <Card title="Approval Queue: Marks & Attendance">
                <p className="text-sm text-gray-500 mb-4">Approve marks submissions and attendance corrections from faculty.</p>
                <ul className="divide-y divide-gray-200">
                    {marksApprovals.map(req => (
                        <li key={req.id} className="py-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{req.subject}</p>
                                <p className="text-sm text-gray-500">Submitted by: {req.faculty}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TooltipButton tooltip="Approve Submission" className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">{icons.check}</TooltipButton>
                                <TooltipButton tooltip="Reject Submission" className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">{icons.x}</TooltipButton>
                            </div>
                        </li>
                    ))}
                     <li className="py-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Attendance Correction for CS101 (20/07/2024)</p>
                            <p className="text-sm text-gray-500">Submitted by: Prof. Alisha Chen</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TooltipButton tooltip="Approve Correction" className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">{icons.check}</TooltipButton>
                            <TooltipButton tooltip="Reject Correction" className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200">{icons.x}</TooltipButton>
                        </div>
                    </li>
                </ul>
            </Card>

            <Card title="System Settings">
                 <div className="bg-gray-100 p-6 rounded-lg text-center opacity-60">
                    <p className="font-semibold text-gray-600">System-wide settings are restricted.</p>
                    <p className="text-sm text-gray-500">Changes to core ERP modules, user roles, and global configurations can only be made by a Super Admin.</p>
                </div>
            </Card>
        </div>
    );
};


// --- MAIN APP COMPONENT --- //
export default function App() {
    const [activeView, setActiveView] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', icon: icons.dashboard, component: <DepartmentControlPanel /> },
        { name: 'Timetable', icon: icons.timetable, component: <TimetableAndPlanning /> },
        { name: 'Analytics', icon: icons.analytics, component: <DepartmentAnalytics /> },
        { name: 'Documents', icon: icons.docs, component: <DocumentsAndCompliance /> },
        { name: 'Communication', icon: icons.comms, component: <CommunicationTools /> },
        { name: 'AI Tools', icon: icons.ai, component: <AITools /> },
        { name: 'Access Rights', icon: icons.access, component: <AccessRights /> },
    ];

    const renderView = () => {
        const activeItem = navItems.find(item => item.name === activeView);
        return activeItem ? activeItem.component : <DepartmentControlPanel />;
    };
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <aside className={`bg-white text-gray-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full shadow-lg z-30`}>
                <div className={`flex items-center justify-center h-20 border-b border-gray-200 ${isSidebarOpen ? 'px-6' : 'px-0'}`}>
                    {isSidebarOpen ? (
                        <h1 className="text-2xl font-bold text-indigo-600">HOD Panel</h1>
                    ) : (
                        <div className="text-indigo-600">{icons.dashboard}</div>
                    )}
                </div>
                <nav className="flex-1 mt-6">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.name} className="px-4 my-1">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveView(item.name);
                                    }}
                                    className={`flex items-center py-3 rounded-lg transition-colors duration-200 ${isSidebarOpen ? 'px-4' : 'justify-center'} ${activeView === item.name ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <a href="#" className={`flex items-center py-3 rounded-lg transition-colors duration-200 ${isSidebarOpen ? 'px-4' : 'justify-center'} text-gray-600 hover:bg-gray-100`}>
                        <span className="text-xl">{icons.logout}</span>
                        {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Navbar */}
                <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8">
                    <div className="flex items-center">
                         <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 mr-6 md:hidden">
                            {icons.menu}
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">{activeView}</h2>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="text-gray-500 hover:text-gray-700 relative">
                            {icons.bell}
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">8</span>
                        </button>
                        <div className="flex items-center space-x-3">
                            <img src="https://placehold.co/40x40/6366F1/FFFFFF?text=HOD" alt="HOD Profile" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-800">Dr. Alan Grant</p>
                                <p className="text-sm text-gray-500">HOD, Computer Science</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}
