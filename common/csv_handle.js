//csvの読み込み
async function import_csv(file_place) {
    let req = new XMLHttpRequest();
    req.open("get", file_place, true);
    req.send(null);
    
    //配列に変換
    async function csv_to_array(str) {
        let tmp = str.split("\n");
        
        for(let i = 0; i < tmp.length; i++) {
            result[i] = tmp[i].split(',');
        }
    }
	
	let result = [];
    req.onload = function() {
        csv_to_array(req.responseText);
        return;
    };
    return result;
}