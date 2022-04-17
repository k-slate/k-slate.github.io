onload = function(){
    main();
}



class Cell extends Cell_prototype{
    //端の処理を簡略化するため、this.cell_dataのまわり1列を1で埋めた新たな配列を生成する。
    cell_data_adj(){
        let fill_arr = this.cell_data[0].slice();
        fill_arr.fill(1);
        let adj_cell_data = this.cell_data.slice();
        adj_cell_data.unshift(fill_arr);
        adj_cell_data.push(fill_arr);
        for (let i=0; i<adj_cell_data.length; i++){
            let arr = adj_cell_data[i].slice();
            arr.unshift(1);
            arr.push(1);
            adj_cell_data[i] = arr;
        }
        return adj_cell_data;
    }
    
    //adj_cell_dataの参照(特定のcellは除く)
    get_adj_cell_data(data, exept){
        let adj_cell_data = this.cell_data_adj();
        let return_data = [];
        for (let i=0; i<data.length; i++) {
            return_data.push(adj_cell_data[data[i][0] + 1][data[i][1] + 1]);
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



//ここからは、ぷよぷよの生成と操作に関係してくる関数
function create_puyo(){
    //ぷよのx座標、y座標、色の三つの情報が入った配列を返す
    return [[2, 0, Math.floor(Math.random() * 4) + 2], [3, 0, Math.floor(Math.random() * 4) + 2]];
}

    
function rotation(puyo){
    if (puyo[0][0] == puyo[1][0]) {
        if (puyo[0][1] < puyo[1][1]) {
            return [[puyo[0][0] + 1, puyo[0][1] + 1, puyo[0][2]], puyo[1]];
        }else {
            return [puyo[0], [puyo[1][0] + 1, puyo[1][1] + 1, puyo[1][2]]];
        }
    }else {
        if (puyo[0][0] < puyo[1][0]) {
            return [puyo[0], [puyo[1][0] - 1, puyo[1][1] + 1, puyo[1][2]]];
        }else {
            return [[puyo[0][0] - 1, puyo[0][1] + 1, puyo[0][2]], puyo[1]];
        }
    }
}


function move(puyo, direction){
    let moved_puyo = [];
    //sliceはshallow copyなので、内部まで抉り出す必要がある
    for (let i = 0; i < puyo.length; i++) {
        moved_puyo[i] = puyo[i].slice();
    }
    for (let i = 0; i < puyo.length; i++){
        if (direction == "right") {
            moved_puyo[i][0] += 1;
        }else if (direction == "left") {
            moved_puyo[i][0] -= 1;
        }else if (direction == "down") {
            moved_puyo[i][1] += 1;
        }else {
            alert("この警告画面をお目にかけるなんて、もしかしたらあなたはとっても運がいいかもね！まあ、十中八九プログラムをいじったのだろうけどよ。");
        }
    }
    return moved_puyo;
}

function collide_check_for_rot(puyo, cells, prev_puyo){
    let slide = [0, 0];
    let checked_puyo = [];
    //sliceはshallow copyなので、内部まで抉り出す必要がある
    for (let i = 0; i < puyo.length; i++) {
        checked_puyo[i] = puyo[i].slice();
    }
    if ((cells[0] != 0) && (cells[1] == 0)) {
        slide[0] = puyo[1][0] - puyo[0][0];
        slide[1] = puyo[1][1] - puyo[0][1];
    }else if ((cells[0] == 0) && (cells[1] != 0)) {
        slide[0] = puyo[0][0] - puyo[1][0];
        slide[1] = puyo[0][1] - puyo[1][1];
    }else if ((cells[0] != 0) && (cells[1] != 0)) {
        //sliceはshallow copyなので、内部まで抉り出す必要がある
        for (let i = 0; i < puyo.length; i++) {
            checked_puyo[i] = prev_puyo[i].slice();
        }
        return checked_puyo;
    }
    for (let i = 0; i < puyo.length; i++) {
        checked_puyo[i][0] += slide[0];
        checked_puyo[i][1] += slide[1];
    }
    return checked_puyo;
}

function collide_check_for_move(puyo, cells, prev_puyo){
    let slide = [0, 0];
    let checked_puyo = [];
    //sliceはshallow copyなので、内部まで抉り出す必要がある
    for (let i = 0; i < puyo.length; i++) {
        checked_puyo[i] = puyo[i].slice();
    }
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] != 0){
            //sliceはshallow copyなので、内部まで抉り出す必要がある
            for (let i = 0; i < puyo.length; i++) {
                checked_puyo[i] = prev_puyo[i].slice();
            }
            return checked_puyo;
        }
    }
    //sliceはshallow copyなので、内部まで抉り出す必要がある
    for (let i = 0; i < puyo.length; i++) {
        checked_puyo[i] = puyo[i].slice();
    }
    return checked_puyo;
}




