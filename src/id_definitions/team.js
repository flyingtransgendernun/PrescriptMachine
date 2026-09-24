import * as Random from "../../lib/random.js";
import * as TextPrinter from "../animations/text_print.js";
import {Sinners} from "./sinners.js";

export class Team extends Array{

    displayTeamPrescript(domElementId){
        const element = document.getElementById(domElementId);
        element.innerHTML = "";
        let i = 0;
        while(i < this.length){
            console.log(`${i} out of ${this.length}`)
            let idToPrint = this[i];
            let domIdString = `id-${i}`;
            let output = document.createElement("div");
            output.setAttribute("class", "row align-items-start");
            element.appendChild(output);
            let icon = document.createElement("div");
            icon.setAttribute("class", "id-icon prescript-machine id-output-row col-3 col-xl-1");
            icon.style.backgroundImage = `url(${idToPrint.sinner.icon})`;
            output.appendChild(icon);
            let p = document.createElement("p");
            p.setAttribute("title", idToPrint.getName());   
            p.setAttribute("id", domIdString);
            p.setAttribute("class", "prescript-machine id-output-row col-9 col-xl-11")
            output.appendChild(p);
            let printer = new TextPrinter.UnscramblePrinter(domIdString, idToPrint.getName());
            printer.print();
            i++;
        }
    }

    setRandomDeploymentOrder(domElementId){
        const order = Random.multipleUniqueInt(12, 12);
        console.log(order);
        const element = document.getElementById(domElementId);
        element.innerHTML = "";
        let i = 0;
        while(i < this.length){
            let idOrder = order[i] + 1;
            let idToPrint = this[i];
            let domIdString = `id-${i}`;
            let output = document.createElement("div");
            output.setAttribute("class", "row align-items-start");
            element.appendChild(output);
            let icon = document.createElement("div");
            icon.setAttribute("class", "id-icon prescript-machine id-output-row col-3 col-md-1");
            icon.style.backgroundImage = `url(${idToPrint.sinner.icon})`;
            output.appendChild(icon);
            let p = document.createElement("p");
            p.setAttribute("title", idToPrint.getName());
            p.setAttribute("id", domIdString);
            p.setAttribute("class", `prescript-machine id-output-row col-9 col-md-11 ${(idOrder <= 7) ? "selected" : "backup"}`);
            output.appendChild(p);
            p.innerHTML = `<span style="color: white">${idOrder}.</span> ${idToPrint.getName()}`;
            i++;
        }
    }

    toBinary(){
        let out = 0;
        const foundSinners = this.map(id => id.sinner);
        Sinners.All.forEach(s => {
            if(foundSinners.includes(s)){
                out += 2 ** (s.id - 1);
            }
        } );
        return out;
    }

    combineTeams(newTeam){
        const thisSinners = this.map(id => id.sinner);
        newTeam.forEach(id =>{
            if(!thisSinners.includes(id.sinner)){
                this.push(id);
            }
        })
        const out = this.sort((a, b) => a.sinner.id - b.sinner.id);
        console.log(out);
        return out;
    }
}