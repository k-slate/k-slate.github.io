onload = function(){
    main();
}



class Cell extends Cell_prototype{
}

class Learning extends Q_learning{
    constructor(Q, act_total, param){
        super(Q, act_total, param);
        this.time = 0;
        this.ave_time = [];
        this.time_list = [];
    }
    
    //報酬のメソッド
    reward(rew) {
        if (rew == 1) {
            this.ave_time.push(this.time);
            this.time = 0;
            if (this.ave_time.length >= 10) {
                let ave = 0;
                for (let i = 0; i < this.ave_time.length; i++) {
                    ave += this.ave_time[i] / this.ave_time.length;
                }
                this.time_list.push(ave);
                this.ave_time = [];
                this.time = 0;
            }
        }
    }
    
    //学習のメソッド
    qlearn(rew_list, enc_list) {
        this.time += 1;
        return super.qlearn(rew_list, enc_list);
        this.curr_rew *= (1000/(this.time + (1e-7)));
    }
        
    //リセットのメソッド
    reset() {
        super.reset()
        this.time = 0;
        this.time_list = [];
    }
}



function main(){
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    const fast_checkbox = document.getElementById('fast');
    const reload_button = document.getElementById('reload');

   
    //実際の処理コード
    const magnification = 2;
    const cell_size_x = 20;
    const cell_size_y = 20;
    /*感覚的にだけど、
    const cell_size_x = 20;
    const cell_size_y = 20;
    くらいが丁度いい。また、描画の都合上、
    cell_size_y = cell_size_x;
    であることが望ましい。
    */
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
    
    //cellの初期設定・初期描画
    const cell = new Cell(ctx, cell_size_x, cell_size_y, cell_top, cell_left, sq_size, border, 5, magnification, ["white", "black", "red", "blue", "#ff00ff"], 1, 0);
    cell.cell_setup("merged_random_with_edge");
    let agent = [];
    let prev_agent = [];
    let goal = [];
    let pause = 0;
    let fast = 0;
    let count = 0;
    function agent_place() {
        let object = [Math.floor(Math.random()*cell_size_x), Math.floor(Math.random()*cell_size_y)];
        //再帰的に、道上に配置させる
        if (cell.get_cell_data(object[0], object[1]) == 0) {
            cell.set_cell_data(object[0], object[1], 2);
            agent = object;
            return;
        }
        agent_place();
    }
    function goal_place() {
        let object = [Math.floor(Math.random()*cell_size_x), Math.floor(Math.random()*cell_size_y)];
        //再帰的に、道上に配置させる
        if (cell.get_cell_data(object[0], object[1]) == 0) {
            cell.set_cell_data(object[0], object[1], 3);
            goal = object;
            return;
        }
        goal_place();
    }
    agent_place();
    goal_place();
    cell.draw_all_cell();
    cell.draw_all_line();
    prev_agent = agent.slice();
    
    //learningの初期設定
    let act_total = 5;
    let Q = [];
    for (let i = 0; i < cell_size_x * cell_size_y * act_total; i++) {
        Q[i] = 1;
    }
    const param = [0.9, 20.0, 0.9];
    const learning = new Learning(Q, act_total, param);
    
    let learning_process = setInterval(loop, 10);
    function loop() {
        if (fast == 0) {
            let action = learning.qlearn(reward(agent), enc(agent));
            agent = move(agent, action);
            goal_check();
        }else {
            for (let i = 0; i < 1000; i++) {
                let action = learning.qlearn(reward(agent), enc(agent));
                agent = move(agent, action);
                goal_check();
            }
        }
        draw();
        prev_agent = agent.slice();
    }

    
    
    //描画の補助関数
    function draw() {
        if (cell.get_cell_data(agent[0], agent[1]) != 1) {
            cell.cell_data[prev_agent[0]][prev_agent[1]] = 0;
            cell.cell_data[agent[0]][agent[1]] = 2;
        }
        count = 0;
        cell.set_cell_data(prev_agent[0], prev_agent[1], cell.get_cell_data(prev_agent[0], prev_agent[1]));
        cell.set_cell_data(agent[0], agent[1], cell.get_cell_data(agent[0], agent[1]));
    }
    
    //ゴール処理の関数
    function goal_check() {
        if ((agent[0] == goal[0]) && (agent[1] == goal[1])) {
            draw();
            cell.set_cell_data(agent[0], agent[1], 4);
            agent_place();
            prev_agent = agent.slice();
            cell.set_cell_data(goal[0], goal[1], 3);
        }
    }
    
    //エージェントを動かす関数
    function move(array, direction) {
        if ((direction < 0) || (4 < direction)) {
            console.error("誤った方向が入力されているよ！");
        }
        let dx = [0, 0, 1, -1, 0];
        let dy = [-1, 1, 0, 0, 0];
        let moved_array = [array[0] + dx[direction], array[1] + dy[direction]];
        if (cell.get_cell_data(moved_array[0], moved_array[1]) != 1) {
            return moved_array;
        }
        return array.slice();
    }
    
    //報酬のメソッド
    function reward () {
        let r_list = [];
        for (let i = 0; i < act_total; i++) {
            let next_agent = move(agent, i);
            if ((next_agent[0] == goal[0]) && (next_agent[1] == goal[1])) {
                r_list.push(1);
            }else {
                r_list.push(0);
            }
        }
        return r_list;
    }

    //配列に落とし込むメソッド
    function enc(array) {
        enc_list = [];
        for (let i = 0; i < act_total; i++) {
            enc_list.push((cell_size_x * array[1] + array[0]) * act_total + i);
        }
        return enc_list;
    }
    
    //データ更新のための便宜的な関数
    function change_data(x, y){
        let curr_value = cell.get_cell_data(x, y);
        let new_value = Math.floor((curr_value + 1) % 2);
        cell.set_cell_data(x, y, new_value);
    }
    
    //クリック時の処理
    canvas.addEventListener('click', (e) => {
        let [x, y] = cell.event_to_cell(e.clientX, e.clientY);
        if ((x != null) && (y != null)){
            if ((cell.get_cell_data(x, y) == 0) || (cell.get_cell_data(x, y) == 1)) {
                change_data(x, y);
            }
        }
    });
    
    //キーボード入力の処理
    document.addEventListener('keydown', (e) => {
        let key = e.key;
        if (key == "ArrowUp"){
            e.preventDefault();
            agent = move(agent, 0);
            draw();
            prev_agent = agent.slice();
        }
        if (key == "ArrowDown"){
            e.preventDefault();
            agent = move(agent, 1);
            draw();
            prev_agent = agent.slice();
        }
        if (key == "ArrowRight"){
            e.preventDefault();
            agent = move(agent, 2);
            draw();
            prev_agent = agent.slice();
        }
        if (key == "ArrowLeft"){
            e.preventDefault();
            agent = move(agent, 3);
            draw();
            prev_agent = agent.slice();
        }
    });
    
    //自動モードの設定
    fast_checkbox.addEventListener('click', () => {
        fast = (fast + 1) % 2;
    });
    
    //ボタンの設定
    reload_button.addEventListener('click', (e) => {
        location.reload();
    });}