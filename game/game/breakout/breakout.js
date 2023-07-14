onload = function(){
    main();
}



function main(){
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    const explaination = document.getElementById("explaination");
    const info_box = document.getElementById('info');
    const pause_button = document.getElementById('pause_button');

   
    //実際の処理コード
    const magnification = 2;
    const block_size_x = 15;
    const block_size_y = 15;
    /*感覚的にだけど、
    const block_size_x = 15;
    const block_size_y = 15;
    くらいが丁度いい。
    */
    canvas.width = canvas.clientWidth * magnification;
    canvas.height = canvas.clientHeight * magnification;
    const block_top = 20 * (canvas.width / 750) * magnification;
    const block_left = 37.5 * (canvas.width / 750) * magnification;
    const block_width = 40 * (canvas.width / 750);
    const block_height = 20 * (canvas.width / 750);
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let running = 0;
    let game_status = 0;
    let process;
    let key_process;
    
    //属性付きブロックを生成する設定
    let attribute_list = [];
    for (let i = 0; i < block_size_x * block_size_y; i++) {
        attribute_list[i] = 0;
    }
    for (let i = 1; i < 4; i++) {
        let count = 0;
        while (count < 10) {
            let attribute_place = Math.floor(Math.random()*attribute_list.length);
            if (attribute_list[attribute_place] == 0) {
                attribute_list[attribute_place] = i;
                count += 1;
            }
        }
    }
    
    //blockの初期設定
    let blocks_list = [];
    let count = 0;
    for (let j = 0; j < block_size_y; j++) {
        for (let i = 0; i < block_size_x; i++) {
            blocks_list.push([i * block_width + block_left, j * block_height + block_top, attribute_list[count]]);
            count += 1;
        }
    }
    
    //時計の初期設定(属性付きblockに関わる)
    let start_time = 0;
    let interrupted_time = 0;
    
    //reflectorの初期設定
    let reflector = [canvas.width/2, canvas.height - 100 * (canvas.width / 750)];
    const reflector_size_x = 160 * (canvas.width / 750);
    let reflector_size = [reflector_size_x, 15 * (canvas.width / 750)];
    let reflector_v = 0;
    let reflector_e = 0.5;
    
    //bulletの初期設定
    let r = 10 * (canvas.width / 750);
    let bullet = [canvas.width/2, canvas.height - 100 * (canvas.width / 750) - reflector_size[1] / 2 - r];
    let prev_bullet = [];
    let v = [0, -2 * (canvas.width / 750)];
    let e = 1.01;
    //残機の数
    let remain = 5;
    
    //初期描画
    html_change();
    block_drawer();
    reflector_drawer();
    bullet_drawer();
    
    
    //核心部
    function move () {
        reflector_moving();
        if (running != 1) {
            if (running == -1) {
                 clearInterval(process);
            }
            return;
        }
        prev_bullet = [bullet[0], bullet[1]];
        bullet = [bullet[0] + v[0], bullet[1] + v[1]];
        bullet_reflection();
        block_drawer();
        reflector_drawer();
        bullet_drawer();
        //弾を落としたときの処理
        if (bullet[1] - r - 10> canvas.height) {
            running = 0;
            quit_processing();
        }
        //ブロックを崩し切ったときの処理
        if (blocks_list.length == 0) {
            clearInterval(process);
            explaination.innerHTML = "GAME CLEAR!!";
            explaination.style.display = "inline";
            if (confirm("おめでとう！　またはじめからやる？")) {
                location.reload();
            }else {
                alert("それじゃあ、またあそびたいときは自分でリロードしてね！");
            }
            running = -1;
            pause_button.innerHTML = "再読み込み";
        }
    }
    process = setInterval(move, 20);
    
    
    
    //表示の変更処理
    function html_change () {
        info.style.color = "white";
        info.innerHTML = `残機：${remain}<br>ブロックの残り：${blocks_list.length}`;
    }
    
    
    //reflectorの動作処理
    function reflector_moving() {
        if (running == -1 || running == 2) {
            return;
        }
        if ((reflector[0] + reflector_size[0] / 2 >= canvas.width && reflector_v > 0) || (reflector[0] - reflector_size[0] / 2 <= 0 && reflector_v < 0)) {
            reflector_v *= -reflector_e;
        }
        if (running == 0) {
            prev_bullet = [bullet[0], bullet[1]];
            bullet = [reflector[0] + reflector_v, bullet[1]];
            bullet_drawer();
        }
        reflector = [reflector[0] + reflector_v, reflector[1]];
        reflector_drawer();
    }
    
    
    //属性付きblockと衝突したときの補助関数
    let status_timer;
    function block_hitting (attribute) {
        if (attribute != 0) {
            clearTimeout(status_timer);
            game_status = attribute;
            start_time = new Date();
            if (attribute == 2) {
                reflector_size[0] = reflector_size_x * 2;
            } else {
                reflector_size[0] = reflector_size_x;
            }
            status_timer = setTimeout(status_reset, 15000);
        }
    }
    //元に戻す関数
    let status_reset = () => {
        if (game_status == 2) {
            reflector_size[0] = reflector_size_x;
        }
        game_status = 0;
        start_time = 0;
    };
    
    
    //bulletの反射処理
    function bullet_reflection () {
        let reflect_direction = [0, 0];
        
        //外枠との衝突判定        
        if (bullet[0] - r <= 0) {
            reflect_direction[0] = 1;
        }
        if (bullet[0] + r >= canvas.width) {
            reflect_direction[0] = -1;
        }
        if (bullet[1] - r <= 0) {
            reflect_direction[1] = 1;
        }
        
        //reflectorとの衝突判定
        if (bullet[1] < reflector[1] && bullet[1] + r + reflector_size[1] / 2 >= reflector[1]) {
            if (reflector[0] - reflector_size[0] / 2 <= bullet[0] && bullet[0] <= reflector[0] + reflector_size[0] / 2) {
                reflect_direction[1] = -1;
                v[0] += reflector_v * 0.2;
            } else if (game_status == 3) {
                clearTimeout(status_timer);
                game_status = 0;
                reflect_direction[1] = -1;
            }
        }
        
        //blockとの衝突判定
        let direction_memory;
        direction_memory = [reflect_direction[0], reflect_direction[1]];
        for (let i = 0; i < blocks_list.length; i++) {
            let x = blocks_list[i][0];
            let y = blocks_list[i][1];
            if ( y <= bullet[1] && bullet[1] <= y + block_height) {
                if (0 < bullet[0] - (x + block_width) && bullet[0] - (x + block_width) < r) {
                    reflect_direction[0] = 1;
                    block_hitting(blocks_list[i][2]);
                    blocks_list.splice(i, 1);
                    html_change();
                    break;
                } else if (0 > bullet[0] - x && bullet[0] - x > -r) {
                    reflect_direction[0] = -1;
                    block_hitting(blocks_list[i][2]);
                    blocks_list.splice(i, 1);
                    html_change();
                    break;
                }
            }
            if ( x <= bullet[0] && bullet[0] <= x + block_width) {
                if (0 < bullet[1] - (y + block_height) && bullet[1] - (y + block_height) < r) {
                    reflect_direction[1] = 1;
                    block_hitting(blocks_list[i][2]);
                    blocks_list.splice(i, 1);
                    html_change();
                    break;
                } else if (0 > bullet[1] - y && bullet[1] - y > -r) {
                    reflect_direction[1] = -1;
                    block_hitting(blocks_list[i][2]);
                    blocks_list.splice(i, 1);
                    html_change();
                    break;
                }
            }
        }
        if (game_status == 1) {
            reflect_direction = direction_memory;
        }
        
        //反射処理
        if ((reflect_direction[0] == 1) && (v[0] < 0)) {
            v[0] *= -e;
        } else if ((reflect_direction[0] == -1) && (v[0] > 0 )) {
            v[0] *= -e;
        } else if ((reflect_direction[1] == 1) && (v[1] < 0)) {
            v[1] *= -e;
        } else if ((reflect_direction[1] == -1) && (v[1] > 0) ) {
            v[1] *= -e;
        }
    }
    
    
    //blockの描画
    function block_drawer () {
        ctx.clearRect(block_left, block_top, block_size_x * block_width, block_size_y * block_height);
        for (let i = 0; i < blocks_list.length; i++) {
            if (blocks_list[i][2] == 1) {
                ctx.fillStyle = "#ffff00";
            } else if (blocks_list[i][2] == 2) {
                ctx.fillStyle = "#ff00ff";
            } else if (blocks_list[i][2] == 3) {
                ctx.fillStyle = "#8888ff"
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(blocks_list[i][0], blocks_list[i][1], block_width - 1, block_height - 1);
        }
    }
    
    //reflectorの描画
    function reflector_drawer () {
        ctx.clearRect(0, reflector[1] - reflector_size[1] / 2 - 1, canvas.width, reflector_size[1] + 2);
        if (game_status == 2) {
            ctx.fillStyle = "#ff00ff";
            ctx.fillRect(reflector[0] - reflector_size[0] / 2, reflector[1] - reflector_size[1] / 2, reflector_size[0], reflector_size[1]);
        } else if (game_status == 3) {
            ctx.fillStyle = "#888888";
            ctx.fillRect(0, reflector[1] - reflector_size[1] / 2, canvas.width, reflector_size[1]);
        }
        ctx.fillStyle = "white";
        ctx.fillRect(reflector[0] - reflector_size_x / 2, reflector[1] - reflector_size[1] / 2, reflector_size_x, reflector_size[1]);
        ctx.strokeStyle = "#888888";
        ctx.strokeRect(reflector[0] - reflector_size[0] / 2, reflector[1] - reflector_size[1] / 2, reflector_size[0], reflector_size[1]);
    }
    
    //bulletの描画
    function bullet_drawer () {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(prev_bullet[0], prev_bullet[1], r+1, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        if (game_status == 1) {
            ctx.fillStyle = "#ffff00";
        } else if (game_status == 2) {
            ctx.fillStyle = "#ff00ff";
        } else if (game_status == 3) {
            ctx.fillStyle = "#8888ff"
        } else {
            ctx.fillStyle = "#00ffff";
        }
        ctx.beginPath();
        ctx.arc(bullet[0], bullet[1], r, 0, 2*Math.PI, false);
        ctx.fill();
    }

    
    //終了処理
    function quit_processing () {
        clearInterval(process);
        pause_button.innerHTML = "再開";
        
        //ゲームオーバーの処理
        if (remain == 0) {
            info.innerHTML = `FAILED<br>ブロックの残り：${blocks_list.length}`;
            explaination.innerHTML = "GAME OVER";
            explaination.style.display = "inline";
            if (confirm("お疲れ様です。またはじめからやる？")) {
                location.reload();
            }else {
                alert("それじゃあ、またあそびたいときは自分でリロードしてね！")
            }
            running = -1;
            pause_button.innerHTML = "再読み込み";
            return;
        }
        
        //残機を減らしてゲームを継続するときの処理
        running = 0;
        remain -= 1;
        explaination.innerHTML = "上矢印キーで弾を発射";
        explaination.style.display = "inline";
        //reflectorの再設定
        reflector = [canvas.width/2, canvas.height - 100 * (canvas.width / 750)];
        //bulletの再設定
        prev_bullet = [bullet[0], bullet[1]];
        bullet = [canvas.width/2, canvas.height - 100 * (canvas.width / 750) - reflector_size[1] / 2 - r];
        v = [0, -2 * (canvas.width / 750)];
        //再描画
        html_change();
        block_drawer();
        reflector_drawer();
        bullet_drawer();
    }
    
    
    //キーボード入力の処理
    let key = '';
    document.addEventListener('keydown', e => {
        e.preventDefault();
        key = e.key;
    });
    document.addEventListener('keyup', e => {
        key = '';
    });
    const update = () => {
        if (running == -1 || running == 2) {
            return;
        }
        if (key == "ArrowUp"){
            if (running == 0) {
                v[0] = reflector_v * 0.5;
                running = 1;
                process = setInterval(move, 20);
                pause_button.innerHTML = "一時停止";
                explaination.style.display = "none";
                explaination.innerHTML = "一時停止中";
            }
        }
        if (key == "ArrowRight"){
            if (reflector[0] + reflector_size[0] / 2 >= canvas.width) {
                return;
            }
            reflector_v += 0.5 * (canvas.width / 750);
        }
        if (key == "ArrowLeft"){
            if (reflector[0] - reflector_size[0] / 2 <= 0) {
                return;
            }
            reflector_v -= 0.5 * (canvas.width / 750);
        }
    };
    key_process = setInterval(update, 20);
    
    
    //ボタンの設定
    pause_button.addEventListener('click', (e) => {
        if (running == 1) {
            running = 2;
            clearInterval(process);
            clearTimeout(status_timer);
            interrupted_time = new Date();
            pause_button.innerHTML = "再開";
            explaination.style.display = "inline";
        } else if (running == 2) {
            running = 1;
            process = setInterval(move, 20);
            status_timer = setTimeout(status_reset, 15000 - (interrupted_time - start_time));
            interrupted_time = 0;
            pause_button.innerHTML = "一時停止";
            explaination.style.display = "none";
        } else if (running == -1) {
            location.reload();
            return;
        }
    });
}