import React from 'react';
import { createRoot } from 'react-dom/client';
import { Player } from '@websim/remotion/player';
import { ReplayComposition } from 'replay-composition';

export function showReplay(container, replayData) {
    // Clear container
    container.innerHTML = '';

    if (!replayData || !replayData.frames || replayData.frames.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center;">No replay available</p>';
        return;
    }

    // Calculate duration based on recorded frames
    const duration = Math.max(...replayData.frames.map(f => f.time));
    const fps = 30;
    const durationInFrames = Math.ceil((duration / 1000) * fps);

    const root = createRoot(container);
    root.render(
        <Player
            component={ReplayComposition}
            durationInFrames={durationInFrames}
            fps={fps}
            compositionWidth={960}
            compositionHeight={540}
            controls
            inputProps={{ replayData }}
            style={{ width: '100%' }}
        />
    );
}