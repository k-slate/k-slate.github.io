onload = function(){
        main();
}



class Cell extends Cell_prototype{
    //端の処理を簡略化するため、this.cell_dataのまわり1列を1で埋めた新たな配列を生成する。
    get_adj_cell_data(i, j){
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
        return adj_cell_data[i + 1][j + 1];
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
    let score = document.getElementById('score');
    let pause_button = document.getElementById("pause_button");
    
    
    //実際の処理コード
    const magnification = 2;
    let cell_size_x = 30;
    let cell_size_y = 30;
    canvas.width = canvas.clientWidth * magnification;
    canvas.height = canvas.clientHeight * magnification;
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = canvas.width  - cell_top * 2;
    const sq_height = sq_width;
    const sq_size = sq_width / cell_size_x;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cell_center = Math.floor(cell_size_x / 2)
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border, 2, magnification, ["black", "darkgreen", "red"]);
    cell.cell_setup("fill_0");
    let snake = [];
    let direction = [0, 0];
    let current_direction = [0, 0];    //Uターンを防ぐための進行方向記録用変数
    let pause = 0;
    let feed = [Math.floor(Math.random()*cell_size_x), Math.floor(Math.random()*cell_size_y)];
    while (feed[0] == Math.floor(cell_size_x / 2) && feed[1] == Math.floor(cell_size_y / 2)) {
        feed = [Math.floor(Math.random()*cell_size_x), Math.floor(Math.random()*cell_size_y)];
    }
    snake.push([Math.floor(cell_size_x / 2), Math.floor(cell_size_y / 2)])
    cell.set_cell_data(snake[0][0], snake[0][1], 1);
    cell.set_cell_data(feed[0], feed[1], 2)
    
    ctx.clearRect(0, 0, sq_width, sq_height);
    for (let i = 0; i < cell.cell_size_x; i++){
        for (let j = 0; j < cell.cell_size_y; j++){
            cell.draw_cell(i, j);
        }
    }
    
    
    //核心部
    function move(){
        if (((direction[0] == 0) && (direction[1] == 0)) || (pause != 0)){
            return;
        }
        current_direction = direction;
        snake.unshift([snake[0][0] + direction[0], snake[0][1] + direction[1]]);
        if ((snake[0][0] != feed[0]) || (snake[0][1] != feed[1])) {
            //終了処理
            if (cell.get_adj_cell_data(snake[0][0], snake[0][1]) == 1) {
                direction = [0, 0];
                pause = -1;
                if (confirm("お疲れ様です。またはじめからやる？")) {
                    location.reload();
                }else {
                    alert("それじゃあ、またあそびたいときは自分でリロードしてね！");
                    pause_button.innerHTML = "再読み込み";
                }
                return;
            }
            cell.set_cell_data(snake[snake.length - 1][0], snake[snake.length - 1][1], 0);
            snake.pop();
        }
        //えさを食べた時の処理
        else {
            function feed_place() {
                feed = [Math.floor(Math.random()*cell_size_x), Math.floor(Math.random()*cell_size_y)];
                //再帰的に、へびの胴体を避けてえさを配置する
                if (cell.get_cell_data(feed[0], feed[1]) != 0) {
                    feed_place();
                }
            }
            feed_place();
            cell.set_cell_data(feed[0], feed[1], 2);
        }
        cell.set_cell_data(snake[0][0], snake[0][1], 1);
        
        //描画
        ctx.clearRect(0, 0, sq_width, sq_height);
        cell.draw_all_cell();
        score.innerHTML = `Score: ${snake.length - 1}`;
    }
    let process = setInterval(move, 100);
    
    
    //ボタンの設定
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
    });
    
    
    //キーボード操作
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        
        if (key == "ArrowUp") {
            event.preventDefault();
            if (((current_direction[0] == 0) && (current_direction[1] == 1)) || (pause == 1)){
                return;
            }
            direction = [0, -1];
        }
        if (key == "ArrowRight") {
            event.preventDefault();
            if (((current_direction[0] == -1) && (current_direction[1] == 0)) || (pause == 1)){
                return;
            }
            direction = [1, 0];
        }
        if (key == "ArrowLeft") {
            event.preventDefault();
            if (((current_direction[0] == 1) && (current_direction[1] == 0)) || (pause == 1)){
                return;
            }
            direction = [-1, 0];
        }
        if (key == "ArrowDown"){
            event.preventDefault();
            if (((current_direction[0] == 0) && (current_direction[1] == -1)) || (pause == 1)){
                return;
            }
            direction = [0, 1]
        }
        if (key == " "){
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
        }
    });
}
