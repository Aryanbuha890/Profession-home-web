export interface ResearchTask {
  id: string;
  title: string;
  done: boolean;
  isAiRecommended?: boolean;
}

export interface ResearchPhase {
  phase: number;
  name: string;
  desc: string;
  details: string;
  action: string;
  category: "Hypothesis" | "Literature" | "Experiment" | "Drafting" | "Submission";
  tags: string[];
  gradient: string;
  color: "violet" | "sky" | "emerald" | "indigo" | "rose";
  tasks: ResearchTask[];
  initials: string;
  timeline: string;
}

export interface ResearchProject {
  id: number;
  title: string;
  field: string;
  progress: number;
  citations: number;
  coauthors: string[];
  sotaLevel: string;
  image: string;
  status: "active" | "review" | "draft";
}

export interface Collaborator {
  id: string;
  name: string;
  title: string;
  institution: string;
  hIndex: number;
  citations: number;
  avatar: string;
  expertise: string[];
  matchScore?: number;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  citations: number;
  status: "published" | "review" | "draft";
  authors: string[];
  doi?: string;
}

export interface Grant {
  id: string;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  status: "active" | "pending" | "awarded" | "draft";
  progress: number;
}

export interface Patent {
  id: string;
  title: string;
  stage: string;
  progress: number;
  filingDate: string;
  inventors: string[];
}

export interface KanbanTask {
  id: number;
  title: string;
  column: "todo" | "progress" | "done";
  priority: "High" | "Medium" | "Low";
  tags?: string[];
}

export interface Badge {
  title: string;
  desc: string;
  icon: string;
  earned: boolean;
  color: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
}

export interface ResearchEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "conference" | "workshop" | "seminar" | "deadline";
  image: string;
}

export type PhaseStatus = "Done" | "In Progress" | "Upcoming" | "Locked";

export interface PhaseWithStatus extends ResearchPhase {
  pct: number;
  status: PhaseStatus;
}
