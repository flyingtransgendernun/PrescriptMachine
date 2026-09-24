import {Sinners} from './sinners.js'; 
import * as random from '../../lib/random.js';
import {Team} from './team.js';

export class IdList extends Array{
    // take json as input and parse all the IDs from that

    // return a list of all ids that match the predicatez
    filter(predicate){
        //console.log(predicate);
        let out = new IdList();
        this.forEach(id => {
            if(predicate(id)){
                out.push(id);
            } 
        });
        //console.log(`${out.length} IDs found that match the filter`);
        return out;
    }

    getIdsForSinner(sinnerToSearchFor){
        return this.filter(id => id.sinner === sinnerToSearchFor);
    }

    print(){
        console.log("Trying to print master list");
        const testOutput = document.getElementById("master-list-test-output");
        testOutput.innerHTML = "";
        this.forEach(id => {
            let listItem = document.createElement("li");
            listItem.setAttribute('class', 'test-output-item');
            testOutput.appendChild(listItem);
            listItem.innerHTML += `<li>${id.toString()}</li>`;
        });
    }

    getRandom(){
        if(this.length < 1) return null;
        const idx = random.randomInt(this.length);
        return this[idx];
    }

    getRandomTeamWithoutFilter(){
        const newTeam = new Team();
        for(let i = 0; i < Sinners.All.length; i++){
            const sinner = Sinners.All[i];
            const sinnersIds = this.getIdsForSinner(sinner);
            if(sinnersIds.length < 1){
                console.log(`Couldn't find an ID for ${sinner.name}`);
                continue;
            }

            newTeam.push(sinnersIds.getRandom());
        }
        return newTeam;
    }

    getRandomTeam(filters){
        const newTeam = new Team();
        const filter = ((id) => id.keywordsIncludesAnyOf(filters));
        const filteredIdList = (filters.length > 0) ? this.filter(filter) : this;

        for(let i = 0; i < Sinners.All.length; i++){
            const sinner = Sinners.All[i];
            const sinnersIds = filteredIdList.getIdsForSinner(sinner);
            if(sinnersIds.length < 1){
                //console.log(`Couldn't find an ID for ${sinner.name}`);
                continue;
            }
            //console.log(sinnersIds);
            const newId = sinnersIds.getRandom();
            newTeam.push(newId);
            //console.log(newId);
        }
        return newTeam;
    }

    getRandomStatusTeam(){
        const statuses = new Set()
        this.forEach(id => {
            id.statuses.forEach(s => statuses.add(s));
        })
        const keywords = Array.from(set);
        const randKw = keywords[random.randomInt(keywords.length)];
        return this.getRandomTeam([randKw]);
    }

    getAllUnqiueFactions(){
        const factions = new Set()
        this.forEach(id => {
            id.factions.forEach(f => factions.add(f));
        })
        return Array.from(factions);
    }

    getRandomFactionTeam(){
        const uniqueFactionArray = this.getAllUnqiueFactions();
        // choose a random one
        const randomFaction = uniqueFactionArray[random.randomInt(uniqueFactionArray.length)];

        console.log(randomFaction);
        
        const team = this.getRandomTeam([randomFaction]);
        
        const filledTeam = this.fillOutTeam(team);

        return filledTeam;
    }

    fillOutTeam(team){
        if(team.length > 12){
            // i implemented it wrong
            throw new Error("Team is too big");
        }
        else if(team.length == 12){
            // team is already the right size
            return team;
        }

        else if(team.length > 9){
            return this.fillTeamWithRandomIds(team);
        }
        else{
            return this.fillOutTeam(this.fillTeamWithMoreFactions(team));
        }
    }

    fillTeamWithMoreFactions(team){
        const binaryDigits = Sinners.All.length;
        const teamBinary = team.toBinary();
        const uniqueFactionArray = this.getAllUnqiueFactions();
        const gapFillers = uniqueFactionArray.map(f => {
            let faction = this.getRandomTeam([f]);
            let fills = faction.toBinary() ^ teamBinary;
            let total = 0;
            let i = 0;
            while(i++ <= binaryDigits){
                const mask = 1 << i;
                if((mask & fills) == (mask)){
                    total++;
                }
            }
            return [total, f];
        }).sort((a, b) => a[0] < b[0]).slice(
            Math.floor(uniqueFactionArray.length * 0.05),
            Math.floor(uniqueFactionArray.length * 0.3) 
        );

        const newTeamKw = gapFillers[random.randomInt(gapFillers.length)][1];
        console.log(newTeamKw);
        const teamToAppend = this.getRandomTeam([newTeamKw]);
        console.log(team.combineTeams(teamToAppend));
        return team.combineTeams(teamToAppend);
    }

    fillTeamWithRandomIds(team){
        const includedSinners = new Set();
        team.forEach(id => {
            includedSinners.add(id.sinner);
        });
        Sinners.All.forEach(s =>{
            if(!(includedSinners.has(s) || s === Sinners.Dante)){
                const ids = this.getIdsForSinner(s);   
                team.push(ids.getRandom());
            }
        });
        return team.sort();
    }
}

export let idMasterList = new IdList();