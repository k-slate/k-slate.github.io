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
    let drawer_list = document.getElementsByClassName("drawer");
    for (let i = 0; i < drawer_list.length; i++) {
        let drawer = drawer_list[i];
        for (let j = 0; j < drawer.children.length; j++) {
            let object = drawer.children[j];
            let object_title = object.innerHTML;
            let word_exist = search_words(word, object_title);
            if (object.nodeName == "A") {
                if ((word != "") && (word_exist) && (object.className != "escape")) {
                    object.style.display = "inline";
                }else {
                    object.style.display = "none";
                }
            }
        }
    }
}


function change_drawer(e) {
    let shelf = e.parentNode;
    let drawer = shelf.getElementsByClassName("drawer")[0];
    for (let i = 0; i < drawer.children.length; i++) {
        let object = drawer.children[i];
        if ((object.style.display == "") || (object.style.display == "none")) {
            object.style.display = "inline";
        }else {
            object.style.display = "none";
        }
    }
}