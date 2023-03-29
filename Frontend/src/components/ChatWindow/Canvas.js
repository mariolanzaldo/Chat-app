import { useOnDraw } from '../../hooks/canvasHook';
import { onDraw } from './canvasUtils/canvasUtils';

const Canvas = ({
    width,
    height
}) => {

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    return (
        <canvas
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        ></canvas>
    );
}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}