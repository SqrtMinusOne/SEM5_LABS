class Canvas {

    constructor() {
        this.cnv = document.getElementById("tetrisfield");
        this.ctx = this.cnv.getContext('2d');
        this.columns = 10; this.rows = 20;
        let dpi = window.devicePixelRatio;
        let style_height = +getComputedStyle(this.cnv).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(this.cnv).getPropertyValue("width").slice(0, -2);
        this.cnv.setAttribute('height', style_height * dpi);
        this.cnv.setAttribute('width', style_width * dpi);
        this.width = this.cnv.width;
        this.height = this.cnv.height;
        this.blockWidth = Math.floor(this.width/this.columns);
        this.blockHeight = Math.floor(this.height/this.rows);
    }

    drawDummy() {
        this.ctx.fillRect(25,25,100,100);
        this.ctx.clearRect(45,45,60,60);
    }

    drawRect(column, row, color){
        let x1 = column*this.blockWidth;
        let y1 = row*this.blockHeight;
        let border = 3;
        this.ctx.fillStyle="#000000";
        this.ctx.fillRect(x1, y1, this.blockWidth, this.blockHeight);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x1 + border, y1 + border, this.blockWidth - border*2, this.blockHeight - border*2);
    }

}