onload = function(){
    password_check();
}


const key = "example";

function password_check() {
    let document_html = document.getElementsByTagName("html")[0];
    document_html.style.height = "100%";
    let document_body = document.getElementsByTagName("body")[0];
    document_body.style.height = "100%";
    let cover = document.createElement("div");
    cover.style.backgroundColor = "black";
    cover.style.position = "absolute";
    cover.style.top = "0";
    cover.style.left = "0";
    cover.style.width = "100%";
    cover.style.height = "100%";
    cover.style.margin = "0";
    cover.style.padding = "0";
    document_body.appendChild(cover);
    
    //パスワード認証のプログラム
    function check() {
        let word = sessionStorage.getItem("password_no1");
        for (let i = 3; i > 0; i--) {
            if (word != key) {
                word = window.prompt(`パスワードを入力（残り${i}回）："`, "");
            }
            if (word == key) {
                sessionStorage.setItem("password_no1", word);
                cover.style.display = "none";
                return;
            }
        }
        alert("認証に失敗。前のページに遷移します。");
        history.back();
    }
    
    setTimeout(check, 1);
}
