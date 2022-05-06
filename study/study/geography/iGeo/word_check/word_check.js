onload = function() {
    main();
}

const dictionary = [
[
["地殻", "crust"],
["外核", "outer core"],
["内核", "inner core"],
["大陸地殻", "continental crust"],
["海洋地殻", "oceanic crust"],
["プレート境界", "boundary"],
["プレート境界", "plate margin"],
["狭まる境界", "destructive margin"],
["広がる境界", "constructive margin"],
["ずれる境界", "conservative margin"],
["海溝", "ocean trench"],
["半球", "hemisphere"],
["赤道", "equator"],
["更新世の", "Pleistocene"],
["氷河期", "glacial period"],
["北回帰線", "Tropic of Cancer"],
["南回帰線", "Tropic of Capricorn"],
["成層圏", "stratosphere"],
["地軸", "the earth’s axis"],
["赤道収束帯", "inter-tropical convergence zone"],
["亜熱帯高圧帯", "subtropical zone of high pressure"],
["コリオリの力", "Coriolis force"],
["大圏航路", "orthodrome"],
["春分・秋分", "equinox"],
["海水面変動の", "eustatic"],
["アセノスフェア", "asthenosphere"],
["リソスフェア", "lithosphere"],
["狭まる境界", "convergent boundary"],
["広がる境界", "divergent boundary"],
["(プレートが) 沈み込む", "subduct"],
["スラブ", "slab"],
["ファンデフカプレート", "Juan de Fuca plate"],
["ココスプレート", "Cocos plate"],
["南極プレート", "Antarctic plate"],
["インドプレート", "Indian plate"],
["オーストラリアプレート", "Australian plate"],
["南アメリカプレート", "South American plate"],
["ユーラシアプレート", "Eurasian plate"],
["ナスカプレート", "Nazca plate"],
["カリブプレート", "Caribbean plate"],
["北アメリカプレート", "North American Plate"],
["太平洋プレート", "Pacific plate"],
["フィリピン海プレート", "Philippines plate"],
["オーロラ", "aurora"],
["流星群", "meteor shower"],
["(プレートの) 沈み込み", "subduction"],
["大気の", "aerial"],
["子午線", "meridian "],
["経度", "longitude"],
["緯度", "latitude"],
["自転", "Earth’s rotation"],
["対流圏", "troposphere"],
["中間圏", "mesosphere"],
["熱圏", "thermosphere"],
["慣性", "inertia"],
["大圏航路", "great circle"],
["地形", "topography"],
["アイソスタシーの変化", "isostatic change"],
["赤外線", "infrared ray"],
["紫外線", "ultraviolet ray"],
["中央海嶺", "mid-ocean ridge"],
["和達―ベニオフ帯", "Wadachi-Benioff Zone"],
["南極大陸", "Antarctica"],
["ハドレー循環", "Hadrey cell"],
["フェレル循環", "Ferrel cell"],
["極循環", "Polar cell"],
["楕円", "ellipse"],
],
[
["堆積岩", "sedimentary rock"],
["氷河", "glacier"],
["楯状火山", "shield volcano"],
["ドーム状火山", "dome volcano"],
["火山灰", "ash"],
["二酸化硫黄", "sulphur dioxide"],
["火砕流", "pyroclastic flow"],
["窒息死させる", "suffocate"],
["泥流", "mudflow"],
["泥流", "lahar"],
["マグマだまり", "magma basin"],
["カルデラ", "caldera"],
["火成岩", "igneous rock"],
["変成岩", "metamorphic rock"],
["深成岩", "intrusive rock"],
["火山岩", "extrusive rock"],
["斑状組織", "coarse texture"],
["岩脈", "dyke"],
["岩床", "sill"],
["流紋岩", "rhyolite"],
["安山岩", "andesite"],
["玄武岩", "basalt"],
["花崗岩", "granite"],
["閃緑岩", "diorite"],
["斑糲岩 ", "gabbro"],
["石炭紀", "carboniferous"],
["チョーク(鉱物) ", "chalk"],
["堆積する", "deposit"],
["浸食する", "erode"],
["凝縮する(続成作用) ", "compact"],
["大理石", "marble"],
["頁岩", "shale"],
["風化", "weather"],
["浸食", "erosion"],
["海底", "sea bed"],
["石化作用", "lithification"],
["第四紀", "quaternary"],
["第三紀", "tertiary"],
["岩石のサイクル", "rock cycle"],
["物理的風化", "mechanical weathering"],
["化学的風化", "chemical weathering"],
["生物的風化", "biological weathering "],
["剥離作用", "exfoliation"],
["はがれる", "peel off"],
["溶ける", "dissolve"],
["可溶性の", "soluble"],
["炭酸カルシウム", "calcium carbonate"],
["岩山", "tor"],
["荒地", "moorland"],
["酸性の", "acidic"],
["傾く", "tilt"],
["崖・急斜面", "escarpment"],
["帯水層", "aquifer"],
["浸透性の", "permeable"],
["蓄える", "store"],
["不浸透性の", "impermeable"],
["湧水帯", "spring line"],
["かれ谷", "dry valley"],
["浸食する", "eat away"],
["舗装", "pavement"],
["ドリーネ", "swallow hole"],
["洞窟", "cavern"],
["峡谷", "gorge"],
["凝結する", "solidify"],
["鍾乳石", "stalactite"],
["石筍", "stalagmite"],
["塩分", "salinity"],
["循環 ", "circulation"],
["地下水", "groundwater"],
["水循環", "hydrological cycle"],
["蒸発散", "evapotranspiration"],
["染み込み", "infiltration"],
["浸透", "percolation"],
["側方浸透流 (地下水面より上を流れる地下水)", "through flow"],
["流域", "drainage basin"],
["分水嶺", "watershed"],
["支流", "tributary"],
["水源", "source"],
["合流", "confluence"],
["河口", "mouth"],
["流路", "course"],
["上流", "upper course"],
["中流", "middle course"],
["下流", "lower course"],
["傾斜", "gradient"],
["断面図", "profile"],
["運搬作用", "transportation"],
["水圧", "hydraulic"],
["破片", "fragment"],
["丸くする", "round off"],
["滝", "waterfall"],
["滝つぼ", "plunge pool"],
["尾根", "spur"],
["組み合わさる", "interlock"],
["蛇行", "meander"],
["三日月湖", "ox-bow lake"],
["氾濫原", "flood plain"],
["(自然) 堤防", "levee"],
["支流・分流", "distributary"],
["円弧状三角州", "arcuate delta"],
["カスプ状三角州", "cuspate delta"],
["鳥趾状三角州", "bird’s foot delta"],
["等高線", "contour line"],
["流出", "discharge"],
["土手", "bank"],
["後退", "retreat"],
["大陸氷河", "ice sheet"],
["氷河の浸食による痩せ尾根", "arête"],
["ホルン", "pyramidal peak"],
["カール", "corrie"],
["山中の小さな湖，特にカールにできた湖", "tarn"],
["Ｕ字谷，断層，海岸線によって切られた山の支脈", "truncated spur"],
["懸谷", "hanging valley"],
["Ｕ字谷の湖", "ribbon lake"],
["Ｕ字谷", "glacial trough"],
["モレーン", "moraine"],
["ドラムリン", "drumlin"],
["浸食する波", "destructive wave"],
["引き波", "backwash"],
["打ち上げ波", "swash"],
["岬", "headland"],
["突き出る", "jut"],
["入り江", "cove"],
["沿岸流", "longshore drift"],
["堆積させる波", "constructive wave"],
["砂浜", "sand beach"],
["礫浜", "shingle beach"],
["砂嘴", "spit"],
["砂州", "bar"],
["ラグーン", "lagoon"],
["トンボロ", "tombolo"],
["海食台", "wave-cut platform"],
["浸水させる", "submerge"],
["防波堤", "breakwater"],
["砂丘", "dune"],
["湿地帯", "marshland"],
["突堤", "groyne"],
["ヒースランド", "heathland"],
["氷山", "iceberg"],
["下り坂の", "downhill"],
["沖積層", "alluvium"],
["浚渫する", "dredge"],
["鉄砲水", "flash flood"],
["級化層理", "graded bedding"],
["河口堰", "tidal barrier"],
["ガレ場", "scree"],
["多孔質の", "porous"],
["クレーター・噴火口", "crater"],
["褶曲山地", "fold mountains"],
["断層", "fault"],
["間欠泉", "geyser"],
["地中海の", "Mediterranean"],
["堰", "barrage"],
["排水", "effluent"],
["凝灰岩", "tuff"],
["環流", "gyre"],
["玄武岩質マグマ", "basaltic magma"],
["花崗岩質マグマ", "granitic magma"],
["起伏", "relief"],
["永久凍土", "permafrost"],
["熱塩循環", "thermoharine"],
["成層火山", "stratovolcano"],
["勾配", "pitch"],
["峡谷", "ravine"],
["川岸", "riverbank"],
["背斜", "anticline"],
["向斜", "syncline"],
["カール", "cirque"],
["粘性の", "viscous"],
["流動性の", "fluid"],
["酸性岩の溶岩 (花崗岩質など)", "acid lava"],
["塩基性岩の溶岩 (玄武岩質など)", "basic lava"],
["石英閃緑岩", "tonalite"],
["フィヨルド", "fjord"],
["水上竜巻", "waterspout"],
["水蒸気爆発", "phreatic eruption"],
["山崩れ", "earth flow"],
["回転滑り", "rotational slide"],
["土壌流", "solifluction"],
["高原", "plateau"],
["珪長質の", "felsic"],
["ギザギザの海岸線", "discordant coastline"],
["滑らかな海岸線", "concordant coastline"],
["角ばった", "angular"],
["丸みを帯びた", "rounded"],
["蛇行の内側にある浅い川底", "slip-off slope"],
["消波ブロック", "rip-rap"],
["擁壁", "revetment"],
["急な傾斜", "steep scarp slope"],
["なだらかな傾斜", "gentle dip slope"],
["鍾乳洞", "stalactite cave"],
["層理面", "bedding plane"],
["押し出す", "eject"],
["複式火山", "composite volcano"],
["トランスフォーム断層", "transform fault"],
["サヘル", "Sahel"],
["内海", "inland sea"],
["マグマだまり", "magma chamber"],
["湾曲", "curvature"],
["噴石", "ash deposit"],
["石英", "quartz"],
["ラトソル", "latosol"],
["テラロッサ", "terra rossa"],
["テラローシャ", "terra roxa"],
["レグール", "regur"],
["チェルノーゼム", "chernozem"],
["プレーリー", "prairie"],
["パンパ", "pampa"],
["リャノ", "llano"],
["熱帯酸性化土壌", "oxisols"],
["砂漠土", "entisols"],
["赤土", "ultisols"],
["地殻隆起", "tectonic uplift"],
["海岸浸食", "coastal abrasion"],
["高度", "elevation"],
["地盤沈下", "soil subsidence"],
["漂流する", "drift"],
["沈殿物", "sediment"],
["地殻変動の", "tectonic"],
["海岸の", "littoral"],
["沿岸漂流・漂砂", "littoral drift"],
["塩分を含んだ", "saline"],
["カルシウム", "calcium"],
["盆地・流域", "basin"],
["宙水", "perched water"],
["粘土質の", "clay"],
["氷河の下の融解水により堆積された堤防状の地形", "esker"],
["ローム", "loam"],
["粘性", "viscosity"],
["氷河堆積物の堆積平野", "outwash plain"],
["破面", "fracture"],
["地層", "layer"],
["貫入岩", "intrusion"],
["不整合", "unconformity"],
["安山岩質マグマ", "andesitic magma"],
["流紋岩質マグマ", "rhyolitic magma"],
["珪長岩質マグマ", "felsic magma"],
["礫岩の", "conglomerate"],
["凍結破砕", "frost wedging"],
["貫入する", "intrude"],
["山地", "mountain range"],
["後背地", "hinterland"],
["海の景観", "seascape"],
["母岩", "parent rock"],
["持ち上げる", "heave"],
["火山弾", "volcanic bomb"],
["噴石", "cinder"],
["中央火口丘", "central cone"],
["噴火口", "vent"],
["砂岩", "gritstone"],
["マス・ムーブメント", "mass movement"],
["乱泥流", "turbidity current"],
["低下する", "subside"],
["表面流", "run-off"],
["256mm~ の砂礫", "boulder"],
["64~256mm の砂礫", "cobble"],
["2~64mm の砂礫", "gravel"],
["4~64mm の砂礫", "pebble"],
["2~4mm の砂礫", "granule"],
["0.063~2mm の砂礫", "sand"],
["0.63mm~2mm の砂礫", "coarse sand"],
["0.2mm~0.63mm の砂礫", "medium sand"],
["0.063~0.2mm の砂礫", "fine sand"],
["0.002mm~0.0063mm の砂礫", "silt"],
["~0.002mm の砂礫", "clay"],
["泥炭地", "peat bog"],
["低平な", "low-lying"],
["沖合の", "offshore"],
["ダムの堰堤", "earth embankment"],
["高地", "upland area"],
["低地", "lowland area"],
["ひび", "crack"],
["(流された粒子が河床の石に衝突することによる) 浸食", "abrasion"],
["(水中の粒子が衝突しより細かくなる) 浸食", "attrition"],
["(水圧によって石が削れる) 浸食", "hydraulic action"],
["(石灰岩などが水に溶けることによる) 浸食", "solution"],
["圧縮する", "compress"],
["こする", "scrape"],
["節理", "joint"],
["波食窪", "wave-cut notch"],
["突き出た", "jut out"],
["海食洞門", "arch"],
["海食によって切り離された塔状の岩", "stack"],
["(石が河床を転がることによる) 運搬", "traction"],
["(石が弾むことによる) 運搬", "saltation"],
["(水流で巻き上げられることにより水中を漂う)運搬", "suspension"],
["(微小な粒子が水に溶けることによる) 運搬", "solution"],
["満潮線", "high water mark"],
["干潮線", "low water mark "],
["植生のない初期の砂丘", "embryo dune"],
["僅かに植生を持つ砂丘", "foredune"],
["腐食層を持つようになった砂丘", "yellow dune"],
["腐食層の発達によって灰色になった砂丘", "grey dune"],
["樹木をも持つことができるようになった砂丘", "mature dune"],
["凹凸の", "bumpy"],
["環流丘陵", "neck"],
["エスチュアリー", "estuary"],
["氷河堆積物", "till"],
["上流へ", "upstream"],
["鈍い", "blunt"],
["漸減する", "taper"],
["再結合する", "join"],
["険しい", "abrupt"],
["縁", "verge"],
["ワジ", "wadi "],
["地殻変動の盛んな", "tectonically active"]
],
[

],
[

],
[

],
[

],
[

],
[

],
[

],
[

],
];


function main() {
    let selected_sections = document.getElementById("section_selector");
    let section_numbers = [];
    for (let i = 0; i < dictionary.length, i++) {
        section_numbers.push(dictionary[i].length);
    }
    
    
}
