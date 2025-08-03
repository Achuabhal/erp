import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileDown, CheckCircle, XCircle, AlertTriangle, Mail, Filter, Search, ChevronDown, ChevronUp, User, Bell } from 'lucide-react';

// --- MOCK DATA --- //
const initialApplications = [
  {
    id: 'APP-001',
    name: 'Aarav Sharma',
    course: 'Computer Science',
    stream: 'Engineering',
    submissionDate: '2025-07-15',
    status: 'Pending', // Pending, Verified, Approved, Rejected
    eligibility: {
      required: '12th Grade % >= 75',
      actual: '88%',
      met: true,
      override: false,
      remarks: ''
    },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Pending' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Pending' },
      { id: 3, name: 'ID Proof (Aadhaar).pdf', url: '#', status: 'Pending' },
      { id: 4, name: 'Photo.jpg', url: '#', status: 'Pending' },
    ],
    rejectionReason: '',
  },
  {
    id: 'APP-002',
    name: 'Priya Patel',
    course: 'Mechanical Engineering',
    stream: 'Engineering',
    submissionDate: '2025-07-16',
    status: 'Verified',
    eligibility: {
      required: '12th Grade % >= 70',
      actual: '92%',
      met: true,
      override: false,
      remarks: ''
    },
    documents: [
      { id: 1, name: '10th Marksheet.pdf', url: '#', status: 'Verified' },
      { id: 2, name: '12th Marksheet.pdf', url: '#', status: 'Verified' },
      { id: 3, name: 'ID Proof (Passport).pdf', url: '#', status: 'Verified' },
    ],
    rejectionReason: '',
  },
  {
    id: 'APP-003',
    name: 'Rohan Singh',
    course: 'Business Administration',
    stream: 'Commerce',
    submissionDate: '2025-07-18',
    status: 'Approved',
    eligibility: {
      required: '12th Grade % >= 65',
      actual: '78%',
      met: true,
      override: false,
      remarks: ''
    },
    documents: [
      { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Verified' },
      { id: 2, name: 'ID Proof.pdf', url: '#', status: 'Verified' },
    ],
    rejectionReason: '',
  },
  {
    id: 'APP-004',
    name: 'Sneha Gupta',
    course: 'Computer Science',
    stream: 'Engineering',
    submissionDate: '2025-07-20',
    status: 'Rejected',
    eligibility: {
      required: '12th Grade % >= 75',
      actual: '71%',
      met: false,
      override: false,
      remarks: ''
    },
    documents: [
      { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Verified' },
      { id: 2, name: 'ID Proof.pdf', url: '#', status: 'Rejected', remarks: 'ID proof is not clear.' },
    ],
    rejectionReason: 'Incomplete document verification.',
  },
   {
    id: 'APP-005',
    name: 'Vikram Reddy',
    course: 'Civil Engineering',
    stream: 'Engineering',
    submissionDate: '2025-07-21',
    status: 'Pending',
    eligibility: {
      required: '12th Grade % >= 70',
      actual: '68%',
      met: false,
      override: true,
      remarks: 'Exceptional performance in state-level sports quota.'
    },
    documents: [
      { id: 1, name: '12th Marksheet.pdf', url: '#', status: 'Verified' },
      { id: 2, name: 'Sports Certificate.pdf', url: '#', status: 'Verified' },
      { id: 3, name: 'ID Proof.pdf', url: '#', status: 'Pending' },
    ],
    rejectionReason: '',
  },
];

const courseSeats = {
  'Computer Science': { total: 120, filled: 35 },
  'Mechanical Engineering': { total: 100, filled: 22 },
  'Business Administration': { total: 80, filled: 45 },
  'Civil Engineering': { total: 100, filled: 15 },
};

// --- HELPER COMPONENTS --- //

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Verified: "bg-blue-100 text-blue-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const SeatProgressBar = ({ course, seats }) => {
  const percentage = Math.round((seats.filled / seats.total) * 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="font-medium text-gray-700">{course}</span>
        <span className="text-gray-500">{seats.filled} / {seats.total} Seats</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const NotificationPopup = ({ message, type, onDismiss }) => {
    if (!message) return null;

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        info: <AlertTriangle className="h-5 w-5 text-blue-500" />,
    };

    const colors = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
        info: "bg-blue-100 border-blue-400 text-blue-700",
    }

    return (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-md border ${colors[type]} shadow-lg flex items-center space-x-3 animate-fade-in-down`}>
            {icons[type]}
            <span>{message}</span>
            <button onClick={onDismiss} className="text-xl font-bold">&times;</button>
        </div>
    );
};


// --- MAIN COMPONENTS --- //

const Dashboard = ({ applications, seats }) => {
  const stats = useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.status.toLowerCase()] = (acc[app.status.toLowerCase()] || 0) + 1;
      return acc;
    }, { total: applications.length, approved: 0, rejected: 0, pending: 0, verified: 0 });
  }, [applications]);

  const chartData = Object.entries(seats).map(([course, data]) => ({
    name: course,
    Approved: applications.filter(a => a.course === course && a.status === 'Approved').length,
    Pending: applications.filter(a => a.course === course && a.status !== 'Approved' && a.status !== 'Rejected').length,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Pending/Verified</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending + stats.verified}</p>
        </div>
      </div>

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Approved" fill="#22c55e" />
              <Bar dataKey="Pending" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Seats Filled</h3>
          {Object.entries(seats).map(([course, data]) => (
            <SeatProgressBar key={course} course={course} seats={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicationDetailsModal = ({ application, onClose, onUpdate, onNotify, onSeatUpdate }) => {
  if (!application) return null;

  const [currentApp, setCurrentApp] = useState(JSON.parse(JSON.stringify(application)));
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionPrompt, setShowRejectionPrompt] = useState(false);

  const handleDocStatusChange = (docId, newStatus, remarks = '') => {
    const updatedDocs = currentApp.documents.map(doc =>
      doc.id === docId ? { ...doc, status: newStatus, remarks } : doc
    );
    setCurrentApp({ ...currentApp, documents: updatedDocs });
  };
  
  const handleEligibilityOverride = (e) => {
      const { checked } = e.target;
      setCurrentApp({
          ...currentApp,
          eligibility: { ...currentApp.eligibility, override: checked }
      });
  };

  const handleApprove = () => {
      const updatedApp = { ...currentApp, status: 'Approved' };
      onUpdate(updatedApp);
      onNotify(`Application ${currentApp.id} approved. Admission letter sent.`, 'success');
      if (application.status !== 'Approved') {
        onSeatUpdate(currentApp.course, 1);
      }
      onClose();
  };

  const handleReject = () => {
      if (!rejectionReason.trim()) {
          onNotify('Please provide a reason for rejection.', 'error');
          return;
      }
      const updatedApp = { ...currentApp, status: 'Rejected', rejectionReason };
      onUpdate(updatedApp);
      onNotify(`Application ${currentApp.id} has been rejected.`, 'info');
      if (application.status === 'Approved') {
        onSeatUpdate(currentApp.course, -1);
      }
      onClose();
  };
  
  const handleVerifyAllDocs = () => {
    const allDocsVerified = currentApp.documents.every(d => d.status === 'Verified');
    if(allDocsVerified) {
        const updatedApp = { ...currentApp, status: 'Verified' };
        onUpdate(updatedApp);
        onNotify(`Application ${currentApp.id} documents verified.`, 'info');
    } else {
        onNotify('Not all documents are marked as "Verified".', 'error');
    }
  }

  const isEligible = currentApp.eligibility.met || currentApp.eligibility.override;
  const allDocsVerified = currentApp.documents.every(d => d.status === 'Verified');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentApp.name}</h2>
              <p className="text-sm text-gray-500">Application ID: {currentApp.id} | Course: {currentApp.course}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Verification & Eligibility */}
          <div className="md:col-span-2 space-y-6">
            {/* Document Verification */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Document Verification</h3>
              <div className="space-y-3">
                {currentApp.documents.map(doc => (
                  <div key={doc.id} className="p-3 bg-white rounded-md border flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <span className={`text-xs font-semibold ${doc.status === 'Verified' ? 'text-green-600' : doc.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{doc.status}</span>
                      {doc.status === 'Rejected' && doc.remarks && <p className="text-xs text-red-500 mt-1">Remark: {doc.remarks}</p>}
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <a href={doc.url} download className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><FileDown size={18} /></a>
                      <button onClick={() => handleDocStatusChange(doc.id, 'Verified')} className="p-2 text-green-500 hover:bg-green-50 rounded-full"><CheckCircle size={18} /></button>
                      <button onClick={() => handleDocStatusChange(doc.id, 'Rejected', prompt('Enter rejection remark (optional):'))} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><XCircle size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleVerifyAllDocs} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300" disabled={!currentApp.documents.every(d => d.status === 'Verified') || currentApp.status !== 'Pending'}>
                Mark Application as Verified
              </button>
            </div>

            {/* Eligibility Check */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Eligibility Check</h3>
              <div className={`p-3 rounded-md border-l-4 ${isEligible ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Minimum Eligibility</p>
                  {isEligible ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-red-500" />}
                </div>
                <p className="text-sm text-gray-600">Required: {currentApp.eligibility.required}</p>
                <p className="text-sm text-gray-600">Actual: {currentApp.eligibility.actual}</p>
              </div>
              {!currentApp.eligibility.met && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                   <label className="flex items-center space-x-2">
                     <input type="checkbox" checked={currentApp.eligibility.override} onChange={handleEligibilityOverride} className="form-checkbox h-5 w-5 text-yellow-600 rounded" />
                     <span className="text-sm font-medium text-yellow-800">Manually Override Eligibility</span>
                   </label>
                   {currentApp.eligibility.override && (
                     <textarea 
                        value={currentApp.eligibility.remarks}
                        onChange={(e) => setCurrentApp({...currentApp, eligibility: {...currentApp.eligibility, remarks: e.target.value}})}
                        placeholder="Admin remarks for override (e.g., special quota)"
                        className="mt-2 w-full p-2 text-sm border rounded-md"
                     />
                   )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Application Status</h3>
              <div className="text-center">
                <StatusBadge status={currentApp.status} />
              </div>
              {currentApp.status === 'Rejected' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                  <strong>Rejection Reason:</strong> {currentApp.rejectionReason}
                </div>
              )}
               {currentApp.status === 'Approved' && (
                <div className="mt-4">
                   <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2">
                     <FileDown size={18} />
                     <span>Generate Admission Letter</span>
                   </button>
                </div>
              )}
            </div>
            
            {showRejectionPrompt && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md text-sm"
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <div className="flex space-x-2 mt-2">
                  <button onClick={handleReject} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">Confirm Reject</button>
                  <button onClick={() => setShowRejectionPrompt(false)} className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                </div>
              </div>
            )}

            {!showRejectionPrompt && currentApp.status !== 'Approved' && currentApp.status !== 'Rejected' && (
              <div className="space-y-3 mt-4">
                <button 
                  onClick={handleApprove}
                  disabled={!allDocsVerified || !isEligible || currentApp.status !== 'Verified'}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Approve Application</span>
                </button>
                <button 
                  onClick={() => setShowRejectionPrompt(true)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle size={20} />
                  <span>Reject Application</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationsList = ({ applications, onSelectApplication }) => {
  const [filters, setFilters] = useState({ course: 'All', stream: 'All', status: 'All', searchTerm: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'descending' });
  
  const courses = ['All', ...new Set(initialApplications.map(a => a.course))];
  const streams = ['All', ...new Set(initialApplications.map(a => a.stream))];
  const statuses = ['All', 'Pending', 'Verified', 'Approved', 'Rejected'];

  const filteredApplications = useMemo(() => {
    let filtered = applications.filter(app => {
      return (filters.course === 'All' || app.course === filters.course) &&
             (filters.stream === 'All' || app.stream === filters.stream) &&
             (filters.status === 'All' || app.status === filters.status) &&
             (app.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
              app.id.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    });
    
    filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return filtered;
  }, [applications, filters, sortConfig]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Applications</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="relative col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            <input 
                type="text" 
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filters.searchTerm}
                onChange={e => setFilters({...filters, searchTerm: e.target.value})}
            />
        </div>
        <div>
          <select className="w-full p-2 border rounded-lg bg-white" value={filters.course} onChange={e => setFilters({...filters, course: e.target.value})}>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <select className="w-full p-2 border rounded-lg bg-white" value={filters.stream} onChange={e => setFilters({...filters, stream: e.target.value})}>
            {streams.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <select className="w-full p-2 border rounded-lg bg-white" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                <div className="flex items-center">Applicant {getSortIcon('name')}</div>
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('course')}>
                <div className="flex items-center">Course {getSortIcon('course')}</div>
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('submissionDate')}>
                <div className="flex items-center">Submitted {getSortIcon('submissionDate')}</div>
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('status')}>
                <div className="flex items-center">Status {getSortIcon('status')}</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div>{app.name}</div>
                  <div className="text-xs text-gray-500">{app.id}</div>
                </td>
                <td className="px-6 py-4">{app.course}</td>
                <td className="px-6 py-4">{new Date(app.submissionDate).toLocaleDateString()}</td>
                <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                <td className="px-6 py-4">
                  <button onClick={() => onSelectApplication(app)} className="font-medium text-blue-600 hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredApplications.length === 0 && <div className="text-center p-8 text-gray-500">No applications found matching your criteria.</div>}
      </div>
    </div>
  );
};


// --- App Component --- //
export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [applications, setApplications] = useState(initialApplications);
  const [seats, setSeats] = useState(courseSeats);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleUpdateApplication = (updatedApp) => {
    setApplications(apps => apps.map(app => app.id === updatedApp.id ? updatedApp : app));
  };
  
  const handleSeatUpdate = (course, change) => {
      setSeats(prevSeats => ({
          ...prevSeats,
          [course]: {
              ...prevSeats[course],
              filled: prevSeats[course].filled + change
          }
      }));
  };

  const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification({ message: '', type: '' }), 4000);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard applications={applications} seats={seats} />;
      case 'applications':
        return <ApplicationsList applications={applications} onSelectApplication={setSelectedApplication} />;
      default:
        return <Dashboard applications={applications} seats={seats} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          🎓 Admission Admin
        </div>
        <nav className="mt-6">
          <a href="#" onClick={() => setActiveView('dashboard')} className={`block py-3 px-6 transition-colors ${activeView === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Dashboard</a>
          <a href="#" onClick={() => setActiveView('applications')} className={`block py-3 px-6 transition-colors ${activeView === 'applications' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Applications</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-end items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
                <Bell size={20} />
            </button>
            <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-600"/>
                <span className="text-sm font-medium">Admin User</span>
            </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {renderView()}
        </main>
      </div>
      
      {/* Modal */}
      {selectedApplication && (
        <ApplicationDetailsModal 
          application={selectedApplication} 
          onClose={() => setSelectedApplication(null)}
          onUpdate={handleUpdateApplication}
          onNotify={showNotification}
          onSeatUpdate={handleSeatUpdate}
        />
      )}

      {/* Notification */}
      <NotificationPopup 
        message={notification.message} 
        type={notification.type} 
        onDismiss={() => setNotification({ message: '', type: '' })}
      />
    </div>
  );
}
