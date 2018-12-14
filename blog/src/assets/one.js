function one(){
    const canva = document.getElementsByClassName("one")[0];
    canva.width = canva.parentNode.clientWidth;
    canva.height = canva.parentNode.clientHeight;

    const ctx = canva.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#515a6e';

    setTimeout(()=>{
        ctx.moveTo(94,9);
        ctx.bezierCurveTo(104,18,114,14,123,18);
        ctx.stroke();
    },200);
    setTimeout(()=>{
        ctx.quadraticCurveTo(128,15,136,40);
        ctx.stroke();
    },400);
    setTimeout(()=>{
        ctx.quadraticCurveTo(125,60,110,50);
        ctx.stroke();
    },600);
    setTimeout(()=>{
        ctx.quadraticCurveTo(110,40,106,35);
        ctx.stroke();
    },800);
    setTimeout(()=>{
        ctx.quadraticCurveTo(102,32,94,9);
        ctx.restore();
        ctx.stroke();
    },1000);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(45,50);
        ctx.quadraticCurveTo(46,52,49,55);
        ctx.stroke();
    },1200);
    setTimeout(()=>{
        ctx.bezierCurveTo(51,57,55,80,40,100);
        ctx.stroke();
    },1400);
    setTimeout(()=>{
        ctx.bezierCurveTo(38,105,45,110,55,118);
        ctx.stroke();
    },1600);
    setTimeout(()=>{
        ctx.bezierCurveTo(59,115,60,70,70,66);
        ctx.stroke();
    },1800);
    setTimeout(()=>{
        ctx.quadraticCurveTo(70,58,45,50);
        ctx.restore();
        ctx.stroke();
    },2000);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(65,63);
        ctx.bezierCurveTo(80,39,160,29,180,34);
        ctx.stroke();
    },2200);
    setTimeout(()=>{
        ctx.bezierCurveTo(190,39,200,42,205,60);
        ctx.stroke();
    },2400);
    setTimeout(()=>{
        ctx.bezierCurveTo(180,60,120,100,110,100);
        ctx.restore();
        ctx.stroke();
    },2600);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(65,70);
        ctx.bezierCurveTo(75,60,90,70,122,53);
        ctx.restore();
        ctx.stroke();
    },2800);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(122,53);
        ctx.bezierCurveTo(150,40,150,40,175,43);
        ctx.stroke();
    },3000);
    setTimeout(()=>{
        ctx.bezierCurveTo(170,60,120,90,110,100);
        ctx.restore();
        ctx.stroke();
    },3200);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(80,105);
        ctx.bezierCurveTo(80,120,170,100,180,90);
        ctx.stroke();
    },3400);
    setTimeout(()=>{
        ctx.bezierCurveTo(185,90,200,100,195,105);
        ctx.stroke();
    },3600);
    setTimeout(()=>{
        ctx.quadraticCurveTo(180,102,115,120);
        ctx.stroke();
    },3800);
    setTimeout(()=>{
        ctx.bezierCurveTo(90,130,65,110,80,105);
        ctx.restore();
        ctx.stroke();
    },4000);

    setTimeout(()=>{
        ctx.save();
        ctx.moveTo(140,112);
        ctx.quadraticCurveTo(145,150,140,195);
        ctx.stroke();
    },4200);
    setTimeout(()=>{
        ctx.bezierCurveTo(130,180,120,200,85,170);
        ctx.stroke();
    },4400);
    setTimeout(()=>{
        ctx.bezierCurveTo(150,195,130,115,120,118);
        ctx.restore();

        ctx.stroke();
    },4600);
}
export default one;