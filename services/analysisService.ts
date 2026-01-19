import { Dimension, PersonalityResult } from '../types';
import { MOCK_RESULTS, FALLBACK_RESULT } from '../constants';

interface AnswerMap {
  [questionId: number]: Dimension;
}

/**
 * Calculates the MBTI type based on answers.
 * This is a simplified logic for demonstration.
 */
function calculateType(answers: AnswerMap): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  Object.values(answers).forEach(dim => {
    scores[dim]++;
  });

  const ie = scores.E > scores.I ? 'E' : 'I';
  const sn = scores.S > scores.N ? 'S' : 'N';
  const tf = scores.T > scores.F ? 'T' : 'F';
  const jp = scores.J > scores.P ? 'J' : 'P';

  return `${ie}${sn}${tf}${jp}`;
}

/**
 * Simulates a backend API call that analyzes both the survey answers and the EEG data.
 * In a real app, this would send data to a Python backend or Gemini API.
 */
export async function analyzePersonality(
  answers: AnswerMap, 
  eegSummary: { avgAlpha: number; avgBeta: number }
): Promise<PersonalityResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const typeCode = calculateType(answers);
      const baseResult = MOCK_RESULTS[typeCode] || FALLBACK_RESULT;

      // Simulate EEG providing extra context
      let eegInsight = "";
      if (eegSummary.avgBeta > eegSummary.avgAlpha) {
        eegInsight = "Your EEG data showed high Beta wave activity during decision-making questions, suggesting an alert, analytical cognitive processing style typical of thinkers.";
      } else {
        eegInsight = "Your EEG data showed dominant Alpha waves, indicating a flow-state and intuitive processing style, often found in creative or empathetic types.";
      }

      resolve({
        ...baseResult,
        eegAnalysis: eegInsight
      });
    }, 2500); // 2.5s simulated delay
  });
}