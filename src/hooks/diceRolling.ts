export const rollSelected = (rollType:React.ReactNode, diceSize:number, statMod?: number | undefined, stat?: React.ReactNode, proficient?:string | undefined, profBonus?:number, numberOfDices?:number, extraMods?:number) => {
    
    let diceRollRes = 0;
    let totalRes = 0;
    let stringDiceRollRes = ""
    let skillMod: number | undefined;


    numberOfDices === undefined? numberOfDices = 1 : numberOfDices
    for (let i = 0; i < numberOfDices; i++) {
        const roll = Math.floor(Math.random() * diceSize) + 1
        if (i !== numberOfDices - 1) {
            stringDiceRollRes += roll + "+"
        } else {
            stringDiceRollRes += roll
        }
        diceRollRes = diceRollRes + roll
    }
    if (statMod !== undefined) {
        if (proficient === "expertise") {
            skillMod = statMod + (Number(profBonus)*2)
        } else if (proficient === "proficient") {
            skillMod = statMod + Number(profBonus)
        } else {
            skillMod = statMod
        }
    }

    if (skillMod !== undefined) {
        if (extraMods) {
            totalRes = diceRollRes + skillMod + extraMods
        } else {
            totalRes = diceRollRes + skillMod
        }
    } else {
        totalRes = diceRollRes
    }
    return `${rollType}: ${numberOfDices}d${diceSize}(${stringDiceRollRes})${proficient === "proficient" || proficient === "expertise" ? " + " + profBonus + "(" + proficient + ")" : ""}${statMod ? " + " + statMod + stat : ""}${extraMods ? " + " + extraMods + "(bonus)" : ""} = ${totalRes}`
}