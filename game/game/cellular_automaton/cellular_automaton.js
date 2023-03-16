onload = function(){
    //セッションストレージにルールが保存されていない場合、初期値を設定する。
    if (sessionStorage.getItem('radio_list_ca') == null) {
        sessionStorage.setItem('radio_list_ca', "moore");
        sessionStorage.setItem('born_str_ca', "3");
        sessionStorage.setItem('survive_str_ca', "2,3");
        sessionStorage.setItem('auto_ca', "false");
        sessionStorage.setItem('gen_number_ca', "100");
        sessionStorage.setItem('random_rate_ca', "25");
    }
    
    //リロードによってテキストボックスやラジオボタン、チェックボックスの入力が初期値に戻ってしまうため、適用されたルールに設定し直す。
    let form = document.getElementById('form');
    let type = form.rule;
    if (sessionStorage.getItem('radio_list_ca') == "neumann") {
        type[0].checked = true;
    }else if (sessionStorage.getItem('radio_list_ca') == "moore") {
        type[1].checked = true;
    }else {
        console.error("定義されていないはずのラジオボタンが押されているようだよ、どういうことだろうね。");
    }
    let born = document.getElementById("born");
    let survive = document.getElementById("survive");
    let auto = document.getElementById('auto');
    let gen_number = document.getElementById("gen_number");
    let random_rate = document.getElementById("random_rate");
    born.value = sessionStorage.getItem('born_str_ca');
    survive.value = sessionStorage.getItem('survive_str_ca');
    if (sessionStorage.getItem('auto_ca') == "true") {
        auto.checked = true;
    }else {
        auto.checked = false;
    }
    gen_number.value = sessionStorage.getItem('gen_number_ca');
    random_rate.value = sessionStorage.getItem('random_rate_ca');
    
    main();
}



