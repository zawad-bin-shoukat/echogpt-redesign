import type { Model } from "@/types";

export interface WorkspaceResponseData {
  summary: string;
  codeSnippet?: {
    comment: string;
    code: string[];
  };
  metrics: {
    title: string;
    description: string;
  }[];
  latency: string;
  crossVerifySuggestions: string[]; // model slugs
}

export const INITIAL_USER_PROMPT =
  "Compare the architectural tradeoffs between dense and Mixture-of-Experts (MoE) transformer architectures for high-throughput code synthesis.";

/**
 * Model-tailored responses for the initial technical benchmark question.
 * Each response highlights the unique perspective and engineering profile
 * of the verified frontier model.
 */
export const MODEL_RESPONSES: Record<string, WorkspaceResponseData> = {
  // GPT-5.6 Sol (OpenAI)
  "gpt-5.6-sol": {
    summary:
      "Mixture-of-Experts (MoE) decouples total parameter capacity from per-token computation FLOPs by activating sparse expert sub-networks dynamically per token.",
    codeSnippet: {
      comment: "// MoE sparse routing per token",
      code: [
        "const routerScores = softmax(tokenEmbeddings.dot(gateWeights));",
        "const activeExperts = selectTopK(routerScores, 2);",
        "return blendExpertOutputs(activeExperts, tokenEmbeddings);",
      ],
    },
    metrics: [
      {
        title: "Sparse MoE",
        description:
          "3-4x lower FLOPs per generated token; higher throughput for real-time IDE completion.",
      },
      {
        title: "Dense Architecture",
        description:
          "Uniform memory bandwidth; deterministic KV-cache footprint for deep multi-step reasoning.",
      },
    ],
    latency: "0.42s",
    crossVerifySuggestions: ["google/gemini-3.8-flash", "deepseek/deepseek-v4-pro"],
  },

  // Gemini 3.8 Flash (Google)
  "google/gemini-3.8-flash": {
    summary:
      "Gemini 3.8 Flash optimizes sparse MoE routing specifically for ultra-low latency TPUs, prioritizing sub-50ms TTFT (Time-To-First-Token) during continuous code synthesis streams.",
    codeSnippet: {
      comment: "// Sub-second asynchronous tensor routing",
      code: [
        "const tpuTensor = await streamToTpuCore(tokenStream);",
        "const dispatched = dispatchSparsePipeline(tpuTensor, { topK: 2 });",
        "return await compileInterleavedTokens(dispatched);",
      ],
    },
    metrics: [
      {
        title: "Flash Throughput",
        description:
          "Up to 240 tokens/sec sustained generation across massive multimodal repositories.",
      },
      {
        title: "Dense Alternative",
        description:
          "Requires 3.8x more GPU compute per token, creating latency bottlenecks under concurrent team load.",
      },
    ],
    latency: "0.24s",
    crossVerifySuggestions: ["gpt-5.6-sol", "deepseek/deepseek-v4-pro"],
  },

  // DeepSeek V4 Pro (DeepSeek)
  "deepseek/deepseek-v4-pro": {
    summary:
      "DeepSeek V4 Pro pairs Multi-head Latent Attention (MLA) with auxiliary-loss-free load balancing, achieving near-dense parameter efficiency with 1/5th KV-cache memory pressure.",
    codeSnippet: {
      comment: "// MLA low-rank key-value compression",
      code: [
        "const cKV = compressKeyValue(h_t, rankCompressionDim);",
        "const scores = computeLatentAttention(q_t, cKV, rotaryEmbeddings);",
        "return applyAuxiliaryLossFreeMoE(scores, expertRouter);",
      ],
    },
    metrics: [
      {
        title: "MLA Compression",
        description:
          "Compresses KV cache by 85%, allowing 16x larger concurrent context batches in IDEs.",
      },
      {
        title: "Load Balancing",
        description:
          "Eliminates auxiliary loss degradation, ensuring zero performance penalty on complex algorithms.",
      },
    ],
    latency: "0.38s",
    crossVerifySuggestions: ["moonshotai/Kimi-K2.7-Code", "gpt-5.6-sol"],
  },

  // Kimi K2.7 Code (Moonshot AI)
  "moonshotai/Kimi-K2.7-Code": {
    summary:
      "Kimi K2.7 Code specializes in AST-aligned token gating, routing syntactic tree nodes and symbol tables to code-dedicated domain experts across million-token contexts.",
    codeSnippet: {
      comment: "// Syntax-aware expert activation",
      code: [
        "const astScope = parseAbstractSyntaxTree(sourceBuffer);",
        "const codeExperts = routeAstNodes(astScope.declarations);",
        "return synthesizeTypeSafeOutput(codeExperts);",
      ],
    },
    metrics: [
      {
        title: "AST-Guided Gating",
        description:
          "Precision syntax verification eliminates 92% of hallucinated API symbol exports.",
      },
      {
        title: "Long-Context Scaling",
        description:
          "Maintains high recall across entire monorepos without token degradation.",
      },
    ],
    latency: "0.49s",
    crossVerifySuggestions: ["deepseek/deepseek-v4-pro", "x-ai/grok-4.6"],
  },

  // Grok 4.6 (xAI)
  "x-ai/grok-4.6": {
    summary:
      "Grok 4.6 maximizes raw computational throughput via colossal cluster tensor parallelism, delivering direct algorithmic critique and unvarnished code optimization.",
    codeSnippet: {
      comment: "// Real-time cluster parallel inference",
      code: [
        "const clusterMesh = getDistributedCluster(100_000);",
        "const shardOutput = executeTensorParallel(clusterMesh, tokens);",
        "return optimizeKernelAssembly(shardOutput);",
      ],
    },
    metrics: [
      {
        title: "Cluster Scale",
        description:
          "Trained on massive GPU superclusters for unprecedented raw algorithmic reasoning depth.",
      },
      {
        title: "Direct Synthesis",
        description:
          "Zero verbose preambles; delivers immediate executable solutions with performance metrics.",
      },
    ],
    latency: "0.33s",
    crossVerifySuggestions: ["gpt-5.6-sol", "google/gemini-3.8-flash"],
  },

  // EchoGPT Native (EchoGPT)
  "echogpt": {
    summary:
      "EchoGPT Native provides an optimized, balanced reasoning model that acts as the platform default assistant—delivering rapid everyday answers with zero token quotas.",
    codeSnippet: {
      comment: "// EchoGPT unified model orchestrator",
      code: [
        "const queryIntent = classifyIntent(userPrompt);",
        "const optimizedPlan = prepareOptimizedExecution(queryIntent);",
        "return executeAssistantResponse(optimizedPlan);",
      ],
    },
    metrics: [
      {
        title: "Free Tier Access",
        description:
          "Always available with zero rate limits and seamless conversational continuity.",
      },
      {
        title: "Multi-Model Router",
        description:
          "Can seamlessly delegate or cross-verify against 40+ specialized models at any time.",
      },
    ],
    latency: "0.28s",
    crossVerifySuggestions: ["gpt-5.6-sol", "google/gemini-3.8-flash"],
  },
};

