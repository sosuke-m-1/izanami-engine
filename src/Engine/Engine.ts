export const makeContext = (id: string): CanvasRenderingContext2D => {
    const canvas = document.getElementById(id)
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error(`#${id} is not an HTMLCanvasElement`);
    }
    const context = canvas.getContext("2d");
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("context is not CanvasRenderingContext2D");
    }
    return context
}

export class Izanami {
    routine: () => void = () => { };
    startTime = Date.now();

    constructor(
    ) {
    }

    setRoutine(callback: () => void) {
        this.routine = callback;
    }

    clear = () => {

    }

    run = () => {
        this.routine()
        requestAnimationFrame(this.run);
    }
}

type fns = (context: CanvasRenderingContext2D, ...args: any) => CanvasRenderingContext2D
type compose = (...fns: fns[]) => (arg: any) => void
export const compose: compose = (...fns) => arg => {
    fns.reduce((composed, f) => f(composed), arg)
}