class Cell extends Cell_prototype{
    constructor(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border_width, random_rate, magnification, pallet, line = 0, circle = 0){
        super(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border_width, random_rate, magnification, pallet, line, circle);
        
        this.neighbor_type;
        this.born = [];
        this.survive = [];
    }
    
    
    //cellの初期化用関数
    cell_setup(setup_type, neighbor_type = "moore", born, survive){
        super.cell_setup(setup_type);
                
        if ((neighbor_type == "neumann") || (neighbor_type == "moore")){
            this.neighbor_type = neighbor_type;
        }else{
            this.neighbor_type = "neumann";
            console.error("近傍の設定ができてないよ");
        }
        
        this.born = born;
        this.survive = survive;
    }
    
    
    //次の世代に移行する処理
    next_generation(){
        let fill_arr = this.cell_data[0].slice();
        fill_arr.fill(0);
        
        //端の処理を簡略化するため、this.cell_dataのまわりを0で埋めた新たな配列を生成する。
        let adj_cell_data = this.cell_data.slice();
        adj_cell_data.unshift(fill_arr);
        adj_cell_data.push(fill_arr);
        for (let i=0; i<adj_cell_data.length; i++){
            let arr = adj_cell_data[i].slice();
            arr.unshift(0);
            arr.push(0);
            adj_cell_data[i] = arr;
        }
        
        for (let i = 0; i < this.cell_size_x; i++){
            for (let j = 0; j < this.cell_size_y; j++){
                /*
                this.cell_data[i][j] == adj_cell_data[i+1][j+1]
                であることに注意！
                
                ↓this.cell_data
                     j-1  j  j+1
                    -------------
                i-1 |NW | N | NE|
                    -------------
                 i  | W |   | E |
                    -------------
                i+1 |SW | S | SE|
                    -------------
                
                ↓adj_cell_data
                      j  j+1 j+2
                    -------------
                 i  |NW | N | NE|
                    -------------
                i+1 | W |   | E |
                    -------------
                i+2 |SW | S | SE|
                    -------------
                */
                let sum = adj_cell_data[i][j+1] + adj_cell_data[i+2][j+1] + adj_cell_data[i+1][j] + adj_cell_data[i+1][j+2];
                if (this.neighbor_type == "moore"){
                    sum += (adj_cell_data[i][j] + adj_cell_data[i+2][j] + adj_cell_data[i][j+2] + adj_cell_data[i+2][j+2]);
                }
                if (this.cell_data[i][j] == 0){
                    let result = this.born.some((n) => {
                        return n == sum;
                    });
                    if (result){
                        this.cell_data[i][j] = 1;
                        this.redraw_cell(i, j);
                    }
                }else{
                    let result = this.survive.some((n) => {
                        return n == sum;
                    });
                    if (!result){
                        this.cell_data[i][j] = 0;
                        this.redraw_cell(i, j);
                    }
                }
            }
        }
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
    const auto = document.getElementById('auto');
    let gen_number = document.getElementById("gen_number").value;
    let random_rate = document.getElementById("random_rate").value;

   
    //実際の処理コード
    const magnification = 2;
    const cell_size_x = 50;
    const cell_size_y = 50;
    /*感覚的にだけど、
    const cell_size_x = 50;
    const cell_size_y = 50;
    くらいが丁度いい。また、描画の都合上、
    cell_size_y = cell_size_x;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let gen = 1;
    let auto_gen;
            
    //ここでルールが決まる
    let neighbor_type = sessionStorage.getItem('radio_list_ca');
    let born_str = sessionStorage.getItem('born_str_ca');
    let born = Array.from(born_str).map(Number);
    let survive_str = sessionStorage.getItem('survive_str_ca');
    let survive = Array.from(survive_str).map(Number);
        
    //再度画面表示設定
    let generation = document.getElementById("generation");
    generation.innerHTML = `generation: ${gen}`;
    
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border, 100/random_rate, magnification, ["black", "lime"]);
    cell.cell_setup("random", neighbor_type, born, survive);
    cell.draw_all_cell();
    if (auto.checked){
        auto_gen = setInterval(change_gen, 1000/gen_number);
    }
    
    
    //データ更新のための便宜的な関数
    function change_data(x, y){
        let curr_value = cell.get_cell_data(x, y);
        let new_value = Math.floor((curr_value + 1) % 2);
        cell.set_cell_data(x, y, new_value);
    }
    
    
    //次の世代に移行する処理
    function change_gen(){
        cell.next_generation();
        gen++;
        generation.innerHTML = `generation: ${gen}`;
    }
    

    //クリック時の処理
    canvas.addEventListener('click', (e) => {
        let [x, y] = cell.event_to_cell(e.clientX, e.clientY);
        if ((x != null) && (y != null)){
            change_data(x, y);
        }
    });
    
    
    //キーボード入力の処理
    document.addEventListener('keydown', (e) => {
        let key = e.key;
        if (key == " "){
            e.preventDefault();
            change_gen();
        }
    });
    
    
    //自動モードの設定
    auto.addEventListener('click', () => {
        if (auto.checked){
            gen_number = document.getElementById("gen_number").value;
            auto_gen = setInterval(change_gen, 1000/gen_number);
        }else{
            clearInterval(auto_gen);
        }
    });
    
    
    //リロードがうまくいくようにする関数
    reload.addEventListener('click', () => {
        clearInterval(auto_gen);
    });
}



//リロードボタンの設定
function reload(){
    let form = document.getElementById('form');
    let born = document.getElementById("born");
    let survive = document.getElementById("survive");
    let auto = document.getElementById('auto');
    let gen_number = document.getElementById("gen_number");
    let random_rate = document.getElementById("random_rate");
    sessionStorage.setItem('radio_list_ca', form.rule.value);
    sessionStorage.setItem('born_str_ca', born.value.split(','));
    sessionStorage.setItem('survive_str_ca', survive.value.split(','));
    sessionStorage.setItem('auto_ca', auto.checked);
    sessionStorage.setItem('gen_number_ca', gen_number.value);
    sessionStorage.setItem('random_rate_ca', random_rate.value);
    location.reload();
}



//閉じられるときに動く関数（一応ね）
function onbeforeunload() {
    sessionStorage.removeItem('radio_list_ca');
    sessionStorage.removeItem('born_str_ca');
    sessionStorage.removeItem('survive_str_ca');
    sessionStorage.removeItem('auto_ca');
    sessionStorage.removeItem('gen_number_ca');
    sessionStorage.removeItem('random_rate_ca');
}
