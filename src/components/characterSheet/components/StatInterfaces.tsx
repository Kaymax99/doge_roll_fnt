export interface StatProps {
    name: string
    value: string | number | undefined
    label?: React.ReactNode
    onChange: (arg0: string, arg1: any) => void
    cssClass?: string
    rollsHistory?: string[]
    rerender?: any
    defaultStat?: React.ReactNode
}

export interface SkillsProps extends StatProps {
    proficient?: string
    proficiencyBonus?: number
}

export interface CombatStatProps extends StatProps {
    relevantStat?: string | number | undefined
}
export interface AttacksBoxProps {
    name?: string
    value: any
    onChange?: (arg0: string, arg1: any) => void
    slots?: number
    str?: string
    dex?: string
    con?: string
    int?: string
    wis?: string
    cha?: string
    profBonus?: number
    rollsHistory?: string[]
    rerender?: any
}
export interface AttackSlotProps extends AttacksBoxProps{
    value: IAttack
    updateValue: (index: React.Key, field: string, newVal: string | boolean | number) => void
    index: string
}
export interface IAttack {
    id: number
    name: string
    bonus: string | number | string[] | undefined
    proficiency: boolean
    critRange: number
    diceQnt: number
    diceType: string
    damageType: string
    bonusAtk: number
}