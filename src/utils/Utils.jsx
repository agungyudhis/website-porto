function enableDarkMode() {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkMode", true)
}

function disableDarkMode() {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkMode", true)
}

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

export { enableDarkMode, disableDarkMode, ColPal }
