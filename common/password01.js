onload = function(){
    password_check();
}


const key = "example";

function password_check() {
    let word = sessionStorage.getItem("password_no1");
    for (let i = 3; i > 0; i--) {
        if (word != key) {
            word = window.prompt(`パスワードを入力（残り${i}回）："`, "");
        }
        if (word == key) {
            sessionStorage.setItem("password_no1", word);
            let body = document.getElementsByTagName("body")[0];
            return;
        }
    }
    alert("認証に失敗。前のページに遷移します。");
    history.back();
    return;
}
