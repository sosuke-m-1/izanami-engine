import { css } from '@emotion/css'
import { Link } from "react-router-dom";

const red = css({
    color: "rgb(188,0,45)"
})

const sample = css({
    color: "rgb(188,0,45)",
    display: 'flex',
    width: 'fit-content',
    margin: "30px auto 0 auto",
    alignItems: 'center'
})

const wrapper = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width:'100%'
})

export default function Home() {
    return (
        <div className={wrapper}>
            <div>
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                    <img src="images/logo.svg" alt="" style={{ width: "100%" }} />
                </div>
                <h1 className={red} style={{ margin: "10px auto 0 auto", textAlign: "center" }}>Ver.0.0.1</h1>
                <p className={red} style={{ margin: "30px auto 0 auto", textAlign: "center" }}>
                    Node.js <span id="node-version"></span>,
                    Chromium <span id="chrome-version"></span>,
                    Electron <span id="electron-version"></span>.
                </p>
                <Link to="/sample" className={sample}>SAMPLE</Link>
            </div>
        </div>
    );
}