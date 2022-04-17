class Q_learning {
    constructor (Q, act_total, param) {
        this.Q = Q;
        this.act_total = act_total;
        //ハイパーパラメータ
        this.a = param[0];
        this.b = param[1];
        this.c = param[2];
        if ((this.a < 0) || (this.a > 1)) {
            console.error(`ハイパーパラメータ \'α\' が範囲外だよ！(0 ~ 1) : ${this.a}`);
        }
        if (this.b < 0) {
            console.error(`ハイパーパラメータ \'β\' が範囲外だよ！(0 ~ ) : ${this.b}`);
        }
        if (this.c < 0) {
            console.error(`ハイパーパラメータ \'γ\' が範囲外だよ！(0 ~ ) : ${this.c}`);
        }
        
        this.prev_s_a = -1
        this.curr_s_a = 0
        this.prev_rew = 0
        this.curr_rew = 0
    }
    
       
    //報酬のメソッド
    reward (rew) {
        
    }


    //学習のメソッド
    qlearn (rew_list, enc_list) {
        this.rew_list = rew_list;
        this.enc_list = enc_list;
        let action = 0;
        let curr_Q = [];
        for (let i = 0; i < enc_list.length; i++) {
            curr_Q.push(this.Q[enc_list[i]]);
        }
        let sum_q = 0;
        for (let i = 0; i < curr_Q.length; i++) {
            sum_q += Math.exp(this.b * curr_Q[i]);
        }
        let max_q = curr_Q.reduce(function(a, b) {
            return Math.max(a, b);
        });
        let ran = Math.random() * sum_q;
        sum_q = 0;
        for (let i = 0; i < this.act_total; i++) {
            let q = curr_Q[i];
            if ((sum_q < ran) && (ran <= sum_q + Math.exp(this.b * q))) {
                action = i;
            }
            sum_q += Math.exp(this.b * q);
        }
        
        this.curr_s_a = this.enc_list[action];
        let rew = this.rew_list[action];
        this.curr_rew = rew;
        this.reward(rew);

        if (this.prev_s_a != -1){
            this.Q[this.prev_s_a] += this.a * (this.prev_rew + this.c * max_q - this.Q[this.prev_s_a]);
        }
    
        this.prev_s_a = this.curr_s_a;
        this.prev_rew = this.curr_rew;
        return action;
    }


    //リセットのメソッド
    reset () {
        this.Q = this.Q.fill(0);
        this.prev_s_a = -1;
        this.curr_s_a = 0;
        this.prev_rew = 0;
        this.curr_rew = 0;
    }
}