import { DemoRuntimeProvider } from "@/components/runtime/demo-runtime-provider";
import { MotionShell } from "@/components/motion-shell";
import { Grok } from "@/components/examples/grok";

export default function Page() {
  return <MotionShell layout="grok" preview={false}><DemoRuntimeProvider><Grok /></DemoRuntimeProvider></MotionShell>;
}
