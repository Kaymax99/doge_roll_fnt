export const rollSelected = (
    rollType:React.ReactNode, 
    diceSize:number, 
    statMod?: number | undefined, 
    stat?: React.ReactNode, 
    proficient?:string | undefined, 
    profBonus?:number, 
    numberOfDices?:number, 
    extraMods?:number) => {
    
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

export const rollAttack = (
    rollName: string, 
    numOfDmgDice: number, 
    dmgDiceSize:string, 
    statMod:number | undefined, 
    stat: string,
    critRange:number, 
    profBonus:number | undefined, 
    hitBonus?:number, 
    dmgBonus?:number, 
    dmgType?:string) => {

        const toHitRoll = Math.floor(Math.random() * 20) + 1;
        let toHitTotal = 0;
        let dmgDiceRoll = 0;
        const dmgDice = Number(dmgDiceSize.slice(1))
        let stringDmgDiceRoll = ""
        let stringStatMod: string | number | undefined = ""

        if (statMod && profBonus !== undefined) {
            stringStatMod = statMod >= 0 ? "+" + statMod : statMod
            if (hitBonus) {
                toHitTotal = toHitRoll + statMod + profBonus + hitBonus
            } else {
                toHitTotal = toHitRoll + statMod + profBonus
            }

            if (toHitRoll >= critRange) {
                numOfDmgDice = numOfDmgDice * 2
            }
            for (let i = 0; i < numOfDmgDice; i++) {
                const roll = Math.floor(Math.random() * dmgDice) + 1
                if (i !== numOfDmgDice - 1) {
                    stringDmgDiceRoll += roll + "+"
                } else {
                    stringDmgDiceRoll += roll
                }
                dmgDiceRoll = dmgDiceRoll + roll
            }
            dmgDiceRoll = dmgDiceRoll + statMod
            if (dmgBonus) {
                dmgDiceRoll = dmgDiceRoll + dmgBonus
            }
        }
    
        return `${rollName}: 1d20(${toHitRoll})${profBonus !== undefined ? " +" + profBonus + "(proficient)" : ""} ${stringStatMod + "(" + stat + ")"}${hitBonus ? " + " + hitBonus + "(bonus)" : ""} = ${toHitTotal} TO HIT | ${numOfDmgDice}${dmgDiceSize}(${stringDmgDiceRoll}) ${stringStatMod + "(" + stat + ")"}${dmgBonus ? " + " + dmgBonus + "(bonus)" : ""} = ${dmgDiceRoll}${dmgType ? " " + dmgType : ""} DMG`
    }