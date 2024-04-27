import { abs, cos, sin, sqrt } from '@figureland/mathkit/number';
import type { TVec2 } from './types';

export const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

export const random = (a: number, b: number): number => mix(a, b, Math.random());

export const mag = (x: number, y: number): number => sqrt(x * x + y * y);

export const dist = (a: TVec2, b: TVec2): number => mag(a[0] - b[0], a[1] - b[1]);

export const diff = (a: number, b: number): number => abs(a - b);

export const equals = (a: TVec2, b: TVec2, range: number): boolean =>
	diff(a[0], b[0]) < range && diff(a[1], b[1]) < range;

export const dir = (a: TVec2, b: TVec2): 'x' | 'y' =>
	diff(a[0], b[0]) > diff(a[1], b[1]) ? 'x' : 'y';

export const dirSet = (a: TVec2, b: TVec2, d: 'x' | 'y' | null): TVec2 =>
	d ? (d === 'x' ? [b[0], a[1]] : [a[0], b[1]]) : b;

export const dirPos = (a: TVec2, b: TVec2): TVec2 =>
	diff(a[0], b[0]) > diff(a[1], b[1]) ? [b[0], a[1]] : [a[0], b[1]];

export const rotate = (v: TVec2, theta: number): TVec2 => {
	const s = sin(theta);
	const c = cos(theta);
	return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
};
