function starter (that) {
    dictionary_making();
    setTimeout(() => {
        setting();
        word_select(1);
        that.style.display = "none";
        let quiz_area = document.getElementById("quiz_area");
        quiz_area.style.display = "block";
        let table_container = document.getElementById("table_container");
        table_container.style.display = "block";
    }, 100);
}


let dictionary = [];

//let selected_sections = document.getElementById("section_selector");
let section_numbers = [];
let whether_selected = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let selected_word_number = 0;
let new_dictionary = [];
let miss_list = [];

let Japanese_word;
let words_entry;
let button;
let circle;
let miss_table;

let question;
let answer;

let current_status = 0;


//csvファイルから辞書を作成
async function dictionary_making() {
    for (let i = 1; i < 11; i++) {
        let section = await import_csv(`./section${('00' + i).slice( -2 )}.csv`);
        dictionary.push(section);
    }
}


//初期設定
function setting() {
    Japanese_word = document.getElementById("Japanese_word");
    words_entry = document.getElementById("words_entry");
    button = document.getElementById("decision");
    circle = document.getElementById("circle");
    miss_table = document.getElementById("miss_table");

    for (let i = 0; i < dictionary.length; i++) {
        section_numbers.push(dictionary[i].length);
        selected_word_number += section_numbers[i] * whether_selected[i];
    }
    
    for (let i = 0; i < dictionary.length; i++) {
        if (whether_selected[i] == 0) {
            break;
        }else {
            new_dictionary = new_dictionary.concat(dictionary[i]);
        }
    }
    return;
}


//問題を提示する
function word_select(attribute = 0) {
    if (current_status == 1) {
    	return;
    }
    
    if ((selected_word_number == 0) && (attribute == 0)) {
        alert("走破！お疲れ様！");
        current_status = 1;
        button.innerHTML = "誤答を周回";
        button.setAttribute("onclick", "next_round()");
        return;
    }
    
    words_entry.removeAttribute("readonly");
    let chosen = Math.floor(Math.random()*selected_word_number);
    question = new_dictionary[chosen][1];
    answer= new_dictionary[chosen][0];
    Japanese_word.innerHTML = question;
    words_entry.style.color = "black";
    words_entry.value = "";
    
    selected_word_number --;
    new_dictionary.splice(chosen, 1);
    button.innerHTML = "決定（Enterキーで代用）";
    button.setAttribute("onclick", "check()");
    circle.style.visibility = "hidden";
    return;
}


//正誤判定
function check() {
    if (current_status == 1) {
    	return;
    }
    
    words_entry.setAttribute("readonly", true);
    if (words_entry.value == answer) {
        circle.style.visibility = "visible";
    }else {
        let new_missing = document.createElement("tr");
        new_missing.innerHTML = `<th>${question}</th><th>${words_entry.value}</th><th>${answer}</th>`;
        miss_table.appendChild(new_missing);
        miss_list.push([question, answer]);
        words_entry.style.color = "red";
        words_entry.value = answer;
    }
    
    button.innerHTML = "次へ（Enterキーで代用）";
    button.setAttribute("onclick", "word_select()");
}


function next_round() {
    new_dictionary = miss_list.slice();
    current_status = 0;
    miss_list = [];
    selected_word_number = new_dictionary.length;
    miss_table.innerHTML = "<tr><th>問題</th><th>あなたの解答</th><th>正答</th></tr>";
    word_select(1);
}


document.addEventListener('keydown', (event) => {
    let key = event.key;
        
    if (key == "Enter") {
        event.preventDefault();
        if (button.getAttribute("onclick") == "check()") {
            check();
        }else if (button.getAttribute("onclick") == "word_select()") {
        	word_select();
        }else {
        	return;
        }
    }
});
