var log = console.log.bind(console)

var e = function(dom) {
    return document.querySelector(dom)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var collide = function(o1, o2) {
    var x1 = o1.x
    var y1 = o1.y
    var w1 = o1.image.width
    var h1 = o1.image.height
    var x2 = o2.x
    var y2 = o2.y
    var w2 = o2.image.width
    var h2 = o2.image.height
    var maxX,maxY,minX,minY;
    maxX = x1+w1 >= x2+w2 ? x1+w1 : x2+w2;
    maxY = y1+h1 >= y2+h2 ? y1+h1 : y2+h2;
    minX = x1 <= x2 ? x1 : x2;
    minY = y1 <= y2 ? y1 : y2;

    if(maxX - minX <= w1+w2 && maxY - minY <= h1+h2){
        return true;
    }else{
        return false;
    } 
}

var xAxisCollide = function(o1, o2) {
    var x1 = o1.x
    var y1 = o1.y
    var w1 = o1.image.width
    var h1 = o1.image.height
    var x2 = o2.x
    var y2 = o2.y
    var w2 = o2.image.width
    var h2 = o2.image.height

    var maxX,maxY,minX,minY;
    maxX = x1+w1 >= x2+w2 ? x1+w1 : x2+w2;
    maxY = y1+h1 >= y2+h2 ? y1+h1 : y2+h2;
    minX = x1 <= x2 ? x1 : x2;
    minY = y1 <= y2 ? y1 : y2;

    var rectH = (minY+h1-maxY)
    var rectW = (minX+w1-maxX)
    return rectH < rectW
}
