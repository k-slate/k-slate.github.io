function tight_display (open_button) {
    open_button.style.display = "none";
    open_button.children[1].style.display = "none";
    
    let menu = window.parent.document.getElementsByClassName("menu")[0];
    menu.style.width = "100%";
    menu.style.height = "calc(50% + 80px)";
    menu.style.borderRadius = "0";
    menu.style.borderBottomWidth = "2px";
    menu.style.borderBottomColor= "white";
    menu.style.borderBottomStyle = "double";
    menu.style.top = "0";
    menu.style.left = "0";
    menu.style.backgroundColor = "transparent";
    
    let close_button = document.getElementsByClassName("close_button")[0];
    close_button.style.display = "block";
    close_button.style.bottom = "0";
    close_button.children[0].style.display = "inline";
    
    let block = document.getElementsByClassName("block");
    for (let i = 0; i < block.length; i++) {
        block[i].style.width = "50%";
    }
    
    let menu_ball = document.getElementsByClassName("menu_ball");
    for (let i = 0; i < menu_ball.length; i++) {
        menu_ball[i].style.display = "block";
    }
    
    let menu_body = document.getElementsByTagName("body")[0];
    menu_body.style.backgroundColor = "#181818dd";
}


function tight_clear (close_button) {
    close_button.style.display = "none";
    close_button.children[0].style.display = "none";
    
    let menu = window.parent.document.getElementsByClassName("menu")[0];
    menu.style.width = "100px";
    menu.style.height = menu.style.width;
    menu.style.borderRadius = "50%";
    menu.style.borderBottomWidth = "0";
    menu.style.borderBottomColor= "";
    menu.style.borderBottomStyle = "";
    menu.style.top = "";
    menu.style.bottom = "30px";
    menu.style.left = "30px";
    menu.style.backgroundColor = "transparent";
    
    let open_button = document.getElementsByClassName("open_button")[0];
    open_button.style.display = "block";
    open_button.style.top = "0";
    open_button.children[1].style.display = "inline";
    
    let block = document.getElementsByClassName("block");
    for (let i = 0; i < block.length; i++) {
        block[i].style.width = "100%";
    }
    
    let menu_ball = document.getElementsByClassName("menu_ball");
    for (let i = 0; i < menu_ball.length; i++) {
        menu_ball[i].style.display = "none";
    }
    
    let menu_body = document.getElementsByTagName("body")[0];
    menu_body.style.backgroundColor = "transparent"
}