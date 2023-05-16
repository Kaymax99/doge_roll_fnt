import { StatProps } from "./StatInterfaces";
import CP from "../../../assets/img/CP.png"
import SP from "../../../assets/img/SP.png"
import GP from "../../../assets/img/GP.png"
import EP from "../../../assets/img/EP.png"
import PP from "../../../assets/img/PP.png"

export const Coins = ({name, value, label, onChange, cssClass}: StatProps) => {

    let coinPic;
    switch (label?.toString()) {
        case "CP":
            coinPic = CP;
            break;
        case "SP":
            coinPic = SP;
            break;
        case "GP":
            coinPic = GP;
            break;
        case "EP":
            coinPic = EP;
            break;
        case "PP":
            coinPic = PP;
            break;
    
        default:
            break;
    }

    let classes = 'charCoins'
    if (cssClass) {
    classes += ' ' + cssClass
    }
    
    return (
        <div className={classes}>
            <div className="charCoinsLabel">
                <label>
                    <img src={coinPic} className="coinPic"></img>
                </label>
            </div>
            <div className="charCoinsValue">
                <input 
                type="text"
                value={value ? value : ""}
                onChange={(e) => onChange(name, e.target.value)}
                className="charInput"
                 />
            </div>
        </div>
    ) 
}