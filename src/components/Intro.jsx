import { profileData } from "../data/Data"
import githubLogo from "../assets/logo/github.svg"
import instagramLogo from "../assets/logo/instagram.svg"
import linkedinLogo from "../assets/logo/linkedin.svg"
import gmailLogo from "../assets/logo/gmail.svg"
import tableauLogo from "../assets/logo/tableau.svg"

export default function Intro({ refProp }) {
    return (
        <div className="intro-container" ref={refProp}>
            <div className="title-container">
                <h2 className="hero-subtitle">{profileData.subtitle}</h2>
                <h1 className="hero-title">{profileData.title}</h1>
            </div>
            <p dangerouslySetInnerHTML={{ __html: profileData.intro }}></p>
            <div className="contact-container">
                <a
                    href={profileData.contacts.email}
                    className="contact-card"
                >
                    <img src={gmailLogo}></img>
                </a>
                <a
                    href={profileData.contacts.linkedin}
                    target="_blank"
                    className="contact-card"
                >
                    <img src={linkedinLogo}></img>
                </a>
                <a
                    href={profileData.contacts.github}
                    target="_blank"
                    className="contact-card"
                >
                    <img src={githubLogo}></img>
                </a>
                <a
                    href={profileData.contacts.tableau}
                    target="_blank"
                    className="contact-card"
                >
                    <img src={tableauLogo}></img>
                </a>
                <a
                    href={profileData.contacts.instagram}
                    target="_blank"
                    className="contact-card"
                >
                    <img src={instagramLogo}></img>
                </a>
            </div>
        </div>
    )
}
