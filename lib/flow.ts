export type StepType = 'welcome' | 'question' | 'content' | 'loading' | 'plan';

export type QuestionType = 'multiple-choice' | 'text-input' | 'multi-select' | 'slider';

export type ContentType = 'video' | 'code' | 'diagram' | 'long-text' | 'image' | 'tip-card';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface VideoContent {
  type: 'video';
  url: string; // YouTube embed URL
  title: string;
  duration?: string;
}

export interface CodeContent {
  type: 'code';
  language: string;
  code: string;
  title?: string;
  highlightLines?: number[];
}

export interface DiagramContent {
  type: 'diagram';
  diagramType: 'complexity' | 'system' | 'flowchart' | 'comparison';
  data: Record<string, unknown>;
  title?: string;
}

export interface LongTextContent {
  type: 'long-text';
  title: string;
  content: string; // Markdown supported
  readingTime?: string;
}

export interface ImageContent {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface TipCardContent {
  type: 'tip-card';
  tips: Array<{
    icon: 'lightbulb' | 'warning' | 'check' | 'star';
    title: string;
    description: string;
  }>;
}

export type StepContent = VideoContent | CodeContent | DiagramContent | LongTextContent | ImageContent | TipCardContent;

export interface FlowStep {
  id: string;
  type: StepType;
  questionType?: QuestionType;
  coachMessage: string;
  question?: string;
  options?: QuestionOption[];
  content?: StepContent;
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
    nextStep: 'big-o-intro',
  },
  // NEW: Video content explaining Big O
  {
    id: 'big-o-intro',
    type: 'content',
    coachMessage: "Before we continue, let's make sure you're solid on Big O notation - it comes up in every coding interview.",
    content: {
      type: 'video',
      url: 'https://www.youtube.com/embed/BgLTDT03QtU',
      title: 'Big O Notation in 5 Minutes',
      duration: '5:23',
    },
    nextStep: 'big-o-diagram',
  },
  // NEW: Diagram showing complexity comparison
  {
    id: 'big-o-diagram',
    type: 'content',
    coachMessage: "Here's a visual reference for how different time complexities compare. This is crucial to internalize.",
    content: {
      type: 'diagram',
      diagramType: 'complexity',
      title: 'Time Complexity Comparison',
      data: {
        complexities: [
          { name: 'O(1)', label: 'Constant', color: '#22c55e', example: 'Array access' },
          { name: 'O(log n)', label: 'Logarithmic', color: '#84cc16', example: 'Binary search' },
          { name: 'O(n)', label: 'Linear', color: '#eab308', example: 'Simple loop' },
          { name: 'O(n log n)', label: 'Linearithmic', color: '#f97316', example: 'Merge sort' },
          { name: 'O(n²)', label: 'Quadratic', color: '#ef4444', example: 'Nested loops' },
          { name: 'O(2ⁿ)', label: 'Exponential', color: '#dc2626', example: 'Recursive fibonacci' },
        ],
      },
    },
    nextStep: 'code-example',
  },
  // NEW: Code example with syntax highlighting
  {
    id: 'code-example',
    type: 'content',
    coachMessage: "Here's a classic pattern - two pointers on a sorted array. O(n) time, O(1) space.",
    content: {
      type: 'code',
      language: 'python',
      title: 'Two Sum (Sorted Array)',
      code: `def two_sum(nums, target):
    left, right = 0, len(nums) - 1

    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return [left, right]
        elif total < target:
            left += 1
        else:
            right -= 1
    return []`,
      highlightLines: [2, 5, 6],
    },
    nextStep: 'interview-tips',
  },
  // NEW: Tip cards with key advice
  {
    id: 'interview-tips',
    type: 'content',
    coachMessage: "These four tips have helped hundreds of candidates succeed. Read them carefully.",
    content: {
      type: 'tip-card',
      tips: [
        {
          icon: 'lightbulb',
          title: 'Think Out Loud',
          description: "Interviewers can't read your mind. Narrate your thought process, even when you're stuck.",
        },
        {
          icon: 'warning',
          title: "Don't Jump to Code",
          description: 'Spend 5-10 minutes understanding the problem. Ask clarifying questions. Discuss your approach first.',
        },
        {
          icon: 'check',
          title: 'Test Your Code',
          description: 'Walk through your solution with a simple example. Check edge cases: empty input, single element, duplicates.',
        },
        {
          icon: 'star',
          title: 'Know Your Complexities',
          description: "Always state the time and space complexity. If asked to optimize, know what you're optimizing from.",
        },
      ],
    },
    nextStep: 'system-design-intro',
  },
  // NEW: Long text content for deeper reading
  {
    id: 'system-design-intro',
    type: 'content',
    coachMessage: "System design is about trade-offs. Here's a quick primer on the key concepts.",
    content: {
      type: 'long-text',
      title: 'System Design Fundamentals',
      readingTime: '3 min read',
      content: `## The Core Trade-offs

Every system design decision involves trade-offs. Understanding these is more important than memorizing solutions.

### CAP Theorem
You can only guarantee two of three properties:
- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a response
- **Partition Tolerance**: System continues despite network failures

In practice, partitions happen, so you're choosing between CP (consistent but may be unavailable) or AP (available but may be stale).

### Scalability Patterns

**Vertical Scaling** (Scale Up)
- Add more CPU, RAM to existing machines
- Simpler but has limits
- Good for databases with complex transactions

**Horizontal Scaling** (Scale Out)
- Add more machines
- Requires stateless design
- Better for web servers, caches

### Key Components to Know

1. **Load Balancers** - Distribute traffic (Round Robin, Least Connections, IP Hash)
2. **Caches** - Redis, Memcached (Cache-aside, Write-through, Write-behind)
3. **CDNs** - Static content delivery, reduce latency
4. **Message Queues** - Kafka, RabbitMQ (async processing, decoupling)
5. **Databases** - SQL vs NoSQL, sharding, replication

### The Framework

1. **Clarify requirements** (functional + non-functional)
2. **Estimate scale** (users, requests/sec, storage)
3. **Design high-level** (boxes and arrows)
4. **Deep dive** (pick 1-2 components)
5. **Address bottlenecks** (what breaks at 10x scale?)`,
    },
    nextStep: 'interview-type',
  },
  {
    id: 'interview-type',
    type: 'question',
    questionType: 'multi-select',
    coachMessage: "Now that you've seen some examples, let's identify what you'll be facing.",
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
