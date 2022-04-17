onload = function(){
        //セッションストレージにルールが保存されていない場合、初期値を設定する。
    if (sessionStorage.getItem('focus_distance_hp') == null) {
        sessionStorage.setItem('focus_distance_hp', "20");
        sessionStorage.setItem('lambda_hp', "0.5");
        sessionStorage.setItem('m_max_hp', "20");
        sessionStorage.setItem('graph_magnification_hp', "10");
        sessionStorage.setItem('canvas_x_hp', "1000");
        sessionStorage.setItem('canvas_y_hp', "1000");
    }
    
    //リロードによってテキストボックスやラジオボタン、チェックボックスの入力が初期値に戻ってしまうため、適用されたルールに設定し直す。
    let focus_distance = document.getElementById('focus_distance');
    let lambda = document.getElementById('lambda');
    let m_max = document.getElementById("m_max");
    let graph_magnification = document.getElementById("graph_magnification");
    let canvas_x = document.getElementById("canvas_x");
    let canvas_y = document.getElementById("canvas_y");
    focus_distance.value = sessionStorage.getItem('focus_distance_hp');
    lambda.value = sessionStorage.getItem('lambda_hp');
    m_max.value = sessionStorage.getItem('m_max_hp');
    graph_magnification.value = sessionStorage.getItem('graph_magnification_hp');
    canvas_x.value = sessionStorage.getItem('canvas_x_hp');
    canvas_y.value = sessionStorage.getItem('canvas_y_hp');
    
    main();
}


function hyperbola(x, difference, focus_x) {
    let a = difference / 2;
    calced_y = ((focus_x/a)**2 - 1) * (x**2) + a**2 - focus_x**2;
    if(calced_y < 0) {
        return;
    }
    let y = Math.sqrt(calced_y);
    return y;
}


function linear_approximation(x, focus_distance, difference) {
    let y = focus_distance*x/difference;
    return y;
}


function main() {
    //各種変数の設定
    let focus_distance = document.getElementById('focus_distance').value * 1;
    let lambda = document.getElementById('lambda').value * 1;
    let m_max = document.getElementById("m_max").value * 1;
    let graph_magnification = document.getElementById("graph_magnification").value * 1;
    let canvas_x = document.getElementById("canvas_x").value * 1;
    let canvas_y = document.getElementById("canvas_y").value * 1;
    
    let difference = lambda;
    let focus_x = focus_distance/2;
    let focus_0 = [focus_x, 0];
    let focus_1 = [-1 * focus_x, 0];
    
    
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    
    //実際の処理コード
    const magnification = 2;
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = canvas_x * magnification;
    const sq_height = canvas_y * magnification;
    canvas.width = sq_width + cell_top * 2;
    canvas.height = sq_height + cell_left * 2;
    canvas.style.width = (canvas.width / magnification) + "px";
    canvas.style.height = (canvas.height / magnification) + "px";
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, sq_height/2 - 1, sq_width, 2);
    ctx.fillRect(sq_width/2 - 1, 0, 2, sq_height);
    for (let x = 0; x <= sq_width/2; x += 10*graph_magnification) {
        ctx.fillRect(x + sq_width/2 - 1, sq_height/2 - 5, 2, 10);
        ctx.fillRect(-x + sq_width/2 - 1, sq_height/2 - 5, 2, 10);
    }
    for (let y = 0; y <= sq_height/2; y += 10*graph_magnification) {
        ctx.fillRect(sq_width/2 - 5, y + sq_height/2 - 1, 10, 2);
        ctx.fillRect(sq_width/2 - 5, -y + sq_height/2 - 1, 10, 2);
    }
    ctx.beginPath();
    ctx.arc(focus_0[0]*graph_magnification + (sq_width/2), focus_0[1]*graph_magnification + (sq_height/2), 5, 0, Math.PI * 2, true);
    ctx.arc(focus_1[0]*graph_magnification + (sq_width/2), focus_1[1]*graph_magnification + (sq_height/2), 5, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();
    
    function cooldinate(x, y, color="white") {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x*graph_magnification + (sq_width/2) - 1, y*graph_magnification + (sq_height/2) - 1, 2, 2);
    }
    
    let y_calc = true;
    let approximated_y_calc = true;
    function hyperbola_draw() {
        for (let x = 0; x <= sq_width/(2*graph_magnification); x += (1/(graph_magnification*5))) {
            if ((y_calc == false) && (approximated_y_calc == false)) {
                return;
            }
            let y;
            let approximated_y;
            let draw = new Promise(function(resolve, reject) {
                if (y_calc) {
                    y = hyperbola(x, difference, focus_x);
                    if (y > sq_height/(2*graph_magnification)) {
                        y_calc = false;
                    }
                }
                if (approximated_y_calc) {
                    approximated_y = linear_approximation(x, focus_distance, difference);
                    if (approximated_y > sq_height/(2*graph_magnification)) {
                        approximated_y_calc = false;
                    }
                }
                resolve();
            });
            draw.then(function() {
                cooldinate(x, approximated_y, "white");
                cooldinate(x, -approximated_y, "white");
                cooldinate(-x, approximated_y, "white");
                cooldinate(-x, -approximated_y, "white");
                if(y === undefined) {
                    return;
                }
                cooldinate(x, y, "yellow");
                cooldinate(x, -y, "yellow");
                cooldinate(-x, y, "yellow");
                cooldinate(-x, -y, "yellow");
            });
        }
    }
    
    
    //ここで描画
    ctx.fillStyle = "white";
    ctx.fillRect(sq_width/2 - 1, 0, 2, sq_height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(sq_width/2 - 1, 0, 2, sq_height);
    for (let i = 0; i < m_max; i++) {
        if (difference >= focus_distance) {
            return;    
        }
        hyperbola_draw();
        difference += lambda;
        y_calc = true;
        approximated_y_calc = true;
    }
}


//リロードボタンの設定
function reload(){
    let focus_distance = document.getElementById('focus_distance');
    let lambda = document.getElementById('lambda');
    let m_max = document.getElementById("m_max");
    let graph_magnification = document.getElementById("graph_magnification");
    let canvas_x = document.getElementById("canvas_x");
    let canvas_y = document.getElementById("canvas_y");
    sessionStorage.setItem('focus_distance_hp', focus_distance.value);
    sessionStorage.setItem('lambda_hp', lambda.value);
    sessionStorage.setItem('m_max_hp', m_max.value);
    sessionStorage.setItem('graph_magnification_hp', graph_magnification.value);
    sessionStorage.setItem('canvas_x_hp', canvas_x.value);
    sessionStorage.setItem('canvas_y_hp', canvas_y.value);
    location.reload();
}