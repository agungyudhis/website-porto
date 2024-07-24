import descData from "../assets/Data.json"
import colPal from "../assets/TagsColor.json"

const profileData = {
    title: descData.title,
    subtitle: descData.subtitle,
    intro: descData.intro,
    contacts: descData.contacts,
    works_experience: descData.works_experience,
}

const initialData = descData.projects.map((value) => {
    return { ...value, filtered: false }
})

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
