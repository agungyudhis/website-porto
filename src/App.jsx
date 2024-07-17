import { useEffect, useState } from "react"
import "./App.css"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import generateChart from "./components/Charts.jsx"
import ReactECharts from "echarts-for-react"
import {
    profileData,
    initialData,
    extractData,
    filterProjects,
    filterDataArray,
} from "./data/Data.jsx"
import useLocalStorage from "use-local-storage"
import Card from "./components/Modal.jsx"

const Toggle = ({ handleChange, isChecked }) => {
    return (
        <span
            className="material-symbols-outlined"
            onClick={handleChange}
            checked={isChecked}
        >
            {isChecked ? "light_mode" : "dark_mode"}
        </span>
    )
}

const Category = ({ handleChange, isChecked, category }) => {
    return (
        <button onClick={handleChange} checked={isChecked}>
            <h2>{category}</h2>
        </button>
    )
}

function ColorCard({ color, textColor }) {
    const spanStyle = {
        backgroundColor: color,
        color: textColor,
    }
    return (
        <span className="color-card" style={spanStyle}>
            {color}
        </span>
    )
}



function Intro() {
    return (
        <div className="intro-container">
            <div className="title-container">
                <h1>{profileData.title}</h1>
            </div>
            <p>{profileData.intro}</p>
        </div>
    )
}

function FilterTags({ data, filterHandler }) {
    const spanStyle = {
        color: data.textColor,
        backgroundColor: data.color,
    }
    let checked = !data.filtered
    return (
        <>
            <button
                className={`tag ${checked ? "checked" : "unchecked"}`}
                style={spanStyle}
                onClick={filterHandler}
            >
                <span className="material-symbols-outlined small-icon">
                    {checked ? "check" : "radio_button_unchecked"}
                </span>
                {data.item}
            </button>
        </>
    )
}

function OptionTags({ filterHandler, name }) {
    return (
        <>
            <button className="tag options" onClick={filterHandler}>
                {name}
            </button>
        </>
    )
}

function Skill({
    itemsArray,
    setItemsArray,
    isSkills,
    setIsSkills,
    mainData,
    setMainData,
}) {
    const category = isSkills ? "skills" : "tools"
    const categoryCapital = isSkills ? "Skills" : "Tools"

    const handleFilter = (name) => {
        setItemsArray((prev) => {
            return prev.map((item) =>
                item.item === name
                    ? { ...item, filtered: !item.filtered }
                    : item
            )
        })
    }

    const handleOption = (type) => {
        if (type === "select") {
            setItemsArray((prev) => {
                return prev.map((item) => {
                    return { ...item, filtered: false }
                })
            })
        } else {
            setItemsArray((prev) => {
                return prev.map((item) => {
                    return { ...item, filtered: true }
                })
            })
        }
    }

    return (
        <>
            <div className="skill-container">
                <div className="container-header">
                    <div className="category">
                        <div className="category-button">
                            <Category
                                category={"Skills"}
                                checked={isSkills}
                                handleChange={() => {
                                    setIsSkills(true)
                                    setItemsArray(extractData(mainData, true))
                                }}
                            ></Category>
                            <div
                                className={`div-box${
                                    isSkills ? "-checked" : ""
                                }`}
                            ></div>
                        </div>
                        <h2>&</h2>
                        <div className="category-button">
                            <Category
                                category={"Tools"}
                                checked={isSkills}
                                handleChange={() => {
                                    setIsSkills(false)
                                    setItemsArray(extractData(mainData, false))
                                }}
                            ></Category>
                            <div
                                className={`div-box${
                                    isSkills ? "" : "-checked"
                                }`}
                            ></div>
                        </div>
                    </div>
                    <div className="tip">
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        click to choose
                    </div>
                </div>
                <div className="skill-chart-container">
                    <ReactECharts
                        option={generateChart(
                            itemsArray.filter((value) => !value.filtered)
                        )}
                        style={{
                            height: "auto",
                            width: "100%",
                            padding: "0",
                            margin: "0",
                            position: "relative",
                        }}
                    ></ReactECharts>
                    <div className="description-card">
                        <div className="description-header">
                            <h2>{categoryCapital} Chart</h2>
                            <h3>My {category}</h3>
                            <p>
                                This chart represent how often i use my{" "}
                                {category} for my previous works or projects.
                                This awesome chart created using Apache Echarts
                                library.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-header">
                    <h3>
                        {categoryCapital} that used for my project and works
                    </h3>
                    <div className="tip">click to filter</div>
                </div>
                <div className="skill-filter-options">
                    <OptionTags
                        name="Select All"
                        filterHandler={() => {
                            handleOption("select")
                        }}
                    ></OptionTags>
                    <OptionTags
                        name="Deselect All"
                        filterHandler={() => {
                            handleOption("deselect")
                        }}
                    ></OptionTags>
                </div>
                <div className="skill-filter">
                    {itemsArray.map((item, id) => {
                        return (
                            <FilterTags
                                key={`filter-${id}`}
                                data={item}
                                filterHandler={() => {
                                    handleFilter(item.item)
                                }}
                            ></FilterTags>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

function App() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDark, setIsDark] = useLocalStorage("isDark", preference)
    const [isSkills, setIsSkills] = useLocalStorage("isSkills", true)
    const [mainData, setMainData] = useState(initialData)
    const [itemsArray, setItemsArray] = useState(
        extractData(mainData, isSkills)
    )

    useEffect(() => {
        setMainData((prev) =>
            filterProjects(prev, filterDataArray(itemsArray), isSkills)
        )
    }, [itemsArray, isSkills])

    // useEffect(() => {
    //   console.log("Ini useEffect2")
    //   setItemsArray(extractData(mainData, isSkills))
    // }, [isSkills])

    return (
        <div className="App" data-theme={isDark ? "dark" : "light"}>
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
                    <Toggle
                        handleChange={() => setIsDark(!isDark)}
                        isChecked={isDark}
                    ></Toggle>
                </div>
            </div>
            <div className="main-container">
                {/* <ColPal></ColPal> */}
                <Intro></Intro>
                <Skill
                    itemsArray={itemsArray}
                    setItemsArray={setItemsArray}
                    isSkills={isSkills}
                    setIsSkills={setIsSkills}
                    mainData={mainData}
                    setMainData={setMainData}
                ></Skill>
                <div className="card-container">
                    <h2>Works & Projects</h2>
                    <h3>Bla-bla</h3>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 500: 3, 1100: 4 }}
                    >
                        <Masonry gutter="1em">
                            {mainData
                                .filter((value) => value.filtered)
                                .map((data, id) => {
                                    return (
                                        <Card
                                            key={`project-card-${id}`}
                                            data={data}
                                            id={id}
                                            itemsArray={itemsArray}
                                            isSkills={isSkills}
                                        ></Card>
                                    )
                                })}
                        </Masonry>
                    </ResponsiveMasonry>
                    {/* <Modal></Modal> */}
                </div>
                <div className="contacts">
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
            </div>
        </div>
    )
}

export default App
