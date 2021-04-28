const arrayLetras = [ 
    { "W" : [24523 , 29079]},  
    {"S" :  [29688] },
    {"G" : [30160]},
    {"K" : [29071,30198]}, 
    {"E"  : [27053]}
]

const imageA = document.getElementById("image")
const infoImg = [imageA.width, imageA.height]

const c = document.getElementById("mycanvas")
 
c.width =   infoImg[0];
c.height = infoImg[1];

var caixa = c.getContext("2d");

caixa.drawImage(imageA, 0, 0, 180, 50 )  
 
const cropImage = function(y=0 ,x=0 ,w=37 ,h=50 ,defY = 0, defX = 0, defW = 37, defH = 50, window, img){
    return window.drawImage(img, x, y , w, h, defX, defY, defW, defH)
}
const createCanvas = function(id){
    return document.getElementById("canvasHtml").insertAdjacentHTML('beforeend','<canvas id="'+  i  + '" width="34" style=" margin-left: 10px;" height="50" style="border:1px solid #000000;">' )
}
const doubleNumber = function(number , i){
    let n 
    n = number == 0 && i == 0 ? n = 0 : i < 3 ? n =  number +  34 : number +  27   
    return n
}

// return apenas os dados com a cor 0,0,0,255
const getPixelforPixel = function(caixa, line, cd){
    let a = []
    for(let i = 0; i <= 34; i++ ){
        a.push(caixa.getImageData(line,i, 1, 1).data)  
    }
    if(cd === 1){
        const arrayFilter = value => value == "0,0,0,255" 
        const dados = a.filter(arrayFilter) 
        return dados
    }else{
        return a
    } 
} 
// return todos os dados
const getDataArray = function(caixa){
    let a = []
    for(let i = 0; i <= infoImg[0]; i++ ){
        a.push(caixa.getImageData(0,i, 1, 1).data) 
    }  
    return a
}
// return literalmente o getImageData
const getData = function(d){
    return d.getImageData(0, 0, 1, 11);
}
// Calcula o ruido e retorna uma provavel imagem
const calcRuidos = function(dataRuidos){
    let d = 0
    for(let i = 0; i < 50; i++ ){
        const calc = dataRuidos[i][0][0] + dataRuidos[i][0][1]  + dataRuidos[i][0][2] + dataRuidos[i][0][3] + d
        d = calc
    }
    for(let i =  0; i <  arrayLetras.length ; i++ ){
        const objValue = Object.values(arrayLetras[i])
        if(objValue[0].indexOf(d) > -1){
            const element = document.getElementById("view")
            element.append(Object.keys(arrayLetras[i]))
            return  Object.keys(arrayLetras[i])
        }else{ 
           console.log("Você precisa aumentar a base de dados para comparação - " + d)
        }
    } 
}
// return uma pintura que sera nossa amostra para cada letra
const setDataImage = function(d , f){
    var c = document.getElementById("canvasLine" + f);
    var ctx = c.getContext("2d"); 
 
    for(let line = 0; line <= 50; line++){
        let dadosR = getPixelforPixel(d, line, 1 ) 
        
        for(let col = 0; col <= dadosR.length; col++ ){ 
            ctx.fillStyle = dadosR[col];
            var saltNumber = col == 0 ? saltNumber = 0 : saltNumber = saltNumber + 1  
            ctx.fillRect(saltNumber, line, 1, 1);
        }
    }
    let ruidos = []
    for (let index = 0; index < 50; index++) {
        ruidos.push(getPixelforPixel(d, index, 0 ))
    } 
    console.log(calcRuidos(ruidos))
} 
// run app create canvas
let numberInit = 0
for(var i = 0; i < 6; i++){   
    createCanvas(i) 
    const canva = document.getElementById(i)
    const window = canva.getContext("2d") 

    numberInit = doubleNumber(numberInit, i) 

    cropImage(0, numberInit, 34, 50, 0, 0, 34, 50, window, imageA)  
}

 


// run app pintar letra na forma de imagem 
let lop = 0 
while (lop < 6) {
    const canvasImage = document.getElementById(lop)
    const canvasRun = canvasImage.getContext("2d")

    console.table(getDataArray(canvasRun,1))
    setDataImage(canvasRun, lop)
    lop++
}
 



 


