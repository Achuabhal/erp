import React, { useState, useEffect } from 'react';
import { LucideFileText, LucideUser, LucideBookOpen, LucideUsers, LucideUpload, LucideHome, LucideMail, LucidePhone, LucideGraduationCap, LucideTrash2, LucideEdit, LucideSave, LucideX, LucideEye, LucideFileDown, LucidePrinter, LucideUserCheck } from 'lucide-react';

// --- Helper Components ---
const Section = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 mb-8">
        <div className="flex items-center mb-6">
            {icon}
            <h2 className="text-2xl font-bold text-gray-800 ml-3">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

const Input = ({ label, type = 'text', value, onChange, name, placeholder, required = false, error, disabled = false }) => (
    <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700 flex items-center">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Enter ${label}`}
            disabled={disabled}
            className={`p-3 border rounded-lg transition-all duration-300 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${error ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500'}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const Select = ({ label, value, onChange, name, options, required = false, error, disabled = false }) => (
    <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700 flex items-center">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`p-3 border rounded-lg bg-white transition-all duration-300 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${error ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500'}`}
        >
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const FileUpload = ({ label, onChange, name, fileName, required = false, error, disabled = false }) => (
    <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700 flex items-center">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <label className={`flex items-center justify-center p-3 border-2 border-dashed rounded-lg transition-all duration-300 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'} ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}>
            <LucideUpload className="w-6 h-6 text-gray-500 mr-3" />
            <span className="text-gray-700">{fileName || `Upload ${label}`}</span>
            <input type="file" className="hidden" name={name} onChange={onChange} disabled={disabled} />
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const Modal = ({ show, onClose, title, message, isSuccess }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center transform transition-all duration-300 scale-95 hover:scale-100">
                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isSuccess ? <LucideUserCheck className="h-6 w-6 text-green-600" /> : <LucideX className="h-6 w-6 text-red-600" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-4">{title}</h3>
                <p className="text-gray-600 mt-2">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


// --- Main Application Component ---
export default function App() {
    const [page, setPage] = useState('form'); // 'form' or 'admin'
    const [admissions, setAdmissions] = useState([]);
    const [editingAdmission, setEditingAdmission] = useState(null);

    const handleAddNewAdmission = (newAdmission) => {
        setAdmissions(prev => [...prev, { ...newAdmission, id: Date.now().toString() }]);
    };
    
    const handleUpdateAdmission = (updatedAdmission) => {
        setAdmissions(prev => prev.map(adm => adm.id === updatedAdmission.id ? updatedAdmission : adm));
        setEditingAdmission(null);
    };

    const handleDeleteAdmission = (id) => {
        if (window.confirm("Are you sure you want to delete this admission record?")) {
            setAdmissions(prev => prev.filter(admission => admission.id !== id));
        }
    };
    
    const handleEditAdmission = (admission) => {
        setEditingAdmission(admission);
        setPage('form');
    };

    const handleCancelEdit = () => {
        setEditingAdmission(null);
        setPage('admin');
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <LucideGraduationCap className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800 ml-3">Student Admission Portal</h1>
                    </div>
                    <div>
                        <button
                            onClick={() => { setPage('form'); setEditingAdmission(null); }}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${page === 'form' && !editingAdmission ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Admission Form
                        </button>
                        <button
                            onClick={() => setPage('admin')}
                            className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${page === 'admin' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Admin Panel
                        </button>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-6 py-8">
                {page === 'form' ? (
                    <AdmissionForm 
                        onAddAdmission={handleAddNewAdmission}
                        onUpdateAdmission={handleUpdateAdmission}
                        editingAdmission={editingAdmission}
                        onCancelEdit={handleCancelEdit}
                    />
                ) : (
                    <AdminView 
                        admissions={admissions} 
                        onDelete={handleDeleteAdmission}
                        onEdit={handleEditAdmission}
                    />
                )}
            </main>
             <footer className="text-center py-4 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Admission Portal. All rights reserved. (Frontend Demo)</p>
            </footer>
        </div>
    );
}

// --- Admission Form Component ---
const AdmissionForm = ({ onAddAdmission, onUpdateAdmission, editingAdmission, onCancelEdit }) => {
    const initialFormState = {
        fullName: '', dob: '', gender: '', bloodGroup: '',
        mobileNumber: '', email: '',
        address: { houseNo: '', street: '', city: '', district: '', state: '', pinCode: '' },
        fatherName: '', motherName: '', guardianName: '', guardianContact: '', occupation: '',
        prevSchool: '', prevClass: '', prevBoard: '', prevMarks: '',
        admissionClass: '', academicYear: '', admissionDate: new Date().toISOString().split('T')[0],
        status: 'draft',
    };

    const initialFileState = {
        photo: null, aadhaar: null, birthCertificate: null, prevMarksheet: null, tc: null
    };

    const [formData, setFormData] = useState(initialFormState);
    const [files, setFiles] = useState(initialFileState);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ show: false, title: '', message: '', isSuccess: false });
    
    useEffect(() => {
        if (editingAdmission) {
            setFormData({ ...initialFormState, ...editingAdmission });
            // Note: Files cannot be re-populated in file inputs for security reasons.
            // We'll just show the existing filenames.
            const fileNames = editingAdmission.fileNames || {};
            const pseudoFiles = {};
            for (const key in fileNames) {
                if (fileNames[key]) {
                    pseudoFiles[key] = { name: fileNames[key] };
                }
            }
            setFiles(pseudoFiles);

        } else {
            setFormData(initialFormState);
            setFiles(initialFileState);
        }
    }, [editingAdmission]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles.length > 0) {
            setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
            if (errors[name]) {
                setErrors(prev => ({ ...prev, [name]: null }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // Basic Details
        if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
        if (!formData.gender) newErrors.gender = 'Gender is required.';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required.';

        // Contact Details
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
        else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
        if (!formData.address.houseNo) newErrors['address.houseNo'] = 'House/Flat No. is required.';
        if (!formData.address.street) newErrors['address.street'] = 'Street/Area is required.';
        if (!formData.address.city) newErrors['address.city'] = 'City is required.';
        if (!formData.address.district) newErrors['address.district'] = 'District is required.';
        if (!formData.address.state) newErrors['address.state'] = 'State is required.';
        if (!formData.address.pinCode) newErrors['address.pinCode'] = 'PIN Code is required.';
        else if (!/^\d{6}$/.test(formData.address.pinCode)) newErrors['address.pinCode'] = 'Enter a valid 6-digit PIN code.';

        // Parent/Guardian Details
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
        if (!formData.motherName) newErrors.motherName = "Mother's Name is required.";
        if (!formData.guardianContact) newErrors.guardianContact = 'Guardian Contact is required.';

        // Academic Details
        if (!formData.prevSchool) newErrors.prevSchool = 'Previous School is required.';
        if (!formData.prevClass) newErrors.prevClass = 'Previous Class is required.';
        if (!formData.prevBoard) newErrors.prevBoard = 'Board/University is required.';
        if (!formData.prevMarks) newErrors.prevMarks = 'Marks/Grades are required.';

        // Course Admission Info
        if (!formData.admissionClass) newErrors.admissionClass = 'Admission Class is required.';
        if (!formData.academicYear) newErrors.academicYear = 'Academic Year is required.';

        // File Uploads (only for new submissions)
        if (!editingAdmission) {
            if (!files.photo) newErrors.photo = 'Photo is required.';
            if (!files.aadhaar) newErrors.aadhaar = 'Aadhaar Card is required.';
            if (!files.birthCertificate) newErrors.birthCertificate = 'Birth Certificate is required.';
            if (!files.prevMarksheet) newErrors.prevMarksheet = 'Previous Marksheet is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (status) => {
        if (status === 'submitted' && !validateForm()) {
            setModal({ show: true, title: 'Validation Error', message: 'Please fill all required fields correctly.', isSuccess: false });
            return;
        }

        const submissionData = {
            ...formData,
            status,
            submittedAt: new Date().toISOString(),
            fileNames: {
                photo: files.photo?.name || (editingAdmission && editingAdmission.fileNames.photo) || '',
                aadhaar: files.aadhaar?.name || (editingAdmission && editingAdmission.fileNames.aadhaar) || '',
                birthCertificate: files.birthCertificate?.name || (editingAdmission && editingAdmission.fileNames.birthCertificate) || '',
                prevMarksheet: files.prevMarksheet?.name || (editingAdmission && editingAdmission.fileNames.prevMarksheet) || '',
                tc: files.tc?.name || (editingAdmission && editingAdmission.fileNames.tc) || '',
            },
        };
        
        if (editingAdmission) {
            onUpdateAdmission({ ...submissionData, id: editingAdmission.id });
            setModal({ show: true, title: 'Success!', message: 'Form has been successfully updated.', isSuccess: true });
        } else {
            onAddAdmission(submissionData);
            setModal({ show: true, title: 'Success!', message: `Form has been successfully ${status}.`, isSuccess: true });
            handleReset();
        }
    };
    
    const handleReset = () => {
        setFormData(initialFormState);
        setFiles(initialFileState);
        setErrors({});
    };

    return (
        <>
            <Modal {...modal} onClose={() => setModal(prev => ({ ...prev, show: false }))} />
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{editingAdmission ? 'Edit Admission' : 'New Admission Form'}</h2>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
                <Section title="Basic Student Details" icon={<LucideUser className="w-8 h-8 text-blue-500" />}>
                    <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required error={errors.fullName} />
                    <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required error={errors.dob} />
                    <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} required error={errors.gender} />
                    <Select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} required error={errors.bloodGroup} />
                    <FileUpload label="Photo" name="photo" onChange={handleFileChange} fileName={files.photo?.name} required={!editingAdmission} error={errors.photo} />
                </Section>

                <Section title="Contact Details" icon={<LucideMail className="w-8 h-8 text-green-500" />}>
                    <Input label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} required error={errors.mobileNumber} />
                    <Input label="Email ID (optional)" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                    <Input label="House/Flat No." name="address.houseNo" value={formData.address.houseNo} onChange={handleChange} required error={errors['address.houseNo']} />
                    <Input label="Street/Area" name="address.street" value={formData.address.street} onChange={handleChange} required error={errors['address.street']} />
                    <Input label="City" name="address.city" value={formData.address.city} onChange={handleChange} required error={errors['address.city']} />
                    <Input label="District" name="address.district" value={formData.address.district} onChange={handleChange} required error={errors['address.district']} />
                    <Input label="State" name="address.state" value={formData.address.state} onChange={handleChange} required error={errors['address.state']} />
                    <Input label="PIN Code" name="address.pinCode" type="tel" value={formData.address.pinCode} onChange={handleChange} required error={errors['address.pinCode']} />
                </Section>

                <Section title="Parent/Guardian Details" icon={<LucideUsers className="w-8 h-8 text-purple-500" />}>
                    <Input label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required error={errors.fatherName} />
                    <Input label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} required error={errors.motherName} />
                    <Input label="Guardian Name (if applicable)" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                    <Input label="Guardian Contact Number" name="guardianContact" type="tel" value={formData.guardianContact} onChange={handleChange} required error={errors.guardianContact} />
                    <Input label="Occupation (optional)" name="occupation" value={formData.occupation} onChange={handleChange} />
                </Section>

                <Section title="Academic Details" icon={<LucideBookOpen className="w-8 h-8 text-yellow-500" />}>
                    <Input label="Previous School/College Name" name="prevSchool" value={formData.prevSchool} onChange={handleChange} required error={errors.prevSchool} />
                    <Input label="Previous Class/Grade" name="prevClass" value={formData.prevClass} onChange={handleChange} required error={errors.prevClass} />
                    <Input label="Board/University" name="prevBoard" value={formData.prevBoard} onChange={handleChange} required error={errors.prevBoard} />
                    <Input label="Marks/Grades (%)" name="prevMarks" value={formData.prevMarks} onChange={handleChange} required error={errors.prevMarks} />
                    <FileUpload label="TC/Conduct Certificate (optional)" name="tc" onChange={handleFileChange} fileName={files.tc?.name} />
                </Section>

                <Section title="Course Admission Info" icon={<LucideHome className="w-8 h-8 text-indigo-500" />}>
                    <Input label="Class/Stream Seeking Admission To" name="admissionClass" value={formData.admissionClass} onChange={handleChange} required error={errors.admissionClass} />
                    <Input label="Academic Year" name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="e.g., 2024-2025" required error={errors.academicYear} />
                    <Input label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
                </Section>
                
                <Section title="Documents Upload" icon={<LucideFileText className="w-8 h-8 text-red-500" />}>
                    <FileUpload label="Aadhaar Card" name="aadhaar" onChange={handleFileChange} fileName={files.aadhaar?.name} required={!editingAdmission} error={errors.aadhaar} />
                    <FileUpload label="Birth Certificate" name="birthCertificate" onChange={handleFileChange} fileName={files.birthCertificate?.name} required={!editingAdmission} error={errors.birthCertificate} />
                    <FileUpload label="Previous Marksheet" name="prevMarksheet" onChange={handleFileChange} fileName={files.prevMarksheet?.name} required={!editingAdmission} error={errors.prevMarksheet} />
                </Section>

                <div className="flex justify-end items-center mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200/80 space-x-4">
                    {editingAdmission ? (
                        <>
                            <button type="button" onClick={onCancelEdit} className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                                Cancel
                            </button>
                            <button type="button" onClick={() => handleSubmit('submitted')} className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={handleReset} className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                                Reset Form
                            </button>
                            <button type="button" onClick={() => handleSubmit('draft')} className="px-6 py-3 rounded-lg font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-300">
                                Save as Draft
                            </button>
                            <button type="button" onClick={() => handleSubmit('submitted')} className="px-8 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Submit Application
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
};

// --- Admin View Component ---
const AdminView = ({ admissions, onDelete, onEdit }) => {
    const [viewingAdmission, setViewingAdmission] = useState(null);

    if (viewingAdmission) {
        return <AdmissionDetailView admission={viewingAdmission} onBack={() => setViewingAdmission(null)} />;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/80">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Submitted Admissions</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-200">
                            <th className="p-4 font-semibold text-gray-600">Full Name</th>
                            <th className="p-4 font-semibold text-gray-600">Admission Class</th>
                            <th className="p-4 font-semibold text-gray-600">Submission Date</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admissions.length > 0 ? admissions.map(admission => (
                            <tr key={admission.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-800">{admission.fullName}</td>
                                <td className="p-4 text-gray-600">{admission.admissionClass}</td>
                                <td className="p-4 text-gray-600">{new Date(admission.submittedAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        admission.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {admission.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => setViewingAdmission(admission)} className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors" title="View Details"><LucideEye className="w-5 h-5" /></button>
                                    <button onClick={() => onEdit(admission)} className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors ml-2" title="Edit"><LucideEdit className="w-5 h-5" /></button>
                                    <button onClick={() => onDelete(admission.id)} className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors ml-2" title="Delete"><LucideTrash2 className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-gray-500">No admission forms submitted yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || 'N/A'}</dd>
    </div>
);

const AdmissionDetailView = ({ admission, onBack }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/80">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Admission Details</h2>
                <button onClick={onBack} className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                    Back to List
                </button>
            </div>
            
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">Application ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">{admission.id}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-bold text-gray-600">Status</dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                             <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                 admission.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                             }`}>
                                 {admission.status}
                             </span>
                         </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5"><h3 className="font-bold text-lg text-gray-700">Student Information</h3></div>
                    <div className="bg-white px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <DetailItem label="Full Name" value={admission.fullName} />
                        <DetailItem label="Date of Birth" value={admission.dob} />
                        <DetailItem label="Gender" value={admission.gender} />
                        <DetailItem label="Blood Group" value={admission.bloodGroup} />
                        <DetailItem label="Mobile Number" value={admission.mobileNumber} />
                        <DetailItem label="Email" value={admission.email} />
                    </div>

                    <div className="bg-gray-50 px-4 py-5"><h3 className="font-bold text-lg text-gray-700">Address</h3></div>
                    <div className="bg-white px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <DetailItem label="House/Flat No." value={admission.address.houseNo} />
                        <DetailItem label="Street/Area" value={admission.address.street} />
                        <DetailItem label="City" value={admission.address.city} />
                        <DetailItem label="District" value={admission.address.district} />
                        <DetailItem label="State" value={admission.address.state} />
                        <DetailItem label="PIN Code" value={admission.address.pinCode} />
                    </div>

                    <div className="bg-gray-50 px-4 py-5"><h3 className="font-bold text-lg text-gray-700">Parent/Guardian Information</h3></div>
                    <div className="bg-white px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <DetailItem label="Father's Name" value={admission.fatherName} />
                        <DetailItem label="Mother's Name" value={admission.motherName} />
                        <DetailItem label="Guardian's Name" value={admission.guardianName} />
                        <DetailItem label="Guardian's Contact" value={admission.guardianContact} />
                        <DetailItem label="Occupation" value={admission.occupation} />
                    </div>

                    <div className="bg-gray-50 px-4 py-5"><h3 className="font-bold text-lg text-gray-700">Academic & Admission Details</h3></div>
                    <div className="bg-white px-4 py-5 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <DetailItem label="Previous School" value={admission.prevSchool} />
                        <DetailItem label="Previous Class" value={admission.prevClass} />
                        <DetailItem label="Previous Board" value={admission.prevBoard} />
                        <DetailItem label="Previous Marks" value={admission.prevMarks} />
                        <DetailItem label="Seeking Admission To" value={admission.admissionClass} />
                        <DetailItem label="Academic Year" value={admission.academicYear} />
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5"><h3 className="font-bold text-lg text-gray-700">Uploaded Documents</h3></div>
                    <div className="bg-white px-4 py-5">
                        <ul>
                            {Object.entries(admission.fileNames || {}).map(([key, value]) => value && (
                                <li key={key} className="flex items-center text-sm py-1">
                                    <LucideFileText className="w-4 h-4 mr-2 text-gray-500" />
                                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="ml-2 text-gray-700">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </dl>
            </div>
        </div>
    );
};
