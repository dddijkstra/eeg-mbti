import React, { useState } from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { QUESTIONS } from './constants';
import { AppPhase, Dimension, PersonalityResult } from './types';
import { analyzePersonality } from './services/analysisService';
import ProgressBar from './components/ProgressBar';
import EEGMonitor from './components/EEGMonitor';
import QuestionCard from './components/QuestionCard';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Dimension>>({});
  const [result, setResult] = useState<PersonalityResult | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isEEGActive = phase === AppPhase.TEST || phase === AppPhase.ANALYZING;

  const handleStart = () => {
    setPhase(AppPhase.TEST);
  };

  const handleSelectOption = (questionId: number, dimension: Dimension) => {
    setAnswers(prev => ({ ...prev, [questionId]: dimension }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setPhase(AppPhase.ANALYZING);
      // Simulate API call
      const finalResult = await analyzePersonality(answers, { avgAlpha: 45, avgBeta: 55 });
      setResult(finalResult);
      setPhase(AppPhase.RESULT);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setPhase(AppPhase.INTRO);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleRestart}>
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Brain className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">NeuroType</span>
          </div>
          {phase === AppPhase.TEST && (
            <div className="hidden md:block w-1/3">
               <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Intro Phase */}
        {phase === AppPhase.INTRO && (
          <div className="max-w-3xl mx-auto text-center space-y-8 py-10 animate-in fade-in duration-700">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               Neuro-Adaptive Technology
             </div>
             
             <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
               Discover Your True Self <br/>
               <span className="text-blue-600">Through Bio-Feedback</span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
               Traditional personality tests rely on what you <em>think</em> you do. 
               NeuroType combines MBTI methodology with real-time simulated brainwave analysis 
               to uncover your cognitive reflexes.
             </p>

             <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button 
                  onClick={handleStart}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  Start Assessment <ArrowRight className="w-5 h-5" />
                </button>
             </div>

             <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 font-bold text-lg">1</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Connect EEG</h3>
                  <p className="text-sm text-slate-500">We simulate a connection to a neuro-headset to monitor Alpha/Beta waves.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 font-bold text-lg">2</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Answer Honestly</h3>
                  <p className="text-sm text-slate-500">Respond to rapid-fire scenarios while we track your cognitive load.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 font-bold text-lg">3</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Get Insights</h3>
                  <p className="text-sm text-slate-500">Receive a detailed personality profile enhanced by biometric data.</p>
                </div>
             </div>
          </div>
        )}

        {/* Test & Analyzing Phase */}
        {(phase === AppPhase.TEST || phase === AppPhase.ANALYZING) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-full items-start">
            
            {/* Left: Question Area */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              {phase === AppPhase.TEST && (
                <div className="h-full min-h-[400px]">
                  <QuestionCard 
                    question={currentQuestion}
                    selectedOptionId={answers[currentQuestion.id] ? 
                      currentQuestion.options.find(o => o.dimension === answers[currentQuestion.id])?.id 
                      : undefined
                    }
                    onSelect={(opt) => handleSelectOption(currentQuestion.id, opt.dimension)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isFirst={currentQuestionIndex === 0}
                    isLast={currentQuestionIndex === QUESTIONS.length - 1}
                  />
                </div>
              )}

              {phase === AppPhase.ANALYZING && (
                <div className="h-full min-h-[400px] bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
                  <div className="relative w-24 h-24 mb-8">
                     <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                     <Brain className="absolute inset-0 m-auto text-blue-600 w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Synthesizing Data</h2>
                  <p className="text-slate-500 max-w-md">
                    Correlating your self-reported answers with micro-fluctuations in your simulated EEG patterns...
                  </p>
                </div>
              )}
            </div>

            {/* Right: EEG Visualizer */}
            <div className="lg:col-span-5 order-1 lg:order-2 sticky top-20">
               <div className="mb-4 lg:hidden">
                 <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
               </div>
               <EEGMonitor active={isEEGActive} />
               <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 hidden lg:block">
                 <p className="font-semibold mb-1">Tip:</p>
                 <p>Try not to overthink. Your brain activity is most accurate when you answer instinctively.</p>
               </div>
            </div>
          </div>
        )}

        {/* Result Phase */}
        {phase === AppPhase.RESULT && result && (
          <ResultView result={result} onRestart={handleRestart} />
        )}

      </main>
    </div>
  );
};

export default App;