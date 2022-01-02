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