onload = function(){
}


function not_yet() {
    alert("調整中");
}

function all_items_random() {
    let all_items_number = Math.floor(Math.random()*93);
    if (all_items_number < 31) {
        sessionStorage.setItem("jyodoshi_number", all_items_number);
        sessionStorage.setItem("kobun_status", "jyodoshi_random");
        location.href = "./jyodoshi/jyodoshi.html";
        return;
    }else if (all_items_number < 83) {
        sessionStorage.setItem("jyoshi_number", all_items_number - 31);
        sessionStorage.setItem("kobun_status", "jyoshi_random");
        location.href = "./jyoshi/jyoshi.html";
        return;
    }else {
        sessionStorage.setItem("distingish_number", all_items_number - 83);
        sessionStorage.setItem("kobun_status", "distingish_random");
        location.href = "./distingish/distingish.html";
        return;
    }
}

function all_items_all() {
    let link_list = [];
    let before_distribute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92];
    for (let i = 0; i < 93; i++) {
        let chosen_number = before_distribute[Math.floor(Math.random()*before_distribute.length)];
        let after_distribute = before_distribute.filter(i => i - 0 != chosen_number);
        before_distribute = after_distribute;
        if (chosen_number < 31) {
            link_list.push("../jyodoshi/jyodoshi.html");
        }else if (chosen_number < 83) {
            link_list.push("../jyoshi/jyoshi.html");
        }else {
            link_list.push("../distingish/distingish.html");
        }
    }
    let primary = link_list[0].substring(1);
    link_list.shift();
    sessionStorage.setItem("link_list", link_list);
    sessionStorage.setItem("kobun_status", "all_items_all");
    alert("拷問のはじまり。楽しんで。");
    location.href = primary;
}

function jyodoshi_random() {
    let jyodoshi_number = Math.floor(Math.random()*31);
    sessionStorage.setItem("jyodoshi_number", jyodoshi_number);
    sessionStorage.setItem("kobun_status", "jyodoshi_random");
    location.href = "./jyodoshi/jyodoshi.html";
}

function jyodoshi_all() {
    let jyodoshi_number = Math.floor(Math.random()*31);
    sessionStorage.setItem("jyodoshi_number", jyodoshi_number);
    sessionStorage.setItem("kobun_status", "jyodoshi_all");
    alert("拷問のはじまり。楽しんで。");
    location.href = "./jyodoshi/jyodoshi.html";
}

function jyoshi_random() {
    let jyoshi_number = Math.floor(Math.random()*52);
    sessionStorage.setItem("jyoshi_number", jyoshi_number);
    sessionStorage.setItem("kobun_status", "jyoshi_random");
    location.href = "./jyoshi/jyoshi.html";
}

function jyoshi_all() {
    let jyoshi_number = Math.floor(Math.random()*52);
    sessionStorage.setItem("jyoshi_number", jyoshi_number);
    sessionStorage.setItem("kobun_status", "jyoshi_all");
    alert("拷問のはじまり。楽しんで。");
    location.href = "./jyoshi/jyoshi.html";
}

function distingish_random() {
    let distingish_number = Math.floor(Math.random()*10);
    sessionStorage.setItem("distingish_number", distingish_number);
    sessionStorage.setItem("kobun_status", "distingish_random");
    location.href = "./distingish/distingish.html";
}

function distingish_all() {
    let distingish_number = Math.floor(Math.random()*10);
    sessionStorage.setItem("distingish_number", distingish_number);
    sessionStorage.setItem("kobun_status", "distingish_all");
    alert("拷問のはじまり。楽しんで。");
    location.href = "./distingish/distingish.html";
}

function clearance() {
    sessionStorage.removeItem("link_list");
    sessionStorage.removeItem("jyodoshi_number");
    sessionStorage.removeItem("jyoshi_number");
    sessionStorage.removeItem("distingish_number");
    sessionStorage.removeItem("kobun_status");
    alert("浄化完了");
}