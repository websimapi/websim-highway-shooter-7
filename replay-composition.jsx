import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, Img, useVideoConfig, interpolate } from "remotion";
const ReplayComposition = ({ replayData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps * 1e3;
  const frameData = replayData.frames.reduce((prev, curr) => {
    return Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime) ? curr : prev;
  }, replayData.frames[0]);
  if (!frameData) return null;
  const audioElements = replayData.events.map((event, i) => {
    const startFrame = Math.floor(event.time / 1e3 * fps);
    if (frame < startFrame || frame > startFrame + 2) return null;
    const audioSrc = replayData.audio[event.type];
    if (!audioSrc) return null;
    return /* @__PURE__ */ jsxDEV(Audio, { src: audioSrc, startFrom: 0, volume: 0.5 }, `audio-${i}`, false, {
      fileName: "<stdin>",
      lineNumber: 24,
      columnNumber: 16
    });
  }).filter(Boolean);
  const scaleX = replayData.width / 1920;
  const scaleY = replayData.height / 1080;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#283747" }, children: [
    audioElements,
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: "33.33%",
      top: 0,
      width: 4,
      height: "100%",
      backgroundColor: "rgba(255,255,255,0.3)"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: "66.66%",
      top: 0,
      width: 4,
      height: "100%",
      backgroundColor: "rgba(255,255,255,0.3)"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 13
    }),
    frameData.particles.map((particle, i) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          left: particle.x * scaleX,
          top: particle.y * scaleY,
          width: particle.size * scaleX,
          height: particle.size * scaleY,
          backgroundColor: particle.color,
          borderRadius: "50%"
        }
      },
      `particle-${i}`,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 17
      }
    )),
    frameData.barrels.map((barrel, i) => /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: barrel.x * scaleX,
      top: barrel.y * scaleY,
      width: 80 * scaleX,
      height: 80 * scaleY
    }, children: [
      /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: replayData.assets.barrel,
          style: {
            width: "100%",
            height: "100%",
            transform: `rotate(${barrel.rotation}rad)`
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 77,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: 32 * Math.min(scaleX, scaleY),
        fontWeight: "bold",
        textShadow: "0 0 4px black"
      }, children: barrel.health }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 85,
        columnNumber: 21
      })
    ] }, `barrel-${i}`, true, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 17
    })),
    frameData.barriers.map((barrier, i) => /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: barrier.x * scaleX,
      top: barrier.y * scaleY,
      width: barrier.width * scaleX,
      height: barrier.height * scaleY
    }, children: [
      /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: replayData.assets.barrier,
          style: { width: "100%", height: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 109,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: 24 * Math.min(scaleX, scaleY),
        fontWeight: "bold",
        textShadow: "0 0 4px black"
      }, children: barrier.health }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 113,
        columnNumber: 21
      })
    ] }, `barrier-${i}`, true, {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 17
    })),
    frameData.enemies.map((enemy, i) => /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: enemy.x * scaleX,
      top: enemy.y * scaleY,
      width: 60 * scaleX * enemy.scale,
      height: 60 * scaleY * enemy.scale
    }, children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: replayData.assets.enemy,
        style: { width: "100%", height: "100%" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 21
      }
    ) }, `enemy-${i}`, false, {
      fileName: "<stdin>",
      lineNumber: 130,
      columnNumber: 17
    })),
    frameData.projectiles.map((projectile, i) => /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: projectile.x * scaleX,
      top: projectile.y * scaleY,
      width: 10 * scaleX,
      height: 20 * scaleY
    }, children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: replayData.assets.projectile,
        style: { width: "100%", height: "100%" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 21
      }
    ) }, `projectile-${i}`, false, {
      fileName: "<stdin>",
      lineNumber: 146,
      columnNumber: 17
    })),
    frameData.powerups.map((powerup, i) => /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: powerup.x * scaleX,
      top: powerup.y * scaleY,
      width: 40 * scaleX,
      height: 40 * scaleY
    }, children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: powerup.type === "rapidFire" ? replayData.assets.rapidFire : replayData.assets.bomb,
        style: { width: "100%", height: "100%" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 21
      }
    ) }, `powerup-${i}`, false, {
      fileName: "<stdin>",
      lineNumber: 162,
      columnNumber: 17
    })),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      left: frameData.player.x * scaleX,
      top: frameData.player.y * scaleY,
      width: 80 * scaleX,
      height: 80 * scaleY,
      transform: `rotate(${frameData.player.rotation}rad)`
    }, children: [
      /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: replayData.assets.playerShip,
          style: { width: "100%", height: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 185,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: replayData.assets.weapon,
          style: {
            position: "absolute",
            top: "5%",
            left: "10%",
            width: "80%",
            height: "80%"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 189,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 177,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 20,
      right: 20,
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
      textTransform: "uppercase"
    }, children: "Instant Replay" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 202,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 31,
    columnNumber: 9
  });
};
export {
  ReplayComposition
};
