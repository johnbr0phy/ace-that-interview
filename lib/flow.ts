export type StepType = 'welcome' | 'question' | 'loading' | 'plan';

export type QuestionType = 'multiple-choice' | 'text-input' | 'multi-select' | 'slider';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface FlowStep {
  id: string;
  type: StepType;
  questionType?: QuestionType;
  coachMessage: string;
  question?: string;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  minSelect?: number;
  maxSelect?: number;
  nextStep?: string;
  conditionalNext?: Record<string, string>;
}

export const flowSteps: FlowStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    coachMessage: "Hi there! I'm your interview coach, and I'm here to help you prepare.",
  },
  {
    id: 'timeline',
    type: 'question',
    questionType: 'multiple-choice',
    coachMessage: "First, let's understand your timeline.",
    question: "When's your interview?",
    options: [
      { id: 'this-week', label: 'This week', description: "We'll focus on high-impact prep" },
      { id: '1-2-weeks', label: '1-2 weeks', description: 'Good time for structured practice' },
      { id: '1-month', label: 'About a month', description: "Perfect for comprehensive prep" },
      { id: 'exploring', label: 'Just exploring', description: "Let's build a foundation" },
    ],
    nextStep: 'experience',
  },
  {
    id: 'experience',
    type: 'question',
    questionType: 'multiple-choice',
    coachMessage: 'Got it! Now tell me about your experience level.',
    question: "How many years of experience do you have?",
    options: [
      { id: '0-2', label: '0-2 years', description: 'Entry level / New grad' },
      { id: '3-5', label: '3-5 years', description: 'Mid-level' },
      { id: '6-10', label: '6-10 years', description: 'Senior' },
      { id: '10+', label: '10+ years', description: 'Staff / Principal' },
    ],
    nextStep: 'interview-type',
  },
  {
    id: 'interview-type',
    type: 'question',
    questionType: 'multi-select',
    coachMessage: "Great! Let's identify what you'll be facing.",
    question: 'What types of interviews are you preparing for?',
    options: [
      { id: 'coding', label: 'Coding / Algorithms' },
      { id: 'system-design', label: 'System Design' },
      { id: 'behavioral', label: 'Behavioral' },
      { id: 'technical-deep-dive', label: 'Technical Deep Dive' },
    ],
    minSelect: 1,
    maxSelect: 4,
    nextStep: 'weak-areas',
  },
  {
    id: 'weak-areas',
    type: 'question',
    questionType: 'multi-select',
    coachMessage: "Be honest with me - it helps me help you better!",
    question: 'Which areas do you feel least confident in?',
    options: [
      { id: 'data-structures', label: 'Data Structures' },
      { id: 'algorithms', label: 'Algorithms' },
      { id: 'system-design', label: 'System Design' },
      { id: 'communication', label: 'Communicating my thought process' },
    ],
    minSelect: 1,
    maxSelect: 4,
    nextStep: 'past-attempts',
  },
  {
    id: 'past-attempts',
    type: 'question',
    questionType: 'multiple-choice',
    coachMessage: "Every attempt is a learning opportunity.",
    question: 'Have you interviewed at this company before?',
    options: [
      { id: 'first-time', label: 'First time' },
      { id: 'interviewed-before', label: "Yes, didn't get an offer" },
      { id: 'got-offer-before', label: 'Yes, got an offer before' },
    ],
    nextStep: 'loading',
  },
  {
    id: 'loading',
    type: 'loading',
    coachMessage: "Analyzing your profile and creating a personalized plan...",
  },
  {
    id: 'plan',
    type: 'plan',
    coachMessage: "Here's your personalized interview prep plan!",
  },
];

export function getStepById(id: string): FlowStep | undefined {
  return flowSteps.find(step => step.id === id);
}

export function getNextStepId(currentStep: FlowStep, answer?: string): string | null {
  if (currentStep.conditionalNext && answer) {
    return currentStep.conditionalNext[answer] || currentStep.nextStep || null;
  }
  return currentStep.nextStep || null;
}
