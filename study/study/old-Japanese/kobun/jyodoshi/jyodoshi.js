onload = function(){
    let jyodoshi_number = sessionStorage.getItem("jyodoshi_number");
    if (jyodoshi_number == null) {
        jyodoshi_number = Math.floor(Math.random()*31);
    }
    if (sessionStorage.getItem("kobun_status") == null) {
        sessionStorage.setItem("kobun_status", "jyodoshi_random");
    }
    let title_box = document.getElementById("title_box");
    title_box.style.visibility = "hidden";
    let items_container = document.getElementById("items_container");
    items_container.style.visibility = "hidden";
    main(jyodoshi_number);
}


//こたえ
let word = "";
let true_connection;
let true_text_list;
let true_meaning_list;

//入力される値を保持する変数
let connection = -1;
let text_list = ["◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯"];
let meaning_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//その他運用のための変数
let jyodoshi_remaining;
let check_counter = 0;


//辞書
let jyodoshi_list = [
["ず", 0, ["ず", "ず", "ず", "ぬ", "ね", "◯", "ざら", "ざり", "◯", "ざる", "ざれ", "ざれ"], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["き", 1, ["せ", "◯", "き", "し", "しか", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["けり", 1, ["けら", "◯", "けり", "ける", "けれ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["る", 0, ["れ", "れ", "る", "るる", "るれ", "れよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["らる", 0, ["られ", "られ", "らる", "らるる", "らるれ", "られよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["す", 0, ["せ", "せ", "す", "する", "すれ", "せよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["さす", 0, ["させ", "させ", "さす", "さする", "さすれ", "させよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["しむ", 0, ["しめ", "しめ", "しむ", "しむる", "しむれ", "しめよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["つ", 1, ["て", "て", "つ", "つる", "つれ", "てよ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["ぬ", 1, ["な", "に", "ぬ", "ぬる", "ぬれ", "ね", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["たり（存）", 1, ["たら", "たり", "たり", "たる", "たれ", "たれ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["り", 6, ["ら", "り", "り", "る", "れ", "れ", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["なり（断）", 3, ["なら", "なり", "なり", "なる", "なれ", "なれ", "◯", "に", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["たり（断）", 6, ["たら", "たり", "たり", "たる", "たれ", "たれ", "◯", "と", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["む", 0, ["ま", "◯", "む", "む", "め", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]], 
["むず", 0, ["◯", "◯", "むず", "むずる", "むずれ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]], 
["じ", 0, ["◯", "◯", "じ", "じ", "じ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["べし", 2, ["べく", "べく", "べし", "べき", "べけれ", "◯", "べから", "べかり", "◯", "べかる", "◯", "◯"], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]], 
["まじ", 2, ["まじく", "まじく", "まじ", "まじき", "まじけれ", "◯", "まじから", "まじかり", "◯", "まじかる", "◯", "◯"], [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0]], 
["らし", 2, ["◯", "◯", "らし", "らし", "らし", "◯", "◯", "◯", "◯", "らしき", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["めり", 2, ["◯", "めり", "めり", "める", "めれ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["なり（推）", 2, ["◯", "なり", "なり", "なる", "なれ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]], 
["たし", 1, ["たく", "たく", "たし", "たき", "たけれ", "◯", "たから", "たかり", "◯", "たかる", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["まほし", 0, ["まほしく", "まほしく", "まほし", "まほしき", "まほしけれ", "◯", "まほしから", "まほしかり", "◯", "まほしかる", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["まうし", 0, ["◯", "まうく", "◯", "まうき", "まうけれ", "◯", "◯", "まうかり", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]], 
["ごとし", 3, ["ごとく", "ごとく", "ごとし", "ごとき", "◯", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
["ごとくなり", 3, ["ごとくなら", "ごとくなり", "ごとくなり", "ごとくなる", "ごとくなれ", "ごとくなれ", "◯", "ごとくに", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
["やうなり", 3, ["やうなら", "やうなり", "やうなり", "やうなる", "やうなれ", "◯", "◯", "やうに", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
["らむ", 2, ["◯", "◯", "らむ", "らむ", "らめ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]], 
["けむ", 1, ["◯", "◯", "けむ", "けむ", "けめ", "◯", "◯", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
["まし", 0, ["ましか", "◯", "まし", "まし", "ましか", "◯", "ませ", "◯", "◯", "◯", "◯", "◯"], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
];


//問う助動詞を設定する
function word_setting(place){
    let starter = document.getElementById("starter");
    starter.style.visibility = "hidden";
    let word_title = document.getElementById("word_title");
    word_title.innerHTML = word;
    let title_box = document.getElementById("title_box");
    title_box.style.visibility = "visible";
    let items_container = document.getElementById("items_container");
    items_container.style.visibility = "visible";
    let decision = document.getElementById("decision");
    decision.style.visibility = "visible";
}

//接続選択のためのプログラム
function select_connection(place) {
    if (check_counter != 0) {
        return;
    }
    if (connection != -1) {
        past_selection = document.getElementById("connection_" + connection);
        past_selection.style.color = "#fff";
        past_selection.style.borderColor = "#fff";
    }
    connection = place.id.substring(11) - 0;
    place.style.color = "#0ff";
    place.style.borderColor = "#0ff";
}

//活用記入のためのプログラム
function set_text(place) {
    if (check_counter != 0) {
        return;
    }
    let text = window.prompt("表のこの部分に該当する活用を入力", place.innerHTML);
    if (text == "") {
        place.innerHTML = "◯";
        text_list[place.id.substring(9) - 0] = "◯";
    }else if(text == null) {
        place.innerHTML = "◯";
        text_list[place.id.substring(9) - 0] = "◯";
    }else {
        place.innerHTML = text;
        text_list[place.id.substring(9) - 0] = text;
    }
}

//意味選択のためのプログラム
function select_meaning(place) {
    if (check_counter != 0) {
        return;
    }
    meaning = place.id.substring(8) - 0;
    if (meaning_list[meaning] == 0) {
        meaning_list[meaning] = 1;
        place.style.color = "#0ff";
        place.style.borderColor = "#0ff";
    }else {
        meaning_list[meaning] = 0;
        place.style.color = "#fff";
        place.style.borderColor = "#fff";
    }
}


//正誤判定及びその後の処理
function check() {
    //正誤判定後の処理
    if (check_counter != 0) {
        if (sessionStorage.getItem("kobun_status") == "jyodoshi_random") {
            location.href = "../kobun.html";
            return;
        }
        if (jyodoshi_remaining.length == 0) {
            sessionStorage.setItem("jyodoshi_remaining", "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30");
            if (sessionStorage.getItem("kobun_status") == "jyodoshi_all") {
                alert("全制覇！");
                location.href = "../kobun.html";
                return;
            }
        }
        let jyodoshi_number = jyodoshi_remaining[Math.floor(Math.random()*jyodoshi_remaining.length)];
        sessionStorage.setItem("jyodoshi_number", jyodoshi_number);
        if (sessionStorage.getItem("kobun_status") == "jyodoshi_all") {
            location.reload();
        }else {
            let link_list = sessionStorage.getItem("link_list").split(",");
            if (link_list[0] == "") {
                alert("全制覇！");
                location.href = "../kobun.html";
                return;
            }
            let next_page = link_list[0];
            link_list.shift();
            sessionStorage.setItem("link_list", link_list);
            location.href = next_page;
        }
    }
    //正誤判定
    check_counter = 1;
    let miss_color = "#999";
    let highlight_color = "#ff0";
    let miss_counter = 0;
    if (connection != true_connection) {
        miss_counter += 1;
        if (connection != -1) {
            let mistake = document.getElementById("connection_" + connection);
            mistake.style.color = miss_color;
            mistake.style.borderColor = miss_color;
        }
        let answer = document.getElementById("connection_" + true_connection);
        answer.style.color = highlight_color;
        answer.style.borderColor = highlight_color;
    }
    for (let i = 0; i < 12; i++) {
        if (text_list[i] != true_text_list[i]) {
            miss_counter += 1;
            let mistake = document.getElementById("katsuyou_" + i);
            mistake.innerHTML = true_text_list[i];
            mistake.style.color = highlight_color;
        }
    }
    for (let i = 0; i < 41; i++) {
        if (meaning_list[i] == true_meaning_list[i]) {
            continue;
        }else if (meaning_list[i] < true_meaning_list[i]) {
            miss_counter += 1;
            let answer = document.getElementById("meaning_" + i);
            answer.style.color = highlight_color;
            answer.style.borderColor = highlight_color;
        }else {
            miss_counter += 1;
            let mistake = document.getElementById("meaning_" + i);
            mistake.style.color = miss_color;
            mistake.style.borderColor = miss_color;
        }
    }
    if (miss_counter == 0) {
        let perfect = document.getElementById("perfect");
        perfect.style.visibility = "visible";
    }
    let decision = document.getElementById("decision");
    if (sessionStorage.getItem("kobun_status") == "jyodoshi_random") {
        decision.innerHTML = "戻る";
    }else {
        decision.innerHTML = "次へ";
    }
}


//メイン
function main(jyodoshi_number) {
    jyodoshi_remaining = sessionStorage.getItem("jyodoshi_remaining");
    if (jyodoshi_remaining == null) {
        jyodoshi_remaining = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";
    }
    jyodoshi_remaining = jyodoshi_remaining.split(",");
    if (sessionStorage.getItem("kobun_status") != "jyodoshi_random") {
        let new_jyodoshi_remaining = jyodoshi_remaining.filter(i => i - 0 != jyodoshi_number);
        jyodoshi_remaining = new_jyodoshi_remaining;
    }
    sessionStorage.setItem("jyodoshi_remaining", jyodoshi_remaining);
    let current_jyodoshi = jyodoshi_list[jyodoshi_number];
    word = current_jyodoshi[0];
    true_connection = current_jyodoshi[1];
    true_text_list = current_jyodoshi[2];
    true_meaning_list = current_jyodoshi[3];
}