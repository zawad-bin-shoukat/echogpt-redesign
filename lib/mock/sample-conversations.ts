import type { Conversation, Message, QuickAction } from "@/types";

/** Realistic sample conversations seeded in the sidebar for demo purposes. */
export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-001",
    title: "Refactor async data fetching",
    modelSlug: "moonshotai/Kimi-K2.7-Code",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    messages: [
      {
        id: "msg-001-1",
        role: "user",
        content:
          "Can you help me refactor this async data fetching hook to use React Query instead?",
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        status: "complete",
      },
      {
        id: "msg-001-2",
        role: "assistant",
        modelSlug: "moonshotai/Kimi-K2.7-Code",
        content: `Sure! Here's how you can migrate your custom fetch hook to React Query:\n\n\`\`\`tsx\nimport { useQuery } from '@tanstack/react-query';\n\nexport function useUserData(userId: string) {\n  return useQuery({\n    queryKey: ['user', userId],\n    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),\n    staleTime: 5 * 60 * 1000, // 5 minutes\n  });\n}\n\`\`\`\n\nThis replaces manual loading/error state tracking with React Query's built-in caching and background refetching.`,
        createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        status: "complete",
      },
    ],
  },
  {
    id: "conv-002",
    title: "Explain transformer attention",
    modelSlug: "gpt-5.6-sol",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    messages: [
      {
        id: "msg-002-1",
        role: "user",
        content:
          "Can you explain how self-attention works in transformer models? I'm struggling with the Q, K, V intuition.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        status: "complete",
      },
      {
        id: "msg-002-2",
        role: "assistant",
        modelSlug: "gpt-5.6-sol",
        content:
          "Great question! The Q (Query), K (Key), V (Value) framework is best understood through an analogy:\n\n**Imagine a library lookup:**\n- **Query** = your search request\n- **Key** = the index labels on each book\n- **Value** = the actual book content\n\nThe attention mechanism computes how similar your query is to each key, then uses those similarity scores (softmaxed) to weight the values you retrieve.\n\nMathematically: `Attention(Q, K, V) = softmax(QK^T / √d_k) × V`\n\nThe `√d_k` scaling prevents the dot products from becoming too large in high-dimensional spaces, which would push softmax into vanishing gradient territory.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        status: "complete",
      },
    ],
  },
  {
    id: "conv-003",
    title: "Landing page copy review",
    modelSlug: "gpt-5.6-sol",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    messages: [
      {
        id: "msg-003-1",
        role: "user",
        content:
          "Review this hero headline: 'Your AI. Everywhere.' Is it too vague?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        status: "complete",
      },
      {
        id: "msg-003-2",
        role: "assistant",
        modelSlug: "gpt-5.6-sol",
        content:
          "Yes — it's evocative but too vague for a hero headline. The reader can't tell what the product does from those 4 words alone.\n\nAlternatives that maintain the punchy style but add specificity:\n\n- *\"40+ AI Models. One Workspace.\"* — communicates breadth immediately\n- *\"Chat with Every Frontier AI Without Switching Tabs\"* — problem-aware\n- *\"The Multi-Model AI Workspace for People Who Actually Work\"* — persona-driven\n\nFor a landing page, specificity converts better than atmosphere.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        status: "complete",
      },
    ],
  },
  {
    id: "conv-004",
    title: "Draft conference talk abstract",
    modelSlug: "meta/muse-spark-1.3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
    messages: [
      {
        id: "msg-004-1",
        role: "user",
        content:
          "I need a 150-word abstract for a talk titled 'The UX of AI: Designing Interfaces That Don't Mislead Users'.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: "complete",
      },
    ],
  },
];

/** Factory for generating a new blank conversation. */
export function createBlankConversation(modelSlug: string): Conversation {
  const now = new Date().toISOString();
  return {
    id: `conv-${Date.now()}`,
    title: "New Conversation",
    modelSlug,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

/** Sample message factory for the empty state and demo animations. */
export function createUserMessage(content: string): Message {
  return {
    id: `msg-${Date.now()}-u`,
    role: "user",
    content,
    createdAt: new Date().toISOString(),
    status: "complete",
  };
}

export function createAssistantMessage(
  modelSlug: string,
  content = ""
): Message {
  return {
    id: `msg-${Date.now()}-a`,
    role: "assistant",
    modelSlug,
    content,
    createdAt: new Date().toISOString(),
    status: "streaming",
  };
}

/** Quick actions shown in the empty state and prompt composer. */
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "qa-summarize",
    label: "Summarize",
    prompt: "Please summarize the following text concisely:\n\n",
    icon: "AlignLeft",
    category: "analyze",
  },
  {
    id: "qa-explain-code",
    label: "Explain Code",
    prompt: "Explain what this code does and how it works:\n\n```\n\n```",
    icon: "Code2",
    category: "code",
  },
  {
    id: "qa-brainstorm",
    label: "Brainstorm",
    prompt:
      "Help me brainstorm creative ideas for the following topic or problem:\n\n",
    icon: "Lightbulb",
    category: "write",
  },
  {
    id: "qa-debug",
    label: "Debug",
    prompt:
      "I have a bug in the following code. Please identify and fix the issue:\n\n```\n\n```",
    icon: "Bug",
    category: "code",
  },
  {
    id: "qa-draft-email",
    label: "Draft Email",
    prompt:
      "Write a professional email about the following topic. Tone: clear and concise.\n\nTopic: ",
    icon: "Mail",
    category: "write",
  },
  {
    id: "qa-compare",
    label: "Compare Options",
    prompt:
      "Compare the following options and provide a balanced analysis with pros and cons for each:\n\n",
    icon: "BarChart2",
    category: "analyze",
  },
];
