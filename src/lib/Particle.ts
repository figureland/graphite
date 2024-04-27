export class Particle {
	private age!: number;
	constructor(
		public x: number,
		public y: number,
		public vx: number,
		public vy: number,
		public drag: number,
		public maxAge: number
	) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.drag = drag;
		this.maxAge = maxAge;
	}
	update = () => {
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= this.drag;
		this.vy *= this.drag;
		this.age++;
		return this.age < this.maxAge && (Math.abs(this.vx) > 0.025 || Math.abs(this.vy) > 0.025);
	};
}
