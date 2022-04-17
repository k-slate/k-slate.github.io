onload = function(){
    //セッションストレージにルールが保存されていない場合、初期値を設定する。
    if (sessionStorage.getItem('edge_ms') == null) {
        sessionStorage.setItem('edge_ms', "20");
        sessionStorage.setItem('bomb_number_ms', "40");
    }
    
    //リロードによってテキストボックスやラジオボタン、チェックボックスの入力が初期値に戻ってしまうため、適用されたルールに設定し直す。
    let edge = document.getElementById("edge");
    let bomb_number = document.getElementById("bomb_number");
    edge.value = sessionStorage.getItem('edge_ms');
    bomb_number.value = sessionStorage.getItem('bomb_number_ms');
    if (bomb_number.value >= edge.value * edge.value / 2) {
        alert("地雷埋め過ぎですよ。。。それじゃあ発掘できないじゃん。");
        bomb_number.value = Math.floor(edge.value * edge.value / 10);
        sessionStorage.setItem('bomb_number_ms', bomb_number.value);
    }
    
    main();
}



class Cell extends Cell_prototype{
    constructor(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border_width, random_rate, magnification, pallet, line = 0, circle = 0){
        super(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border_width, random_rate, magnification, pallet, line, circle);
        this.true_cell = [];
        this.bomb_map = [];
    }
    
    //true_cellの初期化用関数
    true_cell_setup(bomb_number, click_x, click_y){
        let fill_arr = this.cell_data[0].slice();
        fill_arr.fill(0);
        for (let i = 0; i < this.cell_data.length; i++) {
            this.true_cell[i] = fill_arr.slice();
        }
        
        let bomb_dropper = () => {
            let x = Math.floor(Math.random()*this.cell_size_x);
            let y = Math.floor(Math.random()*this.cell_size_y);
            if (this.true_cell[x][y] == 0) {
                this.bomb_map.push([x, y]);
                this.true_cell[x][y] = 9;
                return;
            }
            bomb_dropper();
        }
                
        for (let i = 0; i < bomb_number; i++) {
            let cur_position = bomb_dropper();
        }
        
        let nine_check = (x, y) => {
            if (this.true_cell[x][y] == 9) {
                return 1;
            }
            return 0;
        }
        
        for (let i = 0; i < this.cell_size_x; i++) {
            for (let j = 0; j < this.cell_size_y; j++) {
                let count = 0;
                if (this.true_cell[i][j] == 9) {
                    count = "mine";
                }
                else if (i == 0) {
                    if (j == 0) {
                        count = nine_check(i, j+1) + nine_check(i+1, j) + nine_check(i+1, j+1);
                    }
                    else if (j == this.cell_size_y - 1) {
                        count = nine_check(i , j-1) + nine_check(i+1, j-1) + nine_check(i+1, j);
                    }
                    else {
                        count = nine_check(i , j-1) + nine_check(i, j+1) + nine_check(i+1, j-1) + nine_check(i+1, j) + nine_check(i+1, j+1);
                    }
                }
                else if (i == this.cell_size_x - 1 ) {
                    if (j == 0) {
                        count = nine_check(i-1, j) + nine_check(i-1, j+1) + nine_check(i, j+1);
                    }
                    else if (j == this.cell_size_y - 1) {
                        count = nine_check(i-1 , j-1) + nine_check(i-1, j) + nine_check(i , j-1);
                    }
                    else {
                        count = nine_check(i-1 , j-1) + nine_check(i-1, j) + nine_check(i-1, j+1) + nine_check(i , j-1) + nine_check(i, j+1);
                    }
                }
                else {
                    if (j == 0) {
                        count = nine_check(i-1, j) + nine_check(i-1, j+1) + nine_check(i, j+1) + nine_check(i+1, j) + nine_check(i+1, j+1);
                    }
                    else if (j == this.cell_size_y - 1) {
                        count = nine_check(i-1 , j-1) + nine_check(i-1, j) + nine_check(i , j-1) + nine_check(i+1, j-1) + nine_check(i+1, j);
                    }
                    else {
                        count = nine_check(i-1 , j-1) + nine_check(i-1, j) + nine_check(i-1, j+1) + nine_check(i , j-1) + nine_check(i, j+1) + nine_check(i+1, j-1) + nine_check(i+1, j) + nine_check(i+1, j+1);
                    }
                }
                if (count != "mine") {
                    this.true_cell[i][j] = count;
                }
            }
        }
        if (this.true_cell[click_x][click_y] == 0) {
            return;
        }
        this.true_cell_setup(bomb_number, click_x, click_y);
    }
    
