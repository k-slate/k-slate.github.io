function starter () {
    let checker = setting();
    if (checker == 1) {
        alert("１つ以上のセクションを選択してね！");
        return;
    }else {
        word_select(1);
        let start_setting = document.getElementById("start_setting");
        start_setting.style.display = "none";
        let quiz_area = document.getElementById("quiz_area");
        quiz_area.style.display = "block";
        let table_container = document.getElementById("table_container");
        table_container.style.display = "block";
        let open_button = document.getElementById("open_button");
        open_button.style.display = "block";
    }
}


const dictionary = [
[
["это","これは〜です"],
["дом","家"],
["комната","部屋"],
["мама","ママ"],
["окно","窓"],
["папа","パパ"],
["стол","机"],
["стул","椅子"],
["дома","家で（副詞）"],
["там","そこ・あそこに"],
["вот","ほら、"],
["и","と（並列）"]
],
[
["я","私"],
["вы","あなた（尊称）・あなたたち"],
["вода","水"],
["газета","新聞"],
["книга","本"],
["море","海"],
["озеро","湖"],
["парк","公園"],
["профессор","教授"],
["река","川"],
["сок","ジュース"],
["студент","大学生"],
["студентка","女子大学生"],
["здесь","ここ・ここに"],
["да","はい"],
["нет","いいえ"],
["не","〜でない（否定の助詞）"]
],
[
["кто","誰"],
["что","何・〜ということ"],
["где","どこ"],
["он","彼"],
["она","彼女"],
["они","彼ら"],
["брат","兄弟"],
["журнал","雑誌"],
["журналист","ジャーナリスト"],
["почта","郵便局"],
["сестра","姉妹"],
["словарь","辞書"],
["учитель","教師"],
["японка","日本人女性"],
["тоже","も"]
],
[
["мы","私たち"],
["оно","それ（三人称中性）"],
["ты","あなた"],
["ваш","あなたたちの"],
["его","彼の"],
["её","彼女の"],
["их","彼らの"],
["мой","私の"],
["наш","私たちの"],
["твой","あなたの"],
["чей","誰の"],
["дядя","おじさん"],
["имя","名前"],
["музей","博物館"],
["неделя","週"],
["писатель","作家"],
["письмо","手紙"],
["поле","平原"],
["родители","両親"],
["тетрадь","ノート"],
["учебник","教科書"],
["а","一方（対比の接続詞）"],
["место","場所・席"],
["площадь","広場"],
["слово","単語・言葉"],
["собака","犬"],
["тётя","おば"],
["часы","時計"],
["школа","学校"],
["бабушка","おばあさん"],
["врач","医者"],
["дедушка","おじいさん"],
["мать","母"],
["отец","父"],
["семья","家族"],
["фотография","写真"],
["рядом","隣に"],
["справа","右に"]
],
[
["этот","この"],
["город","町"],
["платье","ドレス"],
["радио","ラジオ"],
["какой","どんな・どのような"],
["молодой","若い"],
["новый","新しい"],
["синий","青い"],
["старый","古い"],
["хорошо","よく（副詞）"],
["делать","する"],
["знать","知っている"],
["слушать","聞く"],
["читать","読む"],
["или","もしくは"],
["рассказ","短篇小説"],
["интересный","面白い・興味深い"],
["красивый","美しい"],
["летний","夏の"],
["работать","働く"],
["сегодня","今日"],
["вечер","夕方・晩"],
["день","一日・昼"],
["погода","天気"],
["преподаватель","先生"],
["текст","テキスト・文"],
["урок","課・授業"],
["утро","朝"],
["добрый","良い・優しい"],
["хороший","良い（形容詞）"],
["громко","大声で（副詞）"],
["медленно","ゆっくりと（副詞）"],
["потом","後で（副詞）"],
["сейчас","今"],
["отвечать","答える"],
["понимать","理解する"],
["спрашивать","質問する"],
["и..., и...","...も、...も"]
],
[
["полка","棚"],
["русский","ロシア人"],
["столовая","食堂"],
["язык","言語"],
["большой","大きい"],
["плохой","悪い"],
["русский","ロシアの"],
["говорить","話す"],
["изучать","勉強する"],
["лежать","横たわる・横たえる"],
["смотреть","見る"],
["стоять","立っている"],
["в","〜（の中）で（＋前置格）、〜へ（＋対格）"],
["на","〜（の上）で（＋前置格）、〜へ（＋対格）"],
["о","〜について"],
["телевизор","テレビ"],
["фильм","映画"],
["летом","夏に（副詞）"],
["очень","とても"],
["плохо","悪く（副詞）"],
["отдыхать","休む"],
["по-английски","英語で"],
["по-русски","ロシア語で"],
["по-японски","日本語で"],
["аудитория","教室"],
["американский","アメリカの"],
["английский","英語の"],
["немного","少し（副詞）"],
["уже","すでに・もう（副詞）"],
["разговаривать","会話する"]
],
[
["библиотека","図書館"],
["волос","髪"],
["голос","声"],
["дети","子どもたち"],
["концерт","コンサート"],
["машина","車"],
["университет","大学"],
["центр","中心"],
["русско-японский","露日の"],
["светлый","明るい"],
["вечером","夕方に（副詞）"],
["вчера","昨日"],
["никогда","決して〜ない"],
["тогда","その時"],
["когда","いつ"],
["быть","いる、ある（過去形や未来形で使われる）"],
["есть","いる、ある"],
["нет","ない、存在しない"],
["у","〜の所に、〜のそばに"],
["билет","チケット"],
["лекция","講義"],
["математика","数学"],
["метро","地下鉄"],
["подруга","女性の友達"],
["улица","道、通り"],
["футбол","サッカー"],
["гулять","散歩する・遊ぶ"],
["но","しかし・でも"],
["глаза","目（複数形）"],
["девочка","（幼い）女の子"],
["дочка","娘"],
["муж","夫"],
["японец","日本人男性"],
["всё","全部"],
["весёлый","陽気な"],
["высокий","（背・標高が）高い"],
["маленький","小さい"],
["тёмный","暗い"],
["чёрный","黒い"],
["ещё","まだ"],
["рассказывать","語る"]
],
[
["автобус","バス"],
["молоко","牛乳"],
["поезд","長距離列車"],
["север","北"],
["фамилия","姓・名字"],
["чай","茶"],
["как","どのように"],
["куда","どこに"],
["ехать","乗って行く（定動詞）"],
["жить","生活する・生きる"],
["звать","呼ぶ"],
["идти","歩いて行く（定動詞）"],
["писать","書く"],
["пить","飲む"],
["строить","建てる"],
["кофе","コーヒー"],
["литература","文学"],
["статья","記事・論文"],
["юг","南"],
["встречать","会う"],
["актёр","俳優"],
["вокзал","駅"],
["кино","映画館"],
["работа","仕事・職場"],
["известный","有名な"],
["китайский","中国の・中国人の"],
["много","たくさん"],
["поздно","（時間的に）遅く・遅れて"],
["раньше","早く、かつては"],
["играть","遊ぶ・演じる"],
["здравствуйте","こんにちは（正式）"],
["здравствуй","こんにちは（略式）"],
["до завтра","また明日"],
["до свидания","さようなら"]
],
[
["дождь","雨"],
["музыка","音楽"],
["подарок","プレゼント"],
["товарищ","同志・同僚・友人"],
["экзамен","試験"],
["каждый","毎・各"],
["домой","家に・家へ"],
["завтра","明日"],
["послезавтра","明後日"],
["так","そのように・そんなに"],
["помогать","助ける・手伝う"],
["можно","〜できる・〜してもよい"],
["надо","〜する必要がある・〜しなければならない"],
["нельзя","〜してはいけない・〜できない"],
["нужно","〜しなければならない"],
["пора","〜する時間だ"],
["к","〜（人）のほうに、〜の所に（＋与格）"],
["по","〜（線）に沿って、〜（空間）じゅうを（＋与格）"],
["понедельник","月曜日"],
["вторник","火曜日"],
["среда","水曜日"],
["четверг","木曜日"],
["пятница","金曜日"],
["суббота","土曜日"],
["воскресенье","日曜日"],
["друг","友達"],
["история","歴史"],
["зимой","冬に（副詞）"],
["осенью","秋に（副詞）"],
["летом","夏に（副詞）"],
["весной","春に（副詞）"],
["зима","冬"],
["осень","秋"],
["лето","夏"],
["весна","春"],
["скоро","もうすぐ・まもなく"],
["конечно","もちろん"],
["завтрак","朝ごはん"],
["ночь","夜"],
["обед","昼ごはん"],
["ресторан","レストラン"],
["ужин","夕ごはん"],
["всегда","いつも・常に"],
["днём","昼に"],
["ночью","夜に"],
["утром","朝に"],
["часто","よく・しばしば"],
["завтракать","朝食をとる"],
["обедать","昼食をとる"],
["ужинать","夕食をとる"],
["после","〜の後で（＋生格）"],
["потому что","なぜなら"]
],
[
["здание","建物"],
["карандаш","鉛筆"],
["ручка","ペン"],
["вместе","一緒に"],
["готовить","準備する・用意する"],
["заниматься","する"],
["любить","愛する・好む"],
["нравиться","気に入っている"],
["строиться","建てられる"],
["учиться","学ぶ・在学している"],
["хотеть","欲しい・したい"],
["с","〜とともに・〜付きの（＋造格）・〜から（＋生格）"],
["ложка","スプーン"],
["портрет","ポートレート・肖像"],
["суп","スープ"],
["теннис","テニス"],
["есть","食べる"],
["называться","（物が）〜と呼ばれる"],
["рисовать","描く"],
["играть в теннис","テニスをする"],
["гитара","ギター"],
["курс","学年"],
["сказка","おとぎ話"],
["спорт","スポーツ"],
["первый","第一の・一番目の"],
["сам","〜自身"],
["иногда","時々"],
["прекрасно","素晴らしく・見事に（副詞）"],
["играть на гитаре","ギターを弾く"]
],
[
["самолёт","飛行機"],
["снег","雪"],
["сын","息子"],
["такси","タクシー"],
["театр","劇場"],
["кто-то","誰か"],
["откуда","どこから"],
["отсюда","ここから"],
["оттуда","そこから・あそこから"],
["сюда","ここへ"],
["туда","そこへ・あそこへ"],
["бежать","走る（定動詞）"],
["бегать","走る（不定動詞）"],
["везти","乗り物で運ぶ（定動詞）"],
["возить","乗り物で運ぶ（不定動詞）"],
["вести","連れて行く（定動詞）"],
["водить","連れて行く（不定動詞）"],
["возвращаться","戻る・帰る"],
["ездить","乗り物で行く（不定動詞）"],
["лететь","飛ぶ（定動詞）"],
["летать","飛ぶ（不定動詞）"],
["нести","持って行く（定動詞）"],
["носить","持って行く（不定動詞）"],
["ходить","歩いて行く（不定動詞）"],
["чистить","綺麗にする"],
["из","〜（中）から（＋生格）"],
["от","〜（人）から（＋生格）"],
["сад","庭"],
["детский","子どもの"],
["долго","長い間"],
["пешком","徒歩で"],
["думать","考える"],
["детский сад","幼稚園"],
["двор","中庭"],
["дорога","道・道路"],
["остановка","停留所"],
["рука","手"],
["любимый","お気に入りの"],
["назад","前（過去）へ・後ろ（逆方向）へ"],
["обычно","普段・普通"],
["радостно","嬉しそうに・喜んで"],
["спокойно","落ち着いて"],
["теперь","今は"],
["брать","取る"],
["останавливаться","（乗り物が）止まる・（人が）立ち止まる"],
["садиться","腰掛ける・乗り物に乗る（в＋対格）"],
["до","〜まで（＋生格）"]
],
[
["читатель","読者"],
["близкий","近い"],
["больной","病気な"],
["жаркий","暑い"],
["занятый","忙しい・埋まっている"],
["рад","嬉しい"],
["свободный","自由な・空いている"],
["тёплый","暖かい"],
["трудный","難しい"],
["холодный","冷たい・寒い"],
["сколько","どれくらい（数量）"],
["мало","少しの・僅かな"],
["видеть","見る・会う"],
["получать","受け取る"],
["должен","〜しなければならない"],
["квартира","アパート・マンションの一区画"],
["мясо","肉"],
["телефон","電話"],
["учительница","女性の先生"],
["готовый","準備のできた"],
["здоровый","健康な"],
["приятный","気持ちの良い・楽しい"],
["дверь","扉"],
["кровать","ベッド"],
["тихий","静かな"],
["внимательно","注意深く"],
["крепко","しっかりと"],
["наконец","ついに・やっと"],
["начинать","始める"],
["открывать","開く・開ける"],
["слышать","聞こえる"],
["спать","眠る"],
["берег","岸"],
["год","年"],
["край","端"],
["лес","森"],
["санаторий","サナトリウム（長期寮療養施設）"],
["станция","（小さな）駅"],
["мальчик","少年"],
["название","（物の）名前・呼び名"],
["иностранный","外国の"],
["студенческий","学生の"],
["время","時間"],
["люди","人々"],
["настоящий","本当の・本物の"],
["прекрасный","とても美しい・とても素晴らしい"],
["весной","春に"],
["далеко","遠い・遠くに"],
["дальше","さらに・それから"],
["встречаться","会う"],
["за","〜の向こうに（＋造格）"],
["за городом","郊外で"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
],
[
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"],
["ааааа","あああああ"]
]
];

let section_numbers = [];
let whether_selected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let selected_word_number = 0;
let new_dictionary = [];
let miss_list = [];

let Japanese_word;
let words_entry;
let button;
let circle;
let miss_table;

let question;
let answer;

let current_status = 0;



//初期設定
function setting() {
    Japanese_word = document.getElementById("Japanese_word");
    words_entry = document.getElementById("words_entry");
    button = document.getElementById("decision");
    circle = document.getElementById("circle");
    miss_table = document.getElementById("miss_table");
    
    let selected_number = 0;
    for (let i = 1; i < dictionary.length + 1; i++) {
        let section = document.getElementById(`sec${("00"+i).slice(-2)}`);
        if (section.checked) {
            whether_selected[i - 1] = 1;
            selected_number++;
        }
    }
    if (selected_number == 0) {
        return 1;
    }

    for (let i = 0; i < dictionary.length; i++) {
        section_numbers.push(dictionary[i].length);
        selected_word_number += section_numbers[i] * whether_selected[i];
    }
    
    for (let i = 0; i < dictionary.length; i++) {
        if (whether_selected[i] == 0) {
            continue;
        }else {
            new_dictionary = new_dictionary.concat(dictionary[i]);
        }
    }
    return 0;
}


//問題を提示する
function word_select(attribute = 0) {
    if (current_status == 1) {
    	return;
    }
    
    if ((selected_word_number == 0) && (attribute == 0)) {
        alert("走破！お疲れ様！");
        current_status = 1;
        if (miss_list.length == 0) {
            alert("全問題制覇！やったね！");
            button.innerHTML = "再読み込み";
            button.setAttribute("onclick", "location.reload()");
        }else {
            button.innerHTML = "誤答を周回";
            button.setAttribute("onclick", "next_round()");
        }
        return;
    }
    
    words_entry.removeAttribute("readonly");
    let chosen = Math.floor(Math.random()*selected_word_number);
    question = new_dictionary[chosen][1];
    answer= new_dictionary[chosen][0];
    Japanese_word.innerHTML = question;
    words_entry.style.color = "black";
    words_entry.value = "";
    
    selected_word_number --;
    new_dictionary.splice(chosen, 1);
    button.innerHTML = "決定（Enterキーで代用）";
    button.setAttribute("onclick", "check()");
    circle.style.visibility = "hidden";
    return;
}


//正誤判定
function check() {
    if (current_status == 1) {
    	return;
    }
    
    words_entry.setAttribute("readonly", true);
    if (words_entry.value == answer) {
        circle.style.visibility = "visible";
    }else {
        let new_missing = document.createElement("tr");
        new_missing.innerHTML = `<th>${question}</th><th>${words_entry.value}</th><th>${answer}</th>`;
        miss_table.appendChild(new_missing);
        miss_list.push([answer,question]);
        words_entry.style.color = "red";
        words_entry.value = answer;
    }
    
    button.innerHTML = "次へ（Enterキーで代用）";
    button.setAttribute("onclick", "word_select()");
}


function next_round() {
    new_dictionary = miss_list.slice();
    current_status = 0;
    miss_list = [];
    selected_word_number = new_dictionary.length;
    miss_table.innerHTML = "<tr><th>問題</th><th>あなたの解答</th><th>正答</th></tr>";
    word_select(1);
}


document.addEventListener('keydown', (event) => {
    let key = event.key;
        
    if (key == "Enter") {
        event.preventDefault();
        if (button.getAttribute("onclick") == "check()") {
            check();
        }else if (button.getAttribute("onclick") == "word_select()") {
        	word_select();
        }else {
        	return;
        }
    }
});
