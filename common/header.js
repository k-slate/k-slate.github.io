function tight_display (open_button) {
    open_button.style.display = "none";
    let close_button = document.getElementsByClassName("close_button")[0];
    close_button.style.display = "block";
    
    let menu = window.parent.document.getElementsByClassName("menu")[0];
    menu.style.display = "block";
}


function tight_clear (close_button) {
    close_button.style.display = "none";
    let open_button = document.getElementsByClassName("open_button")[0];
    open_button.style.display = "block";
    
    let menu = window.parent.document.getElementsByClassName("menu")[0];
    menu.style.display = "none";
}
