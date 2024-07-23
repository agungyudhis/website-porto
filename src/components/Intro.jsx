import { profileData } from "../data/Data"

export default function Intro({ refProp }) {
    return (
        <div className="intro-container" ref={refProp}>
            <div className="title-container">
                <h1>{profileData.title}</h1>
            </div>
            <p>{profileData.intro}</p>
        </div>
    )
}
