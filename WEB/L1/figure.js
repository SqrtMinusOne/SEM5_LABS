class Figure {
    constructor(arr) {
        this.arr = arr;
        this.x = 0;
        this.y = 0;
        this.current = 0;
        this.color = "#FF0000"
    }
    rotate(){
        this.current = ++this.current % 4;
    }
    rotateBack(){
        this.current = --this.current % 4;
    }
    makeMatr(){
        let bin = this.arr[this.current].toString(2);
        let res = [];
        while (bin.length < 16){
            bin = '0' + bin;
        }
        for (let i = 0; i < 16; i+=4){
            res.push(bin.substring(i, i+4).split("").reverse());
        }
        return res;
    }

    static makeFigure(number) {
        switch (number) {
            case 0:
                return new Figure([0x2222, 0x0F00, 0x4444, 0x00F0]);
            case 1:
                return new Figure([0x2230, 0x1700, 0x6220, 0x0740]);
            case 2:
                return new Figure([0x2260, 0x0710, 0x3220, 0x4700]);
            case 3:
                return new Figure([0x3300, 0x3300, 0x3300, 0x3300]);
            case 4:
                return new Figure([0x0630, 0x1320, 0x6300, 0x2640]);
            case 5:
                return new Figure([0x0720, 0x2320, 0x2700, 0x2620]);
            case 6:
                return new Figure([0x0360, 0x2310, 0x3600, 0x4620]);
        }
    }
}


