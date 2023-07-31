let loop;
let ratio;
let g = 0.015;

const launch = 0.005;
//[lg_01, st_01, st_02, st_03, st_04, db_01, db_02, fl_01, fl_02, flower, planet]
const probability = [1, 1, 15, 15, 15, 10, 10, 5, 5, 3, 5, 3];
let std_probability = [];


function fireworks() {
    //canvasの設定
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    
    //残像を適度に残しながら、光が残り続けないようにする
    ctx.fillStyle = "rgba(0, 0, 1, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //花火を打ち上げる部分
    let select = Math.random();
    if (select < std_probability[0]) {
        //後の処理は、firework関数に任せる
        firework_lg_01();
    } else if (select < std_probability[1]) {
        firework_lg_02();
    } else if (select < std_probability[2]) {
        firework_st_01();
    } else if (select < std_probability[3]) {
        firework_st_02();
    } else if (select < std_probability[4]) {
        firework_st_03();
    } else if (select < std_probability[5]) {
        firework_st_04();
    } else if (select < std_probability[6]) {
        firework_db_01();
    } else if (select < std_probability[7]) {
        firework_db_02();
    } else if (select < std_probability[8]) {
        firework_fl_01();
    } else if (select < std_probability[9]) {
        firework_fl_02();
    } else if (select < std_probability[10]) {
        firework_flower();
    } else if (select < std_probability[11]) {
        firework_planet();
    }
}


//巨大01
function firework_lg_01(array = []) {
    //初期設定
    if (array.length == 0) {
        //第一引数：花火が開くまでのフレーム数
        //第二引数：現在のフレーム数(0)
        //第三引数：打ち上げ直後の花火の色
        //第四引数：打ち上げ場所[r_x, r_y]
        //第五引数：初速[v_x, v_y]
        //第六引数：星の数
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 2, canvas.height], [(Math.random() * 0.8 - 0.4) * ratio, -5.5 * ratio], 800);
    }
    //花火が開くまでのフレーム数（定数）
    let t = array[0];
    //花火が打ち上げられてからのフレーム数
    let counter = array[1];
    //[r, g, b, a]の配列
    let color_list = array[2];
    //位置の配列[r_x, r_y]
    let r_list = array[3];
    //速度の配列[v_x, v_y]
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        //花火が開くところの処理
        if (t == counter) {
            //飛び散る星に初速を与える
            let v = 6 - Math.random() * 0.2;
            v *= ratio;
            //弾道計算
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            //星の色を決める
            color_list[i] = [255, 200, 100, 1];
        }
        //花火・星の位置計算
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        //減光の処理
        if (t > counter) {
            color_list[i][3] *= 0.99;
        } else {
            if (Math.random() * Math.random() * 250 + 100 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        //描画
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_lg_01, 10, [t, counter, color_list, r_list, v_list]);
}

//巨大02
function firework_lg_02(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 2, canvas.height], [(Math.random() * 0.8 - 0.4) * ratio, -6.0 * ratio], 800);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let v = 2.5 - Math.random() * 0.2;
            v *= ratio;
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            color_list[i] = [255, 200, 100, 1];
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.99;
        } else {
            if (Math.random() * Math.random() * 250 + 200 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        //描画
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_lg_02, 10, [t, counter, color_list, r_list, v_list]);
}

//標準01
function firework_st_01(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 50) + 400);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let v;
            if (Math.random() > 0.35) {
                v = 3 - Math.random() * 0.1;
                color_list[i] = [255, 0, 0, 1];
            }else {
                v = 1.8 - Math.random() * 0.1;
                color_list[i] = [50, 255, 150, 1];
            }
            v *= ratio;
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_st_01, 10, [t, counter, color_list, r_list, v_list]);
}

//標準02
function firework_st_02(array = []) {
　if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 50) + 400);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let v;
            if (Math.random() > 0.3) {
                v = 3 - Math.random() * 0.1;
                color_list[i] = [100, 170, 255, 1];
            }else {
                v = 1.5 - Math.random() * 0.1;
                color_list[i] = [255, 255, 150, 1];
            }
            v *= ratio;
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_st_02, 10, [t, counter, color_list, r_list, v_list]);
}

//標準03
function firework_st_03(array = []) {
　if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 50) + 350);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let v;
            v = 3 - Math.random() * 0.1;
            if (Math.random() > 0.5) {
                color_list[i] = [255, 30, 120, 1];
            }else {
                color_list[i] = [120, 255, 30, 1];
            }
            v *= ratio;
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_st_03, 10, [t, counter, color_list, r_list, v_list]);
}

//標準04
function firework_st_04(array = []) {
　if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 50) + 350);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let v;
            v = 3 - Math.random() * 0.1;
            v *= ratio;
            color_list[i] = [255, 50, 0, 1];
            let theta = Math.random() * Math.PI - Math.PI / 2;
            let phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 10) {
                color_list[i][0] -= (1- Math.random() * Math.random()) * 3;
                color_list[i][2] += (1- Math.random() * Math.random()) * 3;
            }
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_st_04, 10, [t, counter, color_list, r_list, v_list]);
}

