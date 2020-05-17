/**
 * Created by Liu.Jun on 2016/12/24.
 * startColor：开始颜色hex
 * endColor：结束颜色hex
 * step:几个阶级（几步）
 */

/* eslint-disable*/

function GradientColor(startColor, endColor, step) {
    const startRGB = this.colorRgb(startColor); //转换为rgb数组模式
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];

    const endRGB = this.colorRgb(endColor);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];

    const sR = (endR - startR) / step; //总差值
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;

    const colorArr = [];
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        // 无需转换 所以取消了 -- Liu.Jun
        // let hex = this.colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
        let hex = [parseInt((sR * i + startR)), parseInt((sG * i + startG)), parseInt((sB * i + startB))];
        colorArr.push(hex);
    }
    return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
GradientColor.prototype.colorRgb = function(sColor){
    if (sColor instanceof Array) return sColor;

    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};

// 将rgb表示方式转换为hex表示方式
GradientColor.prototype.colorHex = function(rgb){
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(/^(rgb|RGB)/.test(_this)){
        const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
        let strHex = "#";
        for(let i=0; i<aColor.length; i++){
            let hex = Number(aColor[i]).toString(16);
            hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = _this;
        }
        return strHex;
    }else if(reg.test(_this)){
        const aNum = _this.replace(/#/,"").split("");
        if(aNum.length === 6){
            return _this;
        }else if(aNum.length === 3){
            let numHex = "#";
            for(let i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return _this;
    }
}

export default GradientColor;
