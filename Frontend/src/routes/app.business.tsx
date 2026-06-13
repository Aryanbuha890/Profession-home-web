import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  LineChart, Line, AreaChart, Area 
} from "recharts";
import { ChevronRight, MapPin, Search, Star, MoreVertical, Zap, Activity, Navigation, ArrowUpRight, TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/business")({
  head: () => ({ meta: [{ title: "Business Dashboard" }] }),
  component: BusinessHomePage,
});

const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Common Card Component
function GlassCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#161719] border border-white/5 rounded-[24px] p-6 shadow-2xl relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </div>
  );
}

// 1. Business Overview Card (Replaces "Next Ride")
function BusinessOverviewCard() {
  return (
    <GlassCard className="flex flex-col justify-between h-full min-h-[220px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium">Business Overview</h3>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-14 h-14 border border-white/10 rounded-full ring-2 ring-transparent group-hover:ring-[#DFFF00]/30 transition-all">
          <AvatarImage src="https://i.pravatar.cc/150?img=11" />
          <AvatarFallback>VG</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-white text-lg font-semibold flex items-center gap-2">
            Vraj Gajjar
            <Badge className="bg-[#DFFF00]/10 text-[#DFFF00] text-[10px] px-2 py-0.5 rounded-full border border-[#DFFF00]/20">Verified</Badge>
          </h2>
          <div className="flex items-center text-[#DFFF00] text-xs font-medium mt-1">
            <Star className="w-3 h-3 fill-current mr-1" /> 4.9 <span className="text-white/40 ml-1 font-normal">Out of 5 (230 reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-white/40 text-xs mb-1">HQ Location</p>
          <p className="text-white text-sm">321 Central Street, India</p>
        </div>
        <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-full px-5 text-xs hover:bg-white/10 hover:text-white">
          View Details
        </Button>
      </div>
    </GlassCard>
  );
}

// 2. Today's Sales (Replaces "Today's Earning" bar chart)
const salesData = [
  { name: 'M', value: 30 }, { name: 'T', value: 45 }, { name: 'W', value: 55 },
  { name: 'T', value: 40 }, { name: 'F', value: 65 }, { name: 'S', value: 95 }, { name: 'S', value: 85 }
];

function TodaySalesCard() {
  return (
    <GlassCard className="h-full min-h-[260px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium">Today's Sales</h3>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      <div className="h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#DFFF00' }}
            />
            <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={24}>
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === 'S' && entry.value === 95 ? '#DFFF00' : '#2A2B2F'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Tooltip mimic for highest day */}
      <div className="absolute top-[80px] right-[76px] bg-[#DFFF00] text-black text-[10px] font-bold px-2 py-1 rounded-full z-10 hidden sm:block">
        $9.2k
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#DFFF00] rotate-45" />
      </div>
    </GlassCard>
  );
}

