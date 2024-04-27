import type { TControlProp } from './types';

export const controlProps: TControlProp[] = [
	{
		param: 'maxSpeed',
		min: 1,
		max: 50
	},
	{
		param: 'minTheta',
		min: -1,
		max: 1
	},
	{
		param: 'maxTheta',
		min: -1,
		max: 1
	},
	{
		param: 'minAge',
		min: 1,
		max: 40
	},
	{
		param: 'maxAge',
		min: 1,
		max: 40
	},
	{
		param: 'minDrag',
		min: 1,
		max: 40
	},
	{
		param: 'maxDrag',
		min: 1,
		max: 10
	},
	{
		param: 'maxParticles',
		min: 1,
		max: 60,
		step: 1
	},
	{
		param: 'scale',
		min: 2,
		max: 150
	},
	{
		param: 'spray',
		min: 1,
		max: 20
	},
	{
		param: 'opacity',
		min: 0,
		max: 1
	},
	{
		param: 'color'
	}
];
