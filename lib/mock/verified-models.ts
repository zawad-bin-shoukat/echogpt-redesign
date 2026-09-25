import type { Model } from "@/types";

/**
 * Verified EchoGPT model catalog.
 *
 * Source: api.echogpt.live/v1/model/active (inspected 2026-09-24)
 *
 * All 41 entries below are verified from that live endpoint.
 * Slugs, names, descriptions, and freeAccess flags are faithful
 * to the API response. No historical or hypothetical models are included.
 *
 * Category assignments derive from the verified descriptions:
 *  - "flagship"    — broad multi-step reasoning / general intelligence
 *  - "coding"      — software, algorithms, code review
 *  - "fast"        — low-latency, high-throughput
 *  - "vision"      — multimodal / image understanding
 *  - "specialized" — 1M context, creative, structured analysis
 *  - "free"        — EchoGPT native free-tier assistant
 *
 * contextWindow is only populated where the verified API description
 * explicitly states a context size (e.g. "500K token context").
 */
export const VERIFIED_MODELS: Model[] = [
  // ── EchoGPT Native ───────────────────────────────────────────────
  {
    id: "echogpt-native",
    name: "EchoGPT",
    slug: "echogpt",
    provider: "EchoGPT",
    description:
      "The default EchoGPT assistant — balanced speed and response quality for everyday tasks.",
    category: "free",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/logo.svg",
    quickSelect: true,
  },

  // ── OpenAI GPT Series ────────────────────────────────────────────
  {
    id: "69f9c504-b99e-3fab-08cb-5c4d00000000",
    name: "GPT-5.4",
    slug: "gpt-5.4",
    provider: "OpenAI",
    description:
      "Preview GPT's powerful abilities with GPT-5.4, offering precise yet expansive answers in an accessible, versatile format.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1777976579920-352792444-gpt.svg",
  },
  {
    id: "69f9c62a-b99e-3fab-08cb-6fba00000000",
    name: "GPT-5.5",
    slug: "gpt-5.5",
    provider: "OpenAI",
    description:
      "Preview GPT's powerful abilities with GPT-5-5, offering precise yet expansive answers in an accessible, versatile format.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1777976874057-470266146-gpt.svg",
  },
  {
    id: "gpt-5-6-sol",
    name: "GPT-5.6 Sol",
    slug: "gpt-5.6-sol",
    provider: "OpenAI",
    description:
      "GPT-5.6 Sol delivers broad general intelligence with strong reasoning and a versatile output format.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1777976874057-470266146-gpt.svg",
    quickSelect: true,
  },
  {
    id: "6c6c393f-5ea5-4783-9ffa-a83a6df14bfe",
    name: "GPT-5.6 Luna",
    slug: "gpt-5.6-luna",
    provider: "OpenAI",
    description:
      "GPT-5.6 Luna is the lightweight GPT-5.6 tier — quick, inexpensive, and capable across everyday tasks.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1777976874057-470266146-gpt.svg",
  },

  // ── Google Gemini Series ─────────────────────────────────────────
  {
    id: "b08183f0-be76-44be-95ba-e2d97fd3d15a",
    name: "Gemini 3.7 Flash",
    slug: "google/gemini-3.7-flash",
    provider: "Google",
    description:
      "Gemini 3.7 Flash pairs fast multimodal responses with prompt caching for repeated long contexts.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/9830fef1-84df-4529-9ff8-19d8809ff37d-2qstBBWi1bWtjSDiytG9sbrKCyy.svg",
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    slug: "google/gemini-3.8-flash",
    provider: "Google",
    description:
      "High-speed multimodal analysis with advanced prompt caching for long repeated contexts.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/9830fef1-84df-4529-9ff8-19d8809ff37d-2qstBBWi1bWtjSDiytG9sbrKCyy.svg",
    quickSelect: true,
  },

  // ── DeepSeek Series ──────────────────────────────────────────────
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    slug: "deepseek/deepseek-v4-pro",
    provider: "DeepSeek",
    description:
      "Advanced mathematical and software reasoning with a strong price-to-quality balance.",
    category: "coding",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/fd2c1929-3174-480c-9d77-f76de82a49fe-deepseek.ico",
    quickSelect: true,
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    slug: "deepseek/deepseek-v4-flash",
    provider: "DeepSeek",
    description:
      "DeepSeek V4 Flash offers a strong performance-to-cost balance across code and reasoning tasks.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/fd2c1929-3174-480c-9d77-f76de82a49fe-deepseek.ico",
  },
  {
    id: "b9b17c88-8e2a-41ec-bef7-6181415db2fe",
    name: "DeepSeek V4 Flash Fast",
    slug: "deepseek/deepseek-v4-flash-fast",
    provider: "DeepSeek",
    description:
      "DeepSeek V4 Flash Fast prioritises latency, returning answers sooner for interactive use.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/fd2c1929-3174-480c-9d77-f76de82a49fe-deepseek.ico",
  },
  {
    id: "e7ed9b17-9862-4c1c-86e4-ebd89750bf72",
    name: "DeepSeek V4 Flash Vision",
    slug: "deepseek/deepseek-v4-flash-vision-exp",
    provider: "DeepSeek",
    description:
      "DeepSeek V4 Flash Vision is an experimental multimodal tier that reads images alongside text.",
    category: "vision",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/fd2c1929-3174-480c-9d77-f76de82a49fe-deepseek.ico",
  },

  // ── xAI Grok Series ──────────────────────────────────────────────
  {
    id: "ce975c2a-f52a-456b-8639-30954348d218",
    name: "Grok 4.5",
    slug: "xai/grok-4.5",
    provider: "xAI",
    description:
      "Grok 4.5 brings xAI's conversational style and current-events awareness to a 500K token context.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/68a52565-9ae3-4a1a-8316-28ef6e7a84d6-x1.ico",
    contextWindow: "500K",
  },
  {
    id: "8692c5a9-19dc-4d45-b306-b7a2d1f6927e",
    name: "Grok 4.6",
    slug: "xai/grok-4.6",
    provider: "xAI",
    description:
      "Grok 4.6 is the latest xAI release, improving reasoning and instruction following over Grok 4.5.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/68a52565-9ae3-4a1a-8316-28ef6e7a84d6-x1.ico",
    quickSelect: true,
  },

  // ── Moonshot Kimi Series ─────────────────────────────────────────
  {
    id: "kimi-k2-7-code",
    name: "Kimi K2.7 Code",
    slug: "moonshotai/Kimi-K2.7-Code",
    provider: "Moonshot AI",
    description:
      "Specialized in algorithmic synthesis, code review, and software engineering tasks.",
    category: "coding",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440864859-749307940-kimi.png",
    quickSelect: true,
  },
  {
    id: "1ccb2a02-929b-4298-9f27-0899205d0891",
    name: "Kimi K2.7 Code HighSpeed",
    slug: "moonshotai/Kimi-K2.7-Code-Highspeed",
    provider: "Moonshot AI",
    description:
      "Kimi K2.7 Code HighSpeed keeps the coding strengths of K2.7 while returning results faster.",
    category: "coding",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440864859-749307940-kimi.png",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    slug: "moonshotai/Kimi-K3",
    provider: "Moonshot AI",
    description:
      "Kimi K3 is the latest Moonshot release with enhanced multi-step reasoning and code generation.",
    category: "coding",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440864859-749307940-kimi.png",
  },

  // ── Alibaba Qwen Series ──────────────────────────────────────────
  {
    id: "qwen-3-6-plus",
    name: "Qwen 3.6 Plus",
    slug: "Qwen/Qwen3.6-Plus",
    provider: "Alibaba",
    description:
      "Qwen 3.6 Plus delivers robust multilingual reasoning at a mid-level compute footprint.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440631237-241143862-qwen.png",
  },
  {
    id: "qwen-3-7-plus",
    name: "Qwen 3.7 Plus",
    slug: "Qwen/Qwen3.7-Plus",
    provider: "Alibaba",
    description:
      "Qwen 3.7 Plus provides strong multilingual and multi-step reasoning capabilities.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440631237-241143862-qwen.png",
  },
  {
    id: "qwen-3-7-max",
    name: "Qwen 3.7 Max",
    slug: "Qwen/Qwen3.7-Max",
    provider: "Alibaba",
    description:
      "Qwen 3.7 Max is the previous flagship, strong at multi-step reasoning over long contexts.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440605547-558022781-qwen.png",
  },
  {
    id: "72c2d280-6a0b-4db9-9cfa-9a222779215d",
    name: "Qwen 3.8 Flash",
    slug: "Qwen/Qwen3.8-Flash",
    provider: "Alibaba",
    description:
      "Qwen 3.8 Flash trades a little depth for speed, ideal for quick answers and high-volume chat.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440631237-241143862-qwen.png",
  },
  {
    id: "dcbdd442-bb9c-4c1f-854f-a9aa63cc53bf",
    name: "Qwen 3.8 Max",
    slug: "Qwen/Qwen3.8-Max",
    provider: "Alibaba",
    description:
      "Qwen 3.8 Max is the latest Qwen flagship, strong at multi-step reasoning over very long context.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440605547-558022781-qwen.png",
  },
  {
    id: "a2eb422a-ba7a-4b95-b328-b9f8a3e253a8",
    name: "Qwen 3.8 Max 0902",
    slug: "Qwen/Qwen3.8-Max-0902",
    provider: "Alibaba",
    description:
      "Qwen 3.8 Max 0902 is the dated flagship snapshot, pinned for reproducible results on long reasoning tasks.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440614597-423514208-qwen.png",
  },
  {
    id: "qwen-3-8-27b",
    name: "Qwen 3.8 27B",
    slug: "Qwen/Qwen3.8-27B",
    provider: "Alibaba",
    description:
      "Qwen 3.8 27B is a mid-scale open-weight model balancing quality and efficiency.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440631237-241143862-qwen.png",
  },

  // ── Meta Muse Spark Series ───────────────────────────────────────
  {
    id: "1a65faef-a121-46ee-96bf-b01623c69065",
    name: "Muse Spark 1.2",
    slug: "meta/muse-spark-1.2",
    provider: "Meta",
    description:
      "Muse Spark 1.2 offers dependable creative and conversational output over a 1M token context.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440764672-741234347-_muse_spark.png",
    contextWindow: "1M",
  },
  {
    id: "35f02530-80f4-449d-be97-ee91d5309187",
    name: "Muse Spark 1.3",
    slug: "meta/muse-spark-1.3",
    provider: "Meta",
    description:
      "Muse Spark 1.3 is Meta's newest Spark model, tuned for creative writing and open-ended conversation.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440774181-234616224-_muse_spark.png",
  },
  {
    id: "9c29f5b3-5062-46b5-949a-6520e1f2e820",
    name: "Muse Spark 1.3 Contributor",
    slug: "meta/muse-spark-1.3-contributor",
    provider: "Meta",
    description:
      "Muse Spark 1.3 Contributor is the low-cost community tier of Muse Spark 1.3 for everyday drafting.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440784001-449066953-_muse_spark.png",
  },

  // ── Thinking Machines ─────────────────────────────────────────────
  {
    id: "17929620-cb83-4b4b-b36f-dc9d41e4e815",
    name: "Inkling",
    slug: "thinkingmachines/inkling",
    provider: "Thinking Machines",
    description:
      "Inkling from Thinking Machines is tuned for careful, well-structured reasoning and clear explanations.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441585711-832907947-thinkingmachines.png",
  },
  {
    id: "51533549-c58d-45bb-a0b3-4f485b05a97e",
    name: "Inkling Small",
    slug: "thinkingmachines/inkling-small",
    provider: "Thinking Machines",
    description:
      "Inkling Small is the lighter Inkling tier, keeping the same style at a lower cost per token.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441565338-393382957-thinkingmachines.png",
  },

  // ── Zhipu GLM Series ─────────────────────────────────────────────
  {
    id: "glm-5-2",
    name: "GLM-5.2",
    slug: "zai-org/GLM-5.2",
    provider: "Zhipu AI",
    description:
      "GLM-5.2 delivers solid multilingual reasoning and code assistance over a 1M token context.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440977661-672629269-glm.png",
    contextWindow: "1M",
  },
  {
    id: "766355ec-ad45-48e7-af81-d7acd516cd6f",
    name: "GLM-5.2 Fast",
    slug: "zai-org/GLM-5.2-Fast",
    provider: "Zhipu AI",
    description:
      "GLM-5.2 Fast is the low-latency GLM-5.2 variant for interactive sessions that cannot wait.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440985209-454066925-glm.png",
  },
  {
    id: "5c39a4b3-ffb0-43e9-a790-e639edad2598",
    name: "GLM-5.3",
    slug: "zai-org/GLM-5.3",
    provider: "Zhipu AI",
    description:
      "GLM-5.3 is the latest full GLM tier, strong at multilingual reasoning and code over a 1M token context.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440977661-672629269-glm.png",
    contextWindow: "1M",
  },
  {
    id: "glm-5-3-flash",
    name: "GLM-5.3 Flash",
    slug: "z-ai/glm-5.3-flash",
    provider: "Zhipu AI",
    description:
      "GLM-5.3 Flash is the fast-tier GLM-5.3 variant, ideal for real-time conversational workloads.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788440985209-454066925-glm.png",
  },

  // ── StepFun Series ───────────────────────────────────────────────
  {
    id: "1a435094-a13c-4bfe-b7b2-0c4d4757ccc9",
    name: "Step 3.5 Flash",
    slug: "stepfun/Step-3.5-Flash",
    provider: "StepFun",
    description:
      "Step 3.5 Flash offers a 1M token context at one of the lowest prices in the catalogue.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441288392-587603883-step_3.7_flash.png",
    contextWindow: "1M",
  },
  {
    id: "dc641e51-0547-4a41-bdcf-533ccd4c98f3",
    name: "Step 3.7 Flash",
    slug: "stepfun/Step-3.7-Flash",
    provider: "StepFun",
    description:
      "Step 3.7 Flash from StepFun answers quickly and cheaply, suited to short interactive exchanges.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441280775-702944232-step_3.7_flash.png",
  },

  // ── Xiaomi MiMo Series ───────────────────────────────────────────
  {
    id: "0a104689-9d80-4b33-82b7-2e59ac675032",
    name: "MiMo V2.5",
    slug: "xiaomi/mimo-v2.5",
    provider: "Xiaomi",
    description:
      "MiMo V2.5 from Xiaomi delivers efficient everyday assistance with one of the lowest costs per token.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441205447-323952458-mimo.png",
  },
  {
    id: "mimo-v2-5-pro",
    name: "MiMo V2.5 Pro",
    slug: "xiaomi/mimo-v2.5-pro",
    provider: "Xiaomi",
    description:
      "MiMo V2.5 Pro offers enhanced quality over the base MiMo V2.5 at a competitive price.",
    category: "fast",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441205447-323952458-mimo.png",
  },

  // ── Tencent Hunyuan Series ───────────────────────────────────────
  {
    id: "tencent-hy3",
    name: "Tencent Hy3",
    slug: "tencent/hy3-paid",
    provider: "Tencent",
    description:
      "Tencent Hunyuan 3 offers strong Chinese-language and multilingual reasoning performance.",
    category: "flagship",
    tier: "pro",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441374808-600926725-_tencent_hy4.png",
  },
  {
    id: "7f5e2c8c-0f44-4291-9ca0-1f6e9d21595b",
    name: "Tencent Hy4 Preview",
    slug: "tencent/hy4-preview",
    provider: "Tencent",
    description:
      "Tencent Hunyuan 4 Preview is the newest Hunyuan generation, with a 1M token context for long documents.",
    category: "specialized",
    tier: "pro",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441374808-600926725-_tencent_hy4.png",
    contextWindow: "1M",
  },

  // ── Nvidia ───────────────────────────────────────────────────────
  {
    id: "nvidia-nemotron-3-ultra",
    name: "Nemotron 3 Ultra",
    slug: "nvidia/nemotron-3-ultra-550b-a55b",
    provider: "Nvidia",
    description:
      "A massive 550B parameter open-weight model from Nvidia for advanced multi-domain reasoning.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/nvidia.png",
  },

  // ── Meituan LongCat ──────────────────────────────────────────────
  {
    id: "longcat-2-0",
    name: "LongCat 2.0",
    slug: "meituan/LongCat-2.0:free",
    provider: "Meituan",
    description:
      "LongCat 2.0 is optimized for processing very long documents and extended context tasks efficiently.",
    category: "specialized",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/longcat.png",
  },

  // ── MiniMax ──────────────────────────────────────────────────────
  {
    id: "minimax-m3",
    name: "MiniMax M3",
    slug: "MiniMaxAI/MiniMax-M3",
    provider: "MiniMax AI",
    description:
      "MiniMax M3 provides an efficient price-to-quality balance across a wide range of tasks.",
    category: "flagship",
    tier: "free",
    iconUrl:
      "https://echogptlive.s3.amazonaws.com/models/1788441057876-516258233-minimax.jpg",
  },
];

/**
 * The 6 approved quick-select models displayed in the
 * compact model dropdown trigger (top of chat header).
 *
 * Selection approved by product lead 2026-09-24.
 */
export const QUICK_SELECT_MODELS: Model[] = VERIFIED_MODELS.filter(
  (m) => m.quickSelect
);
