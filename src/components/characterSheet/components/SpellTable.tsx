interface SpellTableProps {
    level: number
    rows: number
    name: string
    value?: any
    showLabels?: boolean
    slotsName?: string
    slotsUsedName?: string
    slotsValue?: string
    slotsUsedValue?: string
    onChange: (arg0: any, arg1: any) => void
}

export const SpellTable = ({level, rows, name, value, showLabels, slotsName, slotsUsedName, slotsUsedValue, slotsValue, onChange}:SpellTableProps) => {
    
    /* const getValue = () => {
        let val = value
        if (!val) {
            val = []
        }
        while (val.length < rows) {
            val.push({})
        }
        return val
      } */

    /* const updateValue = (index: React.Key, field: string, newVal: string | boolean) => {
        const val = getValue().slice()
        val[index][field] = newVal
        onChange(name, val)
    } */

    const renderSlotsRemaining = () => {
        let slotCount = 0;
        if (slotsValue != null && slotsValue !== '' && Number(slotsValue) != null) {
            slotCount = Number(slotsValue)
        }
        const slots = []
        for (let i = 1; i <= slotCount; i++) {
            slots.push(
            <div
            key={'spellSlot-' + name + i}
            className={
                slotsUsedValue && Number(slotsUsedValue) >= i
                ? 'charSkillsCheckbox proficient'
                : 'charSkillsCheckbox'
            }
            onClick={() =>
                onChange(
                slotsUsedName,
                Number(slotsUsedValue) === i ? null : i
                )
            }
            />
            )
        }
        return slots
    }

    return (
        <div>
            {showLabels ? 
                <div className="spellsTopLabels mb-1">
                    <label style={{ width: '20px' }}>Spell Level</label>
                    <label style={{ width: '80px' }}>Total Slots</label>
                    <label style={{ width: 'calc(100% - 100px)' }}>Spell Slots</label>
                </div>
            : ""}
            <div className="spellsHeader">
                <div className="spellLevel">
                    {level}
                </div>
                {level === 0 ? 
                    <div className="spellSlots">
                        <label>Cantrips</label>
                    </div>
                    :
                    <div className="spellSlots">
                        <div className="spellSlotsTotal">
                            <input 
                            type='text'
                            value={slotsValue ? slotsValue : ''}
                            onChange={(e) =>
                                onChange(slotsName, e.target.value)
                            }
                            />
                        </div>
                        <div className="spellSlotsRemaining">
                            {renderSlotsRemaining()}
                        </div>
                    </div>
                }
            </div>

            <table>
                {showLabels ? 
                    <thead>
                        <tr>
                            <th>
                                <label className="my-1">Spell Names</label>
                            </th>
                        </tr>
                    </thead> 
                : ""}
                <tbody>
                    <tr>
                        <td>
                            <textarea
                            rows={rows}
                            value={value ? value : ''}
                            onChange={(e) =>
                                onChange(name, e.target.value)
                            }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}