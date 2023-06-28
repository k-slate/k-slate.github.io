function virtual_keydown (key_code) {
    let e = new KeyboardEvent("keydown", {key: key_code});
    document.dispatchEvent(e);
}

function virtual_keyup () {
    let e = new KeyboardEvent("keyup");
    document.dispatchEvent(e);
}
