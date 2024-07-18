import "../style/Utils.css"
import { colPal } from "../data/Data"
import { useContext } from "react"
import { ThemeContext } from "../context/Contexts"

function ColPal() {
    return (
        <div className="colpal-container">
            {colPal.map((color, id) => {
                return (
                    <ColorCard
                        key={`colpal-${id}`}
                        color={color.color}
                        textColor={color.textColor}
                    ></ColorCard>
                )
            })}
        </div>
    )
}

function ColorCard({ color, textColor }) {
    const spanStyle = {
        backgroundColor: color,
        color: textColor,
    }
    return (
        <span className="color-card" style={spanStyle}>
            {color}
        </span>
    )
}

const ThemeToggle = () => {
    const { isDark, setIsDark } = useContext(ThemeContext)

    return (
        <span
            className="material-symbols-outlined"
            onClick={() => setIsDark(!isDark)}
            checked={isDark}
        >
            {isDark ? "light_mode" : "dark_mode"}
        </span>
    )
}

export { ColPal, ThemeToggle }
