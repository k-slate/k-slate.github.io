onload = function(){
    let distingish_number = sessionStorage.getItem("distingish_number");
    if (distingish_number == null) {
        distingish_number = Math.floor(Math.random()*10);
    }
    if (sessionStorage.getItem("kobun_status") == null) {
        sessionStorage.setItem("kobun_status", "distingish_random");
    }
    let title_box = document.getElementById("title_box");
    title_box.style.visibility = "hidden";
    let items_container = document.getElementById("items_container");
    items_container.style.visibility = "hidden";
    main(distingish_number);
}


//こたえ
let word = "";
let leader_list;
let true_blank_list;
let explaination_list;

//入力される値を保持する変数
let blank_list = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

//その他運用のための変数
let distingish_remaining;
let check_counter = 0;
let chosen_blank = -1;


//辞書
let distingish_list = [
["し", ["＋「し」", "「し」", "という意味の「し」", "「し」＋"], [1,-1,28,-1,16,-1,-1,9], ["：過去の助動詞「き」の連体形","：強意の副助詞","：サ変動詞「す」の連用形","：サ変動詞「す」の連用形"]], 
["しか", ["＋「しか」＋", "＋「しか」", "＋「しか」＋", "「しか」", "「しか」", "という意味の「しか」"], [1,10,2,-1,1,27,24,-1,22,-1,17,-1], ["：過去の助動詞「き」の已然形","：過去の助動詞「き」の已然形","：過去の助動詞「き」の連体形＋係助詞「か」","：助動詞の未然形・已然形の一部","：終助詞の一部","：副詞の「しか」"]], 
["けれ", ["＋「けれ」", "＋「けれ」", "「けれ」", "という意味の「けれ」", "＋「けれ」"], [1,-1,19,-1,25,-1,15,-1,18,-1], ["：過去の助動詞「けり」の已然形","：形容詞の已然形の活用語尾","：助動詞の一部","：カ行下一段活用動詞の已然形・命令形","：カ行四段活用動詞の已然形活用語尾＋完了の助動詞「り」の已然形"]], 
["なむ", ["＋「なむ」", "＋「なむ」", "＋「なむ」", "＋「なむ」", "＋「なむ」"], [0,-1,1,-1,5,-1,12,-1,21,-1], ["：願望の終助詞","：完了・確述の助動詞「ぬ」の未然形＋推量の助動詞「む」の終止形・連体形","：係助詞","：係助詞","：ナ変動詞の未然形活用語尾＋推量の助動詞「む」の終止形・連体形"]], 
["ぬ", ["＋「ぬ」", "＋「ぬ」", "＋「ぬ」", "の活用語尾"], [0,-1,1,-1,21,-1,13,-1], ["：打消の助動詞「ず」の連体形","：完了の助動詞「ぬ」の終止形","：ナ変動詞の活用語尾",""]], 
["ね", ["＋「ね」", "の「ね」", "＋「ね」", "の「ね」", "＋「ね」", "の活用語尾"], [0,-1,6,-1,1,-1,7,-1,21,-1,13,-1], ["：打消の助動詞「ず」の已然形","：打消の助動詞「ず」の已然形","：完了の助動詞「ぬ」の命令形","：完了の助動詞「ぬ」の命令形","：ナ変動詞の活用語尾",""]], 
["に", ["＋「に」", "＋「に」", "＋「に」", "の一部の「に」", "＋「に」", "＋「に」"], [1,-1,21,-1,11,-1,14,-1,5,-1,4,-1], ["：完了の助動詞「ぬ」の連体形","：ナ変動詞の連用形活用語尾","：形容動詞ナリ活用の連用形活用語尾","","：断定の助動詞の連用形・格助詞","：接続助詞"]], 
["なり", ["＋「なり」", "＋「なり」", "＋「なり」", "＋「なり」", "＋「なり」"], [5,-1,3,-1,11,-1,1,-1,23,-1], ["：断定の助動詞","：伝聞・推定の助動詞","：形容動詞ナリ活用の活用語尾","：ラ行四段動詞","：ラ行四段動詞"]], 
["らむ", ["＋「らむ」", "＋「らむ」", "＋「らむ」", "＋「らむ」＋"], [3,-1,8,-1,20,-1,26,27], ["：現在推量の助動詞「らむ」の終止形・連体形","：完了の助動詞「り」の未然形＋推量の助動詞「む」の終止形・連体形","：ラ行に活用する用言や助動詞の未然形活用語尾＋推量の助動詞「む」の終止形・連体形","：「にやあらむ」の転"]], 
["にて", ["＋「にて」", "＋「にて」", "＋「にて」"], [5,-1,1,-1,11,-1], ["：格助詞「にて」・断定の助動詞「なり」の連用形＋接続助詞「て」","：完了の助動詞「ぬ」の連用形＋接続助詞「て」","：形容動詞ナリ活用連用形活用語尾＋接続助詞「て」"]]
];


