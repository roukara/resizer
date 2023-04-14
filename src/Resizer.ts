type Handler = ({ width, height, dpr }: {
  width: number,
  height: number,
  dpr: number
}) => void;

export default class Resizer {
  private id: number;
  private width: number;
  private height: number;
  private dpr: number;
  private handlers: Array<{ id: number, handler: Handler, priority: number }>;
  private timeout: number;
  private timeoutId: number;
  
  constructor({ timeout = 0 }: { timeout?: number } = {}) {
    this.id = Math.random();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.handlers = [];
    
    if (timeout) {
      this.timeout = timeout;
      this.timeoutId = null;

      window.addEventListener('resize', this.resizeWithDelay.bind(this));
    } else {
      window.addEventListener('resize', this.resize.bind(this));
    }
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio, 2);

    if (this.handlers.length) {
      this.handlers.forEach(handler => {
        handler.handler({
          width: this.width,
          height: this.height,
          dpr: this.dpr
        });
      });
    }
  }

  private resizeWithDelay() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.resize.bind(this), this.timeout);
  }

  add(handler: Handler, priority: number = 0): number {
    const id = this.id;

    this.handlers.push({ id, handler, priority });
    this.handlers.sort((a, b) => b.priority - a.priority);

    this.id += Math.random();

    return id;
  }

  remove(id: number) {
    this.handlers = this.handlers.filter(handler => {
      return handler.id !== id;
    });
  }

  get(): { width: number, height: number, dpr: number } {
    return {
      width: this.width,
      height: this.height,
      dpr: this.dpr
    };
  }

  dispose() {
    if (this.timeout) {
      window.removeEventListener('resize', this.resizeWithDelay.bind(this));
    } else {
      window.removeEventListener('resize', this.resize.bind(this));
    }

    this.id = null;
    this.width = null;
    this.height = null;
    this.dpr = null;
    this.handlers = null;
    this.timeout = null;
    this.timeoutId = null;
  }
}