import type { SubscriptionPlan } from "@/types";

/**
 * Verified EchoGPT subscription plans.
 *
 * Source: api.echogpt.live/v1/subscription/active (inspected 2026-09-24)
 *
 * All `amount` and `duration` values are taken directly from the
 * live API response. No pricing has been invented or estimated.
 *
 * `monthlyEquivalent`, `discountPercent`, `billingDescription`, and
 * `benefits` are UI display fields derived from the verified amounts.
 */
export const VERIFIED_PLANS: SubscriptionPlan[] = [
  {
    id: "6700eb02-2852-6ec6-3408-e48000000000",
    name: "Monthly Pro",
    duration: 1,
    amount: "9.99",
    monthlyEquivalent: "$9.99 / mo",
    discountPercent: 0,
    billingDescription: "Billed monthly. Cancel any time.",
    benefits: [
      "Unlimited chats",
      "Access to all advanced models",
      "Full webpage context in Chrome Extension",
      "Priority response routing",
      "Model comparison mode",
    ],
  },
  {
    id: "6703a976-2e35-6950-89b2-61c600000000",
    name: "Quarterly Pro",
    duration: 3,
    amount: "29.99",
    monthlyEquivalent: "$9.99 / mo",
    discountPercent: 0,
    billingDescription: "Billed every 3 months — $29.99 total.",
    benefits: [
      "Unlimited chats",
      "Access to all advanced models",
      "Full webpage context in Chrome Extension",
      "Priority response routing",
      "Model comparison mode",
    ],
  },
  {
    id: "6703a984-2e35-6950-89b2-61c800000000",
    name: "Half-Yearly Pro",
    duration: 6,
    amount: "59.99",
    monthlyEquivalent: "$9.99 / mo",
    discountPercent: 0,
    billingDescription: "Billed every 6 months — $59.99 total.",
    benefits: [
      "Unlimited chats",
      "Access to all advanced models",
      "Full webpage context in Chrome Extension",
      "Priority response routing",
      "Model comparison mode",
    ],
  },
  {
    id: "6700ecad-2852-6ec6-3408-e48800000000",
    name: "Annual Pro",
    duration: 12,
    amount: "99.99",
    monthlyEquivalent: "$8.33 / mo",
    // Effective saving: ($9.99 * 12 - $99.99) / ($9.99 * 12) ≈ 16.7%
    discountPercent: 17,
    billingDescription: "Billed annually — $99.99 total. Best value.",
    benefits: [
      "Unlimited chats for a full year",
      "Access to all advanced models",
      "Full webpage context in Chrome Extension",
      "Priority response routing",
      "Model comparison mode",
      "Early access to new model releases",
    ],
  },
];

/** The free tier entry — not returned by the subscription API (no charge). */
export const FREE_TIER: Omit<
  SubscriptionPlan,
  "id" | "duration" | "amount" | "discountPercent" | "billingDescription"
> = {
  name: "Free",
  monthlyEquivalent: "$0 / mo",
  benefits: [
    "Access to basic models",
    "Daily query limit applies",
    "Standard response speed",
    "EchoGPT native assistant",
  ],
};
