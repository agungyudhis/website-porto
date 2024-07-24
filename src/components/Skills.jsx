import { DataContext } from "../context/Contexts"
import { useContext } from "react"
import generateChart from "./Charts.jsx"
import ReactECharts from "echarts-for-react"
import { extractData } from "../data/Data.jsx"

const Category = ({ handleChange, isChecked, category }) => {
    return (
        <button onClick={handleChange} checked={isChecked}>
            <h1>{category}</h1>
        </button>
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

export default function Skills({ refProp }) {
    const { itemsArray, setItemsArray, isSkills, setIsSkills, mainData } =
        useContext(DataContext)

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
            <div className="skill-container" ref={refProp}>
                <div className="skill-wrapper">
                    <div className="skill-title">
                        <div className="category">
                            <div className="category-button">
                                <Category
                                    category={"Skills"}
                                    checked={isSkills}
                                    handleChange={() => {
                                        setIsSkills(true)
                                        setItemsArray(
                                            extractData(mainData, true)
                                        )
                                    }}
                                ></Category>
                                <div
                                    className={`div-box${
                                        isSkills ? "-checked" : ""
                                    }`}
                                ></div>
                            </div>
                            <h1>&</h1>
                            <div className="category-button">
                                <Category
                                    category={"Tools"}
                                    checked={isSkills}
                                    handleChange={() => {
                                        setIsSkills(false)
                                        setItemsArray(
                                            extractData(mainData, false)
                                        )
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
                                <h3>My {category}</h3>
                                <p>
                                    This chart represent how often i use my{" "}
                                    {category} for my previous works or
                                    projects. This awesome chart created using
                                    Apache Echarts library.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="skill-filter-container">
                        <div className="skill-header">
                            <h3>
                                {categoryCapital} that used for my project and
                                works
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
                </div>
            </div>
        </>
    )
}
