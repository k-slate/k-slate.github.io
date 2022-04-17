onload = function(){
    main();
}



class Cell extends Cell_prototype{
    //すべてのcellが0かどうかを判定する関数
    check_cell_color(){
        let cell_sum = 0;
        for (let i = 0; i < this.cell_size_x; i++){
            for (let j = 0; j < this.cell_size_y; j++){
                cell_sum += this.cell_data[i][j];
            }
        }
        if (cell_sum == 0){
            return true;
        }
        return false;
    }
}



function main(){
    let result = document.getElementById('result');
    let button = document.getElementById("reload");
    
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');

   
    //実際の処理コード
    const magnification = 2;
    const cell_size_x = 5;
    const cell_size_y = 5;
    /*公式では、
    cell_size_x = 5;
    cell_size_y = 5;
    である。また、描画の都合上
    cell_size_y = cell_size_x;
    であることが望ましい。
    */
    const cell_top = 0 * magnification;
    const cell_left = 0 * magnification;
    const sq_width = 250 * magnification;
    const sq_height = sq_width;
    const sq_size = sq_width / cell_size_x;
    canvas.width = sq_width + cell_top * 2;
    canvas.height = sq_height + cell_left * 2;
    canvas.style.width = (canvas.width / magnification) + "px";
    canvas.style.height = (canvas.height / magnification) + "px";
    let border = document.defaultView.getComputedStyle(canvas, null).getPropertyValue("border-width").slice(0, -2) - 0;
    let count = 0;
    let active = 1;
    
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border, 2, magnification, ["black", "yellow"]);
    cell.cell_setup("fill_0");
    
    //”解ける”パズルにするための操作
    let shortest_way = Math.floor(Math.random()*20 + 5);
    let choice = [];
    for (let i = 1; i <= 25; i++){
        choice.push(i);
    }
    for (let i = shortest_way; i > 0; i--){
        let choose = Math.floor(Math.random()*i);
        let choose_x = Math.floor(choice[choose] / 5);
        let choose_y = Math.floor(choice[choose] % 5);
        neumann_change(choose_x, choose_y);
        choice.splice(choose, 1);
    }
    
    result.innerHTML = `ここまでの手数：${count}<br>目標手数：${shortest_way}`;
    cell.draw_all_cell();
    cell.draw_all_line();
    
    
    //データ更新のための便宜的な関数
    function change_data(x, y){
        let curr_value = cell.get_cell_data(x, y);
        let new_value = Math.floor((curr_value + 1) % 2);
        cell.set_cell_data(x, y, new_value);
    }
    
    
    //lights outの中心的な関数
    function neumann_change(x, y){
        if ((x != null) && (y != null)){
            change_data(x, y);
            if (x-1 >= 0){
                change_data(x-1, y);
            }
            if (y-1 >= 0){
                change_data(x, y-1);
            }
            if (x+1 < cell_size_x){
                change_data(x+1, y);
            }
            if (y+1 < cell_size_y){
                change_data(x, y+1);
            }
        }
    }
    

    //クリック時の処理
    canvas.addEventListener('click', (e) => {
        if (active){
            count += 1;
            let [x, y] = cell.event_to_cell(e.clientX, e.clientY);
            neumann_change(x, y);
            result.innerHTML = `ここまでの手数：${count}<br>目標手数：${shortest_way}`;
            //終了したときの処理
            if (cell.check_cell_color()){
                let text = "消灯完了";
                ctx.fillStyle = "white";
                ctx.font = "96px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle"
                ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                active = 0;
            }
        }
    });
    //ボタン用
    button.addEventListener('click', (e) => {
        location.reload();
    });
}