//二段階01
function firework_db_01(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 10 + 20) * 10);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let v;
    let phi;
    let theta;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            if (i % 10 == 0) {
                v = 1 - Math.random() * 0.05;
                v *= ratio;
                theta = Math.random() * Math.PI - Math.PI / 2;
            　phi = Math.random() * Math.PI - Math.PI / 2;
            }
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            color_list[i] = [255, 255, 255, 1];
        }
        if (t + 70 == counter) {
            v = 1 - Math.random() * 0.05;
            v *= ratio;
            theta = Math.random() * Math.PI - Math.PI / 2;
            phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            let color_changer = Math.random() * 3;
            if (color_changer < 1) {
                color_list[i] = [255, 10, 70, 1];
            }else if (color_changer > 2) {
                color_list[i] = [70, 255, 10, 1];
            }else {
                color_list[i] = [10, 70, 255, 1];
            }
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (Math.random() * Math.random() * 175 + 100 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_db_01, 10, [t, counter, color_list, r_list, v_list]);
}

//二段階02
function firework_db_02(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (100 + 1 - 75)) + 75, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], Math.floor(Math.random() * 10 + 20) * 10);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let v;
    let phi;
    let theta;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            if (i % 10 == 0) {
                v = 0.75 - Math.random() * 0.01;
                v *= ratio;
                theta = Math.random() * Math.PI - Math.PI / 2;
            　phi = Math.random() * Math.PI - Math.PI / 2;
            }
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            color_list[i] = [255, 255, 100, 1];
        }
        if (t + 100 == counter) {
            v = 1.5 - Math.random() * 0.05;
            v *= ratio;
            theta = Math.random() * Math.PI - Math.PI / 2;
            phi = Math.random() * Math.PI - Math.PI / 2;
            v_list[i][0] += v * Math.cos(phi) * Math.sin(theta);
            v_list[i][1] += v * Math.sin(phi);
            if (Math.random() > 0.5) {
                color_list[i] = [100, 255, 150, 1];
            }else {
                color_list[i] = [100, 255, 50, 1];
            }
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.99;
        } else {
            if (Math.random() * Math.random() * 150 + 250 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_db_02, 10, [t, counter, color_list, r_list, v_list]);
}

//平面01
function firework_fl_01(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], 150);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let theta = Math.random() * Math.PI;
    let phi = Math.random() * Math.PI;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let psi = Math.random() * 2 * Math.PI;
            let v = 2 - Math.random() * 0.01;
            v *= ratio;
            v_list[i][0] += v * (Math.cos(theta) * Math.cos(psi) - Math.sin(theta) * Math.sin(psi) * Math.cos(phi));
            v_list[i][1] += v * Math.sqrt( 1 - Math.cos(psi) ** 2 - (Math.sin(psi) * Math.cos(phi)) ** 2) * Math.sin(psi) / Math.abs(Math.sin(psi));
            color_list[i] = [250, 250, 255, 1];
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (Math.random() * Math.random() * 100 + 75 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_fl_01, 10, [t, counter, color_list, r_list, v_list]);
}

//平面02
function firework_fl_02(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], 150);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let theta = Math.random() * Math.PI;
    let phi = Math.random() * Math.PI;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let psi = Math.random() * 2 * Math.PI;
            let v = 2 - Math.random() * 0.01;
            v *= ratio;
            v_list[i][0] += v * (Math.cos(theta) * Math.cos(psi) - Math.sin(theta) * Math.sin(psi) * Math.cos(phi));
            v_list[i][1] += v * Math.sqrt( 1 - Math.cos(psi) ** 2 - (Math.sin(psi) * Math.cos(phi)) ** 2) * Math.sin(psi) / Math.abs(Math.sin(psi));
            color_list[i] = [(Math.sin(psi + Math.PI * 0) + 1) / 2 * 255, (Math.sin(psi + Math.PI * (2 / 3)) + 1) / 2 * 255, (Math.sin(psi + Math.PI * (4 / 3)) + 1) / 2 * 255, 1];
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (Math.random() * Math.random() * 100 + 75 > counter - t) {
                color_list[i][3] = 1;
            }else {
                color_list[i][3] = 0;
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_fl_02, 10, [t, counter, color_list, r_list, v_list]);
}

//花
function firework_flower(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], 250);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let theta = Math.random() * Math.PI;
    let phi = Math.random() * Math.PI;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let psi;
            let v;
            if (Math.random() > 0.1) {
                psi = Math.random() * 2 * Math.PI * (5 / 3);
                v = 2 * Math.sin(psi * (5 / 3)) - Math.random() * 0.01;
                color_list[i] = [255, 175, 215, 1];
            }else {
                psi = Math.random() * 2 * Math.PI;
                v = (1 - Math.random() * Math.random()) * 0.5;
                color_list[i] = [255, 255, 150, 1];
            }
            v *= ratio;
            v_list[i][0] += v * (Math.cos(theta) * Math.cos(psi) - Math.sin(theta) * Math.sin(psi) * Math.cos(phi));
            v_list[i][1] += v * Math.sqrt( 1 - Math.cos(psi) ** 2 - (Math.sin(psi) * Math.cos(phi)) ** 2) * Math.sin(psi) / Math.abs(Math.sin(psi));
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_flower, 10, [t, counter, color_list, r_list, v_list]);
}

