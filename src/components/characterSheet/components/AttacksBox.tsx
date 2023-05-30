import { AttacksBoxProps } from "./StatInterfaces"
import { AttackSlot } from "./AttackSlot"

export const AttacksBox = ({slots, name, value, onChange, str, dex, con, int, wis, cha, profBonus, rollsHistory, rerender}: AttacksBoxProps) => {

    
    const getValue = () => {
        let newValue = value
        if (!newValue) {
            newValue = []
        }
        if (slots) {
            while (newValue.length < slots) {
                newValue.push({})
            }
        }
        return newValue
    }

    const updateValue = (index: React.Key, field: string, newVal: string | boolean | number) => {
        const value = getValue().slice()
        if (field === "critRange") {
            if (Number(newVal) > 20) {
                newVal = 20
            } else if (Number(newVal) < 0) {
                newVal = 1
            }
        }
        value[index][field] = newVal
        if (onChange && name) {
            onChange(name, value)
        }
      }

    return (
        <div className="charAttacksBox">
            {getValue().map(
                    (val:  {
                        name: string
                        bonus: string | number | string[] | undefined
                        damage: string | number | string[] | undefined
                        proficiency: boolean
                        critRange: number
                        diceQnt: number
                        diceType: string
                        damageType: string
                        bonusAtk: number
                    }, index: string
                    ) => {
                        return (
                            <AttackSlot 
                            key={"charAttacksBox" + index} 
                            value={val} updateValue={updateValue} 
                            index={index} 
                            str={str}
                            dex={dex}
                            con={con}
                            int={int}
                            wis={wis}
                            cha={cha}
                            profBonus={profBonus}
                            rollsHistory={rollsHistory}
                            rerender={rerender}
                            />
                        )
                    })}
            <label>Attacks</label>
        </div>
    )
}

        {/* <Table size="sm" striped bordered hover className="charAttacksBox">
            <thead>
                <tr>
                    <th>Name</th>
                    <th style={{ width: '70px' }}>Attack Bonus</th>
                    <th>Damage Type</th>
                </tr>
            </thead>
            <tbody>
                {getValue().map(
                    (val:  {
                        name: string | number | string[] | undefined
                        bonus: string | number | string[] | undefined
                        damage: string | number | string[] | undefined
                    }, index: string
                    ) => {
                        return (
                            <tr key={"charAttacksBox" + index}>
                                <td>
                                    <Form.Control
                                    type="text"
                                    value={val.name ? val.name : ""}
                                    onChange={(e) => updateValue(index, "name", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                    type='text'
                                    value={val.bonus ? val.bonus : ''}
                                    onChange={(e) => updateValue(index, 'bonus', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                    type='text'
                                    value={val.damage ? val.damage : ''}
                                    onChange={(e) => updateValue(index, 'damage', e.target.value)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </Table> */}