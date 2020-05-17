/**
 * Created by Liu.Jun on 2016/12/23.
 */

/* eslint-disable*/

import GradientColor from './gradientColor';

const TYPE = {
    grayscale: 1,  // 灰度
    grayscale2: 11, // 灰度2
    invert : 2,     // 倒置
    color : 3,     //  叠加颜色
}

function _grayscale({ctx,imageData,data}) {
    // 灰度
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i +1] + data[i +2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

function _grayscale2({ctx,imageData,data}) {
    // 灰度 方法2
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i +1] + data[i +2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    for ( var x = 0; x < imageData.width; x++) {
        for ( var y = 0; y < imageData.height; y++) {
            // Index of the pixel in the array
            var idx = (x + y * imageData.width) * 4;
            var r = data[idx + 0];
            var g = data[idx + 1];
            var b = data[idx + 2];

            // calculate gray scale value
            var gray = .299 * r + .587 * g + .114 * b;

            // assign gray scale value
            data[idx + 0] = gray; // Red channel
            data[idx + 1] = gray; // Green channel
            data[idx + 2] = gray; // Blue channel
            data[idx + 3] = 255; // Alpha channel
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function _invert({ctx,imageData,data}) {
    // 反转颜色
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 225 - data[i];     // red
        data[i + 1] = 225 - data[i + 1]; // green
        data[i + 2] = 225 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

function _color({ctx,imageData,data}) {
    // 先灰度
    _grayscale({ctx, imageData, data});

    // 叠加颜色
    const color = '#376956';

    // 在当前灰度内
    const minThreshold = 0;
    const maxThreshold = 200;

    // 对应表的渐变色
    const gradientColor = new GradientColor([255,255,255],color,256);

    for (var i = 0; i < data.length; i += 4) {
        if(data[i]>=minThreshold && data[i]<= maxThreshold){
            let rgbArr = gradientColor[255-data[i]];
            data[i] =  rgbArr[0]    // red
            data[i+1] =  rgbArr[1]  // green
            data[i+2] =  rgbArr[2]  // blue
        }else{
            data[i] = data[i + 1] = data[i + 2] = 255;
        }
    }

    // 颜色直接叠加
    // for (var i = 0; i < data.length; i += 4) {
    //     data[i]     = data[i] + (color[0] - data[i]) / 255 * ((255 / 100) * data[i+4]);     // red
    //     data[i + 1] = data[i+1] + (color[1] - data[i+1]) / 255 * ((255 / 100) * data[i+4]); // green
    //     data[i + 2] = data[i+2] + (color[2] - data[i+2]) / 255 * ((255 / 100) * data[i+4]); // blue
    // }
    ctx.putImageData(imageData, 0, 0);
}

function getDrawCanvas(imgObj, type=TYPE.grayscale) {
    const canvas = document.createElement('canvas');
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgObj, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (type){
        case TYPE.grayscale:
            _grayscale({
                ctx,
                imageData,
                data
            });
            break;

        case TYPE.grayscale2:
            _grayscale2({
                ctx,
                imageData,
                data
            });
            break;

        case TYPE.invert:
            _invert({
                ctx,
                imageData,
                data
            });
            break;

        case TYPE.color:
            _color({ctx, imageData, data});
            break;

        default:
            break ;
    }
    return canvas;
}

function draw(imgSrc,type) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = ()=>{
            const canvas = getDrawCanvas(image, type);
            resolve(canvas);
        }
        image.onerror = ()=>{
            reject(new Error(`图片加载失败${imgSrc}`))
        }
        image.src = imgSrc;
    })
}

const gray = imgSrc => draw(imgSrc,TYPE.grayscale);
const gray2 = imgSrc => draw(imgSrc,TYPE.grayscale2);
const invert = imgSrc => draw(imgSrc,TYPE.invert);
const color = imgSrc => draw(imgSrc,TYPE.color);

export default {
    gray,
    gray2,
    invert,
    color
}
