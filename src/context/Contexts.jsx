import React, { createContext, useState, useEffect } from "react"
import { initialData } from "../data/Data"
import useLocalStorage from "use-local-storage"
import { extractData } from "../data/Data"
import { filterProjects, filterDataArray } from "../data/Data"

const DataContext = createContext()
const ThemeContext = createContext()

function DataProvider({ children }) {
    const [isSkills, setIsSkills] = useLocalStorage("isSkills", true)
    const [mainData, setMainData] = useState(initialData)
    const [skillsArray, setSkillsArray] = useState(extractData(mainData, true))
    const [toolsArray, setToolsArray] = useState(extractData(mainData, false))
    const [itemsArray, setItemsArray] = useState(
        isSkills ? skillsArray : toolsArray
    )

    useEffect(() => {
        setMainData((prev) =>
            filterProjects(prev, filterDataArray(itemsArray), isSkills)
        )
    }, [itemsArray, isSkills])

    const value = {
        isSkills,
        setIsSkills,
        mainData,
        setMainData,
        itemsArray,
        setItemsArray,
        skillsArray,
        toolsArray,
    }
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

function ThemeProvider({ children }) {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDark, setIsDark] = useLocalStorage("isDark", preference)
    if (isDark) {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
    }
    const value = { isDark, setIsDark }
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext, DataProvider, DataContext }
