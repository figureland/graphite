import type { TVec2 } from './types';
import { mix, dist, equals, dir, dirSet } from './number';
import { createEvents } from '@figureland/statekit';
import type { Pencil } from './Pencil';

interface IGraphite {
	pencil: Pencil;
	pixelRatio?: number;
}
export class Graphite {
	maxSpeed = 200;
	canvas!: HTMLCanvasElement;
	ctx!: CanvasRenderingContext2D;
	isPencilDown = false;
	prevPos: TVec2 = [0, 0];
	pos: TVec2 = [0, 0];
	pencil: Pencil;
	dpr = 2;
	isMounted = false;
	loop!: number;
	_hasShift = false;
	_direction: 'x' | 'y' | null = null;

	events = createEvents();

	constructor({ pencil, pixelRatio = 1 }: IGraphite) {
		this.pencil = pencil;
		this.dpr = pixelRatio;
	}

	set mounted(m: boolean) {
		if (!m) {
			this.dispose();
		}
		this.isMounted = m;
	}

	get mounted() {
		return this.isMounted;
	}

	set direction(d: 'x' | 'y' | null) {
		this.emit('direction', d);
		this._direction = d;
	}
	get direction() {
		return this._direction as 'x' | 'y';
	}
	set hasShift(h: boolean) {
		this.emit('shift', h);
		this._hasShift = h;
	}
	get hasShift() {
		return this._hasShift;
	}

	emit = (name: string, data: unknown) => {
		this.events.emit(name, data);
	};
	on = (name: string, fn: (data: unknown) => void) => {
		this.events.on(name, fn);
	};
	adjustPos = (p: TVec2): TVec2 => [p[0] * this.dpr, p[1] * this.dpr];

	public handleMouseDown = (e: MouseEvent) => {
		this.hasShift = e.shiftKey;
		this.prevPos = this.adjustPos([e.clientX, e.clientY]);
		this.isPencilDown = true;
		this.drawPencil(this.adjustPos([e.clientX, e.clientY]));
	};
	public handleMouseMove = (e: MouseEvent) => {
		this.hasShift = e.shiftKey;
		this.drawPencil(this.adjustPos([e.clientX, e.clientY]));
	};
	public handleMouseUp = () => {
		this.hasShift = false;
		this.direction = null;
		this.isPencilDown = false;
	};
	public handleTouchStart = (e: TouchEvent) => {
		const t = e.touches[0];
		this.prevPos = this.adjustPos([t.clientX, t.clientY]);
		this.isPencilDown = true;
		this.drawPencil(this.adjustPos([t.clientX, t.clientY]));
	};
	public handleTouchMove = (e: TouchEvent) => {
		const t = e.touches[0];
		this.drawPencil(this.adjustPos([t.clientX, t.clientY]));
	};
	public handleTouchEnd = () => {
		this.isPencilDown = false;
	};

	public init = (canvas: HTMLCanvasElement) => {
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.pencil.init();
	};

	public drawPencil = (p: TVec2): void => {
		const isDirectional = this.hasShift && !equals(this.prevPos, p, 50);
		if (isDirectional) {
			this.direction = dir(this.prevPos, p);
		}
		const pos = dirSet(this.prevPos, p, this.direction);
		const delta = dist(this.prevPos, pos);
		if (this.isPencilDown && delta < this.maxSpeed) {
			this.pos = pos;
			this.pencil.emit(this.prevPos, pos);
			this.prevPos = [
				mix(this.prevPos[0], pos[0], this.pencil.config.smooth),
				mix(this.prevPos[1], pos[1], this.pencil.config.smooth)
			];
		} else {
			this.isPencilDown = false;
		}
	};

	setPencil = (pen: Pencil) => {
		this.pencil = pen;
	};

	initialDraw = () => {
		this.ctx.fillStyle = 'rgb(255,255,255)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};
	draw = (): void => {
		if (this.mounted) {
			this.ctx.strokeStyle = this.pencil.config.color;
			this.ctx.globalAlpha = this.pencil.config.opacity;
			this.pencil.update();
			this.pencil.draw(this.ctx);
			this.loop = requestAnimationFrame(this.draw);
		}
	};
	dispose = () => {
		this.pencil.dispose();
		if (this.loop) {
			cancelAnimationFrame(this.loop);
		}
	};
}
