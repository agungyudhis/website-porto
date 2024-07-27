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

export default function Card({ itemsArray, data, isSkills, id }) {
    const { skillsArray, toolsArray } = useContext(DataContext)
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
        document.body.style.overflow = modal ? "visible" : "hidden"
    }

    const tagsContentMap = (data, itemsArray, isSkills, id, type) => {
        return (
            <div className="tags-container">
                {data[isSkills ? "skills" : "tools"].map(
                    (content, content_id) => {
                        const contentData = itemsArray.find((value) => {
                            return value.item === content
                        })
                        return (
                            <Tags
                                key={`tags-${type}-${content}-${id}-${content_id}`}
                                data={contentData}
                            ></Tags>
                        )
                    }
                )}
            </div>
        )
    }
    const paragraphParse = (data, id) => {
        const paragraphArray = data.description.split("\n")
        return paragraphArray.map((item, item_id) => {
            return (
                <p
                    key={`paragraph-${id}-${item_id}`}
                    dangerouslySetInnerHTML={{ __html: item }}
                ></p>
            )
        })
    }

    return (
        <>
            <div className="card" onClick={toggleModal}>
                <h3>{data.name}</h3>
                {tagsContentMap(data, itemsArray, isSkills, id, "card")}
            </div>
            {modal && (
                <>
                    <div className="modal">
                        <div className="overlay" onClick={toggleModal}></div>
                        <div className="modal-content">
                            {data?.images && data?.images.length != 0 && (
                                <div className="modal-img">
                                    {data.images.map((image, img_id) => {
                                        return (
                                            <div
                                                className="img-wrapper"
                                                key={`modal-img-${id}-${img_id}`}
                                            >
                                                <img src={`/img/${image}`} />
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            <div className="modal-description">
                                <h3>{data.name}</h3>
                                {paragraphParse(data, id)}
                                {data?.tools && (
                                    <div>
                                        <h4>Tools used:</h4>
                                        {tagsContentMap(
                                            data,
                                            toolsArray,
                                            false,
                                            id,
                                            "tools"
                                        )}
                                    </div>
                                )}
                                {data?.skills && (
                                    <div>
                                        <h4>Skills used:</h4>
                                        {tagsContentMap(
                                            data,
                                            skillsArray,
                                            true,
                                            id,
                                            "skills"
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
                                        {data.external_link.map(
                                            (link, link_id) => {
                                                return (
                                                    <li
                                                        key={`modal-link-${id}-${link_id}`}
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
                                            }
                                        )}
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
