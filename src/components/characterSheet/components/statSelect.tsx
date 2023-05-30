import { ChangeEvent } from "react";

interface StatSelectProps {
    usedStat: string
    setUsedStat: React.Dispatch<React.SetStateAction<string>>
}

export const StatSelect = ({usedStat, setUsedStat}: StatSelectProps) => {
    
    const handleStatChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setUsedStat(e.target.value)
    }

    return (
        <select value={usedStat} onChange={handleStatChange} className="atkStatSelect">
            <option value="str">Str</option>
            <option value="dex">Dex</option>
            <option value="con">Con</option>
            <option value="int">Int</option>
            <option value="wis">Wis</option>
            <option value="cha">Cha</option>
        </select>
    )

}