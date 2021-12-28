import { css } from '@emotion/css'
import { Link } from "react-router-dom";

const sample = css({
    color: "rgb(188,0,45)",
    display: 'flex',
    width: 'fit-content',
    margin: "30px auto 0 auto",
    alignItems: 'center'

})

export default function Sample() {
    return (
        <>
            <Link to="/" className={sample}>HOME</Link>
        </>
    )
}