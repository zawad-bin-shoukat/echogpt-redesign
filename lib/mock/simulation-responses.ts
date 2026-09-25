import type { Model } from "@/types";
import { MODEL_RESPONSES, INITIAL_USER_PROMPT } from "./workspace-sim";

export interface SimulatedResponseResult {
  title: string;
  content: string;
  latency?: string;
}

/**
 * Deterministic response generator for the interactive AI Workspace prototype.
 * Produces believable, high-quality, structured simulated responses without any external API calls.
 * All responses are conceptual and framed for demonstration purposes.
 */
export function generateSimulatedResponse(
  userPrompt: string,
  model: Model
): SimulatedResponseResult {
  const promptLower = userPrompt.toLowerCase().trim();

  // 1. Starter Action 1: Summarize
  if (
    promptLower.includes("summarize") ||
    promptLower.includes("structured summary") ||
    promptLower.includes("key takeaways")
  ) {
    return {
      title: "Executive Summary: Multi-Model AI Gateway",
      latency: "simulated",
      content: `### Executive Summary: Unified Multi-Model Gateway Architecture

Adopting a unified multi-model gateway (such as **EchoGPT**) consolidates fragmented frontier AI endpoints into a standardized, resilient interface. Below is an architectural overview of conceptual benefits and engineering trade-offs.

#### 1. Core Architectural Advantages
- **Single Integration Surface**: Applications communicate against a single schema instead of maintaining disparate SDK bindings for OpenAI, Anthropic, Google, and open-weight models.
- **Dynamic Tier-Based Routing**: Routine queries can be routed to lower-latency models while complex reasoning tasks use higher-capability models, helping balance cost, latency, and response quality.
- **High-Availability Failover**: If an upstream provider experiences latency spikes or temporary downtime, routing can gracefully fall back to alternative models.

#### 2. Engineering Trade-offs & Considerations
- **Latency Overhead**: Proxy routing introduces a slight additional network hop, which can be mitigated via regional edge nodes and persistent connection pooling.
- **Feature Parity Lag**: Rapidly evolving provider-specific experimental flags require standardized adapter mappings.

> **Key Takeaway**: A unified gateway transforms vendor lock-in into an interchangeable, high-availability software utility.`,
    };
  }

  // 2. Starter Action 2: Explain a concept
  if (
    promptLower.includes("speculative decoding") ||
    promptLower.includes("explain a difficult concept") ||
    promptLower.includes("real-world analogy")
  ) {
    return {
      title: "Speculative Decoding Explained",
      latency: "simulated",
      content: `### Understanding Speculative Decoding

**Speculative decoding** is an algorithmic optimization designed to accelerate large language model (LLM) inference without altering the output probability distribution or sacrificing generation quality.

#### The Intuitive Analogy: Draft Author & Senior Editor
Imagine a publishing team producing material under tight deadlines:
- **Draft Author (Small, Fast Model)**: Quickly drafts a candidate sentence. It flows rapidly and covers the most predictable tokens.
- **Senior Editor (Flagship Model, e.g. ${model.name})**: Reviews the drafted words in parallel during a single forward pass, accepting valid tokens and revising where necessary.

Instead of the larger model generating every token sequentially from scratch, the pipeline leverages draft speed while preserving the flagship model's quality standards.

#### Step-by-Step Breakdown:
1. **Speculative Generation**: A lightweight draft model generates a sequence of candidate tokens sequentially with a smaller computational footprint.
2. **Parallel Verification**: The primary target model evaluates the candidate tokens simultaneously in a single forward pass.
3. **Acceptance Criterion**: Using modified rejection sampling, tokens matching the target model's probability distribution are accepted. The first mismatch is corrected, and remaining speculative tokens are discarded.
4. **Guaranteed Output Fidelity**: Because verification enforces the target model's logits, the output distribution remains consistent with running the primary model alone.`,
    };
  }

  // 3. Starter Action 3 & Workspace Sim: Compare two ideas / Dense vs MoE
  if (
    promptLower === INITIAL_USER_PROMPT.toLowerCase() ||
    (promptLower.includes("dense") && promptLower.includes("moe")) ||
    (promptLower.includes("mixture-of-experts") && promptLower.includes("tradeoffs"))
  ) {
    const simData = MODEL_RESPONSES[model.slug] || MODEL_RESPONSES["gpt-5.6-sol"];
    const codeBlock = simData.codeSnippet
      ? `\n\`\`\`typescript\n${simData.codeSnippet.comment}\n${simData.codeSnippet.code.join("\n")}\n\`\`\`\n`
      : "";

    return {
      title: "Dense vs. MoE Architecture Trade-offs",
      latency: "simulated",
      content: `### Dense vs. Sparse Mixture-of-Experts (MoE) Architecture

When designing inference pipelines for high-throughput code synthesis, the trade-off centers on parameter capacity versus compute FLOPs per token.

${simData.summary}
${codeBlock}
#### Architectural Comparison Matrix:

| Evaluation Metric | Dense Transformers | Sparse Mixture-of-Experts (MoE) |
| :--- | :--- | :--- |
| **Active FLOPs / Token** | Computes full parameter weights per token | Activates only a subset of sparse expert sub-networks |
| **Throughput & Concurrency** | Lower token throughput under heavy concurrent load | Higher potential throughput and reduced time-to-first-token |
| **Memory Footprint** | Fits in smaller GPU memory profiles | Larger total memory requirement (all expert weights loaded) |
| **KV-Cache Scaling** | Deterministic memory per context window | Highly efficient when paired with Multi-Head Latent Attention (MLA) |

#### Practical Considerations:
For interactive developer tooling and continuous autocomplete streams, **Sparse MoE architectures (${model.name})** provide favorable economics and real-time generation speed. For monolithic offline static analysis, dense architectures offer consistent memory bandwidth.`,
    };
  }

  // 4. Starter Action 4: Write or improve code
  if (
    promptLower.includes("react state management") ||
    promptLower.includes("streaming chat component") ||
    promptLower.includes("optimize this code") ||
    promptLower.includes("review and optimize")
  ) {
    return {
      title: "Optimized Streaming Chat State Pattern",
      latency: "simulated",
      content: `### Code Review & Optimization: Streaming Chat State

In high-throughput AI chat interfaces, updating state on every incoming streaming token can trigger frequent re-renders across parent components.

Here is an architectural pattern utilizing React transitions and deferred values to decouple streaming updates from rendering bottlenecks:

\`\`\`tsx
import { memo, useDeferredValue, useTransition, useState, useCallback } from 'react';

// 1. Decouple token streaming buffer from expensive UI updates
export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();

  const appendToken = useCallback((id: string, token: string) => {
    // Keep raw buffer updates immediate, but defer full component re-layouts
    startTransition(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, content: msg.content + token } : msg
        )
      );
    });
  }, []);

  return { messages, appendToken, isPending };
}

// 2. Memoized message bubble to prevent sibling re-renders
export const MessageBubble = memo(function MessageBubble({
  message,
}: {
  message: Message;
}) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border-subtle">
      <div className="text-xs font-semibold text-text-primary">{message.role}</div>
      <div className="mt-1 text-sm text-text-secondary whitespace-pre-wrap">
        {message.content}
      </div>
    </div>
  );
});
\`\`\`

#### Key Performance Considerations:
1. **\`useTransition\` Batching**: Wraps streaming token updates so high-priority user interactions (typing, scrolling, switching models) remain responsive.
2. **Memoized Bubbles (\`React.memo\`)**: Completed historical messages do not re-evaluate when the active streaming message appends new characters.
3. **Smooth Scroll Tracking**: Coordinating scroll updates with animation frames helps maintain smooth visual tracking during rapid generation.`,
    };
  }

  // 5. Code / Programming General Query
  if (
    promptLower.includes("code") ||
    promptLower.includes("function") ||
    promptLower.includes("typescript") ||
    promptLower.includes("python") ||
    promptLower.includes("hook") ||
    promptLower.includes("bug") ||
    promptLower.includes("api")
  ) {
    return {
      title: `${model.name} Code Solution`,
      latency: "simulated",
      content: `Here is a structured solution synthesized via **${model.name}** (${model.provider}):

\`\`\`typescript
/**
 * Type-safe execution utility with retry backoff and timeout handling.
 */
export async function executeWithRetry<T>(
  fn: () => Promise<T>,
  options: { retries?: number; delayMs?: number; timeoutMs?: number } = {}
): Promise<T> {
  const { retries = 3, delayMs = 500, timeoutMs = 10000 } = options;

  let attempt = 0;
  while (attempt < retries) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), timeoutMs)
      );
      return await Promise.race([fn(), timeoutPromise]);
    } catch (error) {
      attempt++;
      if (attempt >= retries) throw error;
      await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, attempt - 1)));
    }
  }

  throw new Error("Execution failed after maximum retries");
}
\`\`\`

#### Key Highlights:
- **Resilient Backoff**: Exponential delay multiplier helps mitigate cascading retry storms.
- **Strict Typing**: Preserves generic return types with zero \`any\` escape hatches.
- **Timeout Protection**: Guarded against hanging network promises.`,
    };
  }

  // 6. Generic Default Response (Tailored to the active model)
  const categoryStrengths: Record<string, string> = {
    flagship: "complex multi-step reasoning, logical deduction, and broad cross-disciplinary synthesis",
    coding: "syntactic AST verification, algorithmic precision, and software architecture optimization",
    fast: "low-latency streaming, rapid question answering, and high-throughput interactions",
    vision: "multimodal perception, visual diagram analysis, and document comprehension",
    specialized: "deep context retention, domain-specific terminology, and creative synthesis",
    free: "balanced daily assistance and multi-model gateway coordination",
  };

  const strength = categoryStrengths[model.category] || "frontier intelligence";

  return {
    title: `${model.name} Response`,
    latency: "simulated",
    content: `I have processed your query using **${model.name}** (${model.provider}).

As a **${model.category}** model, this architecture is conceptually tailored for ${strength}.

#### Analysis & Insights:
1. **Core Consideration**: Your request touches on key architectural priorities. When approaching this problem, maintaining clear modular boundaries ensures long-term system stability.
2. **Implementation Strategy**: Deconstruct complex tasks into atomic, verifiable stages rather than monolithic procedures.
3. **Model Versatility**: With EchoGPT's multi-model catalog, you can also cross-verify this solution against models like *Gemini 3.8 Flash* (for speed) or *Kimi K2.7 Code* (for specialized syntax inspection).

Feel free to ask a follow-up question or specify constraints to refine the output further.`,
  };
}
