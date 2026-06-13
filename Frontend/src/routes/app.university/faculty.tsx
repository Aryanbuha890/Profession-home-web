import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Users, Search, Filter, Mail, Award, BookOpen, Star } from "lucide-react";

export const Route = createFileRoute("/app/university/faculty")({
  component: FacultyPage,
});

function FacultyPage() {
  const faculty = [
    { name: "Dr. Arvind Menon", dept: "Computer Science", role: "HOD & Professor", papers: 142, rating: 4.8, img: "A" },
    { name: "Dr. Sarah Jenkins", dept: "Biotechnology", role: "Associate Professor", papers: 84, rating: 4.9, img: "S" },
    { name: "Prof. Rajesh Kumar", dept: "Mechanical Eng.", role: "Assistant Professor", papers: 32, rating: 4.5, img: "R" },
    { name: "Dr. Elena Rostova", dept: "Data Science", role: "Research Chair", papers: 210, rating: 4.9, img: "E" },
    { name: "Dr. Vikram Singh", dept: "Physics", role: "Professor", papers: 115, rating: 4.6, img: "V" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Faculty Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Manage teaching staff, track publications, and monitor student ratings.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search faculty by name or department..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <button className="p-2 border border-slate-700 bg-slate-800/50 rounded-lg text-slate-300 hover:text-white transition">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {faculty.map((prof, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/50 transition group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  {prof.img}
                </div>
                <div className="flex gap-1 items-center bg-yellow-500/10 px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-yellow-500">{prof.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition">{prof.name}</h3>
              <p className="text-xs font-medium text-indigo-300 mb-4">{prof.role} • {prof.dept}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 text-slate-400">
                <div className="flex items-center gap-1.5 text-sm">
                  <BookOpen className="w-4 h-4" /> 
                  <span className="font-semibold text-slate-200">{prof.papers}</span> papers
                </div>
                <button className="p-1.5 bg-slate-900 rounded-lg hover:bg-indigo-500 hover:text-white transition">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
