import { useContext } from "react"
import { DataProvider, ThemeContext } from "./context/Contexts.jsx"
import "./App.css"
import { ColPal } from "./utils/Utils.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Intro from "./components/Intro.jsx"
import Skills from "./components/Skills.jsx"
import Projects from "./components/Projects.jsx"
import Contacts from "./components/Contacts.jsx"
import { useRef } from "react"

function App() {
    const { isDark } = useContext(ThemeContext)

    const profile = useRef(null)
    const skill = useRef(null)
    const project = useRef(null)
    const contact = useRef(null)

    return (
        <div className="App" data-theme={isDark ? "dark" : "light"}>
            <Sidebar
                profile={profile}
                skill={skill}
                project={project}
                contact={contact}
            ></Sidebar>
            <div className="main-container">
                <DataProvider>
                    {/* <ColPal></ColPal> */}
                    <Intro refProp={profile}></Intro>
                    <Skills refProp={skill}></Skills>
                    <Projects refProp={project}></Projects>
                    <Contacts refProp={contact}></Contacts>
                </DataProvider>
            </div>
        </div>
    )
}

export default App