/**
 * Fallback generator for any model in the 41-model catalog.
 */
export function getModelResponse(model: Model, userPrompt: string): WorkspaceResponseData {
  if (userPrompt === INITIAL_USER_PROMPT && MODEL_RESPONSES[model.slug]) {
    return MODEL_RESPONSES[model.slug];
  }

  // If user typed a custom prompt or selected an unconfigured model
  const categoryLabels: Record<string, string> = {
    flagship: "General frontier intelligence & multi-step reasoning",
    coding: "Algorithmic synthesis & deep software engineering",
    fast: "Sub-second low-latency streaming",
    vision: "Multimodal perception & document analysis",
    specialized: "Extended context & specialized domain processing",
    free: "Balanced everyday assistant",
  };

  return {
    summary: `${model.name} (${model.provider}) processed your request using ${categoryLabels[model.category] || "frontier AI"}. Optimized for high precision and immediate execution.`,
    metrics: [
      {
        title: `${model.name} Engine`,
        description: model.description || "Frontier neural model via EchoGPT unified gateway.",
      },
      {
        title: "Tier & Access",
        description:
          model.tier === "free"
            ? "Free tier available with zero individual API keys required."
            : "Pro tier model with dedicated high-throughput compute priority.",
      },
    ],
    latency: "0.36s",
    crossVerifySuggestions: ["gpt-5.6-sol", "deepseek/deepseek-v4-pro"],
  };
}
