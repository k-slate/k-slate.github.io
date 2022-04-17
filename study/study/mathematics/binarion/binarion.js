onload = function(){
        //セッションストレージにルールが保存されていない場合、初期値を設定する。
    if (sessionStorage.getItem('sq_u_bn') == null) {
        sessionStorage.setItem('sq_u_bn', "-1");
    }
    
    //リロードによってテキストボックスやラジオボタン、チェックボックスの入力が初期値に戻ってしまうため、適用されたルールに設定し直す。
    let u = document.getElementById('sq_u');
    u.value = sessionStorage.getItem('sq_u_bn');
        
    main();
}


function main() {
    //各種変数の設定
    let graph_magnification = 60;
    let mouse = false;
    
    let sq_u = document.getElementById('sq_u').value * 1;
    let binarions = [];
    let draw_range = 5;
    for (let i = 0; i < draw_range * 2 + 1; i++) {
        for (let j = 0; j < draw_range * 2 + 1; j++) {
            binarions.push([i - draw_range, j - draw_range]);
        }
    }
    let multiply_binarion = [1, 0];
    let multiply_binarion_display = document.getElementById('multiply_binarion');
    
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    
    //実際の処理コード
    const canvas_width = 600;
    const canvas_height = 600;
    
    const magnification = 2;
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = canvas_width * magnification;
    const sq_height = canvas_height * magnification;
    canvas.width = sq_width + cell_top * 2;
    canvas.height = sq_height + cell_left * 2;
    canvas.style.width = (canvas.width / magnification) + "px";
    canvas.style.height = (canvas.height / magnification) + "px";
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    function draw_axis () {
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, sq_height/2 - 1, sq_width, 2);
        ctx.fillRect(sq_width/2 - 1, 0, 2, sq_height);
        for (let x = 0; x <= sq_width/2; x += graph_magnification) {
            ctx.fillRect(x + sq_width/2 - 1, sq_height/2 - 5, 2, 10);
            ctx.fillRect(-x + sq_width/2 - 1, sq_height/2 - 5, 2, 10);
        }
        for (let y = 0; y <= sq_height/2; y += graph_magnification) {
            ctx.fillRect(sq_width/2 - 5, y + sq_height/2 - 1, 10, 2);
            ctx.fillRect(sq_width/2 - 5, -y + sq_height/2 - 1, 10, 2);
        }
    }
    
    function cooldinate(x, y, color="white") {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x*graph_magnification + (sq_width/2), -y*graph_magnification + (sq_height/2), 6, 0, Math.PI * 2, true);
        ctx.fill();
    }
    
    //ここで演算と描画を行う
    function calc_draw () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_axis();
        multiply_binarion_display.innerHTML = `${multiply_binarion[0].toFixed(8)} + ${multiply_binarion[1].toFixed(8)}u`
        for (let i = 0; i < binarions.length; i++) {
            let a = binarions[i][0];
            let b = binarions[i][1];
            let c = multiply_binarion[0];
            let d = multiply_binarion[1];
            let x =  a * c + b * d * sq_u;
            let y =  a * d + b * c;
            let color = `rgb(${Math.floor(256 / (draw_range * 2 + 1) * (a + draw_range + 1) - 1)}, ${Math.floor(256 / (draw_range * 2 + 1) * (b + draw_range + 1) - 1)}, 255)`;
            cooldinate(x, y, color);
        }
    }
    calc_draw();
    
    canvas.addEventListener("mousedown", (e) => {
        mouse = true;
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - cell_top/magnification - rect.left - border;
        let y = e.clientY - cell_left/magnification - rect.top - border;
        x = (x - canvas_width / 2) * magnification / graph_magnification;
        y = (y - canvas_width / 2) * -magnification / graph_magnification;
        multiply_binarion = [x, y];
        calc_draw();
    });

    canvas.addEventListener("mousemove", (e) => {
        if (mouse != true) {
            return;
        }
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - cell_top/magnification - rect.left - border;
        let y = e.clientY - cell_left/magnification - rect.top - border;
        x = (x - canvas_width / 2) * magnification / graph_magnification;
        y = (y - canvas_width / 2) * -magnification / graph_magnification;
        multiply_binarion = [x, y];
        calc_draw();
    });
    
    canvas.addEventListener("mouseup", (e) => {
        mouse = false;
    });
}


//リロードボタンの設定
function reload(){
    let u = document.getElementById('sq_u');
    sessionStorage.setItem('sq_u_bn', u.value);
    location.reload();
}