export interface StatProps {
    name: string
    value: string | number | undefined
    label: React.ReactNode
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