    //cellの描画用関数
    draw_cell(cell_x, cell_y) {
        let cover_img = new Image();
        if (this.cell_data[cell_x][cell_y] == 0) {
            cover_img.src = "./pictures/cover.png";
        }else {
            cover_img.src = "./pictures/0.png";
        }
        cover_img.onload = () => {
            this.ctx.drawImage(cover_img, cell_x*this.sq_size + this.cell_left, cell_y*this.sq_size + this.cell_top, this.sq_size, this.sq_size);
            this.draw_ver_line(cell_x);
            this.draw_ver_line(cell_x + 1);
            this.draw_hor_line(cell_y);
            this.draw_hor_line(cell_y + 1);
        }
    }
    
    //境界線の描画用関数
    //水平
    draw_hor_line(y){
        this.ctx.strokeStyle = "#888";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.cell_top, y*this.sq_size + this.cell_left);
        this.ctx.lineTo(this.cell_size_x*this.sq_size + this.cell_top, y*this.sq_size + this.cell_left);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    //垂直
    draw_ver_line(x){
        this.ctx.strokeStyle = "#888";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x*this.sq_size + this.cell_top, this.cell_left);
        this.ctx.lineTo(x*this.sq_size + this.cell_top, this.cell_size_y*this.sq_size + this.cell_left);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    //cellの再描画
    redraw_cell(x, y){
        this.ctx.clearRect(x*this.sq_size + this.cell_left, y*this.sq_size + this.cell_top, this.sq_size, this.sq_size);
        let count = this.true_cell[x][y];
        if (count == 9) {
            count = "mine";
        }
        let mine_img = new Image();
        mine_img.src = "./pictures/" + String(count) + ".png";
        mine_img.onload = () => {
            this.ctx.drawImage(mine_img, x*this.sq_size + this.cell_left, y*this.sq_size + this.cell_top, this.sq_size, this.sq_size);
            this.draw_ver_line(x);
            this.draw_ver_line(x + 1);
            this.draw_hor_line(y);
            this.draw_hor_line(y + 1);
        }
    }
    
