import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round(((current) / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;