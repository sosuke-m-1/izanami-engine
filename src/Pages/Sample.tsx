import { css } from '@emotion/css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { drawPolygon, drawRectangle } from '../Engine/Canvas';
import { drawHtml } from '../Engine/Html';
import { makeContext, Izanami } from '../Engine/Engine';
import { RESOLUTION } from '../../izanami.config'
import { FaBeer } from 'react-icons/fa';

const sample = css({
    color: "rgb(188,0,45)",
    display: 'flex',
    width: 'fit-content',
    margin: "30px auto 0 auto",
    alignItems: 'center'
})

const canvas = css({
    width: "100vw",
    height: "100vh"
})

export default function Sample() {
    useEffect(() => {
        const context = makeContext('canvas')
        const engine = new Izanami

        engine.setRoutine(() => {
            drawRectangle(context, 0, 0, WIDTH, HEIGHT, '#eeeeee');
            let nowTime = (Date.now() - engine.startTime) / 1000;
            let s = Math.sin(nowTime);
            let x = s * 200.0;

            drawHtml(
                context,
                <div style={{ color: 'red', font: '60px sans-serif', textAlign:'center' }}>自</div>,
                1440 + x,
                900
            );
        })

        engine.run();
    }, [])

    const scale = window.devicePixelRatio

    const WIDTH = RESOLUTION.WIDTH * scale
    const HEIGHT = RESOLUTION.HEIGHT * scale

    return (
        <>
            {/* <Link to="/" className={sample}>HOME</Link> */}
            <canvas width={WIDTH} height={HEIGHT} id='canvas' className={canvas}></canvas>
        </>
    )
}