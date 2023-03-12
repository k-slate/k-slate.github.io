onload = function(){
    //セッションストレージにルールが保存されていない場合、初期値を設定する。
    if (sessionStorage.getItem('rule_eca') == null) {
        sessionStorage.setItem('rule_eca', "30");
        sessionStorage.setItem('edge_eca', "100");
        sessionStorage.setItem('initial_eca', "single");
    }
    
    //リロードによってテキストボックスやラジオボタン、チェックボックスの入力が初期値に戻ってしまうため、適用されたルールに設定し直す。
    let rule = document.getElementById('rule');
    let edge = document.getElementById('edge');
    let form = document.getElementById("form");
    let radio_list = form.rule;
    rule.value = sessionStorage.getItem('rule_eca');
    edge.value = sessionStorage.getItem('edge_eca');
    let initial = sessionStorage.getItem('initial_eca');
    //ここ非自明だよね。おそらくJavaScript側の処理が終わった後に、HTML側でラジオボタンが勝手に切り替わり、それと相殺してうまくいってるんだと思う。とにかくここだけは不思議なの。
    if (initial == "single") {
        radio_list[1].checked = true;
    }else if (initial == "random") {
        radio_list[0].checked = true;
    }else {
        console.error("定義されていないはずのラジオボタンが押されているようだよ、どういうことだろうね。");
    }
    
    main();
}



class Cell extends Cell_prototype{
    //行行列を取り出して整形する
    create_adj_cell_data(i){
        let adj_cell_data = this.cell_data[i].slice();
        adj_cell_data.unshift(0);
        adj_cell_data.push(0);
        return adj_cell_data;
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
    let rule = document.getElementById('rule').value;
    let edge = document.getElementById('edge').value;
    let rule_ex = document.getElementById('rule_ex');
    
    
    //実際の処理コード
    const magnification = 2;
    let cell_size_x = edge;
    let cell_size_y = edge;
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
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left , sq_size, border, 2, magnification, ["black", "white"]);
    cell.cell_setup("fill_0");
    //で、さっきの非自明なプログラムがうまくいってるもう一つの理由がこれだよ。このタイミングではラジオボタンは逆を指しているはずなんだけど、あくまでセッションストレージから参照しているのでそれを乗り越えてるんだよね。
    let initial = sessionStorage.getItem('initial_eca');
    if (initial == "single") {
        cell.cell_data[0][cell_center] = 1;
    }else if (initial == "random") {
        for(let i = 0; i < cell_size_y; i++){
            cell.cell_data[0][i] = Math.floor(Math.random()*2);
        }
    }else{
        console.error("定義されていないはずのラジオボタンが押されているようだよ、どういうことだろうね。");
        cell.cell_data[0][cell_center] = 1;
    }
    
    
    //ruleの分解
    rule = rule - 0;
    if ((rule < 0) || (rule > 255) || (Number.isInteger(rule) == false)) {
        alert("ルールの値は、0以上256未満の整数値です。");
        rule = 0;
        document.getElementById("rule").value = "0";
    }
    let r = rule;
    let rule_list = []
    for(let i = 0; i < 8; i++){
        rule_list.push(r % 2);
        r = (r - rule_list[i]) / 2;
    }
    rule_ex.innerHTML = `000 → ${rule_list[0]}<br>001 → ${rule_list[1]}<br>010 → ${rule_list[2]}<br>011 → ${rule_list[3]}<br>100 → ${rule_list[4]}<br>101 → ${rule_list[5]}<br>110 → ${rule_list[6]}<br>111 → ${rule_list[7]}`;
    
    
    //核心部
    for(let gen = 1; gen < cell_size_x; gen++){
        let prev_data = cell.create_adj_cell_data(gen - 1);
        for (let i = 0; i < cell_size_y; i++){
            if ((prev_data[i] == 0) && (prev_data[i + 1] == 0) && (prev_data[i + 2] == 0)) {
                cell.set_cell_data(gen, i, rule_list[0]);
            }else if ((prev_data[i] == 0) && (prev_data[i + 1] == 0) && (prev_data[i + 2] == 1)) {
                cell.set_cell_data(gen, i, rule_list[1]);
            }else if ((prev_data[i] == 0) && (prev_data[i + 1] == 1) && (prev_data[i + 2] == 0)) {
                cell.set_cell_data(gen, i, rule_list[2]);
            }else if ((prev_data[i] == 0) && (prev_data[i + 1] == 1) && (prev_data[i + 2] == 1)) {
                cell.set_cell_data(gen, i, rule_list[3]);
            }else if ((prev_data[i] == 1) && (prev_data[i + 1] == 0) && (prev_data[i + 2] == 0)) {
                cell.set_cell_data(gen, i, rule_list[4]);
            }else if ((prev_data[i] == 1) && (prev_data[i + 1] == 0) && (prev_data[i + 2] == 1)) {
                cell.set_cell_data(gen, i, rule_list[5]);
            }else if ((prev_data[i] == 1) && (prev_data[i + 1] == 1) && (prev_data[i + 2] == 0)) {
                cell.set_cell_data(gen, i, rule_list[6]);
            }else if ((prev_data[i] == 1) && (prev_data[i + 1] == 1) && (prev_data[i + 2] == 1)) {
                cell.set_cell_data(gen, i, rule_list[7]);
            }else{
               alert("そんなはずはない");
            }
        }
    }
    
    
    //描画
    ctx.clearRect(0, 0, sq_width, sq_height);
    cell.transpose();
    cell.draw_all_cell();
}



//リロードボタンの設定
function reload(){
    let rule = document.getElementById('rule');
    let edge = document.getElementById('edge');
    let form = document.getElementById("form");
    sessionStorage.setItem('rule_eca', rule.value);
    sessionStorage.setItem('edge_eca', edge.value);
    sessionStorage.setItem('initial_eca', form.rule.value);
    location.reload();
}



//閉じられるときに動く関数（一応ね）
function onbeforeunload() {
    sessionStorage.removeItem('rule_eca');
    sessionStorage.removeItem('edge_eca');
    sessionStorage.removeItem('initial_eca');
}
