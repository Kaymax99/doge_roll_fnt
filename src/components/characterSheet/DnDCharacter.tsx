export default class DnDCharacter {
    //base info
    id?: number
    name?: string
    charClass?: string
    classLevel?: string
    background?: string
    race?: string
    size?: string
    alignment?: string
    xp?: string
    xpMax?: string

    inspiration?: string
    proficiencyBonus?: string

    //stats
    strength?: string
    dexterity?: string
    constitution?: string
    intelligence?: string
    wisdom?: string
    charisma?: string

    strSave?: string
    strSaveProficient?: string
    dexSave?: string
    dexSaveProficient?: string
    conSave?: string
    conSaveProficient?: string
    intSave?: string
    intSaveProficient?: string
    wisSave?: string
    wisSaveProficient?: string
    chaSave?: string
    chaSaveProficient?: string

    //skills
    acrobatics?: string
    acrobaticsProficient?: string
    animalHandling?: string
    animalHandlingProficient?: string
    arcana?: string
    arcanaProficient?: string
    athletics?: string
    athleticsProficient?: string
    deception?: string
    deceptionProficient?: string
    history?: string
    historyProficient?: string
    insight?: string
    insightProficient?: string
    intimidation?: string
    intimidationProficient?: string
    investigation?: string
    investigationProficient?: string
    medicine?: string
    medicineProficient?: string
    nature?: string
    natureProficient?: string
    perception?: string
    perceptionProficient?: string
    performance?: string
    performanceProficient?: string
    persuasion?: string
    persuasionProficient?: string
    religion?: string
    religionProficient?: string
    slightOfHand?: string
    slightOfHandProficient?: string
    stealth?: string
    stealthProficient?: string
    survival?: string
    survivalProficient?: string
    otherProficiencies?: string
    languages?: string

    //combat stats
    ac?: string
    init?: string
    speed?: string
    hp?: string
    maxHp?: string
    tempHp?: string
    hitDie?: string
    hitDieMax?: string

    deathsaveSuccesses?: string
    deathsaveFailures?: string

    //attacks
    attacks?: any[]
    attacksText?: string

    //spellcasting

    spellcastingType?: string
    spellcastingAbility?: string
    spellSaveDC?: string
    spellAttackMod?: string
    knownSpells?: string
    preparedSpells?: string

    cantrips?: string

    lvl1SpellSlotsMax?: string
    lvl1SpellSlotsUsed?: string
    lvl1Spells?: string
  
    lvl2SpellSlotsMax?: string
    lvl2SpellSlotsUsed?: string
    lvl2Spells?: string
  
    lvl3SpellSlotsMax?: string
    lvl3SpellSlotsUsed?: string
    lvl3Spells?: string
  
    lvl4SpellSlotsMax?: string
    lvl4SpellSlotsUsed?: string
    lvl4Spells?: string
  
    lvl5SpellSlotsMax?: string
    lvl5SpellSlotsUsed?: string
    lvl5Spells?: string
  
    lvl6SpellSlotsMax?: string
    lvl6SpellSlotsUsed?: string
    lvl6Spells?: string
  
    lvl7SpellSlotsMax?: string
    lvl7SpellSlotsUsed?: string
    lvl7Spells?: string
  
    lvl8SpellSlotsMax?: string
    lvl8SpellSlotsUsed?: string
    lvl8Spells?: string
  
    lvl9SpellSlotsMax?: string
    lvl9SpellSlotsUsed?: string
    lvl9Spells?: string

    //attacks

    //equipment
    cp?: string
    sp?: string
    ep?: string
    gp?: string
    pp?: string
    equipment?: string

    //extra info
    personalityTraits?: string
    ideals?: string
    bonds?: string
    flaws?: string

    modifiers?: string
    racialTraits?: string
    classFeatures?: string
    feats?: string
    traits?: string
    miscNotes1?: string
    miscNotes2?: string

    gender?: string
    age?: string
    height?: string
    weight?: string
    eyes?: string
    skin?: string
    hair?: string
    appeareance?: string
    backstory?: string
    picture?: string
    campaign_id?: number
}