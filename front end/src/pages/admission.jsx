import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, UserPlus, Search, Bell, ChevronDown, MoreVertical, Upload, CheckCircle, XCircle, Clock, DollarSign, List, BarChart2, Settings, LogOut, Users, Home, TrendingUp } from 'lucide-react';

// --- DUMMY DATA --- //
const initialEnquiries = [
  { id: 1, name: 'Rohan Sharma', contact: '9876543210', course: 'Computer Science', source: 'Website', status: 'New', followUp: '2025-08-10' },
  { id: 2, name: 'Priya Patel', contact: '8765432109', course: 'Business Administration', source: 'Referral', status: 'Contacted', followUp: '2025-08-12' },
  { id: 3, name: 'Amit Singh', contact: '7654321098', course: 'Mechanical Engineering', source: 'Seminar', status: 'Converted', followUp: '2025-08-11' },
  { id: 4, name: 'Sneha Reddy', contact: '6543210987', course: 'Biotechnology', source: 'Website', status: 'Lost', followUp: '2025-08-09' },
  { id: 5, name: 'Karan Verma', contact: '9988776655', course: 'Computer Science', source: 'Walk-in', status: 'New', followUp: '2025-08-15' },
  { id: 6, name: 'Anjali Mehta', contact: '8877665544', course: 'Business Administration', source: 'Website', status: 'Contacted', followUp: '2025-08-14' },
];

const initialApplications = [
  {
    id: 'APP2025001', name: 'Amit Singh', course: 'Mechanical Engineering', status: 'Admitted', submissionDate: '2025-07-25',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 88 },
    fee: { total: 150000, paid: 150000, status: 'Paid', receipt: 'RCPT001' },
    rollNo: 'MECH-001', studentId: 'STU-MECH-001', admissionLetter: '#'
  },
  {
    id: 'APP2025002', name: 'Sunita Williams', contact: '9123456780', course: 'Computer Science', status: 'Pending Verification', submissionDate: '2025-07-26',
    documents: [ { name: 'Photo', status: 'Pending', url: '#' }, { name: 'ID Proof', status: 'Pending', url: '#' }, { name: 'Marksheets', status: 'Rejected', comment: 'Please upload consolidated marksheet.', url: '#' }, ],
    eligibility: { checked: false, result: 'Pending', score: null },
    fee: { total: 120000, paid: 0, status: 'Unpaid' },
  },
  {
    id: 'APP2025003', name: 'Karan Malhotra', contact: '9234567891', course: 'Business Administration', status: 'Approved', submissionDate: '2025-07-28',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 92 },
    fee: { total: 180000, paid: 0, status: 'Pending Payment' },
  },
  {
    id: 'APP2025004', name: 'Anjali Verma', contact: '9345678902', course: 'Biotechnology', status: 'Waitlisted', submissionDate: '2025-07-28',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 85 },
    fee: { total: 130000, paid: 0, status: 'Unpaid' },
  },
  {
    id: 'APP2025005', name: 'Vikram Rathore', contact: '9456789013', course: 'Computer Science', status: 'Rejected', submissionDate: '2025-07-29',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Not Eligible', reason: 'Minimum qualification percentage not met.', score: 55 },
    fee: { total: 120000, paid: 0, status: 'Unpaid' },
  },
  {
    id: 'APP2025006', name: 'Priya Patel', course: 'Business Administration', status: 'Admitted', submissionDate: '2025-07-30',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 95 },
    fee: { total: 180000, paid: 180000, status: 'Paid', receipt: 'RCPT002' },
    rollNo: 'BBA-001', studentId: 'STU-BBA-001', admissionLetter: '#'
  },
   { id: 'APP2025007', name: 'Rohan Mehra', course: 'Computer Science', status: 'Admitted', submissionDate: '2025-07-30',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 91 },
    fee: { total: 120000, paid: 120000, status: 'Paid', receipt: 'RCPT003' },
    rollNo: 'CS-001', studentId: 'STU-CS-001', admissionLetter: '#'
  },
  { id: 'APP2025008', name: 'Sonia Gupta', course: 'Biotechnology', status: 'Approved', submissionDate: '2025-07-31',
    documents: [ { name: 'Photo', status: 'Verified', url: '#' }, { name: 'ID Proof', status: 'Verified', url: '#' }, { name: 'Marksheets', status: 'Verified', url: '#' }, ],
    eligibility: { checked: true, result: 'Eligible', score: 89 },
    fee: { total: 130000, paid: 0, status: 'Pending Payment' },
  },
];