//メイン関数
function main(){
    //画面表示の設定
    let sub_title = document.getElementById("sub_title");
    let pause_button = document.getElementById("pause_button");
    let result = document.getElementById("result");
    result.innerHTML = `Score: 0`;
    //backgroundの設定
    const background = new Image();
    background.src = "./option/background.jpg"
    const button_title = document.getElementById("button_title");
    const others = document.getElementById("others");
    
    
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
    const cell_size_x = 6;
    const cell_size_y = 12;
    /*
    原作版では、
    cell_size_x = 6;
    cell_size_y = 12;
    である。また、描画の都合上、
    cell_size_y = cell_size_x * 2;
    であることが望ましい。
    */
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = 250 * magnification;
    const sq_height = 500 * magnification;
    const sq_size = sq_width / cell_size_x;
    canvas.width = sq_width + cell_top * 2;
    canvas.height = sq_height + cell_left * 2;
    canvas.style.width = (canvas.width / magnification) + "px";
    canvas.style.height = (canvas.height / magnification) + "px";
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    sub_canvas.width = 4 * sq_size + cell_top * 2;
    sub_canvas.height = 3 * sq_size + cell_left * 2;
    sub_canvas.style.width = (sub_canvas.width / magnification) + "px";
    sub_canvas.style.height = (sub_canvas.height / magnification) + "px";
    const pallet = ["#00000000", "#ffffffff", "#ff3333aa", "#00cc00aa",  "#4444ffaa", "#cccc00aa"];
    
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border, 2, magnification, pallet, 0, 1);
    cell.cell_setup("fill_0");
    cell.draw_all_cell();
    //sub_canvas用
    const sub_cell = new Cell(sub_ctx, 4, 3, cell_top, cell_left, sq_size, border, 2, magnification, pallet, 0, 1);
    sub_cell.cell_setup("fill_1");
    sub_cell.draw_all_cell();
    
    
    //ぷよぷよの初期設定
    let puyo = create_puyo();
    let next_puyo = create_puyo();
    let prev_puyo = [];
    //sliceはshallow copyなので、内部まで抉り出す必要がある
    for (let i = 0; i < puyo.length; i++) {
        prev_puyo[i] = puyo[i].slice();
    }
    let ground_check = [0, 0];
    let point = 0;
    let pause = 0;
    let g_process = setInterval(gravity, 1000);
    function first_draw() {
        let text = "Loading...";
        ctx.fillStyle = "white";
        ctx.font = "64px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        text = "読み込み中";
        sub_ctx.fillStyle = "white";
        sub_ctx.font = "48px serif";
        sub_ctx.textAlign = "center";
        sub_ctx.textBaseline = "middle"
        sub_ctx.clearRect(0, 0, sub_canvas.width, sub_canvas.height);
        sub_ctx.fillText(text, sub_canvas.width / 2, sub_canvas.height / 2);
    }
    first_draw();
    const promise = new Promise((resolve) => {
        clearInterval(g_process);
        let fall_process = setTimeout(fall, 1000);
        function fall() {
            draw();
            sub_draw();
            resolve();
        }
    }).then(() => {
        g_process = setInterval(gravity, 1000);
    });
    
    
    //一定時間をおいて勝手にブロックが落ちる
    function gravity(){
        //pauseがアクティブなときは処理を飛ばす
        if (pause != 0){
            return;
        }
        
        if (ground(puyo, puyo) == 0){
            puyo = move(puyo, "down");
        }else{
            ground_processing();
            sub_draw();
        }
        draw();
        
        //sliceはshallow copyなので、内部まで抉り出す必要がある
        for (let i = 0; i < puyo.length; i++) {
            prev_puyo[i] = puyo[i].slice();
        }
    }
    
    
    //色の揃った部分を消す
    function puyo_delete(start_places){
        let delete_cells = [];
        let chain = 0;
        //includes()を配列に拡張したもの
        function include_array(object, array) {
            for (let i = 0; i < array.length; i++) {
                if (object[0] == array[i][0] && object[1] == array[i][1]) {
                    return true;
                }
            }
            return false;
        }
        //幅優先探索のアルゴリズムを用いて、隣接する同じ色のセルをまとめる。
        for (let i = 0; i < start_places.length; i++) {
            //すでに探索済みの場合は飛ばす
            if (include_array(start_places[i], delete_cells)) {
                continue;
            }
            let frontier = [start_places[i]];
            let explored = [start_places[i]];
            while (frontier != 0) {
                if (cell.get_adj_cell_data([[frontier[0][0] + 1, frontier[0][1]]], [])[0] == frontier[0][2]) {
                    if (include_array([frontier[0][0] + 1, frontier[0][1]], explored) == false) {
                        frontier.push([frontier[0][0] + 1, frontier[0][1], frontier[0][2]]);
                        explored.push([frontier[0][0] + 1, frontier[0][1], frontier[0][2]]);
                    }
                }
                if (cell.get_adj_cell_data([[frontier[0][0] - 1, frontier[0][1]]], [])[0] == frontier[0][2]) {
                    if (include_array([frontier[0][0] - 1, frontier[0][1]], explored) == false) {
                        frontier.push([frontier[0][0] - 1, frontier[0][1], frontier[0][2]]);
                        explored.push([frontier[0][0] - 1, frontier[0][1], frontier[0][2]]);
                    }
                }
                if (cell.get_adj_cell_data([[frontier[0][0], frontier[0][1] + 1]], [])[0] == frontier[0][2]) {
                    if (include_array([frontier[0][0], frontier[0][1] + 1], explored) == false) {
                        frontier.push([frontier[0][0], frontier[0][1] + 1, frontier[0][2]]);
                        explored.push([frontier[0][0], frontier[0][1] + 1, frontier[0][2]]);
                    }
                }
                if (cell.get_adj_cell_data([[frontier[0][0], frontier[0][1] - 1]], [])[0] == frontier[0][2]) {
                    if (include_array([frontier[0][0], frontier[0][1] - 1], explored) == false) {
                        frontier.push([frontier[0][0], frontier[0][1] - 1, frontier[0][2]]);
                        explored.push([frontier[0][0], frontier[0][1] - 1, frontier[0][2]]);
                    }
                }
                frontier.shift();
            }
            if (explored.length >= 4) {
                for (let i = 0; i < explored.length; i++){
                    delete_cells.push(explored[i]);
                }
                chain++;
            }
        }
        let delete_x = [];
        for (let i = 0; i < delete_cells.length; i++) {
            cell.set_cell_data(delete_cells[i][0], delete_cells[i][1], 0);
            if (!delete_x.includes(delete_cells[i][0])) {
                delete_x.push(delete_cells[i][0])
            }
        }
        return [delete_x, chain];
    }
    
    
    //浮いたぷよを落下させる
    function puyo_fall(delete_x) {
        let fall_puyo = [];
        //下側にあるぷよから順に落下させる
        for (let i = 0; i < delete_x.length; i++){
            for (let j = cell_size_y - 1; j >= 0; j--) {
                if (cell.get_cell_data(delete_x[i], j) != 0){
                    let k = j;
                    while(ground([[delete_x[i], k]], []) == 0) {
                        if (k >= cell_size_y) {
                            console.error("なんか「無限に深い井戸型」になってない？");
                            break;
                        }
                        cell.set_cell_data(delete_x[i], k + 1, cell.get_cell_data(delete_x[i], k));
                        cell.set_cell_data(delete_x[i], k, 0);
                        k++;
                    }
                    fall_puyo.push([delete_x[i], k, cell.get_cell_data(delete_x[i], k)]);
                }
            }
        }
        return fall_puyo;
    }
    
    
    //ぷよぷよを描画する
    function draw(){
        for (let s = 0; s < prev_puyo.length; s++) {
            cell.set_cell_data(prev_puyo[s][0], prev_puyo[s][1], 0);
        }
        for (let s = 0; s < puyo.length; s++) {
            cell.set_cell_data(puyo[s][0], puyo[s][1], puyo[s][2]);
        }
        //縁が焼き残ることを防ぐために、だるいけど描画し直す
        ctx.clearRect(0, 0, sq_width, sq_height);
        ctx.drawImage(background, cell_top, cell_left, sq_width, sq_height);
        cell.draw_all_cell();
    }
    //sub_cell用
    function sub_draw(stop = 0){
        if (stop != 0) {
            sub_title.innerHTML = "温泉たまご12個パック";
            sub_ctx.clearRect(0, 0, sub_canvas.width, sub_canvas.height);
            for (let i = 0; i < sub_cell.cell_size_x; i++) {
                for (let j = 0; j < sub_cell.cell_size_y; j++){
                    sub_cell.set_cell_data(i, j, 1);
                }
            }
            return;
        }
        sub_title.innerHTML = "次に落ちてくるぷよ";
        for (let i = 0; i < sub_cell.cell_size_x; i++) {
            for (let j = 0; j < sub_cell.cell_size_y; j++) {
                sub_cell.set_cell_data(i, j, 0);
            }
        }
        for (let i = 0; i < next_puyo.length; i++) {
            sub_cell.set_cell_data(next_puyo[i][0] - 1, next_puyo[i][1] + 1, next_puyo[i][2]);
        }
        //縁が焼き残ることを防ぐために、だるいけど描画し直す
        sub_ctx.clearRect(0, 0, sub_canvas.width, sub_canvas.height);
        sub_cell.draw_all_cell();
    }
    
    
    //一時停止の設定
    pause_button.addEventListener("click", () => {        
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
        if (pause == 1) {
            ctx.drawImage(background, cell_top, cell_left, sq_width, sq_height);
        }
        sub_draw(pause);
    });
    
    
    //キーボード操作
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        let cand_puyo = [];
        
        //pauseがアクティブなときは処理を飛ばす
        if (pause != 0) {
            return;
        }
        
        if (key == "ArrowUp") {
            event.preventDefault();
            if (ground(puyo, puyo) == 0){
                cand_puyo = rotation(puyo);
                event_processing(cand_puyo, "rotation");
            }
        }
        if (key == "ArrowRight") {
            event.preventDefault();
            cand_puyo = move(puyo, "right");
            event_processing(cand_puyo, "right");
        }
        if (key == "ArrowLeft") {
            event.preventDefault();
            cand_puyo = move(puyo, "left");
            event_processing(cand_puyo, "left");
        }
        if (key == "ArrowDown") {
            event.preventDefault();
            cand_puyo = move(puyo, "down");
            event_processing(cand_puyo, "down");
        }
        if (key == "Shift") {
            alert("Error: puyopuyo.js及び関連ファイルの一部または全部が破損しているため、実行を中断しました。(6)");
            alert("ファイルの整合性及びファイルの階層構造を確認してください。");
            alert("なんてね");
        }
    });
    
    
    //キーイベントの処理
    function event_processing(cand_puyo, key_type){
        if (key_type == "rotation") {
            let try_time = 0;
            while (collide(cand_puyo, puyo)) {
                let cells = cell.get_adj_cell_data(cand_puyo, puyo);
                cand_puyo = collide_check_for_rot(cand_puyo, cells, puyo);
                if (try_time > 10){
                    console.error("ごめんだけど、プログラムの関係上その回転はバグを誘発してしまうんだよね。そうするといろいろと困るから回転させなかったよ。");
                    for (let i = 0; i < puyo.length; i++) {
                        cand_puyo[i] = puyo[i].slice();
                    }
                }
                try_time++;
            }
        }else {
            let cells = cell.get_adj_cell_data(cand_puyo, puyo);
            cand_puyo = collide_check_for_move(cand_puyo, cells, puyo);
            if (key_type == "down"){
                point += 1;
            }
        }
        
        if (ground(puyo, puyo)) {
            ground_processing();
        }else {
            for (let s = 0; s < prev_puyo.length; s++) {
                cell.set_cell_data(prev_puyo[s][0], prev_puyo[s][1], 0);
            }
            for (let i = 0; i < puyo.length; i++) {
                prev_puyo[i] = puyo[i].slice();
            }
            for (let i = 0; i < cand_puyo.length; i++) {
                puyo[i] = cand_puyo[i].slice();
            }
        }
        point_set(point);
        
        draw();
        sub_draw();
        //sliceはshallow copyなので、内部まで抉り出す必要がある
        for (let i = 0; i < puyo.length; i++) {
            prev_puyo[i] = puyo[i].slice();
        }
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
        let try_time = 0;
        let chain = 0;
        pause = 1;
        while ((ground([puyo[0]], []) == 0) || (ground([puyo[1]], []) == 0)) {
            if (try_time > cell_size_y) {
                console.error("なんか「無限に深い井戸型」になってない？");
                break;
            }
            if (ground([puyo[0]], []) == 0) {
                cell.set_cell_data(puyo[0][0], puyo[0][1], 0);
                puyo[0] = move([puyo[0]], "down")[0];
                cell.set_cell_data(puyo[0][0], puyo[0][1], puyo[0][2]);
            }else {
                cell.set_cell_data(puyo[1][0], puyo[1][1], 0);
                puyo[1] = move([puyo[1]], "down")[0];
                cell.set_cell_data(puyo[0][0], puyo[0][1], puyo[0][2]);
            }
            try_time++;
            draw();
        }
        
        //ぷよを消滅させる
        const promise = new Promise((resolve) => {
            clearInterval(g_process);
            let fall_puyo = [];
            let delete_x = [];
            //sliceはshallow copyなので、内部まで抉り出す必要がある
            for (let i = 0; i < puyo.length; i++) {
                fall_puyo[i] = puyo[i].slice();
            }
            let fall_process = setInterval(fall, 1000);
            function fall() {
                let delete_data = puyo_delete(fall_puyo);
                delete_x = delete_data[0];
                chain += delete_data[1];
                fall_puyo = puyo_fall(delete_x);
                if (delete_x.length == 0) {
                    clearInterval(fall_process);
                    resolve();
                }
                ctx.clearRect(0, 0, sq_width, sq_height);
                ctx.drawImage(background, cell_top, cell_left, sq_width, sq_height);
                cell.draw_all_cell();
            }
        }).then(() => {
            //sliceはshallow copyなので、内部まで抉り出す必要がある
            for (let i = 0; i < next_puyo.length; i++) {
                puyo[i] = next_puyo[i].slice();
            }
            next_puyo = create_puyo();
            for (let i = 0; i < puyo.length; i++) {
                prev_puyo[i] = puyo[i].slice();
            }
            point += 3**chain;
            point_set(point);
        }).then(() => {
            if (collide(puyo, [])){
                pause = -1;
                draw();
                sub_draw(1);
                if (confirm("お疲れ様です。またはじめからやる？")) {
                    location.reload();
                }else {
                    alert("それじゃあ、またあそびたいときは自分でリロードしてね！");
                    pause_button.innerHTML = "再読み込み";
                }
            }else {
                pause = 0;
                draw();
                sub_draw();
                g_process = setInterval(gravity, 1000);
            }
        }).catch((e) => {
            console.error(e);
        });
    }
    
    
    //ポイントを表示する
    let point_set = (p) => {
        result.innerHTML = `Score: ${p}`;
    }
}
