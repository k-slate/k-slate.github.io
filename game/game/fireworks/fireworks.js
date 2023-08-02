let loop;
let ratio;
let g = 0.015;


//花火の初期設定
function initial_setting(burst, current_frame, color, position, velocity, star) {
    let color_list = [];
    let r_list = [];
    let v_list = [];
    for (let i = 0; i < star; i++) {
        color_list[i] = color.slice();
        r_list[i] = position.slice();
        v_list[i] = velocity.slice();
    }
    return [burst, current_frame, color_list, r_list, v_list];
}


//花火の描画
function draw(x, y, color) {
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    ctx.beginPath();
    ctx.arc(x, y, 1.5 * ratio, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.fill();
}


//「花火を観る」ボタンが押された時の処理
function start_operation() {
    let header = document.getElementById("header");
    let contents = document.getElementById("contents");
    let main = document.getElementById("main");
    let canvas = document.getElementById("canvas");
    let close_button = document.getElementById("close_button");
    let footer = document.getElementById("footer");
    header.style.display = "none";
    contents.style.display = "none";
    main.style.display = "none";
    canvas.style.display = "block";
    close_button.style.display = "block";
    footer.style.display = "none";
    
    magnification = 2;
    canvas.width = canvas.clientWidth * magnification;
    canvas.height = canvas.clientHeight * magnification;
    
    ratio = canvas.height / 1600;
    g *= ratio;
    
    let probability_sum = 0;
    for (let i = 0; i < probability.length; i++) {
        probability_sum += probability[i];
    }
    let std_probability_sum = 0;
    for (let i = 0; i < probability.length; i++) {
        std_probability_sum += launch * (probability[i] / probability_sum);
        std_probability[i] = std_probability_sum;
    }
    
    loop = setInterval(fireworks, 10);
}


//「×」ボタンが押された時の処理
function close_operation() {
    clearInterval(loop);
    g = 0.015;

    let header = document.getElementById("header");
    let contents = document.getElementById("contents");
    let main = document.getElementById("main");
    let canvas = document.getElementById("canvas");
    let close_button = document.getElementById("close_button");
    let footer = document.getElementById("footer");
    header.style.display = "block";
    contents.style.display = "block";
    main.style.display = "block";
    canvas.style.display = "none";
    close_button.style.display = "none";
    footer.style.display = "block";
}