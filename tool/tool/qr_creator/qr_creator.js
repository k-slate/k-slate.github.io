function draw_qr () {
    let words = document.getElementById("words_entry").value;
    let qr_window = document.getElementById("qr_window");
    let qr_size = document.getElementById("qr_size").value;
    let url = "https://chart.apis.google.com/chart?chs=" + qr_size + "x" + qr_size + "&cht=qr&chl=" + words;
    qr_size = qr_size - 0 + 4;
    qr_window.style.display = "block";
    qr_window.style.width = qr_size + "px";
    qr_window.style.height = qr_size + "px";
    qr_window.src = url;
}