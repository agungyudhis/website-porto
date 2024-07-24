import { ThemeToggle } from "../utils/Utils"

const scrollToSection = (elementRef) => {
    window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
    })
}

export default function Sidebar({ profile, workExperience, skill, project }) {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="sidebar-icon">
                    <span
                        className="material-symbols-outlined"
                        onClick={() => scrollToSection(profile)}
                    >
                        person
                    </span>
                </div>
                <div className="sidebar-icon">
                    <span
                        className="material-symbols-outlined"
                        onClick={() => scrollToSection(workExperience)}
                    >
                        work_history
                    </span>
                </div>
                <div className="sidebar-icon">
                    <span
                        className="material-symbols-outlined"
                        onClick={() => scrollToSection(skill)}
                    >
                        construction
                    </span>
                </div>
                <div className="sidebar-icon">
                    <span
                        className="material-symbols-outlined"
                        onClick={() => scrollToSection(project)}
                    >
                        analytics
                    </span>
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebar-icon">
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
        </div>
    )
}
