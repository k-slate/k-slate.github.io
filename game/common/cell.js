class Cell_prototype{
    /*
    Cellクラスはセルの管理と描画を行います。
    ＜変数一覧＞
    cell_size_x : x方向のセル数（列の数）
    cell_size_y : y方向のセル数（行の数）
    cell_top : セルを描画するときに、上面のcanvas上でのy座標
    cell_left : セルを描画するときに、左面のcanvas上でのx座標
    sq_size : それぞれのセルの正方形の１辺の長さ
    border : canvasを表示させるときに設けたborderの太さ（box-sizing: border-box なら枠線の幅にかかわらず0にしてね）
    random_rate : ランダムに配置するとき、1が出る確率の逆数（setup_typeが"merged_random"か"merged_random_with_edge"の場合、システム上ここで指定したよりも1が出る確率が低くなる）
    magnification：拡大率。
    pallet：セルの状態と色を対応づける配列
    line：格子線を描画するかどうかを決める(0 or 1)
    circle：セルの形状を円形にするかどうか決める(0 or 1)
    */
    constructor(ctx, cell_size_x = 10, cell_size_y = 10, cell_top = 0, cell_left = 0, sq_size = 30, border_width = 5, random_rate = 2, magnification = 2, pallet = ["black", "white"], line = 0, circle = 0){
        //変数の集約
        this.ctx = ctx;
        this.cell_data = [];
        this.cell_size_x = cell_size_x;
        this.cell_size_y = cell_size_y;
        this.cell_top = cell_top;
        this.cell_left = cell_left;
        this.sq_size = sq_size;
        this.border_width = border_width;
        this.random_rate = random_rate;
        this.magnification = magnification;
        this.pallet = pallet;
        this.line = line;
        this.circle = circle;
    }
    
    /*cellの初期化用関数
    setup_typeには、"random"、"merged_random"、"merged_random_with_edge"もしくは"fill_X"(X：色が指定されている範囲の非負整数値)という文字列を引数にとります。
    "random"：0番目の色と1番目の色をランダムに塗り分けます。
    "merged_random"：0番目の色のセルが上下左右で全てつながるようにしつつ、0番目の色と1番目の色をランダムに塗り分けます。
    "merged_random_with_edge"：edgeを全て1番目の色で埋めつつ、merged_randomと同じ状況を作ります。
    "fill_X"：X番目の色を全てのセルに対して塗ります。
    */
    cell_setup(setup_type){
        if (setup_type == "random"){
            for (let i = 0; i < this.cell_size_x; i++){
            this.cell_data[i] = [];
                for (let j = 0; j < this.cell_size_y; j++){
                    let k = Math.floor(Math.random()*this.random_rate);
                    if (k == 0){
                        this.cell_data[i][j] = 1;
                    }else{
                        this.cell_data[i][j] = 0;
                    }
                }
            }
            return;
        }else if ((setup_type == "merged_random") || (setup_type == "merged_random_with_edge")) {
            if (setup_type == "merged_random_with_edge") {
                this.cell_size_x -= 2;
                this.cell_size_y -= 2;
            }
            let original_cells_0 = [];
            let original_cells_1 = [];
            for (let i = 0; i < this.cell_size_x; i++){
                this.cell_data[i] = [];
                for (let j = 0; j < this.cell_size_y; j++){
                    let k = Math.floor(Math.random()*this.random_rate);
                    if (k == 0){
                        this.cell_data[i][j] = 1;
                        original_cells_1.push([i, j]);
                    }else{
                        this.cell_data[i][j] = 0;
                        original_cells_0.push([i, j]);
                    }
                }
            }
            this.merge(original_cells_0, original_cells_1);
            if (setup_type == "merged_random_with_edge") {
                this.cell_size_x += 2;
                this.cell_size_y += 2;
                let fill_arr = this.cell_data[0].slice();
                fill_arr.fill(1);
                this.cell_data.unshift(fill_arr);
                this.cell_data.push(fill_arr);
                for (let i=0; i<this.cell_data.length; i++){
                    this.cell_data[i].unshift(1);
                    this.cell_data[i].push(1);
                }
            }
            return;
        }else {
            for (let i = 0; i < this.cell_size_x; i++){
                this.cell_data[i] = [];
                for (let j = 0; j < this.cell_size_y; j++){
                    let num = setup_type.slice(5) - 0;
                    if (isNaN(num)) {
                        this.cell_data[i][j] = 0;
                        console.warn("セルをどう埋めるかが定義されてないよ！");
                    }else {
                        this.cell_data[i][j] = num;
                    }
                }
            }
            return;
        }
    }
    
    //cell_setupの補助関数。merged_randomを実現する。
    merge(original_cells_0, cells_1) {
        let frontier = [original_cells_0[0]];
        let cells_0 = [];
        for (let i = 0; i < original_cells_0.length; i++) {
            cells_0[i] = original_cells_0[i].slice();
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
                if (this.cell_data[frontier[0][0] + 1][frontier[0][1]] == 0) {
                    let index = indexOf_array([frontier[0][0] + 1, frontier[0][1]], cells_0);
                    if (index != -1) {
                        frontier.push([frontier[0][0] + 1, frontier[0][1]]);
                        cells_0.splice(index, 1);
                    }
                }
            }
            if (frontier[0][0] > 0) {
                if (this.cell_data[frontier[0][0] - 1][frontier[0][1]] == 0) {
                    let index = indexOf_array([frontier[0][0] - 1, frontier[0][1]], cells_0);
                    if (index != -1) {
                        frontier.push([frontier[0][0] - 1, frontier[0][1]]);
                        cells_0.splice(index, 1);
                    }
                }
            }
            if (frontier[0][1] < this.cell_size_y) {
                if (this.cell_data[frontier[0][0]][frontier[0][1] + 1] == 0) {
                    let index = indexOf_array([frontier[0][0], frontier[0][1] + 1], cells_0);
                    if (index != -1) {
                        frontier.push([frontier[0][0], frontier[0][1] + 1]);
                        cells_0.splice(index, 1);
                    }
                }
            }
            if (frontier[0][1] > 0) {
                if (this.cell_data[frontier[0][0]][frontier[0][1] - 1] == 0) {
                    let index = indexOf_array([frontier[0][0], frontier[0][1] - 1], cells_0);
                    if (index != -1) {
                        frontier.push([frontier[0][0], frontier[0][1] - 1]);
                        cells_0.splice(index, 1);
                    }
                }
            }
            frontier.shift();
        }
        //みんな連結してればそれで終了
        if (cells_0.length == 0) {
            return;
        }
        //壁の中から、壁一枚で隔てているものを探して消す
        for (let i = 0; i < cells_1.length; i++) {
            let p = 0;
            let q = 0;
            if (cells_1[i][0] < this.cell_size_x - 1) {
                if (indexOf_array([cells_1[i][0] + 1, cells_1[i][1]], cells_0) != -1) {
                    p = 1;
                }
                if ((this.cell_data[cells_1[i][0] + 1][cells_1[i][1]] == 0) && (indexOf_array([cells_1[i][0] + 1, cells_1[i][1]], cells_0) == -1)) {
                    q = 1;
                }
            }
            if (cells_1[i][0] > 0) {
                if (indexOf_array([cells_1[i][0] - 1, cells_1[i][1]], cells_0) != -1) {
                    p = 1;
                }
                if ((this.cell_data[cells_1[i][0] - 1][cells_1[i][1]] == 0) && (indexOf_array([cells_1[i][0] - 1, cells_1[i][1]], cells_0) == -1)) {
                    q = 1;
                }
            }
            if (cells_1[i][1] < this.cell_size_y) {
                if (indexOf_array([cells_1[i][0], cells_1[i][1] + 1], cells_0) != -1) {
                    p = 1;
                }
                if ((this.cell_data[cells_1[i][0]][cells_1[i][1] + 1] == 0) && (indexOf_array([cells_1[i][0], cells_1[i][1] + 1], cells_0) == -1)) {
                    q = 1;
                }
            }
            if (cells_1[i][1] > 0) {
                if (indexOf_array([cells_1[i][0], cells_1[i][1] - 1], cells_0) != -1) {
                    p = 1;
                }
                if ((this.cell_data[cells_1[i][0]][cells_1[i][1] - 1] == 0) && (indexOf_array([cells_1[i][0], cells_1[i][1] - 1], cells_0) == -1)) {
                    q = 1;
                }
            }
            if (p*q == 1) {
                this.cell_data[cells_1[i][0]][cells_1[i][1]] = 0;
                original_cells_0.push([cells_1[i][0], cells_1[i][1]]);
                cells_1.splice(i, 1);
                break;
            }else {
                //壁一枚で隔てられた箇所がない場合は、とりあえず一枚壁を消して様子見。
                //この場合、必ず解決はできるが、極端に壁が少なくなることもある。
                if (i == cells_1.length - 1) {
                    let j = Math.floor(Math.random() * cells_1.length);
                    this.cell_data[cells_1[j][0]][cells_1[j][1]] = 0;
                    original_cells_0.push([cells_1[j][0], cells_1[j][1]]);
                    cells_1.splice(j, 1);
                }
            }
        }
        this.merge(original_cells_0, cells_1);
    }

    //cellの描画用関数
    draw_cell(cell_x, cell_y){
        if (this.pallet.length <= this.cell_data[cell_x][cell_y]) {
            this.ctx.fillStyle = "black";
            console.warn("セルの値が、色の設定範囲外になっているよ！");
        }else {
            this.ctx.fillStyle = this.pallet[this.cell_data[cell_x][cell_y]];
        }
        if (this.circle == 0) {
            this.ctx.fillRect(cell_x*this.sq_size + this.cell_left, cell_y*this.sq_size + this.cell_top, this.sq_size, this.sq_size);
        }else {
            this.ctx.beginPath();
            this.ctx.arc((cell_x+0.5)*this.sq_size + this.cell_left, (cell_y+0.5)*this.sq_size + this.cell_top, this.sq_size/2, 0, 2*Math.PI, false);
            this.ctx.fill();
        }
    }
    
    //境界線の描画用関数
    //水平
    draw_hor_line(y){
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.cell_top, y*this.sq_size + this.cell_left);
        this.ctx.lineTo(this.cell_size_x*this.sq_size + this.cell_top, y*this.sq_size + this.cell_left);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    //垂直
    draw_ver_line(x){
        this.ctx.strokeStyle = "black";
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
        this.draw_cell(x, y);
        if (this.line != 0) {
            this.draw_ver_line(x);
            this.draw_ver_line(x + 1);
            this.draw_hor_line(y);
            this.draw_hor_line(y + 1);
        }
    }
    
    //全てのcellの描画
    draw_all_cell(){
        for (let i = 0; i < this.cell_size_x; i++){
            for (let j = 0; j < this.cell_size_y; j++){
                this.draw_cell(i, j);
            }
        }
    }
    
    //外周を特定の色で塗る
    edge_draw(color = 1){
        for (let i = 0; i < this.cell_size_x; i++) {
            this.set_cell_data(i, 0, color);
            this.set_cell_data(i, this.cell_size_y - 1, color);
        }
        for (let j = 0; j < this.cell_size_y; j++) {
            this.set_cell_data(0, j, color);
            this.set_cell_data(this.cell_size_x - 1, j, color);
        }
    }
    
    //全ての格子線の描画
    draw_all_line(){
        //これが実行される場合は、格子線が今後も描画されるようになる
        this.line = 1;
        for (let i = 0; i < this.cell_size_y + 1; i++){
            this.draw_hor_line(i);
        }
        for (let j = 0; j < this.cell_size_x + 1; j++){
            this.draw_ver_line(j);
        }
    }

    //クリック位置とcellを対応づける関数
    event_to_cell(imput_x, imput_y){
        let rect = canvas.getBoundingClientRect();
        let actual_x = imput_x - this.cell_top / this.magnification - rect.left - this.border_width;
        let actual_y = imput_y - this.cell_left / this.magnification - rect.top - this.border_width;
        let x = Math.floor(actual_x * this.magnification/this.sq_size);
        let y = Math.floor(actual_y * this.magnification/this.sq_size);
        if ((0 <= x) && (x < this.cell_size_x) && (0 <= y) && (y < this.cell_size_y)){
            return [x, y];
        }else{
            return [null, null];
        }
    }

    //cell_dataの参照
    get_cell_data(i, j){
        return this.cell_data[i][j];
    }

    //cell_dataの更新
    set_cell_data(i, j, new_value){
        this.cell_data[i][j] = new_value;
        this.redraw_cell(i, j);
    }
    
    //転置
    transpose(){
        let prev_cell_data = this.cell_data.map((obj) => Object.assign({},obj));
        for (let i = 0; i < this.cell_size_x; i++){
            for (let j = 0; j < this.cell_size_y; j++){
                this.cell_data[i][j] = prev_cell_data[j][i];
            }
        }
    }
}