import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import { Activity, Zap, Wifi, WifiOff } from 'lucide-react';
import { EEGDataPoint } from '../types';

interface EEGMonitorProps {
  active: boolean;
}

const EEGMonitor: React.FC<EEGMonitorProps> = ({ active }) => {
  const [data, setData] = useState<EEGDataPoint[]>([]);
  const [connected, setConnected] = useState(false);
  
  // Refs to handle animation loop without re-triggering effects excessively
  const dataRef = useRef<EEGDataPoint[]>([]);
  const frameRef = useRef<number>(0);

  // Connection Simulation
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setConnected(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setConnected(false);
      setData([]);
      dataRef.current = [];
    }
  }, [active]);

  // Data Generation Loop
  useEffect(() => {
    if (!active || !connected) return;

    const updateInterval = setInterval(() => {
      const now = Date.now();
      
      // Simulate biological noise + signal
      // Alpha: 8-12Hz (Relaxed)
      // Beta: 12-30Hz (Active)
      const t = now / 1000;
      const newPoint: EEGDataPoint = {
        time: now,
        // Composite sine waves to look like EEG
        alpha: Math.sin(t * 10) * 20 + Math.sin(t * 22) * 10 + (Math.random() - 0.5) * 5, 
        beta: Math.sin(t * 25) * 15 + Math.cos(t * 15) * 10 + (Math.random() - 0.5) * 15 + 40 // Offset Beta to separate lines visually
      };

      const newData = [...dataRef.current, newPoint];
      if (newData.length > 50) newData.shift(); // Keep last 50 points
      
      dataRef.current = newData;
      setData(newData);
    }, 50); // 20fps update for smoothness

    return () => clearInterval(updateInterval);
  }, [active, connected]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-xl border border-slate-700 flex flex-col h-full min-h-[250px]">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="font-mono text-sm font-semibold tracking-wider text-slate-300">
            EEG SIGNAL MONITOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono ${connected ? 'text-green-400' : 'text-amber-400'}`}>
            {connected ? 'DEVICE CONNECTED' : 'SEARCHING...'}
          </span>
          {connected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-amber-400" />}
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-1 relative bg-slate-950">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>

        {!connected && active && (
           <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/50 backdrop-blur-sm">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-slate-400 text-sm">Calibrating sensors...</p>
           </div>
        )}

        {connected && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={[-40, 80]} hide />
              {/* Alpha Wave */}
              <Line 
                type="monotone" 
                dataKey="alpha" 
                stroke="#60a5fa" // blue-400
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={false}
              />
              {/* Beta Wave */}
              <Line 
                type="monotone" 
                dataKey="beta" 
                stroke="#f472b6" // pink-400
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status Footer */}
      <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 flex justify-between items-center text-xs font-mono text-slate-400">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>Alpha (Relaxed)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
            <span>Beta (Focus)</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <Zap className="w-3 h-3" />
          <span>50Hz</span>
        </div>
      </div>
    </div>
  );
};

export default EEGMonitor;
