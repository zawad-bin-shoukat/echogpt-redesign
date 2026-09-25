import type { Model } from "@/types";
import { generateSimulatedResponse } from "@/lib/mock/simulation-responses";

export interface ExtensionMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  passageSnippet?: string;
  modelName?: string;
  modelCategory?: string;
  timestamp: string;
  codeSnippet?: string;
}

/**
 * Initial conversation state simulating a user who just highlighted
 * an article excerpt and requested an explanation.
 */
export const INITIAL_EXTENSION_MESSAGES: ExtensionMessage[] = [
  {
    id: "msg-init-user",
    role: "user",
    content: "Explain the selected passage on sparse expert routing and why it reduces inference FLOPs.",
    passageSnippet:
      "Sparse MoE architectures decouple total parameter capacity from per-token computation FLOPs by activating sparse expert sub-networks dynamically per token, achieving 40B+ capacity representation while incurring the compute footprint of a 7B model.",
    timestamp: "Just now",
  },
  {
    id: "msg-init-assistant",
    role: "assistant",
    content: `The highlighted section describes how **Sparse Mixture-of-Experts (MoE)** decouples overall parameter capacity from per-token computation:

- **Selective Gating**: Only 2 of 16 sub-networks activate for any single token.
- **FLOP Efficiency**: Maintains a 40B+ capacity representation while computing only ~7B FLOPs per step.
- **Dynamic Routing**: A lightweight gating matrix evaluates a softmax distribution over candidate expert networks before passing to subsequent layers.`,
    codeSnippet: "active_experts = topK(softmax(W_gate · x), k=2)",
    modelName: "GPT-5.6 Sol",
    modelCategory: "flagship",
    timestamp: "Just now",
  },
];

/**
 * Generates an honest, realistic simulated response for the 3 quick actions.
 */
export function getExtensionActionResponse(
  action: "summarize" | "explain" | "takeaways",
  model: Model,
  pageContextActive: boolean
): { userMessage: ExtensionMessage; assistantMessage: ExtensionMessage } {
  const timestamp = "Just now";

  if (!pageContextActive) {
    const userMessage: ExtensionMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content:
        action === "summarize"
          ? "Summarize this page"
          : action === "explain"
          ? "Explain the highlighted selection"
          : "Extract key takeaways",
      timestamp,
    };

    const assistantMessage: ExtensionMessage = {
      id: `asst-${Date.now()}`,
      role: "assistant",
      content: `**Page Context Paused**: Page context is currently detached in the side panel. 

To perform page-aware actions (summarizing this article, explaining excerpts, or extracting key takeaways), please enable page context in the banner above.

*You can still ask general questions to **${model.name}** below.*`,
      modelName: model.name,
      modelCategory: model.category,
      timestamp,
    };

    return { userMessage, assistantMessage };
  }

  if (action === "summarize") {
    const userMessage: ExtensionMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: "Summarize this webpage",
      timestamp,
    };

    const assistantMessage: ExtensionMessage = {
      id: `asst-${Date.now()}`,
      role: "assistant",
      content: `### Executive Summary: Mixture-of-Experts (MoE) Architecture

**Article**: *Understanding Mixture-of-Experts (MoE) Models in 2026* (Dr. Elena Vance)

- **The Inference Bottleneck**: As frontier models approach multi-trillion parameter scales, GPU memory bandwidth and inference energy consumption become the primary throughput constraints.
- **Sparse Activation Principle**: Rather than computing all weights for every token (dense models), MoE activates only candidate sub-networks per token.
- **Lightweight Gating Router**: A softmax gating matrix dynamically routes each token to the top-2 scoring experts before blending their output representations.
- **Practical Benefit**: Delivers 40B+ effective capacity representation while incurring the compute footprint of a 7B model.`,
      modelName: model.name,
      modelCategory: model.category,
      timestamp,
    };

    return { userMessage, assistantMessage };
  }

  if (action === "explain") {
    const userMessage: ExtensionMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: "Explain the selected passage on sparse expert routing",
      passageSnippet:
        "Sparse MoE architectures decouple total parameter capacity from per-token computation FLOPs by activating sparse expert sub-networks dynamically per token...",
      timestamp,
    };

    const assistantMessage: ExtensionMessage = {
      id: `asst-${Date.now()}`,
      role: "assistant",
      content: `### Breakdown: Decoupling Parameters from FLOPs

Synthesized via **${model.name}**:

1. **Parameter vs. FLOP Decoupling**: In dense models, 100% of weights participate in every single token. In sparse MoE, all expert weights reside in GPU VRAM, but only ~14B parameters activate per token step.
2. **Selective Gating Mechanism**:
The routing layer calculates:
\`const [expertA, expertB] = selectTopK(routerWeights, 2);\`
Only the highest-scoring sub-networks compute forward activations for each token.
3. **Throughput Acceleration**: Memory bandwidth requirements per step drop significantly, enabling higher tokens/second without sacrificing general intelligence.`,
      codeSnippet: "const [expertA, expertB] = selectTopK(routerWeights, 2);",
      modelName: model.name,
      modelCategory: model.category,
      timestamp,
    };

    return { userMessage, assistantMessage };
  }

  // action === "takeaways"
  const userMessage: ExtensionMessage = {
    id: `user-${Date.now()}`,
    role: "user",
    content: "Extract key architectural takeaways from this page",
    timestamp,
  };

  const assistantMessage: ExtensionMessage = {
    id: `asst-${Date.now()}`,
    role: "assistant",
    content: `### Key Takeaways

1. **Economic Scaling**: Frontier model deployment requires sparse routing to curb hardware energy and cooling bottlenecks in production environments.
2. **Dynamic Gating**: Top-K routing ensures only specialized experts compute tokens, maintaining precision while capping per-step FLOPs.
3. **Developer Impact**: Enables instant side-panel queries, code autocompletion, and multi-model verification without noticeable latency degradation.`,
    modelName: model.name,
    modelCategory: model.category,
    timestamp,
  };

  return { userMessage, assistantMessage };
}

