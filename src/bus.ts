import type { IBus } from "@/types/composables";
import mitt from "mitt";

export const bus = mitt<IBus>();
