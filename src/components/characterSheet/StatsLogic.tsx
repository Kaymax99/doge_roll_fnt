export const setCharMaxXP = (value:string | undefined) => {
    let maxXP;
    switch (value) {
        case "1":
            maxXP = "300"
            break;
        case "2":
            maxXP = "900"
            break;
        case "3":
            maxXP = "2700"
            break;
        case "4":
            maxXP = "6500"
            break;
        case "5":
            maxXP = "14000"
            break;
        case "6":
            maxXP = "23000"
            break;
        case "7":
            maxXP = "34000"
            break;
        case "8":
            maxXP = "48000"
            break;
        case "9":
            maxXP = "64000"
            break;
        case "10":
            maxXP = "85000"
            break;
        case "11":
            maxXP = "100000"
            break;
        case "12":
            maxXP = "120000"
            break;
        case "13":
            maxXP = "140000"
            break;
        case "14":
            maxXP = "165000"
            break;
        case "15":
            maxXP = "195000"
            break;
        case "16":
            maxXP = "225000"
            break;
        case "17":
            maxXP = "265000"
            break;
        case "18":
            maxXP = "305000"
            break;
        case "19":
        case "20":
            maxXP = "355000"
            break;
        default:
            maxXP = "300"
            break;
    }
    return maxXP;
}

export const setCharProficiency = (value:string | undefined) => {
    let profBonus;
    if (value) {
        profBonus = Math.floor(2 + (Number(value)-1)/4)
    } else {
        profBonus = 2
    }
    return profBonus
    
    
}

export const statModCalculator = (value: string | number | undefined) => {
    let modifier;
    if (value && !isNaN(Number(value))) {
        const statModifier = Math.floor((Number(value) - 10) /2)
        modifier = statModifier
    }
    return modifier
}