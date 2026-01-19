import React from 'react';
import { Question, Option } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelect: (option: Option) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOptionId, 
  onSelect, 
  onNext, 
  onPrev,
  isFirst,
  isLast
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
        {question.text}
      </h2>

      <div className="flex-1 space-y-4">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group relative overflow-hidden
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md' 
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="font-medium text-lg">{option.text}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-blue-500' : 'border-slate-300'}`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-sm transition-all
            ${!selectedOptionId 
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'}`}
        >
          {isLast ? 'Complete Analysis' : 'Next Question'}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;