function search_words (key, words) {
    if (words.indexOf(key) != -1) {
        return true;
    }else {
        return false;
    }
}


function title_search (word_place) {
    //ここで検索をかけ、引っかからなかったものを非表示にする
    let word = word_place.value;
    let blogs_list = document.getElementsByClassName("blog");
    for (let i = 0; i < blogs_list.length; i++) {
        let blogs = blogs_list[i];
        for (let j = 0; j < blogs.children.length; j++) {
            let blog = blogs.children[j];
            let blog_title = blogs.children[j].innerHTML;
            let word_exist = search_words(word, blog_title);
            if (blog.nodeName == "A") {
                if (word_exist) {
                    blog.style.display = "inline";
                }else {
                    blog.style.display = "none";
                }
            }
        }
    }
    //ここで全てが非表示になった月に対して、月のタイトル自体を非表示にする
    let monthly_blocks = document.getElementsByClassName("monthly_block");
    for (let i = 0; i < monthly_blocks.length; i++) {
        let monthly_block = monthly_blocks[i];
        //let monthly_title = monthly_block.getElementsByClassName("monthly_title")[0];
        let monthly_blogs = monthly_block.getElementsByClassName("blog")[0];
        let a_count = 0;
        let none_count = 0;
        for (let j = 0; j < monthly_blogs.children.length; j++) {
            if (monthly_blogs.children[j].nodeName == "A") {
                a_count += 1;
            }
            if (monthly_blogs.children[j].style.display == "none") {
                none_count += 1;
            }
        }
        if (none_count >= a_count) {
            monthly_block.style.display = "none";
        }else {
            monthly_block.style.display = "block";
        }
    }
}


function search_date() {
    const since = document.getElementById("since");
    const until = document.getElementById("until");
    const container = document.getElementById("monthly-block-container");
    let since_date = since.value;
    let until_date = until.value;
    let monthly_date = until_date.slice(0, 7);
    //ここで日付から絞る
    for (let i = 0; i < container.children.length; i++) {
        let monthly_block = container.children[i];
        if ((since_date != "") && (monthly_block.nodeName == "DIV") && (monthly_block.id < since_date)) {
            monthly_block.style.display = "none";
        } else if ((monthly_date != "") && (monthly_block.nodeName == "DIV") && (monthly_block.id.slice(0, 7) > monthly_date)) {
            monthly_block.style.display = "none";
        } else {
            monthly_block.style.display = "block";
            let blog = monthly_block.getElementsByClassName("blog")[0];
            for (let j = 0; j < blog.children.length; j++) {
                if ((since_date != "") && (blog.children[j].id < since_date)) {
                    blog.children[j].style.display = "none";
                } else if ((until_date != "") && (blog.children[j].id > until_date)) {
                    blog.children[j].style.display = "none";
                } else{
                    blog.children[j].style.display = "inline";
                }
            }
        }
    }
}


function search_since() { 
    const since = document.getElementById("since");
    const until = document.getElementById("until");
    //untilがsinceよりも前のときに、untilを変更する
    if ((until.value != "") && (until.value < since.value)) {
        since.value = "";
        alert("検索開始日が検索終了日よりも後になっているよ！！");
        return;
    }
    search_date();
}


function search_until() { 
    const since = document.getElementById("since");
    const until = document.getElementById("until");
    //untilがsinceよりも前のときに、sinceを変更する
    if ((since.value != "") && (until.value < since.value)) {
        until.value = "";
        alert("検索終了日が検索開始日よりも前になっているよ！！");
        return;
    }
    search_date();
}


function reset_date() {
    const since = document.getElementById("since");
    const until = document.getElementById("until");
    since.value = "";
    until.value = "";
}


onload = function(){
    const since = document.getElementById("since");
    since.addEventListener("blur", search_since);
    const until = document.getElementById("until");
    until.addEventListener("blur", search_until);
}