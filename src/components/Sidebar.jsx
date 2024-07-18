import { ThemeToggle } from "../utils/Utils"

export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-icon">
                    <span className="material-symbols-outlined">person</span>
                </div>
                <div className="sidebar-icon">
                    <span className="material-symbols-outlined">
                        construction
                    </span>
                </div>
                <div className="sidebar-icon">
                    <span className="material-symbols-outlined">work</span>
                </div>
                <div className="sidebar-icon">
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
        </>
    )
}