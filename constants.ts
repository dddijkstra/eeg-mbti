import { Question, PersonalityResult } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "At a social gathering, you tend to...",
    options: [
      { id: "1a", text: "Interact with many people, including strangers", dimension: 'E', value: 1 },
      { id: "1b", text: "Stick to a few people you already know", dimension: 'I', value: 1 }
    ]
  },
  {
    id: 2,
    text: "When solving a problem, you prefer to...",
    options: [
      { id: "2a", text: "Rely on concrete facts and data", dimension: 'S', value: 1 },
      { id: "2b", text: "Imagine possibilities and theories", dimension: 'N', value: 1 }
    ]
  },
  {
    id: 3,
    text: "In decision making, you are more influenced by...",
    options: [
      { id: "3a", text: "Logic and consistency", dimension: 'T', value: 1 },
      { id: "3b", text: "People's feelings and harmony", dimension: 'F', value: 1 }
    ]
  },
  {
    id: 4,
    text: "Your work style is usually...",
    options: [
      { id: "4a", text: "Organized and planned ahead", dimension: 'J', value: 1 },
      { id: "4b", text: "Flexible and spontaneous", dimension: 'P', value: 1 }
    ]
  },
  {
    id: 5,
    text: "After a long week, you feel recharged by...",
    options: [
      { id: "5a", text: "Going out with friends", dimension: 'E', value: 1 },
      { id: "5b", text: "Spending time alone", dimension: 'I', value: 1 }
    ]
  },
  {
    id: 6,
    text: "You consider yourself more...",
    options: [
      { id: "6a", text: "Practical and realistic", dimension: 'S', value: 1 },
      { id: "6b", text: "Imaginative and innovative", dimension: 'N', value: 1 }
    ]
  },
  {
    id: 7,
    text: "When a friend is sad, you first offer...",
    options: [
      { id: "7a", text: "Practical advice and solutions", dimension: 'T', value: 1 },
      { id: "7b", text: "Emotional support and empathy", dimension: 'F', value: 1 }
    ]
  },
  {
    id: 8,
    text: "You prefer to have a schedule that is...",
    options: [
      { id: "8a", text: "Set in stone", dimension: 'J', value: 1 },
      { id: "8b", text: "Open to change", dimension: 'P', value: 1 }
    ]
  }
];

export const MOCK_RESULTS: Record<string, PersonalityResult> = {
  "ISTJ": { code: "ISTJ", title: "The Logistician", description: "Practical and fact-minded individuals, whose reliability cannot be doubted." },
  "ISFJ": { code: "ISFJ", title: "The Defender", description: "Very dedicated and warm protectors, always ready to defend their loved ones." },
  "INFJ": { code: "INFJ", title: "The Advocate", description: "Quiet and mystical, yet very inspiring and tireless idealists." },
  "INTJ": { code: "INTJ", title: "The Architect", description: "Imaginative and strategic thinkers, with a plan for everything." },
  "ISTP": { code: "ISTP", title: "The Virtuoso", description: "Bold and practical experimenters, masters of all kinds of tools." },
  "ISFP": { code: "ISFP", title: "The Adventurer", description: "Flexible and charming artists, always ready to explore and experience something new." },
  "INFP": { code: "INFP", title: "The Mediator", description: "Poetic, kind and altruistic people, always eager to help a good cause." },
  "INTP": { code: "INTP", title: "The Logician", description: "Innovative inventors with an unquenchable thirst for knowledge." },
  "ESTP": { code: "ESTP", title: "The Entrepreneur", description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge." },
  "ESFP": { code: "ESFP", title: "The Entertainer", description: "Spontaneous, energetic and enthusiastic people – life is never boring around them." },
  "ENFP": { code: "ENFP", title: "The Campaigner", description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile." },
  "ENTP": { code: "ENTP", title: "The Debater", description: "Smart and curious thinkers who cannot resist an intellectual challenge." },
  "ESTJ": { code: "ESTJ", title: "The Executive", description: "Excellent administrators, unsurpassed at managing things – or people." },
  "ESFJ": { code: "ESFJ", title: "The Consul", description: "Extraordinarily caring, social and popular people, always eager to help." },
  "ENFJ": { code: "ENFJ", title: "The Protagonist", description: "Charismatic and inspiring leaders, able to mesmerize their listeners." },
  "ENTJ": { code: "ENTJ", title: "The Commander", description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one." },
};

// Fallback result
export const FALLBACK_RESULT: PersonalityResult = MOCK_RESULTS["INFJ"];
