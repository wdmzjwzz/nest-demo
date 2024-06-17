export enum ManaQuality {
    Normal,
    Mid,
    Hight,
    Highest
}

export enum GrowthQuality {
    Normal,
    Mid,
    Hight,
    Highest
}

export enum Gender {
    MALE,
    FAMALE,
}

export enum Level {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
} 

export interface IPlayer {
    id: number;

    userId: string;

    sceneId: number;

    name: string;

    updateTime: string;

    position: string;

    level: Level;

    blood: number;

    fullBlood: number;

    mana: number; // 法力

    manaQuality: ManaQuality;

    fullMana: number;

    religionId: number; // 宗门

    growth: GrowthQuality;

    gender: Gender;

    age: number;

    life: number;
}