//問う識別を設定する
function word_setting(place){
    let starter = document.getElementById("starter");
    starter.style.visibility = "hidden";
    let word_title = document.getElementById("word_title");
    word_title.innerHTML = word;
    for (let i = 0; i < 6; i++) {
        if (i < leader_list.length) {
            let blank_former = document.getElementById("blank_" + (i * 2));
            let blank_latter = document.getElementById("blank_" + (i * 2 + 1));
            let leader = document.getElementById("leader_" + i);
            let explaination = document.getElementById("explaination_" + i);
            if (true_blank_list[i * 2] == -1) {
                blank_former.style.display = "none";
            }
            if (true_blank_list[i * 2 + 1] == -1) {
                blank_latter.style.display = "none";
            }
            leader.innerHTML = leader_list[i];
            explaination.innerHTML = explaination_list[i];
        }else {
            let distingish_text = document.getElementById("distingish_" + i);
            distingish_text.style.display = "none";
        }
    }
    let title_box = document.getElementById("title_box");
    title_box.style.visibility = "visible";
    let items_container = document.getElementById("items_container");
    items_container.style.visibility = "visible";
    let group = document.getElementsByClassName("group");
    for (let i = 0; i < group.length; i++) {
        group[i].style.transition = "0.5s";
    }
    let decision = document.getElementById("decision");
    decision.style.visibility = "visible";
}

//接続選択のためのプログラム
function distingish(place) {
    if (check_counter != 0) {
        return;
    }
    let current_blank = place.id.substring(6) - 0;
    if (chosen_blank == current_blank) {
        chosen_blank = -1;
        place.style.color = "#fff";
        place.style.borderColor = "#fff";
    }else {
        if (chosen_blank != -1) {
            let past_chosen_blank = document.getElementById("blank_" + chosen_blank);
            past_chosen_blank.style.color = "#fff";
            past_chosen_blank.style.borderColor = "#fff";
        }
        chosen_blank = current_blank;
        place.style.color = "#0ff";
        place.style.borderColor = "#0ff";
    }
}

//語群から挿入するプログラム
function fill_blank(place) {
    if (check_counter != 0) {
        return;
    }
    if (chosen_blank == -1) {
        alert("先に右側の空欄のいずれかを選択してください。");
        return;
    }else {
        let blank = document.getElementById("blank_" + chosen_blank);
        blank.innerHTML = "";
        blank.innerHTML = place.innerHTML;
        blank_list[chosen_blank] = place.id.substring(5) - 0;
    }
}

//正誤判定及びその後の処理
function check() {
    //正誤判定後の処理
    if (check_counter != 0) {
        if (sessionStorage.getItem("kobun_status") == "distingish_random") {
            location.href = "../kobun.html";
            return;
        }
        if (distingish_remaining.length == 0) {
            sessionStorage.setItem("distingish_remaining", "0,1,2,3,4,5,6,7,8,9");
            if (sessionStorage.getItem("kobun_status") == "distingish_all") {
                alert("全制覇！");
                location.href = "../kobun.html";
                return;
            }
        }
        let distingish_number = distingish_remaining[Math.floor(Math.random()*distingish_remaining.length)];
        sessionStorage.setItem("distingish_number", distingish_number);
        if (sessionStorage.getItem("kobun_status") == "distingish_all") {
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
    let standard_color = "#fff";
    let highlight_color = "#ff0";
    let miss_counter = 0;
    for (let i = 0; i < true_blank_list.length; i++) {
        if (blank_list[i] == true_blank_list[i]) {
            let blank = document.getElementById("blank_" + i);
            blank.style.color = standard_color;
            blank.style.borderColor = standard_color;
            continue;
        }else {
            miss_counter += 1;
            let miss_blank = document.getElementById("blank_" + i);
            let answer = document.getElementById("item_" + true_blank_list[i]);
            miss_blank.innerHTML = "";
            miss_blank.innerHTML = answer.innerHTML;
            miss_blank.style.color = highlight_color;
            miss_blank.style.borderColor = highlight_color;
        }
    }
    if (miss_counter == 0) {
        let perfect = document.getElementById("perfect");
        perfect.style.visibility = "visible";
    }
    let decision = document.getElementById("decision");
    if (sessionStorage.getItem("kobun_status") == "distingish_random") {
        decision.innerHTML = "戻る";
    }else {
        decision.innerHTML = "次へ";
    }
}


//メイン
function main(distingish_number) {
    distingish_remaining = sessionStorage.getItem("distingish_remaining");
    if (distingish_remaining == null) {
        distingish_remaining = "0,1,2,3,4,5,6,7,8,9";
    }
    distingish_remaining = distingish_remaining.split(",");
    if (sessionStorage.getItem("kobun_status") != "distingish_random") {
        let new_distingish_remaining = distingish_remaining.filter(i => i - 0 != distingish_number);
        distingish_remaining = new_distingish_remaining;
    }
    sessionStorage.setItem("distingish_remaining", distingish_remaining);
    let current_distingish = distingish_list[distingish_number];
    word = current_distingish[0];
    leader_list = current_distingish[1];
    true_blank_list = current_distingish[2];
    explaination_list = current_distingish[3];
}