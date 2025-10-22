export default class ReplayRecorder {
    constructor(game) {
        this.game = game;
        this.maxDuration = 5000; // 5 seconds in ms
        this.frames = [];
        this.events = [];
        this.startTime = Date.now();
    }

    recordFrame() {
        const currentTime = Date.now() - this.startTime;
        
        const frame = {
            time: currentTime,
            player: {
                x: this.game.player.x,
                y: this.game.player.y,
                rotation: this.game.player.rotation
            },
            projectiles: this.game.projectiles.map(p => ({
                x: p.x,
                y: p.y
            })),
            barrels: this.game.barrels.map(b => ({
                x: b.x,
                y: b.y,
                health: b.health,
                rotation: b.meshRotation
            })),
            barriers: this.game.barriers.map(b => ({
                x: b.x,
                y: b.y,
                health: b.health,
                width: b.width,
                height: b.height
            })),
            enemies: this.game.enemies.map(e => ({
                x: e.x,
                y: e.y,
                health: e.health,
                scale: e.width / e.baseWidth
            })),
            powerups: this.game.powerups.map(p => ({
                x: p.x,
                y: p.y,
                type: p.type
            })),
            particles: this.game.particles.map(p => ({
                x: p.x,
                y: p.y,
                size: p.size,
                color: p.color
            }))
        };

        this.frames.push(frame);

        // Keep only last maxDuration worth of frames
        const cutoffTime = currentTime - this.maxDuration;
        this.frames = this.frames.filter(f => f.time > cutoffTime);
        this.events = this.events.filter(e => e.time > cutoffTime);
    }

    recordEvent(type, data) {
        const currentTime = Date.now() - this.startTime;
        this.events.push({
            time: currentTime,
            type,
            data
        });
    }

    getReplayData() {
        return {
            frames: this.frames,
            events: this.events,
            width: this.game.width,
            height: this.game.height,
            assets: {
                playerShip: 'player_ship.png',
                weapon: 'weapon.png',
                projectile: 'projectile.png',
                barrel: 'barrel_texture.png',
                barrier: 'barrier.png',
                enemy: 'enemy.png',
                rapidFire: 'rapid_fire.png',
                bomb: 'bomb.png'
            },
            audio: {
                shoot: 'shoot.mp3',
                hit: 'hit.mp3',
                destroy: 'destroy.mp3',
                shatter: 'shatter.mp3',
                bomb_explosion: 'bomb_explosion.mp3',
                bomb_pickup: 'bomb_pickup.mp3'
            }
        };
    }
}