const feeStructures = [
    { course: 'Computer Science', admissionFee: 120000, tuitionFee: 100000, other: 20000 },
    { course: 'Business Administration', admissionFee: 180000, tuitionFee: 150000, other: 30000 },
    { course: 'Mechanical Engineering', admissionFee: 150000, tuitionFee: 125000, other: 25000 },
    { course: 'Biotechnology', admissionFee: 130000, tuitionFee: 110000, other: 20000 },
];

const seatData = [
    { course: 'Computer Science', total: 120, category: 'General' },
    { course: 'Business Administration', total: 60, category: 'General' },
    { course: 'Mechanical Engineering', total: 120, category: 'General' },
    { course: 'Biotechnology', total: 50, category: 'General' },
];

// --- HELPER COMPONENTS --- //

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusConfig = {
    'New': 'bg-blue-100 text-blue-800', 'Contacted': 'bg-cyan-100 text-cyan-800', 'Converted': 'bg-emerald-100 text-emerald-800', 'Lost': 'bg-rose-100 text-rose-800',
    'Pending Verification': 'bg-yellow-100 text-yellow-800', 'Verified': 'bg-green-100 text-green-800', 'Rejected': 'bg-red-100 text-red-800',
    'Pending': 'bg-gray-100 text-gray-800', 'Approved': 'bg-teal-100 text-teal-800', 'Admitted': 'bg-purple-100 text-purple-800',
    'Waitlisted': 'bg-indigo-100 text-indigo-800', 'Eligible': 'bg-green-100 text-green-800', 'Not Eligible': 'bg-red-100 text-red-800',
    'Paid': 'bg-green-100 text-green-800', 'Unpaid': 'bg-red-100 text-red-800', 'Pending Payment': 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`${baseClasses} ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const Card = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <XCircle size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Notification = ({ message, type, onDismiss }) => {
    if (!message) return null;
    const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' };
    return (
        <div className={`fixed top-5 right-5 text-white px-6 py-3 rounded-lg shadow-lg z-50 ${colors[type]}`}>
            {message}
            <button onClick={onDismiss} className="ml-4 font-bold">X</button>
        </div>
    );
};


// --- PAGE COMPONENTS --- //

const Dashboard = ({ applications, enquiries }) => {
    const applicationStatusData = useMemo(() => {
        const counts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [applications]);

    const applicationTrendData = useMemo(() => {
        const counts = applications.reduce((acc, app) => {
            const date = new Date(app.submissionDate).toLocaleDateString('en-CA'); // YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([date, count]) => ({ date, count })).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [applications]);

    const leadSourceData = useMemo(() => {
        const counts = enquiries.reduce((acc, enq) => {
            acc[enq.source] = (acc[enq.source] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [enquiries]);

    const STATUS_CHART_COLORS = {
        'Admitted': '#8B5CF6', 'Pending Verification': '#F59E0B', 'Approved': '#14B8A6',
        'Waitlisted': '#6366F1', 'Rejected': '#EF4444', 'Paid': '#10B981',
    };
    const GENERIC_COLORS = ['#3B82F6', '#10B981', '#F97316', '#EC4899'];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Total Applications" value={applications.length} icon={<FileText className="text-blue-500" />} color="bg-blue-100" />
                <Card title="New Enquiries" value={enquiries.filter(e => e.status === 'New').length} icon={<UserPlus className="text-green-500" />} color="bg-green-100" />
                <Card title="Admissions Finalized" value={applications.filter(a => a.status === 'Admitted').length} icon={<CheckCircle className="text-purple-500" />} color="bg-purple-100" />
                <Card title="Fees Pending" value={applications.filter(a => a.fee.status === 'Pending Payment').length} icon={<Clock className="text-yellow-500" />} color="bg-yellow-100" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center"><TrendingUp className="mr-2 text-blue-500"/>Application Submission Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={applicationTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="Applications" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Application Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={applicationStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {applicationStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={STATUS_CHART_COLORS[entry.name] || GENERIC_COLORS[index % GENERIC_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Lead Source Performance</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={leadSourceData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Enquiries" fill="#14B8A6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Course-wise Applications</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={applications} >
                             <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="course" angle={-15} textAnchor="end" height={50} tick={{ fontSize: 12 }}/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="eligibility.score" name="Avg. Score" fill="#F97316" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const EnquiryManagement = ({ enquiries, setEnquiries }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEnquiry, setNewEnquiry] = useState({ name: '', contact: '', course: '', source: 'Website' });

    const handleAddEnquiry = () => {
        if (!newEnquiry.name || !newEnquiry.contact || !newEnquiry.course) {
            console.error("Please fill all fields.");
            return;
        }
        const newEntry = {
            id: enquiries.length + 1, ...newEnquiry, status: 'New',
            followUp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
        setEnquiries([newEntry, ...enquiries]);
        setIsModalOpen(false);
        setNewEnquiry({ name: '', contact: '', course: '', source: 'Website' });
    };

    const handleStatusChange = (id, newStatus) => {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Enquiry Management</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center">
                    <UserPlus size={18} className="mr-2" /> Add Enquiry
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Contact</th>
                            <th scope="col" className="px-6 py-3">Course of Interest</th>
                            <th scope="col" className="px-6 py-3">Lead Source</th>
                            <th scope="col" className="px-6 py-3">Follow-up Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map(enquiry => (
                            <tr key={enquiry.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{enquiry.name}</td>
                                <td className="px-6 py-4">{enquiry.contact}</td>
                                <td className="px-6 py-4">{enquiry.course}</td>
                                <td className="px-6 py-4">{enquiry.source}</td>
                                <td className="px-6 py-4">{enquiry.followUp}</td>
                                <td className="px-6 py-4"><StatusBadge status={enquiry.status} /></td>
                                <td className="px-6 py-4">
                                    <select value={enquiry.status} onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                                        <option>New</option><option>Contacted</option><option>Converted</option><option>Lost</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Add New Enquiry</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={newEnquiry.name} onChange={e => setNewEnquiry({...newEnquiry, name: e.target.value})} className="w-full p-2 border rounded-lg" />
                    <input type="text" placeholder="Contact Number" value={newEnquiry.contact} onChange={e => setNewEnquiry({...newEnquiry, contact: e.target.value})} className="w-full p-2 border rounded-lg" />
                    <select value={newEnquiry.course} onChange={e => setNewEnquiry({...newEnquiry, course: e.target.value})} className="w-full p-2 border rounded-lg bg-white">
                        <option value="">Select Course</option>
                        {feeStructures.map(f => <option key={f.course} value={f.course}>{f.course}</option>)}
                    </select>
                    <select value={newEnquiry.source} onChange={e => setNewEnquiry({...newEnquiry, source: e.target.value})} className="w-full p-2 border rounded-lg bg-white">
                        <option>Website</option><option>Seminar</option><option>Referral</option><option>Walk-in</option>
                    </select>
                    <button onClick={handleAddEnquiry} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Submit Enquiry</button>
                </div>
            </Modal>
        </div>
    );
};

const ApplicationList = ({ applications, onSelectApplication }) => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Applications</h1>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Application ID</th><th scope="col" className="px-6 py-3">Applicant Name</th>
                        <th scope="col" className="px-6 py-3">Course</th><th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                        <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-gray-700">{app.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{app.name}</td>
                            <td className="px-6 py-4">{app.course}</td>
                            <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                            <td className="px-6 py-4">
                                <button onClick={() => onSelectApplication(app.id)} className="text-blue-600 hover:underline">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ApplicationDetails = ({ app, setApplications, onBack, showNotification }) => {
    const [score, setScore] = useState(app.eligibility.score || '');

    const handleDocStatusChange = (docName, status, comment = "") => {
        const updatedApp = { ...app, documents: app.documents.map(doc => doc.name === docName ? { ...doc, status, comment } : doc) };
        setApplications(prev => prev.map(a => a.id === app.id ? updatedApp : a));
    };

    const handleEligibilityCheck = () => {
        const isEligible = parseInt(score) >= 60;
        const updatedApp = { ...app, eligibility: { checked: true, result: isEligible ? 'Eligible' : 'Not Eligible', reason: isEligible ? '' : 'Minimum qualification percentage not met.', score: parseInt(score) } };
        setApplications(prev => prev.map(a => a.id === app.id ? updatedApp : a));
        showNotification(`Eligibility Check Complete: ${isEligible ? 'Eligible' : 'Not Eligible'}`, 'info');
    };

    const handleAdmissionStatus = (status) => {
        let finalApp = { ...app, status };
        if (status === 'Admitted') {
            const coursePrefix = app.course.substring(0,4).toUpperCase();
            const admittedCount = initialApplications.filter(a => a.status === 'Admitted' && a.course === app.course).length;
            finalApp.rollNo = `${coursePrefix}-${String(admittedCount + 1).padStart(3, '0')}`;
            finalApp.studentId = `STU-${finalApp.rollNo}`;
            finalApp.admissionLetter = '#';
        }
        setApplications(prev => prev.map(a => a.id === app.id ? finalApp : a));
        showNotification(`Application status updated to ${status}. Notification sent to student.`, 'success');
    };
    
    const handleFeePayment = () => {
        const updatedApp = { ...app, fee: { ...app.fee, paid: app.fee.total, status: 'Paid', receipt: `RCPT${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}` } };
        setApplications(prev => prev.map(a => a.id === app.id ? updatedApp : a));
        showNotification('Fee payment recorded successfully.', 'success');
    };

    return (
        <div>
            <button onClick={onBack} className="text-blue-600 hover:underline mb-4">&larr; Back to Applications</button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div><h1 className="text-3xl font-bold text-gray-800">{app.name}</h1><p className="text-gray-500 font-mono">{app.id} | {app.course}</p></div>
                    <StatusBadge status={app.status} />
                </div>
                
                {app.status === 'Admitted' && (
                    <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-800 mb-2">Admission Confirmed</h3>
                        <p><strong>Roll Number:</strong> {app.rollNo}</p><p><strong>Student ID:</strong> {app.studentId}</p>
                        <a href={app.admissionLetter} className="text-blue-600 hover:underline mt-2 inline-block">Download Admission Letter</a>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Admission Approval</h2>
                    <div className="flex space-x-4">
                        <button onClick={() => handleAdmissionStatus('Approved')} disabled={app.status !== 'Pending Verification' || app.eligibility.result !== 'Eligible'} className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 disabled:bg-gray-300">Approve</button>
                        <button onClick={() => handleAdmissionStatus('Waitlist')} disabled={app.status !== 'Pending Verification' || app.eligibility.result !== 'Eligible'} className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 disabled:bg-gray-300">Waitlist</button>
                        <button onClick={() => handleAdmissionStatus('Rejected')} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">Reject</button>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Document Verification</h2>
                    <div className="space-y-3">
                        {app.documents.map(doc => (
                            <div key={doc.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800">{doc.name}</p>
                                    {doc.status === 'Rejected' && <p className="text-xs text-red-600">Comment: {doc.comment}</p>}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <StatusBadge status={doc.status} /><a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                                    <button onClick={() => handleDocStatusChange(doc.name, 'Verified')} className="text-green-600 hover:text-green-800"><CheckCircle size={20}/></button>
                                    <button onClick={() => { const comment = prompt("Reason for rejection:"); if (comment) handleDocStatusChange(doc.name, 'Rejected', comment); }} className="text-red-600 hover:text-red-800"><XCircle size={20}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Eligibility Check</h2>
                    <div className="flex items-center space-x-4">
                        <input type="number" placeholder="Enter Entrance Score / %" value={score} onChange={(e) => setScore(e.target.value)} className="p-2 border rounded-lg w-48"/>
                        <button onClick={handleEligibilityCheck} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">Check Eligibility</button>
                        {app.eligibility.checked && <StatusBadge status={app.eligibility.result} />}
                    </div>
                     {app.eligibility.checked && app.eligibility.result === 'Not Eligible' && <p className="text-red-600 mt-2">{app.eligibility.reason}</p>}
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Fee Management</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p><strong>Status:</strong> <StatusBadge status={app.fee.status} /></p>
                        <p><strong>Total Fee:</strong> ₹{app.fee.total.toLocaleString()}</p>
                        <p><strong>Amount Paid:</strong> ₹{app.fee.paid.toLocaleString()}</p>
                        {app.fee.status === 'Paid' && <p><strong>Receipt No:</strong> {app.fee.receipt}</p>}
                        {app.status === 'Approved' && app.fee.status === 'Pending Payment' && (
                            <button onClick={handleFeePayment} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">Mark as Paid</button>
                        )}
                        {app.status === 'Approved' && app.fee.status === 'Unpaid' && (
                             <button onClick={handleFeePayment} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">Generate Invoice & Mark as Paid</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeeManagement = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Structures</h1>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Course</th><th scope="col" className="px-6 py-3">Admission Fee</th>
                        <th scope="col" className="px-6 py-3">Tuition Fee (Annual)</th><th scope="col" className="px-6 py-3">Other Charges</th>
                    </tr>
                </thead>
                <tbody>
                    {feeStructures.map(fee => (
                        <tr key={fee.course} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{fee.course}</td>
                            <td className="px-6 py-4">₹{fee.admissionFee.toLocaleString()}</td>
                            <td className="px-6 py-4">₹{fee.tuitionFee.toLocaleString()}</td>
                            <td className="px-6 py-4">₹{fee.other.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SeatAllocation = ({ applications }) => {
    const allocatedSeats = useMemo(() => {
        return seatData.map(seat => {
            const admitted = applications.filter(app => app.course === seat.course && app.status === 'Admitted').length;
            const waitlisted = applications.filter(app => app.course === seat.course && app.status === 'Waitlisted').length;
            return { ...seat, admitted, waitlisted, available: seat.total - admitted };
        });
    }, [applications]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Seat Allocation</h1>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Course</th><th scope="col" className="px-6 py-3">Total Seats</th>
                            <th scope="col" className="px-6 py-3">Admitted</th><th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Waitlisted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocatedSeats.map(seat => (
                            <tr key={seat.course} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{seat.course}</td>
                                <td className="px-6 py-4">{seat.total}</td>
                                <td className="px-6 py-4 text-green-600 font-semibold">{seat.admitted}</td>
                                <td className="px-6 py-4 text-blue-600 font-semibold">{seat.available}</td>
                                <td className="px-6 py-4 text-indigo-600">{seat.waitlisted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT --- //
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [enquiries, setEnquiries] = useState(initialEnquiries);
    const [applications, setApplications] = useState(initialApplications);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    };

    const handleSelectApplication = (id) => {
        setSelectedAppId(id);
        setCurrentPage('applicationDetails');
    };

    const handleBackToApplications = () => {
        setSelectedAppId(null);
        setCurrentPage('applications');
    };
    
    const navigate = (page) => {
        setCurrentPage(page);
        setIsSidebarOpen(false);
    }

    const renderPage = () => {
        if (currentPage === 'applicationDetails' && selectedAppId) {
            const app = applications.find(a => a.id === selectedAppId);
            return <ApplicationDetails app={app} setApplications={setApplications} onBack={handleBackToApplications} showNotification={showNotification}/>;
        }
        switch (currentPage) {
            case 'dashboard': return <Dashboard applications={applications} enquiries={enquiries} />;
            case 'enquiries': return <EnquiryManagement enquiries={enquiries} setEnquiries={setEnquiries} />;
            case 'applications': return <ApplicationList applications={applications} onSelectApplication={handleSelectApplication} />;
            case 'fees': return <FeeManagement />;
            case 'seats': return <SeatAllocation applications={applications} />;
            default: return <Dashboard applications={applications} enquiries={enquiries} />;
        }
    };

    const NavLink = ({ page, icon, children }) => (
        <button onClick={() => navigate(page)}
            className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}>
            {icon}<span className="ml-3">{children}</span>
        </button>
    );

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex">
            <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification({ message: '', type: '' })} />
            
            <aside className="hidden lg:block w-64 bg-white shadow-lg flex-shrink-0">
                <div className="p-6"><h2 className="text-2xl font-bold text-blue-600">Admissions CRM</h2></div>
                <nav className="mt-6 px-4 space-y-2">
                    <NavLink page="dashboard" icon={<Home size={20} />}>Dashboard</NavLink>
                    <NavLink page="enquiries" icon={<UserPlus size={20} />}>Enquiry Management</NavLink>
                    <NavLink page="applications" icon={<FileText size={20} />}>Applications</NavLink>
                    <NavLink page="fees" icon={<DollarSign size={20} />}>Fee Structures</NavLink>
                    <NavLink page="seats" icon={<List size={20} />}>Seat Allocation</NavLink>
                </nav>
            </aside>

            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="p-6"><h2 className="text-2xl font-bold text-blue-600">Admissions CRM</h2></div>
                <nav className="mt-6 px-4 space-y-2">
                    <NavLink page="dashboard" icon={<Home size={20} />}>Dashboard</NavLink>
                    <NavLink page="enquiries" icon={<UserPlus size={20} />}>Enquiry Management</NavLink>
                    <NavLink page="applications" icon={<FileText size={20} />}>Applications</NavLink>
                    <NavLink page="fees" icon={<DollarSign size={20} />}>Fee Structures</NavLink>
                    <NavLink page="seats" icon={<List size={20} />}>Seat Allocation</NavLink>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <button className="lg:hidden text-gray-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <div className="relative w-full max-w-xs hidden md:block">
                        <input type="text" placeholder="Search applications..." className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700"><Bell size={22} /></button>
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=A" alt="Admin" className="w-10 h-10 rounded-full" />
                            <div className="ml-2 hidden md:block">
                                <p className="font-semibold text-sm">Admin User</p><p className="text-xs text-gray-500">System Administrator</p>
                            </div>
                            <ChevronDown size={20} className="ml-1 text-gray-500" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
