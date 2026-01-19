import React from 'react';
import { PersonalityResult } from '../types';
import { Brain, Share2, RefreshCw } from 'lucide-react';

interface ResultViewProps {
  result: PersonalityResult;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onRestart }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-700">
      
      {/* Main Result Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-center relative">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
            <div className="absolute inset-0 bg-white/10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
        </div>
        
        <div className="px-8 pb-10 relative">
          <div className="w-24 h-24 bg-white rounded-full p-2 mx-auto -mt-12 shadow-lg mb-6 flex items-center justify-center">
            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-blue-600">
               <Brain className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-slate-500 uppercase tracking-widest text-sm font-semibold mb-2">Your Personality Type</h3>
          <h1 className="text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">{result.code}</h1>
          <h2 className="text-2xl text-blue-600 font-serif italic mb-6">{result.title}</h2>
          
          <p className="text-slate-600 leading-relaxed text-lg">
            {result.description}
          </p>
        </div>
      </div>

      {/* EEG Insight Card */}
      {result.eegAnalysis && (
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 shadow-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-blue-300 font-mono text-sm uppercase tracking-wider mb-2">Neuro-Feedback Insight</h4>
              <p className="text-sm leading-relaxed text-slate-300">
                {result.eegAnalysis}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Retake Test
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-medium">
          <Share2 className="w-4 h-4" />
          Share Results
        </button>
      </div>
    </div>
  );
};

export default ResultView;