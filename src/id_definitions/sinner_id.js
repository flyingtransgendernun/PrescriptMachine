export class SinnerId{
    static MaxLevel = 60;

    constructor(sinner, name, stars = 1, season = 1, keywords = [], factions = [], level = this.MaxLevel, difficulty = 0, available = true){
        this.sinner = sinner;
        this.name = name;
        this.stars = stars;
        this.level = level;
        this.season = season;
        this.keywords = keywords;
        this.factions = factions;
        this.difficulty = difficulty;
        this.available = available;
    }

    getName(){
        return `${this.name} - ${this.sinner.name}`
    }

    toString(){
        return `${this.sinner.toString()}, ${this.getName()}, ${this.stars} stars, Level ${this.level}, Season ${this.season}, Keyword/s: ${this.keywords}, Faction/s ${this.factions}`;
    }
}
