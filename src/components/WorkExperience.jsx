import { profileData } from "../data/Data"

function Experience({ data }) {
    const { company, period, description, tasks, position } = data
    return (
        <div className="work-experience">
            <div className="experience-header">
                <div className="experience-title">
                    <h2>{company}</h2>
                    <h3>{position}</h3>
                </div>
                <h3>
                    {period?.start} — {period?.end}
                </h3>
            </div>
            <p>{description}</p>
            <ul>
                {tasks.map((task, id) => {
                    return <li key={`${company}-task-${id}`}>{task}</li>
                })}
            </ul>
        </div>
    )
}

export default function WorkExperience({ refProp }) {
    const works_experience = profileData.works_experience

    return (
        <div className="work-experience-container" ref={refProp}>
            {works_experience.map((experience, id) => {
                return (
                    <Experience
                        data={experience}
                        key={`experience-${id}`}
                    ></Experience>
                )
            })}
        </div>
    )
}
