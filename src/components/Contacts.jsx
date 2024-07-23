import { profileData } from "../data/Data"

export default function Contacts({ refProp }) {
    return (
        <div className="contacts" ref={refProp}>
            <h2>Contacts</h2>
            <div className="contact-container">
                <a className="contact-card" style={{ cursor: "auto" }}>
                    Email: {profileData.contacts.email}
                </a>
                <a
                    href={profileData.contacts.linkedin}
                    target="_blank"
                    className="contact-card"
                >
                    LinkedIn
                </a>
                <a
                    href={profileData.contacts.github}
                    target="_blank"
                    className="contact-card"
                >
                    Github
                </a>
                <a
                    href={profileData.contacts.tableau}
                    target="_blank"
                    className="contact-card"
                >
                    Tableau
                </a>
                <a
                    href={profileData.contacts.instagram}
                    target="_blank"
                    className="contact-card"
                >
                    Instagram
                </a>
            </div>
        </div>
    )
}
