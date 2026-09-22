class Sinner{
    constructor(id, name, icon){
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    toString(){
        return `Sinner #${this.id} (${this.name})`;
    }
}

export class Sinners{
    static YiSang = new Sinner(1, "Yi Sang", "./assets/imgs/yisang_icon.png");
    static Faust = new Sinner(2, "Faust", "./assets/imgs/faust_icon.png");
    static DonQuixote = new Sinner(3, "Don Quixote", "./assets/imgs/don_icon.png");
    static Ryoshu = new Sinner(4, "Ryōshū", "./assets/imgs/ryo_icon.png");
    static Meursault = new Sinner(5, "Meursault", "./assets/imgs/meurs_icon.png");
    static HongLu = new Sinner(6, "Hong Lu", "./assets/imgs/hong_icon.png");
    static Heathcliff = new Sinner(7, "Heathcliff", "./assets/imgs/heath_icon.png");
    static Ishamel = new Sinner(8, "Ishmael", "./assets/imgs/ishm_icon.png");
    static Rodion = new Sinner(9, "Rodion", "./assets/imgs/rod_icon.png");
    // dante is unplayable but they are sinner number 10
    static Dante = new Sinner(10, "Dante", "")
    static Sinclair = new Sinner(11, "Sinclair", "./assets/imgs/sinc_icon.png");
    static Outis = new Sinner(12, "Outis", "./assets/imgs/outis_icon.png");
    static Gregor = new Sinner(13, "Gregor", "./assets/imgs/greg_icon.png");
    // dante has no ids but is included so the array is easier to  search
    static All = [this.YiSang, this.Faust, this.DonQuixote, this.Ryoshu, this.Meursault, 
        this.HongLu, this.Heathcliff, this.Ishamel, this.Rodion, this.Dante, this.Sinclair, this.Outis, this.Gregor];

    static toString(){
        let out = "";
        this.All.forEach(sinner => {
            out += sinner.toString() + "\n";
        });
        return out;
    }
}