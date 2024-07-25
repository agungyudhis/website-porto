import React, { useState, useContext } from "react"
import "../style/Modal.css"
import { DataContext } from "../context/Contexts"
// TODO: Use tags for skills and tools section
function Tags({ data }) {
    const spanStyle = {
        color: data.textColor,
        backgroundColor: data.color,
    }
    let checked = !data.filtered
    return (
        <>
            <span
                className={`tag ${checked ? "checked" : "unchecked"}`}
                style={spanStyle}
            >
                {data.item}
            </span>
        </>
    )
}

export default function Card({ itemsArray, data, isSkills }) {
    const { skillsArray, toolsArray } = useContext(DataContext)
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
        document.body.style.overflow = modal ? "visible" : "hidden"
    }

    const tagsContentMap = (data, itemsArray, isSkills) => {
        return (
            <div className="tags-container">
                {data[isSkills ? "skills" : "tools"].map((content, id) => {
                    const contentData = itemsArray.find((value) => {
                        return value.item === content
                    })
                    return (
                        <Tags
                            key={`${content}-${id}`}
                            data={contentData}
                        ></Tags>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            <div className="card" onClick={toggleModal}>
                <h3>{data.name}</h3>
                {tagsContentMap(data, itemsArray, isSkills)}
            </div>
            {modal && (
                <>
                    <div className="modal">
                        <div className="overlay" onClick={toggleModal}></div>
                        <div className="modal-content">
                            {data?.images && data?.images.length != 0 && (
                                <div className="modal-img">
                                    {data.images.map((image, id) => {
                                        return (
                                            <img
                                                key={`modal-img-${id}`}
                                                src={`/img/${image}`}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                            <div className="modal-description">
                                <h3>{data.name}</h3>
                                <p>{data.description}</p>
                                {data?.tools && (
                                    <div>
                                        <h4>Tools used:</h4>
                                        {tagsContentMap(
                                            data,
                                            toolsArray,
                                            false
                                        )}
                                    </div>
                                )}
                                {data?.skills && (
                                    <div>
                                        <h4>Skills used:</h4>
                                        {tagsContentMap(
                                            data,
                                            skillsArray,
                                            true
                                        )}
                                    </div>
                                )}
                                {data?.project_at && (
                                    <div>
                                        <h4>Project at:</h4>
                                        {data.project_at.join(", ")}
                                    </div>
                                )}
                                {data?.external_link && (
                                    <div className="project-links">
                                        <h4>External Link:</h4>
                                        {data.external_link.map((link, id) => {
                                            return (
                                                <li
                                                    key={`modal-link-${id}`}
                                                    className="url-list"
                                                >
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                    >
                                                        {link.name}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            <span
                                className="close-btn material-symbols-outlined"
                                onClick={toggleModal}
                            >
                                close
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
