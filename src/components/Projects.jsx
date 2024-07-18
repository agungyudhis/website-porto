import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Card from "./Modal"
import { useContext } from "react"
import { DataContext } from "../context/Contexts"

const MASONRY_BREAKPOINTS = { 350: 2, 500: 3, 1100: 4 }

export default function Projects() {
    const { itemsArray, isSkills, mainData } = useContext(DataContext)
    return (
        <>
            <div className="card-container">
                <h2>Works & Projects</h2>
                <h3>Bla-bla</h3>
                <ResponsiveMasonry
                    columnsCountBreakPoints={MASONRY_BREAKPOINTS}
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
            </div>
        </>
    )
}