//惑星
function firework_planet(array = []) {
    if (array.length == 0) {
        array = initial_setting(Math.floor(Math.random() * (300 + 1 - 250)) + 250, 0, [255, 200, 100, 1], [canvas.width / 4 + Math.random() * (canvas.width / 2), canvas.height], [(Math.random() * 1.6 - 0.8) * ratio, -5.5 * ratio], 400);
    }
    let t = array[0];
    let counter = array[1];
    let color_list = array[2];
    let r_list = array[3];
    let v_list = array[4];
    if (counter > 1000) {
        return;
    }
    let theta = Math.random() * Math.PI;
    let phi = Math.random() * Math.PI;
    for (let i = 0; i < v_list.length; i++) {
        if (t == counter) {
            let psi;
            let v;
            if (Math.random() > 0.5) {
                psi = Math.random() * 2 * Math.PI;
                v = 2 - Math.random() * 0.01;
                v *= ratio;
                v_list[i][0] += v * (Math.cos(theta) * Math.cos(psi) - Math.sin(theta) * Math.sin(psi) * Math.cos(phi));
                v_list[i][1] += v * Math.sqrt( 1 - Math.cos(psi) ** 2 - (Math.sin(psi) * Math.cos(phi)) ** 2) * Math.sin(psi) / Math.abs(Math.sin(psi));
                color_list[i] = [250, 250, 255, 1];
            }else {
                v = 1 - Math.random() * 0.005;
                v *= ratio;
                let theta_self = Math.random() * Math.PI - Math.PI / 2;
                let phi_self = Math.random() * Math.PI - Math.PI / 2;
                v_list[i][0] += v * Math.cos(phi_self) * Math.sin(theta_self);
                v_list[i][1] += v * Math.sin(phi_self);
                color_list[i] = [100, 170, 255, 1];
            }
        }
        v_list[i] = [v_list[i][0], v_list[i][1] + g];
        r_list[i][0] += v_list[i][0];
        r_list[i][1] += v_list[i][1];
        if (t > counter) {
            color_list[i][3] *= 0.98;
        } else {
            if (counter - t > 65) {
                color_list[i][3] *= (0.95 + Math.random() * 0.02);
            }
        }
        draw(r_list[i][0], r_list[i][1], color_list[i]);
    }
    counter++;
    setTimeout(firework_planet, 10, [t, counter, color_list, r_list, v_list]);
}




function initial_setting(burst, current_frame, color, position, velocity, star) {
    let color_list = [];
    let r_list = [];
    let v_list = [];
    for (let i = 0; i < star; i++) {
        color_list[i] = color.slice();
        r_list[i] = position.slice();
        v_list[i] = velocity.slice();
    }
    return [burst, current_frame, color_list, r_list, v_list];
}


function draw(x, y, color) {
    const canvas = document.getElementById('canvas');
    if (! canvas || ! canvas.getContext){
        return false;
    }
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    ctx.beginPath();
    ctx.arc(x, y, 1 * ratio, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.fill();
}



function start_operation() {
    let header = document.getElementById("header");
    let contents = document.getElementById("contents");
    let main = document.getElementById("main");
    let canvas = document.getElementById("canvas");
    let close_button = document.getElementById("close_button");
    let footer = document.getElementById("footer");
    header.style.display = "none";
    contents.style.display = "none";
    main.style.display = "none";
    canvas.style.display = "block";
    close_button.style.display = "block";
    footer.style.display = "none";
    
    magnification = 2;
    canvas.width = canvas.clientWidth * magnification;
    canvas.height = canvas.clientHeight * magnification;
    
    ratio = canvas.height / 1600;
    g *= ratio;
    
    let probability_sum = 0;
    for (let i = 0; i < probability.length; i++) {
        probability_sum += probability[i];
    }
    let std_probability_sum = 0;
    for (let i = 0; i < probability.length; i++) {
        std_probability_sum += launch * (probability[i] / probability_sum);
        std_probability[i] = std_probability_sum;
    }
    
    loop = setInterval(fireworks, 10);
}


function close_operation() {
    clearInterval(loop);
    g = 0.015;

    let header = document.getElementById("header");
    let contents = document.getElementById("contents");
    let main = document.getElementById("main");
    let canvas = document.getElementById("canvas");
    let close_button = document.getElementById("close_button");
    let footer = document.getElementById("footer");
    header.style.display = "block";
    contents.style.display = "block";
    main.style.display = "block";
    canvas.style.display = "none";
    close_button.style.display = "none";
    footer.style.display = "block";
}