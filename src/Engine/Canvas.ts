type Point = [number, number]
type Points = [Point, Point, Point, ...Point[]];
type Color = string | null;

export const drawLine = (
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: Color = null,
    width = 1
): CanvasRenderingContext2D => {
    if (color !== null) {
        context.strokeStyle = color
    }
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();

    return context
}

export const drawRectangle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color = null
): CanvasRenderingContext2D => {
    if (color !== null) {
        context.strokeStyle = color
    }
    context.fillRect(x, y, width, height)

    return context
}

export const drawPolygon = (
    context: CanvasRenderingContext2D,
    points: Points,
    color: Color = null
): CanvasRenderingContext2D => {
    if (color !== null) {
        context.fillStyle = color
    }
    context.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            context.moveTo(...point);
            return
        }
        context.lineTo(...point);
    });
    context.closePath();
    context.fill();

    return context
}

export const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: Color = null
): CanvasRenderingContext2D => {
    if (color !== null) {
        context.fillStyle = color
    }
    context.beginPath();
    context.arc(x, y, radius, 0.0, Math.PI * 2.0)
    context.closePath();
    context.fill();

    return context;
}