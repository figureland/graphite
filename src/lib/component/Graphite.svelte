<script lang="ts">
	import { onMount } from 'svelte';
	import { Graphite } from '../Graphite';
	import { pencilPresets } from '../presets';
	import { Pencil } from '$lib/Pencil';

	let canvas: HTMLCanvasElement;
	let pixelRatio = 2;

	$: pointer = [0, 0];
	$: pointerScale = 0;
	$: width = 0;
	$: height = 0;
	$: shift = false;
	$: direction = null;

	const instance = new Graphite({ pixelRatio, pencil: new Pencil(pencilPresets.coal) });

	instance.on('shift', (s: any) => {
		shift = s;
	});

	instance.on('direction', (d: any) => {
		direction = d;
	});

	const handleMouseAction = (e: MouseEvent, fn: (e: MouseEvent) => void) => {
		pointer[0] = e.clientX;
		pointer[1] = e.clientY;
		fn(e);
	};
	const setMouseActive = (ma: boolean) => {
		pointerScale = ma ? 1.0 : 0.0;
	};
	onMount(() => {
		instance.init(canvas);
		instance.mounted = true;
		instance.draw();

		return () => {
			instance.mounted = false;
		};
	});
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div
	role="presentation"
	class="container"
	on:mouseenter={() => setMouseActive(true)}
	on:mouseleave={() => setMouseActive(false)}
	on:mousedown={instance.handleMouseDown}
	on:mousemove={(e) => handleMouseAction(e, instance.handleMouseMove)}
	on:mouseup={instance.handleMouseUp}
	on:touchstart|preventDefault={instance.handleTouchStart}
	on:touchmove|preventDefault={instance.handleTouchMove}
	on:touchend|preventDefault={instance.handleTouchEnd}
>
	<div class="indicator" style="transform: translateX({pointer[0]}px) translateY({pointer[1]}px);">
		<div class="inner" style="transform: scale({pointerScale}, {pointerScale})" />
		<div class="ruler x" class:visible={shift && direction} />
		<div class="ruler y" class:visible={shift && direction} />
	</div>
	<canvas bind:this={canvas} width={width * pixelRatio} height={height * pixelRatio} />
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: #e4e4de;
		position: relative;
		cursor: none;
	}
	.indicator {
		width: 30px;
		height: 30px;
		position: absolute;
		top: -15px;
		left: -15px;
		z-index: 1;
		background: none;
		pointer-events: none;
	}
	.ruler {
		width: 200vw;
		height: 1px;
		background: black;
		position: absolute;
		top: 14px;
		left: calc(-100vw + 14px);
		transform-origin: 50% 50%;
		opacity: 0;
		transition: all 0.1s ease-in-out;
	}
	.ruler.y {
		transform: rotate(90deg);
	}
	.ruler.visible {
		opacity: 0.25;
	}
	.inner {
		width: inherit;
		height: inherit;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.25);
		transition: transform 0.125s ease-in-out;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
