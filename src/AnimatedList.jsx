import { useEffect, useRef, useState } from "react"

export default function AnimatedList() {
    const rootRef = useRef()
    const refs = Array(7).fill(null).map(() => useRef())
    const [visibleIdx, setVisibleIdx] = useState(0)
    useEffect(() => {
        const handler = () => {
            const idx = refs.findIndex(ref => ref.current.getBoundingClientRect().top > 0)
            setVisibleIdx(idx >= 0 ? idx : refs.length-1)
        }
        window.addEventListener("scroll", handler)
    }, [rootRef, ...refs])
    return (
        <ol className="list" ref={rootRef}>
            <li ref={refs[0]} style={{opacity: visibleIdx == 0 ? "1" : "0"}}>The speech capable drone picks a random base for a story.</li>
            <li ref={refs[1]} style={{opacity: visibleIdx == 1 ? "1" : "0"}}>The drone turns towards each player and interacts with them in ways such as blank filling or A/B questions.</li>
            <li ref={refs[2]} style={{opacity: visibleIdx == 2 ? "1" : "0"}}>As the story is created with elements within the lives of the astronauts it decreases homesickness and allows cultures to mix.</li>
            <li ref={refs[3]} style={{opacity: visibleIdx == 3 ? "1" : "0"}}>While the story continues AI onboard the drone fabricates problems based on the plot for the team to solve with teamwork.</li>
            <li ref={refs[4]} style={{opacity: visibleIdx == 4 ? "1" : "0"}}>Orientation is different in space. Therefore 4 projectors onboard the drone display story components on all sides of the ISS walls. Astronauts may actively align themselves with walls and interact with in-game objects by voice through the drone. </li>
            <li ref={refs[5]} style={{opacity: visibleIdx == 5 ? "1" : "0"}}>The drone moves to different sections of the ISS according to the story progression thus inducing physical activity. Missions in the game aim to improve the communication of teammates and will request solutions parallel to the current jobs of the astronauts.</li>
            <li ref={refs[6]} style={{opacity: visibleIdx == 6 ? "1" : "0"}}>Humor elements will be abundant in gameplay cultivating strong connections and memories. The drone gathers data on team dynamics from these experiences allowing better mission planning in the future.</li>
        </ol>
    )
}