onload = function(){
    main();
}



class Cell extends Cell_prototype{
    //端の処理を簡略化するため、this.cell_dataのまわり2列を1で埋めた新たな配列を生成する。
    cell_data_adj(){
        let fill_arr = this.cell_data[0].slice();
        fill_arr.fill(1);
        let adj_cell_data = this.cell_data.slice();
        adj_cell_data.unshift(fill_arr, fill_arr);
        adj_cell_data.push(fill_arr, fill_arr);
        for (let i=0; i<adj_cell_data.length; i++){
            let arr = adj_cell_data[i].slice();
            arr.unshift(1, 1);
            arr.push(1, 1);
            adj_cell_data[i] = arr;
        }
        return adj_cell_data;
    }
    
    //adj_cell_dataの参照(特定のcellは除く)
    get_adj_cell_data(data, exept){
        let adj_cell_data = this.cell_data_adj();
        let return_data = [];
        for (let i=0; i<data.length; i++) {
            return_data.push(adj_cell_data[data[i][0] + 2][data[i][1] + 2]);
        }
        for (let i=0; i<return_data.length; i++) {
            for (let j=0; j<exept.length; j++) {
                if ((data[i][0] == exept[j][0]) && (data[i][1] == exept[j][1])){
                    return_data[i] = 0;
                }
            }
        }
        return return_data;
    }
}



//ここからは、テトリミノの生成と操作に関係してくる関数
function create_tetrimino(type){
    const block_i_base = [[-1, 0], [0, 0], [1, 0], [2, 0]]; 
    const block_o_base = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const block_t_base = [[-1, 0], [0, 0], [1, 0], [0, 1]];
    const block_j_base = [[-1, 0], [0, 0], [1, 0], [1, 1]];
    const block_l_base = [[-1, 1], [-1, 0], [0, 0], [1, 0]];
    const block_s_base = [[-1, 0], [0, 0], [0, 1], [1, 1]];
    const block_z_base = [[1, 0], [0, 0], [0, 1], [-1, 1]];
    let block_base;
    
    if (type == 0) {
        block_base = block_i_base;
    }else if (type == 1) {
        block_base = block_o_base;
    }else if (type == 2) {
        block_base = block_t_base;
    }else if (type == 3) {
        block_base = block_j_base;
    }else if (type == 4) {
        block_base = block_l_base;
    }else if (type == 5) {
        block_base = block_s_base;
    }else if (type == 6) {
        block_base = block_z_base;
    }else {
        alert("この警告画面をお目にかけるなんて、もしかしたらあなたはとっても運がいいかもね！まあ、十中八九プログラムをいじったのだろうけどよ。");
    }
    
    type = Math.floor(Math.random() * 7);
    return [block_base, type];
}

    
function rotation(block_base, x, y){
    let new_block_base = [];
    for (let s = 0; s < block_base.length; s++) {
        let i = block_base[s][0];
        let j = block_base[s][1];
        let position = [];
        position.push(-j);
        position.push(i);
        new_block_base.push(position);
    }
    return [new_block_base, base_to_block(new_block_base, x, y)];
}


function move(block_base, x, y, direction){
    if (direction == "right") {
        x += 1;
    }else if (direction == "left") {
        x -= 1;
    }else if (direction == "down") {
        y += 1;
    }else {
        alert("この警告画面をお目にかけるなんて、もしかしたらあなたはとっても運がいいかもね！まあ、十中八九プログラムをいじったのだろうけどよ。");
    }
    return [base_to_block(block_base, x, y), x, y];
}


function base_to_block(block_base, x, y){
    let block = [];
    for (let i = 0; i < block_base.length; i++){
        block.push([block_base[i][0] + x, block_base[i][1] + y]);
    }
    return block;
}


