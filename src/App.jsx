import { useContext } from "react"
import { DataProvider, ThemeContext } from "./context/Contexts.jsx"
import "./App.css"
import { ColPal } from "./utils/Utils.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Intro from "./components/Intro.jsx"
import WorkExperience from "./components/WorkExperience.jsx"
import Skills from "./components/Skills.jsx"
import Projects from "./components/Projects.jsx"
import { useRef } from "react"

function App() {
    const { isDark } = useContext(ThemeContext)

    const profile = useRef(null)
    const workExperience = useRef(null)
    const skill = useRef(null)
    const project = useRef(null)

    return (
        <div className="App" data-theme={isDark ? "dark" : "light"}>
            <Sidebar
                profile={profile}
                workExperience={workExperience}
                skill={skill}
                project={project}
            ></Sidebar>
            <div className="main-container">
                <DataProvider>
                    {/* <ColPal></ColPal> */}
                    <Intro refProp={profile}></Intro>
                    <WorkExperience refProp={workExperience}></WorkExperience>
                    <Skills refProp={skill}></Skills>
                    <Projects refProp={project}></Projects>
                </DataProvider>
            </div>
        </div>
    )
}

export default App