    //cellのうち、0が連続している部分を探す
    zero_connection(x, y) {
        let frontier = [[x, y]];
        let visited = [];
        let connection = [[x, y]];
        if (this.true_cell[x][y] != 0) {
            return [[x, y]];
        }
        //indexOf()を配列に拡張したもの
        function indexOf_array(object, array) {
            for (let i = 0; i < array.length; i++) {
                if (object[0] == array[i][0] && object[1] == array[i][1]) {
                    return i;
                }
            }
            return -1;
        }
        //幅優先探索で、連結部分を調べる
        while (frontier != 0) {
            if (frontier[0][0] < this.cell_size_x - 1) {
                if (frontier[0][1] < this.cell_size_y) {
                    if (this.cell_data[frontier[0][0] + 1][frontier[0][1] + 1] == 0) {
                        if (indexOf_array([frontier[0][0] + 1, frontier[0][1] + 1], connection) == -1) {
                            connection.push([frontier[0][0] + 1, frontier[0][1] + 1]);
                        }
                        if ((this.true_cell[frontier[0][0] + 1][frontier[0][1] + 1] == 0) && (indexOf_array([frontier[0][0] + 1, frontier[0][1] + 1], visited) == -1)) {
                            frontier.push([frontier[0][0] + 1, frontier[0][1] + 1]);
                            visited.push([frontier[0][0] + 1, frontier[0][1] + 1]);
                         }
                    }
                }
                if (frontier[0][1] > 0) {
                    if (this.cell_data[frontier[0][0] + 1][frontier[0][1] - 1] == 0) {
                        if (indexOf_array([frontier[0][0] + 1, frontier[0][1] - 1], connection) == -1) {
                            connection.push([frontier[0][0] + 1, frontier[0][1] - 1]);
                        }
                        if ((this.true_cell[frontier[0][0] + 1][frontier[0][1] - 1] == 0) && (indexOf_array([frontier[0][0] + 1, frontier[0][1] - 1], visited) == -1)) {
                            frontier.push([frontier[0][0] + 1, frontier[0][1] - 1]);
                            visited.push([frontier[0][0] + 1, frontier[0][1] - 1]);
                         }
                    }
                }
                if (this.cell_data[frontier[0][0] + 1][frontier[0][1]] == 0) {
                    if (indexOf_array([frontier[0][0] + 1, frontier[0][1]], connection) == -1) {
                        connection.push([frontier[0][0] + 1, frontier[0][1]]);
                    }
                    if ((this.true_cell[frontier[0][0] + 1][frontier[0][1]] == 0) && (indexOf_array([frontier[0][0] + 1, frontier[0][1]], visited) == -1)) {
                        frontier.push([frontier[0][0] + 1, frontier[0][1]]);
                        visited.push([frontier[0][0] + 1, frontier[0][1]]);
                    }
                }
            }
            if (frontier[0][0] > 0) {
                if (frontier[0][1] < this.cell_size_y) {
                    if (this.cell_data[frontier[0][0] - 1][frontier[0][1] + 1] == 0) {
                        if (indexOf_array([frontier[0][0] - 1, frontier[0][1] + 1], connection) == -1) {
                            connection.push([frontier[0][0] - 1, frontier[0][1] + 1]);
                        }
                        if ((this.true_cell[frontier[0][0] - 1][frontier[0][1] + 1] == 0) && (indexOf_array([frontier[0][0] - 1, frontier[0][1] + 1], visited) == -1)) {
                            frontier.push([frontier[0][0] - 1, frontier[0][1] + 1]);
                            visited.push([frontier[0][0] - 1, frontier[0][1] + 1]);
                         }
                    }
                }
                if (frontier[0][1] > 0) {
                    if (this.cell_data[frontier[0][0] - 1][frontier[0][1] - 1] == 0) {
                        if (indexOf_array([frontier[0][0] - 1, frontier[0][1] - 1], connection) == -1) {
                            connection.push([frontier[0][0] - 1, frontier[0][1] - 1]);
                        }
                        if ((this.true_cell[frontier[0][0] - 1][frontier[0][1] - 1] == 0) && (indexOf_array([frontier[0][0] - 1, frontier[0][1] - 1], visited) == -1)) {
                            frontier.push([frontier[0][0] - 1, frontier[0][1] - 1]);
                            visited.push([frontier[0][0] - 1, frontier[0][1] - 1]);
                         }
                    }
                }
                if (this.cell_data[frontier[0][0] - 1][frontier[0][1]] == 0) {
                    if (indexOf_array([frontier[0][0] - 1, frontier[0][1]], connection) == -1) {
                        connection.push([frontier[0][0] - 1, frontier[0][1]]);
                    }
                    if ((this.true_cell[frontier[0][0] - 1][frontier[0][1]] == 0) && (indexOf_array([frontier[0][0] - 1, frontier[0][1]], visited) == -1)) {
                        frontier.push([frontier[0][0] - 1, frontier[0][1]]);
                        visited.push([frontier[0][0] - 1, frontier[0][1]]);
                    }
                }
            }
            if (frontier[0][1] < this.cell_size_y) {
                if (this.cell_data[frontier[0][0]][frontier[0][1] + 1] == 0) {
                    if (indexOf_array([frontier[0][0], frontier[0][1] + 1], connection) == -1) {
                        connection.push([frontier[0][0], frontier[0][1] + 1]);
                    }
                    if ((this.true_cell[frontier[0][0]][frontier[0][1] + 1] == 0) && (indexOf_array([frontier[0][0], frontier[0][1] + 1], visited) == -1)) {
                        frontier.push([frontier[0][0], frontier[0][1] + 1]);
                        visited.push([frontier[0][0], frontier[0][1] + 1]);
                    }
                }
            }
            if (frontier[0][1] > 0) {
                if (this.cell_data[frontier[0][0]][frontier[0][1] - 1] == 0) {
                    if (indexOf_array([frontier[0][0], frontier[0][1] - 1], connection) == -1) {
                        connection.push([frontier[0][0], frontier[0][1] - 1]);
                    }
                    if ((this.true_cell[frontier[0][0]][frontier[0][1] - 1] == 0) && (indexOf_array([frontier[0][0], frontier[0][1] - 1], visited) == -1)) {
                        frontier.push([frontier[0][0], frontier[0][1] - 1]);
                        visited.push([frontier[0][0], frontier[0][1] - 1]);
                    }
                }
            }
            frontier.shift();
        }
        return connection;
    }
    
    flag_setter (x, y) {
        let img_name;
        if (this.cell_data[x][y] == 0) {
            img_name = "flag";
            this.cell_data[x][y] = 2;
        }
        else if (this.cell_data[x][y] == 2) {
            img_name = "cover";
            this.cell_data[x][y] = 0;
        }
        else {
            return;
        }
        let mine_img = new Image();
        mine_img.src = "./pictures/" + img_name + ".png";
        mine_img.onload = () => {
            this.ctx.drawImage(mine_img, x*this.sq_size + this.cell_left, y*this.sq_size + this.cell_top, this.sq_size, this.sq_size);
            this.draw_ver_line(x);
            this.draw_ver_line(x + 1);
            this.draw_hor_line(y);
            this.draw_hor_line(y + 1);
        }
        return;
    }
}



