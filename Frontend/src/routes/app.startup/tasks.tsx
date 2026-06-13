import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/app/startup/tasks")({
  component: TasksPage,
});

const KANBAN_DATA = {
  todo: [
    { id: 1, title: 'Draft Product Requirements (PRD)', tags: ['Product'], date: 'Oct 24', comments: 2, attachments: 1, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, title: 'Investor Update Email', tags: ['Fundraising', 'High'], date: 'Oct 25', comments: 0, attachments: 0, avatar: 'https://i.pravatar.cc/150?u=founder' },
  ],
  inProgress: [
    { id: 3, title: 'Design Landing Page V2', tags: ['Design'], date: 'Oct 23', comments: 5, attachments: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
  ],
  review: [
    { id: 5, title: 'Terms of Service Audit', tags: ['Legal'], date: 'Oct 20', comments: 12, attachments: 4, avatar: 'https://i.pravatar.cc/150?u=5' },
  ],
  done: [
    { id: 6, title: 'Hire Senior Frontend Dev', tags: ['HR'], date: 'Oct 15', comments: 8, attachments: 2, avatar: 'https://i.pravatar.cc/150?u=founder' },
  ]
};

function TasksPage() {
  return (
    <div className="h-full flex flex-col animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Execution Board</h1>
          <p className="text-sm text-slate-400 mt-1">Sprint #42 • Oct 18 - Oct 31</p>
        </div>
        <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-coral-500/20">
          Create Issue
        </button>
      </div>
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full items-start">
          {[
            { title: "To Do", tasks: KANBAN_DATA.todo, color: "bg-slate-500" },
            { title: "In Progress", tasks: KANBAN_DATA.inProgress, color: "bg-blue-500" },
            { title: "In Review", tasks: KANBAN_DATA.review, color: "bg-orange-500" },
            { title: "Completed", tasks: KANBAN_DATA.done, color: "bg-emerald-500" }
          ].map(col => (
            <div key={col.title} className="flex flex-col min-w-[320px] w-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={"w-2 h-2 rounded-full " + col.color} />
                  <h3 className="font-semibold text-slate-200">{col.title}</h3>
                  <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                </div>
              </div>
              <div className="space-y-3 bg-slate-900/20 rounded-xl p-2 border border-slate-800/30">
                {col.tasks.map((task) => (
                  <div key={task.id} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl hover:border-slate-600 transition cursor-grab group">
                    <p className="text-sm font-medium text-white mb-4">{task.title}</p>
                    <div className="flex items-center justify-between text-slate-400 text-xs mt-auto">
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {task.date}</span>
                      </div>
                      <img src={task.avatar} alt="Assignee" className="w-6 h-6 rounded-full border border-slate-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
