import './figureStyle.css'

interface propInterface {
    number: number | undefined,
    symbol?: string
};

export default function Figure({number, symbol} : propInterface) {
    return(
        <p className="figureStyle">
            {number} {symbol}
        </p>
    )
}