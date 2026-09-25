import type { Metadata } from "next";
import { WorkspaceShell } from "@/components/workspace";

export const metadata: Metadata = {
  title: "AI Workspace — EchoGPT",
  description:
    "EchoGPT multi-model conversational AI workspace. Access 40+ verified foundation models in one unified interface.",
};

export default function AppWorkspacePage() {
  return <WorkspaceShell />;
}