// 3. Orders History (Replaces "Rides History")
function OrdersHistoryCard() {
  return (
    <GlassCard className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Orders History</h3>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-[16px] bg-[#202125] border border-white/5 hover:bg-[#25262A] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 20}`} />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-white text-sm font-medium">Enterprise Plan</h4>
                <p className="text-white/40 text-[10px] mt-0.5">4 June, 2026 • 07:40 PM</p>
                <p className="text-white/60 text-[11px] mt-0.5">Annual Sub - $250</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#DFFF00] transition-colors" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// 4. Revenue Card (Replaces "Earning & Withdraw")
const sparklineData = [{v: 10}, {v: 15}, {v: 8}, {v: 25}, {v: 20}, {v: 35}, {v: 30}, {v: 45}];

function RevenueCard() {
  return (
    <GlassCard className="flex flex-col justify-between h-full min-h-[220px]">
      <div className="flex justify-between items-center mb-2">
        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
          <span className="text-white/70 text-[10px] font-medium">30% Better</span>
        </div>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      <div className="mt-4 flex justify-between items-end">
        <div>
          <p className="text-white/50 text-sm mb-1">Total Revenue</p>
          <h2 className="text-white text-4xl font-bold tracking-tight">$14,450.00</h2>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="v" stroke="#DFFF00" strokeWidth={2} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Button className="w-full mt-6 bg-[#DFFF00] hover:bg-[#c2e600] text-black font-bold rounded-full h-12 text-sm shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_30px_rgba(212,255,0,0.5)] transition-all">
        Withdraw Funds
      </Button>
    </GlassCard>
  );
}

// 5. Customer Activity (Replaces "Energy Level")
function CustomerActivityCard() {
  return (
    <GlassCard className="h-full min-h-[220px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium">Customer Activity</h3>
        <div className="bg-white/5 rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-white/10 text-xs text-white/60">
          Last 24h <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      
      <div className="flex justify-around items-center mt-8">
        {/* Ring 1 */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="34" stroke="#DFFF00" strokeWidth="8" fill="none" strokeDasharray="213" strokeDashoffset="53" strokeLinecap="round" className="animate-[spin_2s_ease-out]" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
            <span className="text-white/50 text-xs">New</span>
          </div>
        </div>
        
        {/* Ring 2 */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="34" stroke="#DFFF00" strokeWidth="8" fill="none" strokeDasharray="213" strokeDashoffset="106" strokeLinecap="round" className="animate-[spin_2.5s_ease-out]" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
            <span className="text-white/50 text-xs">Returning</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// 6. Traffic Intensity
const trafficData = [
  { time: '1', value: 20 }, { time: '2', value: 15 }, { time: '3', value: 45 },
  { time: '4', value: 30 }, { time: '5', value: 65 }, { time: '6', value: 40 },
  { time: '7', value: 85 }, { time: '8', value: 70 }, { time: '9', value: 100 }
];

function TrafficCard() {
  return (
    <GlassCard className="h-full">
      <h3 className="text-white font-medium mb-4">Traffic Intensity</h3>
      
      <div className="h-[120px] w-full mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DFFF00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#DFFF00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip content={<></>} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Area type="monotone" dataKey="value" stroke="#DFFF00" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" isAnimationActive={true} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-[#DFFF00]" />
        <span className="text-white/50 text-xs">Active Visitors Now | <span className="text-white font-medium">340</span></span>
      </div>
    </GlassCard>
  );
}

// 7. Global Reach (Replaces "Distance Traveled")
function GlobalReachCard() {
  return (
    <GlassCard className="flex flex-col h-full min-h-[340px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium">Global Reach</h3>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      {/* Map visual placeholder */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[140px] mb-6">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-10 filter invert" />
        
        {/* Map Points & Arc */}
        <div className="absolute w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M 120 100 Q 200 40 280 90" fill="none" stroke="rgba(212,255,0,0.5)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
          </svg>
          <div className="absolute top-[40%] left-[28%] w-3 h-3 bg-[#DFFF00] rounded-full shadow-[0_0_10px_#DFFF00] flex items-center justify-center">
             <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="absolute top-[35%] right-[28%] w-3 h-3 bg-[#DFFF00] rounded-full shadow-[0_0_10px_#DFFF00] flex items-center justify-center">
             <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
      </div>

      <div className="bg-[#202125]/80 rounded-[20px] p-5 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">1.7M</h1>
            <span className="text-white/40 text-sm">Users</span>
          </div>
          <div className="bg-white/5 rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-white/10 text-xs text-white/60">
            Last month <ChevronDown className="w-3 h-3" />
          </div>
        </div>
        
        {/* Custom Progress Bar Segmented */}
        <div className="flex items-center gap-2 h-4 w-full">
          <div className="h-full bg-white/10 rounded-full flex-[1]" />
          <div className="h-full bg-white/10 rounded-full flex-[2]" />
          <div className="h-full bg-[#DFFF00] rounded-full flex-[5] relative shadow-[0_0_10px_rgba(212,255,0,0.3)]" />
          <div className="h-full bg-white/10 rounded-full flex-[2]" />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 mt-2 px-1">
          <span>NA</span>
          <span>EU</span>
          <span className="text-[#DFFF00]">ASIA</span>
          <span>SA</span>
        </div>
      </div>
    </GlassCard>
  );
}

// 8. Performance
function PerformanceCard() {
  return (
    <GlassCard className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium">Performance</h3>
        <button className="text-white/40 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      
      <div className="flex justify-around items-center h-[120px]">
        {/* Ring 1 */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="34" stroke="#DFFF00" strokeWidth="8" fill="none" strokeDasharray="213" strokeDashoffset="42" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">80%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
            <span className="text-white/50 text-xs">Conversion Rate</span>
          </div>
        </div>
        
        {/* Ring 2 */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle cx="40" cy="40" r="34" stroke="#DFFF00" strokeWidth="8" fill="none" strokeDasharray="213" strokeDashoffset="21" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">4.9</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
            <span className="text-white/50 text-xs">Customer Rating</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// Minimal Badge Component for Avatar
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={className}>{children}</span>;
}

// MAIN PAGE LAYOUT
function BusinessHomePage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans selection:bg-[#DFFF00] selection:text-black pb-20">
      
      {/* Top Navbar / Header area (Simplified) */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0B0C10]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DFFF00] rounded-xl flex items-center justify-center font-bold text-black text-xl shadow-[0_0_15px_rgba(212,255,0,0.4)]">
            B
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">BusinessHub</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="hidden sm:block text-right">
              <p className="text-white text-sm font-medium">Vraj Gajjar</p>
              <p className="text-[#DFFF00] text-xs flex items-center justify-end gap-1"><Star className="w-3 h-3 fill-current" /> 4.9 rating</p>
            </div>
            <Avatar className="w-10 h-10 border border-white/10 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" />
              <AvatarFallback>VG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column 1 (Left) */}
          <motion.div className="lg:col-span-4 space-y-6" initial="initial" animate="animate" variants={FADE_IN}>
            <BusinessOverviewCard />
            <TodaySalesCard />
            <OrdersHistoryCard />
          </motion.div>
          
          {/* Column 2 (Middle) */}
          <motion.div className="lg:col-span-4 space-y-6" initial="initial" animate="animate" variants={FADE_IN} transition={{ delay: 0.1 }}>
            <RevenueCard />
            <CustomerActivityCard />
            <TrafficCard />
          </motion.div>
          
          {/* Column 3 (Right) */}
          <motion.div className="lg:col-span-4 space-y-6" initial="initial" animate="animate" variants={FADE_IN} transition={{ delay: 0.2 }}>
            <GlobalReachCard />
            <PerformanceCard />
            
            {/* Extra Quick Actions to fill space gracefully */}
            <GlassCard className="bg-gradient-to-br from-[#DFFF00]/10 to-transparent border-[#DFFF00]/20">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#DFFF00]" /> Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-[#202125] hover:bg-[#25262A] text-white border border-white/5 rounded-xl h-12 flex justify-start px-4">
                  New Campaign
                </Button>
                <Button className="bg-[#202125] hover:bg-[#25262A] text-white border border-white/5 rounded-xl h-12 flex justify-start px-4">
                  Add Product
                </Button>
                <Button className="bg-[#202125] hover:bg-[#25262A] text-white border border-white/5 rounded-xl h-12 flex justify-start px-4">
                  View Reports
                </Button>
                <Button className="bg-[#202125] hover:bg-[#25262A] text-white border border-white/5 rounded-xl h-12 flex justify-start px-4">
                  Settings
                </Button>
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </main>

      {/* Global styles for specific animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </div>
  );
}
