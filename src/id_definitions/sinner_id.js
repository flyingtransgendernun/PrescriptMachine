export class SinnerId{
    static MaxLevel = 60;

    constructor(sinner, name, stars = 1, season = 1, statuses = [], factions = [], level = this.MaxLevel, difficulty = 0, available = true){
        this.sinner = sinner;
        this.name = name;
        this.stars = stars;
        this.level = level;
        this.season = season;
        this.statuses = statuses;
        this.factions = factions;
        this.difficulty = difficulty;
        this.available = available;
    }

    keywordsIncludesAnyOf(words){
        const idKeywords = this.getFullKeywordList();
        let result = false;

        if(words.length < 1){
            result = true;
        }
        else{
            words.forEach(w => {
            idKeywords.forEach(kw =>{
                if(kw == w){
                    result = true;
                }
                })
            });
        }
        return result;
    }

    getFullKeywordList(){
        return this.statuses.concat(this.factions);
    }

    getName(){
        return `${this.name} - ${this.sinner.name}`
    }

    toString(){
        return `${this.sinner.toString()}, ${this.getName()}, ${this.stars} stars, Level ${this.level}, Season ${this.season}, Statusess: ${this.statuses}, Faction/s ${this.factions}`;
    }
}