function main(){
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    const reload = document.getElementById('reload');
    let edge = document.getElementById("edge").value;
    let bomb_number = document.getElementById("bomb_number").value;
    let time = document.getElementById('time');

   
    //実際の処理コード
    const magnification = 2;
    const cell_size_x = edge;
    const cell_size_y = edge;
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = 400 * magnification;
    const sq_height = sq_width;
    const sq_size = sq_width / cell_size_x;
    canvas.width = sq_width + cell_top * 2;
    canvas.height = sq_height + cell_left * 2;
    canvas.style.width = (canvas.width / magnification) + "px";
    canvas.style.height = (canvas.height / magnification) + "px";
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let start = true;
    let pause = false;
    let timer = 0;
    let timer_running;
    
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border, 4, magnification, ["black", "lime"]);
    function first_setting(x, y) {
        async function setup() {
            await cell.cell_setup("fill_0");
            return;
        }
        setup().then (() => {
            cell.draw_all_cell();
        });
    }
    first_setting(10, 10);
    
    
    //データ更新のための便宜的な関数
    function change_data(x, y){
        let curr_value = cell.get_cell_data(x, y);
        if (curr_value == 0) {
            let connection = cell.zero_connection(x, y);
            for (let i = 0; i < connection.length; i++) {
                cell.set_cell_data(connection[i][0], connection[i][1], 1);
            }
            if (cell.true_cell[x][y] == 9) {
                for (let i = 0; i < cell_size_x; i++) {
                    for (let j = 0; j < cell_size_y; j++) {
                        cell.redraw_cell(i, j);
                    }
                }
                pause = true;
                clearInterval(timer_running);
                if (confirm("お疲れ様です。またはじめからやる？")) {
                    location.reload();
                }else {
                    alert("それじゃあ、またあそびたいときは自分でリロードしてね！")
                }
            }
        }
    }
    
    
    //終了したかを確認し、していたら終了処理をする関数
    function finish_check() {
        let open_count = 0;
        for (let i = 0; i < cell_size_x; i++) {
            for (let j = 0; j < cell_size_y; j++) {
                if (cell.get_cell_data(i, j) == 1) {
                    open_count += 1;
                }
            }
        }
        if (open_count == cell_size_x * cell_size_y - bomb_number) {
            pause = true;
            clearInterval(timer_running);
            let counter = timer;
            let hour = ('00' + Math.floor(counter / 3600)).slice(-2);
            counter = counter % 3600;
            let minute = ('00' + Math.floor(counter / 60)).slice(-2);
            let second = ('00' + counter % 60).slice(-2);
            alert(`Game Clear!!   Time: ${hour}h ${minute}m ${second}s`);
            if (confirm("おめでとう！　またはじめからやる？")) {
                location.reload();
            }else {
                alert("それじゃあ、またあそびたいときは自分でリロードしてね！");
            }
        }
    }
    

    //クリック時の処理
    canvas.addEventListener('click', (e) => {
        if (pause) {
            return;
        }
        let [x, y] = cell.event_to_cell(e.clientX, e.clientY);
        if ((x != null) && (y != null)){
            if (start) {
                start = false;
                cell.true_cell_setup(bomb_number, x, y);
                timer_running = setInterval(time_counter ,1000);
            }
            change_data(x, y);
            finish_check();
        }
    });
    
    
    //右クリック時の処理
    canvas.oncontextmenu = (e) => {
        if (pause) {
            return;
        }
        let [x, y] = cell.event_to_cell(e.clientX, e.clientY);
        if ((x != null) && (y != null)){
            e.preventDefault();
            if (start) {
                start = false;
                cell.true_cell_setup(bomb_number, x, y);
                timer_running = setInterval(time_counter ,1000);
            }
            cell.flag_setter(x, y);
        }
    }
    
    
    //タイマーの処理
    function time_counter() {
        timer += 1;
        let counter = timer;
        let hour = ('00' + Math.floor(counter / 3600)).slice(-2);
        counter = counter % 3600;
        let minute = ('00' + Math.floor(counter / 60)).slice(-2);
        let second = ('00' + counter % 60).slice(-2);
        time.innerHTML = `Time: ${hour}h ${minute}m ${second}s`;
    }
}



//リロードボタンの設定
function reload(){
    let edge = document.getElementById('edge');
    let bomb_number = document.getElementById("bomb_number");
    sessionStorage.setItem('edge_ms', edge.value);
    sessionStorage.setItem('bomb_number_ms', bomb_number.value);
    location.reload();
}



//閉じられるときに動く関数（一応ね）
function onbeforeunload() {
    sessionStorage.removeItem('edge_ms');
    sessionStorage.removeItem('bomb_number_ms');
}