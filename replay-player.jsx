import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { ReplayComposition } from "replay-composition";
function showReplay(container, replayData) {
  container.innerHTML = "";
  if (!replayData || !replayData.frames || replayData.frames.length === 0) {
    container.innerHTML = '<p style="color: white; text-align: center;">No replay available</p>';
    return;
  }
  const duration = Math.max(...replayData.frames.map((f) => f.time));
  const fps = 30;
  const durationInFrames = Math.ceil(duration / 1e3 * fps);
  const root = createRoot(container);
  root.render(
    /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: ReplayComposition,
        durationInFrames,
        fps,
        width: 960,
        height: 540,
        controls: true,
        loop: true,
        inputProps: { replayData },
        style: { width: "100%" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 9
      },
      this
    )
  );
}
export {
  showReplay
};
