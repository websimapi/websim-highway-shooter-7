import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, Img, useVideoConfig, interpolate } from "remotion";
const ReplayComposition = ({ replayData }) => {
  const frame = useCurrentFrame();
  const { fps, width: compWidth, height: compHeight } = useVideoConfig();
  const currentTime = frame / fps * 1e3;
  const frameData = replayData.frames.reduce((prev, curr) => {
    return Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime) ? curr : prev;
  }, replayData.frames[0]);
  if (!frameData) return null;
  const gameWidth = replayData.width;
  const gameHeight = replayData.height;
  const scale = Math.min(compWidth / gameWidth, compHeight / gameHeight);
  const scaledWidth = gameWidth * scale;
  const scaledHeight = gameHeight * scale;
  const offsetX = (compWidth - scaledWidth) / 2;
  const offsetY = (compHeight - scaledHeight) / 2;
  const audioElements = replayData.events.map((event, i) => {
    const startFrame = Math.floor(event.time / 1e3 * fps);
    if (frame < startFrame || frame > startFrame + fps / 2) return null;
    const audioSrc = replayData.audio[event.type];
    if (!audioSrc) return null;
    return /* @__PURE__ */ jsxDEV(Audio, { src: audioSrc, startFrom: 0, volume: 0.5 }, `audio-${i}-${startFrame}`, false, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 16
    });
  }).filter(Boolean);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#283747" }, children: [
    audioElements,
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      left: offsetX,
      top: offsetY,
      width: scaledWidth,
      height: scaledHeight
    }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: "33.33%",
        top: 0,
        width: Math.max(1, 4 * scale),
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.3)"
      } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: "66.66%",
        top: 0,
        width: Math.max(1, 4 * scale),
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.3)"
      } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 59,
        columnNumber: 17
      }),
      frameData.particles.map((particle, i) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            position: "absolute",
            left: particle.x * scale,
            top: particle.y * scale,
            width: particle.size * scale,
            height: particle.size * scale,
            backgroundColor: particle.color,
            borderRadius: "50%"
          }
        },
        `particle-${i}`,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 70,
          columnNumber: 21
        }
      )),
      frameData.barrels.map((barrel, i) => /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: barrel.x * scale,
        top: barrel.y * scale,
        width: barrel.width * scale,
        height: barrel.height * scale
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
            lineNumber: 93,
            columnNumber: 25
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 32 * scale,
          fontWeight: "bold",
          textShadow: `0 0 ${4 * scale}px black`
        }, children: barrel.health }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 101,
          columnNumber: 25
        })
      ] }, `barrel-${i}`, true, {
        fileName: "<stdin>",
        lineNumber: 86,
        columnNumber: 21
      })),
      frameData.barriers.map((barrier, i) => /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: barrier.x * scale,
        top: barrier.y * scale,
        width: barrier.width * scale,
        height: barrier.height * scale
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
            lineNumber: 125,
            columnNumber: 25
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 24 * scale,
          fontWeight: "bold",
          textShadow: `0 0 ${4 * scale}px black`
        }, children: barrier.health }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 129,
          columnNumber: 25
        })
      ] }, `barrier-${i}`, true, {
        fileName: "<stdin>",
        lineNumber: 118,
        columnNumber: 21
      })),
      frameData.enemies.map((enemy, i) => /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: enemy.x * scale,
        top: enemy.y * scale,
        width: enemy.baseWidth * enemy.scale * scale,
        height: enemy.baseHeight * enemy.scale * scale
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
          lineNumber: 153,
          columnNumber: 25
        }
      ) }, `enemy-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 146,
        columnNumber: 21
      })),
      frameData.projectiles.map((projectile, i) => /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: projectile.x * scale,
        top: projectile.y * scale,
        width: 10 * scale,
        height: 20 * scale
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
          lineNumber: 169,
          columnNumber: 25
        }
      ) }, `projectile-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 162,
        columnNumber: 21
      })),
      frameData.powerups.map((powerup, i) => /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: powerup.x * scale,
        top: powerup.y * scale,
        width: 40 * scale,
        height: 40 * scale
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
          lineNumber: 185,
          columnNumber: 25
        }
      ) }, `powerup-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 178,
        columnNumber: 21
      })),
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        left: frameData.player.x * scale,
        top: frameData.player.y * scale,
        width: frameData.player.width * scale,
        height: frameData.player.height * scale,
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
            lineNumber: 201,
            columnNumber: 21
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
            lineNumber: 205,
            columnNumber: 21
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 193,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: 20,
      right: 20,
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
      textTransform: "uppercase"
    }, children: "Instant Replay" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 219,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 39,
    columnNumber: 9
  });
};
export {
  ReplayComposition
};
