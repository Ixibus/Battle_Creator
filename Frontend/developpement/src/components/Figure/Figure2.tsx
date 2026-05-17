import './figureStyle2.css'

interface propInterface {
    number: number | undefined,
    symbol?: string
};

export default function Figure2({number, symbol} : propInterface) {
    return(
        <p className="figureStyle2">
            {number} {symbol}
        </p>
    )
}