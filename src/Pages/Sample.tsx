import { css } from '@emotion/css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { drawPolygon } from '../Engine/Canvas';
import { drawHtml } from '../Engine/Html';
import { makeContext } from '../Engine/Engine';
import { RESOLUTION } from '../../izanami.config'

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

const test = css({
    color: 'blue'
});

export default function Sample() {
    useEffect(() => {
        const context = makeContext('canvas')

        drawHtml(
            context,
            <div style={{ margin: '100px auto 0 auto' }} className={test}>
                <div style={{ color: 'red' }}>HOME</div>
            </div>
        );
    }, [])

    const scale = window.devicePixelRatio

    const WIDTH = RESOLUTION.WIDTH * scale
    const HEIGHT = RESOLUTION.HEIGHT * scale

    return (
        <>
            <Link to="/" className={sample}>HOME</Link>
            <canvas width={WIDTH} height={HEIGHT} id='canvas' className={canvas}></canvas>
        </>
    )
}