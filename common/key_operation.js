function key_operation (key_code) {
    let e = new KeyboardEvent("keydown", {key: key_code});
    document.dispatchEvent(e);
}
