import { useContext } from "react"
import { DataProvider, ThemeContext } from "./context/Contexts.jsx"
import "./App.css"
import { ColPal } from "./utils/Utils.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Intro from "./components/Intro.jsx"
import Skills from "./components/Skills.jsx"
import Projects from "./components/Projects.jsx"
import Contacts from "./components/Contacts.jsx"

function App() {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className="App" data-theme={isDark ? "dark" : "light"}>
            <Sidebar></Sidebar>
            <div className="main-container">
                <DataProvider>
                    {/* <ColPal></ColPal> */}
                    <Intro></Intro>
                    <Skills></Skills>
                    <Projects></Projects>
                    <Contacts></Contacts>
                </DataProvider>
            </div>
        </div>
    )
}

export default App
