import descData from "../assets/data.json"

const profileData = {
    title: descData.title,
    intro: descData.intro,
    contacts: descData.contacts,
}

const initialData = descData.projects.map((value) => {
    return { ...value, filtered: false }
})

const colPal = [
    { color: "#60c0dd", textColor: "var(--clr-dark)" },
    { color: "#414141", textColor: "var(--clr-light)" },
    { color: "#aaaaaa", textColor: "var(--clr-dark)" },
    { color: "#dd6b66", textColor: "var(--clr-light)" },
    { color: "#759aa0", textColor: "var(--clr-light)" },
    { color: "#e69d87", textColor: "var(--clr-dark)" },
    { color: "#8dc1a9", textColor: "var(--clr-dark)" },
    { color: "#ea7e53", textColor: "var(--clr-light)" },
    { color: "#eedd78", textColor: "var(--clr-dark)" },
    { color: "#73a373", textColor: "var(--clr-light)" },
    { color: "#73b9bc", textColor: "var(--clr-light)" },
    { color: "#7289ab", textColor: "var(--clr-light)" },
    { color: "#91ca8c", textColor: "var(--clr-dark)" },
    { color: "#f49f42", textColor: "var(--clr-light)" },
    { color: "#ff715e", textColor: "var(--clr-light)" },
    { color: "#ffaf51", textColor: "var(--clr-dark)" },
    { color: "#ffee51", textColor: "var(--clr-dark)" },
    { color: "#8c6ac4", textColor: "var(--clr-light)" },
    { color: "#715c87", textColor: "var(--clr-light)" },
    { color: "#9bca63", textColor: "var(--clr-dark)" },
]

function extractData(mainData, isSkills) {
    let itemArray = []
    let toolsLength = 0
    for (let id = 0; id < mainData.length; id++) {
        const items = mainData[id][isSkills ? "skills" : "tools"]
        items.forEach((item) => {
            if (itemArray.find((value) => value.item === item) ? false : true) {
                itemArray.push({
                    item: item,
                    count: 1,
                    filtered: false,
                    ...colPal[toolsLength],
                })
                toolsLength += 1
            } else {
                itemArray.find((value) => value.item === item).count += 1
            }
        })
    }
    return itemArray
}

function filterDataArray(data) {
    return data.filter((value) => !value.filtered).map((value) => value.item)
}

function filterProjects(data, filteredArray, isSkills = true) {
    return data.map((value) => {
        if (
            value[isSkills ? "skills" : "tools"].some((r) =>
                filteredArray.includes(r)
            )
        ) {
            return { ...value, filtered: true }
        } else {
            return { ...value, filtered: false }
        }
    })
}

function filterAll(data) {
    return data.map((value) => {
        return { ...value, filtered: true }
    })
}

function unfilterAll(data) {
    return data.map((value) => {
        return { ...value, filtered: false }
    })
}

export {
    profileData,
    initialData,
    colPal,
    extractData,
    filterDataArray,
    filterProjects,
    filterAll,
    unfilterAll,
}