/**
 * Handles custom queries typed into the Side Panel composer.
 */
export function getExtensionCustomResponse(
  prompt: string,
  model: Model,
  pageContextActive: boolean
): { userMessage: ExtensionMessage; assistantMessage: ExtensionMessage } {
  const timestamp = "Just now";
  const userMessage: ExtensionMessage = {
    id: `user-${Date.now()}`,
    role: "user",
    content: prompt,
    timestamp,
  };

  const lower = prompt.toLowerCase();

  // If question is about the active article or MoE concepts
  if (
    pageContextActive &&
    (lower.includes("moe") ||
      lower.includes("sparse") ||
      lower.includes("router") ||
      lower.includes("gate") ||
      lower.includes("softmax") ||
      lower.includes("dense") ||
      lower.includes("flop") ||
      lower.includes("expert") ||
      lower.includes("article") ||
      lower.includes("page"))
  ) {
    const assistantMessage: ExtensionMessage = {
      id: `asst-${Date.now()}`,
      role: "assistant",
      content: `Based on the active page context (*Understanding Mixture-of-Experts Models*) and synthesized by **${model.name}**:

In sparse MoE architectures, the router computes softmax probabilities across candidate expert matrices:
\`routerWeights = softmax(tokenEmbedding · gateMatrix)\`

Key observations regarding your question:
- **Expert Specialization**: Different sub-networks naturally specialize in syntax, factual retrieval, or mathematical reasoning during pre-training.
- **Load Balancing**: Practical production routers include auxiliary loss terms to ensure all experts receive a balanced distribution of tokens, preventing single-expert bottlenecks.
- **Multi-Model Verification**: You can switch to specialized coding models (like *Kimi K2.7 Code*) in EchoGPT's catalog to inspect specific routing matrix implementations.`,
      codeSnippet: "const routerWeights = softmax(tokenEmbedding · gateMatrix);",
      modelName: model.name,
      modelCategory: model.category,
      timestamp,
    };

    return { userMessage, assistantMessage };
  }

  // Fallback to the generalized simulated response engine
  const sim = generateSimulatedResponse(prompt, model);
  const contextNote = pageContextActive
    ? ""
    : "*Note: Page context is currently detached. This answer was generated using general model knowledge.*\n\n";

  const assistantMessage: ExtensionMessage = {
    id: `asst-${Date.now()}`,
    role: "assistant",
    content: `${contextNote}${sim.content}`,
    modelName: model.name,
    modelCategory: model.category,
    timestamp,
  };

  return { userMessage, assistantMessage };
}
