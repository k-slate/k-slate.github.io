onload = function(keytype){
    password_check(keytype);
}


function password_check(keytype) {
    let key;
    switch(keytype) {
        case "iGeo":
            key = "iwillgetagoldmedal";
            break;
        default:
            key = "example";
            break;
    }
    
    let word = sessionStorage.getItem("password_no1");
    for (let i = 3; i > 0; i--) {
        if (word != key) {
            word = window.prompt(`パスワードを入力（残り${i}回）："`, "");
        }
        if (word == key) {
            sessionStorage.setItem("password_no1", word);
            let body = document.getElementsByTagName("body")[0];
            body.style.visibility = "visible";
            return;
        }
    }
    alert("認証に失敗。前のページに遷移します。");
    history.back();
    return;
}
