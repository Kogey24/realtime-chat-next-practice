import { realtime } from "@/lib/realtime";
import { handle } from "@upstash/realtime";

//This automatically handles reconnections, message history and everything we need in a realtime communication system
export const GET = handle({ realtime });