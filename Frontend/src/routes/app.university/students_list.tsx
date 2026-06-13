import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Search, Filter, MoreVertical, GraduationCap, Mail, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/university/students_list")({
  component: StudentsListPage,
});

function StudentsListPage() {
  const students = [
    { name: "Rahul Sharma", id: "CS2023-042", branch: "Computer Science", year: "3rd Year", gpa: "3.8", status: "Active" },
    { name: "Priya Patel", id: "ME2022-118", branch: "Mechanical Eng.", year: "4th Year", gpa: "3.5", status: "Interning" },
    { name: "Amit Kumar", id: "EE2024-005", branch: "Electrical Eng.", year: "2nd Year", gpa: "3.9", status: "Active" },
    { name: "Neha Singh", id: "BT2021-089", branch: "Biotechnology", year: "4th Year", gpa: "3.2", status: "Placed" },
    { name: "Vikram Desai", id: "CS2023-156", branch: "Computer Science", year: "3rd Year", gpa: "3.6", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Manage all enrolled students and track their academic progress.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by name, ID, or branch..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition"
              />
            </div>
            <button className="p-2 border border-slate-700 bg-slate-800/50 rounded-lg text-slate-300 hover:text-white transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-slate-950/50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Branch & Year</th>
                <th className="px-6 py-4 font-semibold">GPA</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {students.map((student, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        {student.name[0]}
                      </div>
                      <span className="font-medium text-slate-200">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{student.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{student.branch}</span>
                      <span className="text-xs text-slate-500">{student.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-300">{student.gpa}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      student.status === 'Placed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