function collide_check_for_rot(block, cells, x, y){
    let slide = [0, 0];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] != 0){
            if (block[i][0] < x){
                slide = [1, 0];
                slide_processing();
                //最上段では、一気に落とすことでブロックの消滅を防ぐ
            }
            if (block[i][0] > x) {
                slide = [-1, 0];
                slide_processing();
                return [block, x, y];
            }
            if (block[i][1] < y) {
                slide = [0, 1];
                slide_processing();
                return [block, x, y];
            }
            if (block[i][1] > y) {
                slide = [0, -1];
                slide_processing();
                return [block, x, y];
            }
        }
    }
    
    function slide_processing(){
        for (let i = 0; i < block.length; i++) {
            block[i][0] += slide[0];
            block[i][1] += slide[1];
        }
        x += slide[0];
        y += slide[1];
    }
    return [block, x, y];
}


function collide_check_for_move(block, cells, x, y, prev_block, prev_x, prev_y){
    let slide = [0, 0];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] != 0){
            return [prev_block, prev_x, prev_y];
        }
    }
    return [block, x, y];
}



//メイン関数
function main(){
    //画面表示の設定
    let sub_title = document.getElementById("sub_title");
    let pause_button = document.getElementById("pause_button");
    let score = document.getElementById("score");
    score.innerHTML = `0`;
    //てとりす（画像）の設定
    const tetorisu = new Image();
    tetorisu.src = "./option/てとりす.jpg"
    const eye = document.getElementById("eye");
    const button_title = document.getElementById("button_title");
    const control = document.getElementById("control");
    
    
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    //sub_canvasの設定
    const sub_canvas = document.getElementById('sub_canvas');
    if (! sub_canvas || ! sub_canvas.getContext){
        return false;
    }
    const sub_ctx = sub_canvas.getContext('2d');

   
    //実際の処理コード
    const magnification = 2;
    const cell_size_x = 10;
    const cell_size_y = 20;
    /*
    公式ルールでは、
    cell_size_x = 10;
    cell_size_y = 20;
    である。また、描画の都合上、
    cell_size_y = cell_size_x * 2;
    であることが望ましい。
    */
    canvas.width = canvas.clientWidth * magnification;
    canvas.height = canvas.clientHeight * magnification;
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = canvas.width  - cell_top * 2;
    const sq_height = canvas.height  - cell_left * 2;
    const sq_size = sq_width / cell_size_x;
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    sub_canvas.width = sub_canvas.clientWidth * magnification;
    sub_canvas.height = sub_canvas.clientHeight * magnification;
    
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border, 2, magnification, ["black", "white", "aqua", "yellow", "purple", "blue", "orange", "green", "red"]);
    cell.cell_setup("fill_0");
    cell.draw_all_cell();
    cell.draw_all_line();
    //sub_canvas用
    const sub_cell = new Cell(sub_ctx, 5, 5, cell_top, cell_left, sq_size, border, 2, magnification, ["black", "white", "aqua", "yellow", "purple", "blue", "orange", "green", "red"]);
    sub_cell.cell_setup("fill_1");
    sub_cell.draw_all_cell();
    sub_cell.draw_all_line();
    
    
    //テトリスの初期設定
    const s_x = (Math.floor(cell_size_x / 2)) - 1;
    const s_y = 0;
    let x = s_x;
    let y = s_y;
    let curr_block_type;
    let next_block_type = Math.floor(Math.random() * 7);
    let block_base;
    let point = 0;
    let g_force = 1;
    let pause = 0;
    let button_lock = 0;
    let reset_count = 0;
    curr_block_type = next_block_type;
    [block_base, next_block_type] = create_tetrimino(next_block_type);
    let block = [];
    block = base_to_block(block_base, x, y);
    let prev_block = block;
    draw();
    sub_draw();
    let g_process = setInterval(gravity, 1000 / g_force);
    
    
    //一定時間をおいて勝手にブロックが落ちる
    function gravity(){
        //pauseがアクティブなときは処理を飛ばす
        if (pause != 0){
            return;
        }
        
        if (ground(block, block) == 0){
            y++
            block = base_to_block(block_base, x, y);
        }else{
            ground_processing();
        }
        draw();
        sub_draw(pause);
    }
    
    
    //埋められた行を消して、その上のブロックを落とす
    function line_delete(){
        let combo = 0;
        for (let i = 0; i < cell_size_y; i++) {
            let count = 0;
            for (let j = 0; j < cell_size_x; j++) {
                let k = 0;
                if (cell.get_cell_data(j, i) != 0) {
                    k = 1;
                }
                count += k;
            }
            if (count == cell_size_x){
                for (let m = i-1; m >= 0; m--){
                    for (let n = 0; n < cell_size_x; n++){
                        cell.set_cell_data(n, m+1, cell.get_cell_data(n, m));
                        cell.set_cell_data(n, 0, 0);
                    }
                }
                combo++;
            }
        }
        if (combo == 1) {
            point += Math.round(40 * g_force);
        }else if (combo == 2) {
            point += Math.round(100 * g_force);
        }else if (combo == 3) {
            point += Math.round(300 * g_force);
        }else if (combo >= 4) {
            point += Math.round(1200 * g_force);
        }else{
            point += 0;
        }
        point_set(point);
    }
    
    
    //ブロックを描画する
    function draw(){
        for (let s = 0; s < prev_block.length; s++) {
            cell.set_cell_data(prev_block[s][0], prev_block[s][1], 0);
        }
        for (let s = 0; s < block.length; s++) {
            cell.set_cell_data(block[s][0], block[s][1], curr_block_type + 2);
        }
        prev_block = block;
    }
    //sub_cell用
    function sub_draw(stop = 0){
        if (stop != 0) {
            sub_title.innerHTML = "きれいな市松模様";
            for (let i = 0; i < sub_cell.cell_size_x; i++) {
                for (let j = 0; j < sub_cell.cell_size_y; j++){
                    if((i - j) % 2){
                        sub_cell.set_cell_data(i, j, 0);
                    }else{
                        sub_cell.set_cell_data(i, j, 1);
                    }
                }
            }
            return;
        }
        sub_title.innerHTML = "次のブロック";
        for (let i = 0; i < sub_cell.cell_size_x; i++) {
            for (let j = 0; j < sub_cell.cell_size_y; j++) {
                sub_cell.set_cell_data(i, j, 1);
            }
        }
        let next_block = create_tetrimino(next_block_type)[0];
        next_block = base_to_block(next_block, 2, 2);
        for (let i = 0; i < next_block.length; i++) {
            sub_cell.set_cell_data(next_block[i][0], next_block[i][1], next_block_type + 2);
        }
    }
    
    
    //一時停止の設定
    pause_button.addEventListener("click", () => {
        if(button_lock != 0) {
            return;
        }
        if (reset_count == 2){
            button_lock = 1;
            end_processing();
            return;
        }
        
        if (pause == -1){
            location.reload();
            return;
        }
        pause = (pause + 1) % 2;
        if (pause == 1){
            pause_button.innerHTML = "再開";
        }else if (pause == 0){
            pause_button.innerHTML = "一時停止"
        }else {
            pause_button.innerHTML = "なんでこんな文字列があらわれてるんだろうね。";
        }
        draw();
        sub_draw(pause);
        tetorisu_draw(pause);
    });
    
    
    //キーボード操作
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        let cand_block = block.slice();
        let cand_block_base = block_base.slice();
        let cand_x = x, cand_y = y;
        
        //pauseがアクティブなときは処理を飛ばす
        if (pause != 0) {
            return;
        }
        
        if (key == "ArrowUp") {
            event.preventDefault();
            //blockがoの場合、90°回転しても形が変わらないため、回転させない。
            if ((curr_block_type != 1) && (ground(block, block) == 0)){
                [cand_block_base, cand_block] = rotation(block_base, x, y);
                event_processing(cand_block, cand_block_base, cand_x, cand_y, "rotation");
            }
        }
        if (key == "ArrowRight") {
            event.preventDefault();
            [cand_block, cand_x, cand_y] = move(block_base, x, y, "right");
            event_processing(cand_block, cand_block_base, cand_x, cand_y, "right");
        }
        if (key == "ArrowLeft") {
            event.preventDefault();
            [cand_block, cand_x, cand_y] = move(block_base, x, y, "left");
            event_processing(cand_block, cand_block_base, cand_x, cand_y, "left");
        }
        if (key == "ArrowDown"){
            event.preventDefault();
            [cand_block, cand_x, cand_y] = move(block_base, x, y, "down");
            event_processing(cand_block, cand_block_base, cand_x, cand_y, "down");
        }
    });
    
    
    //キーイベントの処理
    function event_processing(cand_block, cand_block_base, cand_x, cand_y, key_type){
        if (key_type == "rotation") {
            let try_time = 0;
            while (collide(cand_block, block)) {
                let cells = cell.get_adj_cell_data(cand_block, block);
                [cand_block, cand_x, cand_y] = collide_check_for_rot(cand_block, cells, cand_x, cand_y);
                if (try_time > 10){
                    console.error("ごめんだけど、プログラムの関係上その回転はバグを誘発してしまうんだよね。そうするといろいろと困るから回転させなかったよ。");
                    cand_block = block.slice();
                    cand_block_base = block_base.slice();
                    cand_x = x;
                    cand_y = y;
                }
                try_time++;
            }
        }else {
            let cells = cell.get_adj_cell_data(cand_block, block);
            [cand_block, cand_x, cand_y] = collide_check_for_move(cand_block, cells, cand_x, cand_y, block, x, y);
            if (key_type == "down"){
                point += cand_y - y;
            }
        }
            
        if (collide(block, block)) {
            ground_processing();
        }else {
            block = cand_block;
            block_base = cand_block_base;
            x = cand_x;
            y = cand_y;
        }
        point_set(point);
        draw();
        sub_draw();
    }
    
    
    //壁や既存のブロックに食い込んでいるかどうかを判定
    let collide = (data, exept) => {
        for (let i=0; i<data.length; i++) {
            let k = cell.get_adj_cell_data([[data[i][0], data[i][1]]], exept);
            if (k != 0) {
                return 1;
            }
        }
        return 0;
    }
    
    
    //一番下まで落ちきったかどうかを判定
    let ground = (data, exept) => {
        for (let i=0; i<data.length; i++) {
            let k = cell.get_adj_cell_data([[data[i][0], data[i][1] + 1]], exept);
            if (k != 0) {
                return 1;
            }
        }
        return 0;
    }
    
    
    //落ちきったときの処理
    function ground_processing(){
        curr_block_type = next_block_type;
        [block_base, next_block_type] = create_tetrimino(next_block_type);
        x = s_x;
        y = s_y;
        block = base_to_block(block_base, x, y);
        prev_block = block;
        
        g_force += 0.02;
        clearInterval(g_process);
        g_process = setInterval(gravity, 1000 / g_force);
        
        if (collide(block, [])){
            pause = -1;
            draw();
            sub_draw(1);
            if (confirm("お疲れ様です。またはじめからやる？")) {
                location.reload();
            }else {
                alert("それじゃあ、またあそびたいときは自分でリロードしてね！");
                pause_button.innerHTML = "再読み込み";
            }
        }
        line_delete();
    }
    
    
    //ポイントを表示する
    let point_set = (p) => {
        score.innerHTML = `${p}`;
    }
    
    
    //てとりすを表示する
    let tetorisu_draw = (e) => {
        if (e == 1) {
            ctx.drawImage(tetorisu, cell_top, cell_left, sq_width, sq_height);
            eye.style.display = "inline";
        }else if (e == 0) {
            eye.style.display = "none";
            ctx.filter = "none";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < cell.cell_size_x; i++){
                for (let j = 0; j < cell.cell_size_y; j++){
                    cell.draw_cell(i, j);
                }
            }
            for (let i = 0; i < cell.cell_size_y + 1; i++){
                cell.draw_hor_line(i);
            }
            for (let j = 0; j < cell.cell_size_x + 1; j++){
                cell.draw_ver_line(j);
            }
        }else {
            console.error("これ、てとりす（画像）関連のエラーなんだけど、一体全体なんでこのエラーが出てるのよ...");
        }
    }
    
    
    //ここから異質な類のプログラム
    
    
    //eyeが押されたときの操作
    eye.addEventListener('click', (e) => {
        alert("コマンドを認証。起動します。");
        eye.style.display = "none";
        button_lock = 1;
        pause_button.style.background = "#888888";
        pause_button.innerHTML = "アクセス不可";
        pause_button.style.cursor = "not-allowed";
        
        let ex_count = 6;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 5;
        ctx.filter = "blur(16px)";
        let expand = () => {
            ctx.beginPath();
            ctx.arc(canvas.clientWidth / 250 * 400, canvas.clientWidth / 250 * 716, ex_count, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ex_count++;
            if (ex_count < 900) {
                setTimeout(expand, 2.5);
            }else {
                pause_button.style.background = "#cccccc";
                pause_button.innerHTML = "再開";
                pause_button.style.cursor = "pointer";
                button_lock = 0;
            }
        }
        expand();
        
        if (reset_count == 0) {
            for (let i = 0; i < cell.cell_size_x; i++){
                for (let j = 0; j < cell.cell_size_y; j++){
                    cell.cell_data[i][j] = 0;
                }
            }
            console.warn("システム系統に未知のエラー。修復を試みています。");
        }else {
            console.error("システムに解決不可能なエラー。修復プログラムのリソースが使い果たされました。");
            //臨時
            for (let i = 0; i < cell.cell_size_x; i++){
                for (let j = 0; j < cell.cell_size_y; j++){
                    cell.cell_data[i][j] = 1;
                }
            }
        }
        reset_count++;
    });
    
    
    //格子模様を描く関数
    let grid = (e) => {
        for (let i = 0; i < e; i++){
            for (let j = 0; j < cell.cell_size_x; j++){
                if((e + i - j) % 2 == 0){
                    cell.set_cell_data(j, i, 1);
                }else{
                    cell.set_cell_data(j, i, 0);
                }
            }
        }
        for (let i = e; i < cell.cell_size_y; i++){
            for (let j = 0; j < cell.cell_size_x; j++){
                cell.set_cell_data(j, i, 0);
            }
        }
        if (e < cell_size_y) {
            setTimeout(grid, 100, e + 1);
        }else {
            setTimeout(message, 500);
        }
    }
    
    
    //通常とは異なる終了の処理
    function end_processing(){
        clearInterval(g_process);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = "none";
        title.innerHTML = "縺ｦ縺ｨ繧翫☆";
        sub_title.innerHTML = "次のグリッド";
        button_title.innerHTML = "萓ｿ蛻ｩ縺ｪ繝懊ち繝ｳ";
        button_lock = 1;
        pause_button.style.background = "#888888";
        pause_button.innerHTML = "荳榊庄";
        pause_button.style.cursor = "not-allowed";
        score.innerHTML = "N/A";
        control.innerHTML = "&ensp;↑&ensp;: 蝗櫁ｻ｢<br>→: 蜿ｳ遘ｻ蜍<br>←: 蟾ｦ遘ｻ蜍<br>&ensp;↓&ensp;: 關ｽ荳";
        setTimeout(grid, 1000, 1);
    }
    
    
    //メッセージを表示する関数
    function message() {
        alert("さようなら。");
        window.close();
    }
}
