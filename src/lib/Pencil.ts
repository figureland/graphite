import { Pane, type FolderApi } from 'tweakpane';
import { Particle } from './Particle';
import type { TControlProp, TPencilConfig, TVec2 } from './types';
import { controlProps } from './controls';
import { mag, mix, random, rotate } from './number';

export class Pencil {
	particles: Particle[] = [];
	folder!: FolderApi;

	constructor(public config: TPencilConfig) {}

	init = () => {
		this.folder = new Pane().addFolder({ title: 'Tool settings', expanded: false });

		controlProps.forEach(({ param, ...config }: TControlProp) => {
			this.folder.addInput(this.config, param, config);
		});
	};
	emit = (ppos: TVec2, pos: TVec2) => {
		const {
			maxSpeed,
			minTheta,
			maxTheta,
			spray,
			maxParticles,
			scale,
			minDrag,
			maxDrag,
			minAge,
			maxAge
		} = this.config;
		const dirx = pos[0] - ppos[0];
		const diry = pos[1] - ppos[1];
		const speed = mag(dirx, diry) + 1e-3;
		const nspeed = Math.min(speed / maxSpeed, 1.0);
		const invSpeed = 1.0 - nspeed;
		const theta = mix(minTheta, maxTheta, nspeed) * Math.PI;
		const s = spray;
		for (let i = 0, n = speed / 2 + 1; i < n; i++) {
			const t = i / n;
			const currx = ppos[0] + dirx * t + random(-s, s);
			const curry = ppos[1] + diry * t + random(-s, s);
			for (let j = 0, np = 1 + random(nspeed, nspeed * maxParticles); j < np; j++) {
				const vel = rotate([dirx / speed, diry / speed], Math.PI + random(-theta, theta));
				const tempScale = random(0.5, invSpeed * scale);
				const drag = random(Math.max(invSpeed * 0.25, minDrag), Math.max(invSpeed, maxDrag));
				const p = new Particle(
					currx,
					curry,
					vel[0] * tempScale,
					vel[1] * tempScale,
					drag,
					random(minAge, maxAge)
				);
				this.particles.push(p);
			}
		}
	};

	dispose = () => {
		if (this.folder) {
			this.folder.dispose();
		}
	};
	update = () => {
		for (let i = 0, p = this.particles, n = p.length; i < n; i++) {
			const q = p[i];
			if (q.update()) {
				this.particles.push(q);
			}
		}
	};

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		for (let i = 0, p = this.particles, n = p.length; i < n; i++) {
			const q = p[i];
			ctx.moveTo(q.x, q.y);
			ctx.lineTo(q.x + 0.5, q.y);
		}
		ctx.stroke();
	};
}
