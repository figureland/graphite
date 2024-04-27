import type { TPencilConfig } from './types';

export const pencilPresets: Record<string, TPencilConfig> = {
	hard: {
		maxSpeed: 3,
		minTheta: 0.15,
		maxTheta: 0.15,
		minAge: 5,
		maxAge: 10,
		minDrag: 0.8,
		maxDrag: 0.6,
		maxParticles: 7,
		scale: 2,
		smooth: 0.85,
		spray: 0,
		opacity: 0.3,
		color: 'rgba(0,0,0,0.04)'
	},
	normal: {
		maxSpeed: 12,
		minTheta: 0.6,
		maxTheta: 0.1,
		minAge: 10,
		maxAge: 20,
		minDrag: 0.6,
		maxDrag: 0.95,
		maxParticles: 10,
		scale: 5,
		smooth: 0.85,
		spray: 0.25,
		opacity: 0.3,
		color: 'rgba(0,0,0,0.04)'
	},
	coal: {
		maxSpeed: 12,
		minTheta: 0.26,
		maxTheta: 1,
		minAge: 10,
		maxAge: 30,
		minDrag: 0.6,
		maxDrag: 3,
		maxParticles: 20,
		scale: 35,
		smooth: 0.85,
		spray: 10,
		opacity: 1,
		color: 'rgba(0,0,0,0.25)'
	},
	erase: {
		maxSpeed: 12,
		minTheta: 0.6,
		maxTheta: 0.1,
		minAge: 10,
		maxAge: 20,
		minDrag: 0.6,
		maxDrag: 0.8,
		maxParticles: 20,
		scale: 5,
		smooth: 0.85,
		spray: 3,
		opacity: 0.3,
		color: 'rgba(255,255,255,0.06)'
	}
};
