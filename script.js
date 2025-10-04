// 排行榜页面JavaScript

// 游戏配置（8个游戏）
const GAMES = [
    { id: 0, name: '完美拼图', icon: '🧩', max: 4 },
    { id: 1, name: '牌号对对碰', icon: '🃏', max: 4 },
    { id: 2, name: '色彩陷阱', icon: '🎨', max: 4 },
    { id: 3, name: '数字炸弹', icon: '💣', max: 4 },
    { id: 4, name: '拼速达人', icon: '⚡', max: 15 },
    { id: 5, name: '碰碰乐', icon: '🚗', max: 15 },
    { id: 6, name: '沙包投掷', icon: '🎯', max: 4 },
    { id: 7, name: '巧手取棒', icon: '🥢', max: 4 }
];

// 嵌入的排行榜数据（从CSV导入）
const LEADERBOARD_DATA = [
{"rank":1,"id":"61093","name":"郭茵驰","scores":[1,0,4,4,15,15,4,4],"total":48},
{"rank":2,"id":"60565","name":"王晓芳","scores":[0,0,4,4,15,15,4,4],"total":47},
{"rank":3,"id":"60200","name":"蒋宝花","scores":[0,0,4,4,15,15,4,4],"total":46},
{"rank":4,"id":"43789","name":"张冬青","scores":[0,0,4,4,15,15,4,4],"total":46},
{"rank":5,"id":"61087","name":"竺继跃","scores":[4,0,4,4,15,10,4,4],"total":46},
{"rank":6,"id":"60438","name":"董晶","scores":[0,3,4,4,15,13,4,4],"total":45},
{"rank":7,"id":"60801","name":"石宇婷","scores":[4,0,4,4,15,8,4,4],"total":44},
{"rank":8,"id":"61295","name":"童宇欢","scores":[1,4,4,1,15,15,3,4],"total":44},
{"rank":9,"id":"61728","name":"张煜凯","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":10,"id":"61563","name":"胡锡","scores":[1,3,2,1,15,15,4,4],"total":43},
{"rank":11,"id":"61346","name":"童永涛","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":12,"id":"61725","name":"李余恒","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":13,"id":"61743","name":"吴仲可","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":14,"id":"61729","name":"张嘉懿","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":15,"id":"61532","name":"王璐","scores":[1,0,2,1,15,15,4,4],"total":43},
{"rank":16,"id":"60184","name":"严桂凤","scores":[0,0,4,4,15,13,3,4],"total":43},
{"rank":17,"id":"60746","name":"王伟.四","scores":[4,0,4,4,15,8,3,4],"total":43},
{"rank":18,"id":"60752","name":"应昊骏","scores":[4,2,4,4,10,13,4,3],"total":43},
{"rank":19,"id":"62301","name":"鲍宏毅","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":20,"id":"62166","name":"蔡紫婕","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":21,"id":"62193","name":"潘婷婷","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":22,"id":"62230","name":"俞志超","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":23,"id":"62415","name":"陈听听","scores":[1,1,1,1,15,15,4,4],"total":42},
{"rank":24,"id":"62393","name":"周甲申","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":25,"id":"62387","name":"程佳琪","scores":[1,1,1,1,15,15,4,4],"total":42},
{"rank":26,"id":"62412","name":"刘润泽","scores":[1,3,1,1,15,15,4,4],"total":42},
{"rank":27,"id":"62381","name":"吴菡莹","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":28,"id":"62407","name":"王星皓","scores":[1,4,1,1,15,15,4,4],"total":42},
{"rank":29,"id":"62403","name":"金辰浩","scores":[1,0,1,1,15,15,4,4],"total":42},
{"rank":30,"id":"62400","name":"李维财","scores":[1,3,1,1,15,15,4,4],"total":42},
{"rank":31,"id":"61744","name":"郑子豪","scores":[1,4,2,1,15,13,4,4],"total":41},
{"rank":32,"id":"60212","name":"何垚","scores":[0,2,4,4,15,10,4,4],"total":41},
{"rank":33,"id":"54091","name":"王子英","scores":[0,0,4,4,15,9,4,4],"total":40},
{"rank":34,"id":"11673","name":"杜文斌","scores":[0,2,0,4,15,13,4,4],"total":40},
{"rank":35,"id":"60201","name":"章圆","scores":[0,0,4,4,15,10,4,3],"total":40},
{"rank":36,"id":"61296","name":"钱思远","scores":[1,0,4,1,15,12,4,2],"total":40},
{"rank":37,"id":"62300","name":"蒋玉冰","scores":[1,0,1,1,15,12,4,4],"total":39},
{"rank":38,"id":"62392","name":"周哲楠","scores":[1,4,1,1,15,13,3,4],"total":39},
{"rank":39,"id":"43694","name":"何玲英","scores":[0,0,0,4,15,13,3,4],"total":39},
{"rank":40,"id":"62377","name":"潘子涵","scores":[1,0,1,1,15,15,1,4],"total":39},
{"rank":41,"id":"11633","name":"冯慧清","scores":[0,0,0,4,15,11,4,4],"total":38},
{"rank":42,"id":"60745","name":"吴世","scores":[4,1,4,4,15,3,3,4],"total":38},
{"rank":43,"id":"62402","name":"谢东逸","scores":[1,0,1,1,15,15,0,4],"total":38},
{"rank":44,"id":"43734","name":"曾大坤","scores":[0,0,0,4,15,15,4,0],"total":38},
{"rank":45,"id":"62395","name":"徐康宁","scores":[1,0,1,1,10,15,4,4],"total":37},
{"rank":46,"id":"62386","name":"朱秋颖","scores":[1,1,1,1,15,10,4,4],"total":37},
{"rank":47,"id":"60587","name":"楼洋","scores":[0,0,4,4,15,5,4,4],"total":37},
{"rank":48,"id":"61748","name":"田昊","scores":[1,1,2,1,10,15,3,4],"total":37},
{"rank":49,"id":"11666","name":"胡迎春","scores":[0,0,0,4,15,11,3,4],"total":37},
{"rank":50,"id":"60779","name":"王顺俞","scores":[4,0,4,4,15,3,2,4],"total":37},
{"rank":51,"id":"62296","name":"黄飞翔","scores":[1,0,1,1,15,11,4,3],"total":37},
{"rank":52,"id":"61614","name":"张倩雨","scores":[1,0,2,1,15,8,4,4],"total":36},
{"rank":53,"id":"61594","name":"田思琪","scores":[1,0,2,1,15,8,4,4],"total":36},
{"rank":54,"id":"61724","name":"李木风","scores":[1,0,2,1,15,8,4,4],"total":36},
{"rank":55,"id":"61501","name":"丁一","scores":[1,0,2,1,15,8,4,4],"total":36},
{"rank":56,"id":"60744","name":"项维斌","scores":[0,0,4,4,15,4,4,4],"total":36},
{"rank":57,"id":"62409","name":"刘嘉昊","scores":[1,0,1,1,15,10,4,3],"total":36},
{"rank":58,"id":"62172","name":"吴超迪","scores":[1,1,1,1,15,10,4,3],"total":36},
{"rank":59,"id":"11582","name":"赵民","scores":[0,0,0,4,15,11,4,2],"total":36},
{"rank":60,"id":"62414","name":"王成冬","scores":[1,0,1,1,15,8,4,4],"total":35},
{"rank":61,"id":"62327","name":"贺叶诚","scores":[1,0,1,1,15,8,4,4],"total":35},
{"rank":62,"id":"61337","name":"王峙轶","scores":[1,0,4,1,5,15,4,4],"total":35},
{"rank":63,"id":"62390","name":"叶韦灼","scores":[1,2,1,1,15,8,4,4],"total":35},
{"rank":64,"id":"62335","name":"黄千倩","scores":[1,2,1,1,15,8,4,4],"total":35},
{"rank":65,"id":"60819","name":"姜丛丛","scores":[4,2,4,4,6,8,4,4],"total":35},
{"rank":66,"id":"60439","name":"俞涛","scores":[0,0,4,4,15,3,4,4],"total":35},
{"rank":67,"id":"62153","name":"盛琳玉","scores":[1,0,2,1,15,8,4,3],"total":35},
{"rank":68,"id":"60194","name":"张永锋","scores":[0,0,4,4,15,5,4,3],"total":35},
{"rank":69,"id":"62158","name":"唐昊鹏","scores":[1,1,2,1,15,8,4,3],"total":35},
{"rank":70,"id":"11365","name":"项叶飞","scores":[0,0,0,0,15,11,4,4],"total":34},
{"rank":71,"id":"60180","name":"汪建新","scores":[0,0,4,4,10,8,4,4],"total":34},
{"rank":72,"id":"60832","name":"吴江锋","scores":[4,0,4,4,5,8,4,4],"total":34},
{"rank":73,"id":"60791","name":"吴克如","scores":[4,0,4,4,5,8,4,4],"total":34},
{"rank":74,"id":"60758","name":"叶慧青","scores":[4,0,4,4,5,8,4,4],"total":34},
{"rank":75,"id":"60069","name":"姚莲莲","scores":[0,0,4,4,15,3,4,4],"total":34},
{"rank":76,"id":"60076","name":"鲁虹","scores":[0,0,4,4,15,3,4,4],"total":34},
{"rank":77,"id":"60316","name":"徐羽明","scores":[0,0,4,4,15,3,4,4],"total":34},
{"rank":78,"id":"60447","name":"刘世涛","scores":[0,0,4,4,15,3,3,4],"total":34},
{"rank":79,"id":"61344","name":"吴昌贤","scores":[1,0,2,1,5,15,4,4],"total":33},
{"rank":80,"id":"61732","name":"翁景涛","scores":[1,4,2,1,15,5,4,4],"total":33},
{"rank":81,"id":"60756","name":"单烧俊","scores":[4,0,4,4,10,6,0,4],"total":33},
{"rank":82,"id":"62406","name":"徐梦杰","scores":[1,0,1,1,5,15,4,4],"total":32},
{"rank":83,"id":"62196","name":"周元圳","scores":[1,2,1,1,15,5,4,4],"total":32},
{"rank":84,"id":"62376","name":"袁子骏","scores":[1,0,1,1,15,5,4,4],"total":32},
{"rank":85,"id":"60541","name":"吴健","scores":[0,0,4,4,15,0,4,4],"total":32},
{"rank":86,"id":"62411","name":"叶至纯","scores":[1,0,1,1,15,13,0,0],"total":32},
{"rank":87,"id":"61335","name":"黄畅","scores":[1,0,4,1,8,8,4,4],"total":31},
{"rank":88,"id":"60431","name":"周根","scores":[0,0,4,4,5,9,4,4],"total":31},
{"rank":89,"id":"61269","name":"王宇","scores":[1,0,4,4,5,8,4,4],"total":31},
{"rank":90,"id":"43787","name":"夏丹红","scores":[0,0,4,4,10,5,4,4],"total":31},
{"rank":91,"id":"54098","name":"莫晓迪","scores":[0,0,4,4,10,5,4,4],"total":31},
{"rank":92,"id":"60354","name":"李凯利","scores":[0,1,4,4,10,5,4,4],"total":31},
{"rank":93,"id":"60784","name":"张弛","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":94,"id":"60823","name":"宋韬","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":95,"id":"60748","name":"周森锋","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":96,"id":"60842","name":"赵爽","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":97,"id":"61088","name":"俞灏","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":98,"id":"60829","name":"朱世单","scores":[4,4,4,4,5,5,4,4],"total":31},
{"rank":99,"id":"60815","name":"章俊","scores":[4,1,4,4,5,5,4,4],"total":31},
{"rank":100,"id":"60814","name":"黄伟","scores":[4,0,4,4,5,5,4,4],"total":31},
{"rank":101,"id":"60740","name":"姜慧萍","scores":[0,0,4,4,10,4,4,4],"total":31},
{"rank":102,"id":"61343","name":"徐昌龙","scores":[1,0,2,1,15,3,4,4],"total":31},
{"rank":103,"id":"60851","name":"范静","scores":[4,1,4,4,10,0,4,4],"total":31},
{"rank":104,"id":"62311","name":"王亿伟","scores":[1,1,1,1,5,15,3,4],"total":31},
{"rank":105,"id":"60208","name":"应金相","scores":[0,2,4,4,5,11,3,4],"total":31},
{"rank":106,"id":"61106","name":"许郑孝","scores":[1,0,4,4,5,9,3,4],"total":31},
{"rank":107,"id":"43692","name":"涂延华","scores":[0,0,0,4,15,5,3,4],"total":31},
{"rank":108,"id":"60178","name":"黄灵","scores":[0,1,4,4,10,6,4,3],"total":31},
{"rank":109,"id":"43776","name":"徐群芳","scores":[0,0,0,4,5,13,4,4],"total":30},
{"rank":110,"id":"60549","name":"刘星","scores":[0,4,4,4,5,8,4,4],"total":30},
{"rank":111,"id":"60591","name":"王立媛","scores":[0,3,4,4,5,8,4,4],"total":30},
{"rank":112,"id":"62192","name":"胡启慧","scores":[1,4,1,1,15,3,4,4],"total":30},
{"rank":113,"id":"43729","name":"唐勇","scores":[0,0,0,4,15,3,4,4],"total":30},
{"rank":114,"id":"60452","name":"朱丽丽","scores":[0,0,4,4,10,3,4,4],"total":30},
{"rank":115,"id":"61294","name":"陆文婷","scores":[1,4,4,1,15,0,4,4],"total":30},
{"rank":116,"id":"11434","name":"施春华","scores":[0,0,0,0,15,8,3,4],"total":30},
{"rank":117,"id":"61094","name":"庄子兴","scores":[1,0,4,4,5,8,3,4],"total":30},
{"rank":118,"id":"60754","name":"张杰","scores":[4,0,4,4,5,5,3,4],"total":30},
{"rank":119,"id":"61272","name":"江佳斌","scores":[1,0,4,4,8,8,0,4],"total":30},
{"rank":120,"id":"61730","name":"夏勇棋","scores":[1,0,2,1,5,11,4,4],"total":29},
{"rank":121,"id":"43784","name":"钱越峰","scores":[0,0,4,4,5,8,4,4],"total":29},
{"rank":122,"id":"60197","name":"黄思源","scores":[0,0,4,4,5,8,4,4],"total":29},
{"rank":123,"id":"54093","name":"詹桂飞","scores":[0,0,4,4,5,8,4,4],"total":29},
{"rank":124,"id":"61559","name":"孙世宇","scores":[1,0,2,1,10,6,4,4],"total":29},
{"rank":125,"id":"60759","name":"鲍雷雷","scores":[4,0,4,4,5,3,4,4],"total":29},
{"rank":126,"id":"62347","name":"王颖","scores":[1,0,1,1,15,3,4,3],"total":29},
{"rank":127,"id":"62350","name":"石江丽","scores":[1,0,1,1,15,3,4,3],"total":29},
{"rank":128,"id":"11450","name":"张庆红","scores":[0,0,0,4,8,8,4,4],"total":28},
{"rank":129,"id":"11571","name":"瞿超","scores":[0,0,0,4,6,10,4,4],"total":28},
{"rank":130,"id":"61341","name":"戴文鑫","scores":[1,0,2,1,5,10,4,4],"total":28},
{"rank":131,"id":"43681","name":"韩永","scores":[0,0,0,4,10,6,4,4],"total":28},
{"rank":132,"id":"11554","name":"倪银海","scores":[0,0,0,4,10,6,4,4],"total":28},
{"rank":133,"id":"11371","name":"蒋雅淼","scores":[0,0,0,0,15,5,4,4],"total":28},
{"rank":134,"id":"61279","name":"姜淋","scores":[1,0,4,4,5,5,4,4],"total":28},
{"rank":135,"id":"61277","name":"秦虎","scores":[1,0,4,4,5,5,4,4],"total":28},
{"rank":136,"id":"61107","name":"商紫月","scores":[1,0,4,4,5,5,4,4],"total":28},
{"rank":137,"id":"61280","name":"周仁杰","scores":[1,0,4,4,10,0,4,4],"total":28},
{"rank":138,"id":"60063","name":"王丹","scores":[0,0,4,4,5,6,4,4],"total":27},
{"rank":139,"id":"11358","name":"洪正荣","scores":[0,0,0,0,5,14,4,4],"total":27},
{"rank":140,"id":"11565","name":"周雅琴","scores":[0,1,0,4,5,10,4,4],"total":27},
{"rank":141,"id":"62357","name":"杨苏桥","scores":[1,0,1,1,5,10,4,4],"total":27},
{"rank":142,"id":"11695","name":"何国慧","scores":[0,0,0,4,5,10,4,4],"total":27},
{"rank":143,"id":"54085","name":"何逸飞","scores":[0,0,4,4,5,6,4,4],"total":27},
{"rank":144,"id":"43686","name":"白植芳","scores":[0,0,0,4,10,5,4,4],"total":27},
{"rank":145,"id":"62383","name":"汤文泽","scores":[1,0,1,1,10,5,4,4],"total":27},
{"rank":146,"id":"43684","name":"王华炳","scores":[0,0,0,4,10,5,4,4],"total":27},
{"rank":147,"id":"60739","name":"钱振兴","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":148,"id":"60441","name":"程莽","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":149,"id":"60367","name":"徐金燕","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":150,"id":"60463","name":"杨淼","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":151,"id":"60443","name":"陈庆杰","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":152,"id":"60451","name":"宣树锋","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":153,"id":"60449","name":"杨迅骐","scores":[0,0,4,4,5,5,4,4],"total":27},
{"rank":154,"id":"62215","name":"许成恩","scores":[1,0,1,1,15,0,4,4],"total":27},
{"rank":155,"id":"11590","name":"郑建军","scores":[0,0,0,4,10,6,3,4],"total":27},
{"rank":156,"id":"60793","name":"阮澔","scores":[4,0,4,4,5,3,2,4],"total":27},
{"rank":157,"id":"62155","name":"张佳乐","scores":[1,0,2,1,5,10,4,3],"total":27},
{"rank":158,"id":"60548","name":"白勇强","scores":[0,1,4,4,10,3,3,2],"total":27},
{"rank":159,"id":"53985","name":"袁慧光","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":160,"id":"60313","name":"方建江","scores":[0,0,4,4,10,0,4,4],"total":26},
{"rank":161,"id":"60188","name":"雷利萍","scores":[0,4,4,4,5,5,4,4],"total":26},
{"rank":162,"id":"60064","name":"商倩","scores":[0,2,4,4,5,5,4,4],"total":26},
{"rank":163,"id":"60067","name":"赵启惠","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":164,"id":"54103","name":"叶品钧","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":165,"id":"60210","name":"陈广静","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":166,"id":"60053","name":"戎剑","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":167,"id":"60348","name":"方梦珍","scores":[0,2,4,4,5,5,4,4],"total":26},
{"rank":168,"id":"60199","name":"吴欢欢","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":169,"id":"60190","name":"庄仁轩","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":170,"id":"60057","name":"叶璐敏","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":171,"id":"54079","name":"徐淑芬","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":172,"id":"54101","name":"周阳平","scores":[0,0,4,4,5,5,4,4],"total":26},
{"rank":173,"id":"61271","name":"王鹏军","scores":[1,0,4,4,5,3,4,4],"total":26},
{"rank":174,"id":"61273","name":"刘炳霖","scores":[1,0,4,4,5,3,4,4],"total":26},
{"rank":175,"id":"60207","name":"徐铁松","scores":[0,0,4,4,10,0,4,4],"total":26},
{"rank":176,"id":"43791","name":"茅佩丽","scores":[0,0,4,4,8,3,3,4],"total":26},
{"rank":177,"id":"60427","name":"梁笑","scores":[0,0,4,4,10,0,3,4],"total":26},
{"rank":178,"id":"61278","name":"高林生","scores":[1,0,4,4,7,3,2,4],"total":26},
{"rank":179,"id":"61274","name":"张晓慧","scores":[1,0,4,4,10,0,3,3],"total":26},
{"rank":180,"id":"60576","name":"单秀龙","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":181,"id":"60454","name":"屈顺兴","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":182,"id":"11592","name":"史伟","scores":[0,0,0,4,5,8,4,4],"total":25},
{"rank":183,"id":"62331","name":"许霁","scores":[1,0,1,1,5,8,4,4],"total":25},
{"rank":184,"id":"61336","name":"张元峰","scores":[1,0,4,1,5,5,4,4],"total":25},
{"rank":185,"id":"60205","name":"马勇","scores":[0,0,4,4,5,4,4,4],"total":25},
{"rank":186,"id":"60073","name":"王林","scores":[0,0,4,4,5,4,4,4],"total":25},
{"rank":187,"id":"13679","name":"马俊","scores":[0,0,0,4,10,3,4,4],"total":25},
{"rank":188,"id":"11632","name":"陈伟.小","scores":[0,0,0,4,10,3,4,4],"total":25},
{"rank":189,"id":"43777","name":"史佩璿","scores":[0,0,0,4,10,3,4,4],"total":25},
{"rank":190,"id":"60361","name":"范海沄","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":191,"id":"60430","name":"周杭龙","scores":[0,3,4,4,5,3,4,4],"total":25},
{"rank":192,"id":"60556","name":"孙韦易","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":193,"id":"60585","name":"崔明高","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":194,"id":"60453","name":"陈玉龙","scores":[0,0,4,4,5,3,4,4],"total":25},
{"rank":195,"id":"60183","name":"罗艳萍","scores":[0,1,4,4,5,5,3,4],"total":25},
{"rank":196,"id":"43792","name":"刘琪","scores":[0,0,4,4,5,5,3,4],"total":25},
{"rank":197,"id":"54110","name":"庞伟","scores":[0,1,4,4,5,5,3,4],"total":25},
{"rank":198,"id":"60202","name":"陈涛","scores":[0,1,4,4,5,5,3,4],"total":25},
{"rank":199,"id":"60203","name":"张梅.小","scores":[0,0,4,4,5,5,3,4],"total":25},
{"rank":200,"id":"60074","name":"夏旭兆","scores":[0,1,4,4,5,5,3,4],"total":25},
{"rank":201,"id":"43689","name":"李红芳","scores":[0,0,0,4,10,4,4,3],"total":25},
{"rank":202,"id":"62353","name":"王少卿","scores":[1,0,1,1,5,10,3,3],"total":25},
{"rank":203,"id":"54042","name":"徐亮","scores":[0,0,4,4,10,3,4,0],"total":25},
{"rank":204,"id":"11610","name":"许建明","scores":[0,0,0,4,8,4,4,4],"total":24},
{"rank":205,"id":"11291","name":"盛志芳","scores":[0,0,0,0,5,11,4,4],"total":24},
{"rank":206,"id":"11370","name":"李松","scores":[0,0,0,0,11,5,4,4],"total":24},
{"rank":207,"id":"60189","name":"陈士勇","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":208,"id":"60192","name":"李广晓","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":209,"id":"60106","name":"张雷","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":210,"id":"60350","name":"许灵艳","scores":[0,1,4,4,5,3,4,4],"total":24},
{"rank":211,"id":"43785","name":"张高峰","scores":[0,1,4,4,5,3,4,4],"total":24},
{"rank":212,"id":"43795","name":"陈丽","scores":[0,1,4,4,5,3,4,4],"total":24},
{"rank":213,"id":"53965","name":"韩啸.小","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":214,"id":"60211","name":"张晨锋","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":215,"id":"54064","name":"应晓玲","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":216,"id":"60055","name":"林晗丹","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":217,"id":"60068","name":"陆露苗","scores":[0,0,4,4,5,3,4,4],"total":24},
{"rank":218,"id":"54082","name":"韩小燕","scores":[0,1,4,4,8,0,4,4],"total":24},
{"rank":219,"id":"60428","name":"盛百川","scores":[0,2,4,4,3,5,3,4],"total":24},
{"rank":220,"id":"43753","name":"叶帆","scores":[0,1,0,4,10,3,3,4],"total":24},
{"rank":221,"id":"60444","name":"魏飞霞","scores":[0,0,4,4,5,3,3,4],"total":24},
{"rank":222,"id":"60187","name":"沈丹","scores":[0,0,4,4,5,5,2,4],"total":24},
{"rank":223,"id":"62315","name":"陈佳玮","scores":[1,4,1,1,5,8,4,3],"total":24},
{"rank":224,"id":"61339","name":"袁廷紫","scores":[1,1,3,1,5,6,4,3],"total":24},
{"rank":225,"id":"61322","name":"蔡建新","scores":[1,0,4,1,5,5,4,3],"total":24},
{"rank":226,"id":"43899","name":"吴建芳","scores":[0,0,4,4,5,5,3,3],"total":24},
{"rank":227,"id":"61275","name":"袁建城","scores":[1,0,4,4,5,3,3,3],"total":24},
{"rank":228,"id":"43794","name":"章鹏","scores":[0,1,4,4,5,5,4,2],"total":24},
{"rank":229,"id":"43763","name":"王泽路","scores":[0,0,0,4,5,6,4,4],"total":23},
{"rank":230,"id":"11303","name":"钱一平","scores":[0,0,0,0,5,10,4,4],"total":23},
{"rank":231,"id":"11014","name":"何峰","scores":[0,1,0,0,5,10,4,4],"total":23},
{"rank":232,"id":"62175","name":"陈勇杰","scores":[1,2,1,1,5,6,4,4],"total":23},
{"rank":233,"id":"11570","name":"葛鸣","scores":[0,0,0,4,5,6,4,4],"total":23},
{"rank":234,"id":"43770","name":"陈雯","scores":[0,1,0,4,5,6,4,4],"total":23},
{"rank":235,"id":"11630","name":"赵肖栋","scores":[0,0,0,4,5,6,4,4],"total":23},
{"rank":236,"id":"61535","name":"张何晴","scores":[1,0,2,1,5,5,4,4],"total":23},
{"rank":237,"id":"61722","name":"祝芙天纯","scores":[1,0,2,1,5,5,4,4],"total":23},
{"rank":238,"id":"61564","name":"黄涛","scores":[1,0,2,1,5,5,4,4],"total":23},
{"rank":239,"id":"61561","name":"周金辉","scores":[1,0,2,1,5,5,4,4],"total":23},
{"rank":240,"id":"61736","name":"薛浩岩","scores":[1,0,2,1,5,5,4,4],"total":23},
{"rank":241,"id":"61323","name":"商强","scores":[1,0,4,1,5,3,4,4],"total":23},
{"rank":242,"id":"60432","name":"王飞","scores":[0,0,4,4,5,1,4,4],"total":23},
{"rank":243,"id":"60362","name":"曹福森","scores":[0,4,4,4,5,1,4,4],"total":23},
{"rank":244,"id":"61756","name":"蔡道晟","scores":[1,2,2,1,10,0,4,4],"total":23},
{"rank":245,"id":"61293","name":"徐瑞奇","scores":[1,3,4,4,5,0,4,4],"total":23},
{"rank":246,"id":"60072","name":"厉俊","scores":[0,0,4,4,5,3,3,4],"total":23},
{"rank":247,"id":"43780","name":"何蕾蕾","scores":[0,0,4,4,5,3,3,4],"total":23},
{"rank":248,"id":"54076","name":"王少鹏","scores":[0,0,4,4,5,3,3,4],"total":23},
{"rank":249,"id":"53989","name":"朱伟浩","scores":[0,1,4,4,5,6,0,4],"total":23},
{"rank":250,"id":"60177","name":"莫玲朋","scores":[0,0,4,4,5,3,4,3],"total":23},
{"rank":251,"id":"60658","name":"宋琪刚","scores":[0,0,4,4,5,3,3,3],"total":23},
{"rank":252,"id":"43779","name":"邓佳俊","scores":[0,3,4,4,10,0,2,3],"total":23},
{"rank":253,"id":"62204","name":"张梓楠","scores":[1,0,1,1,15,0,4,0],"total":23},
{"rank":254,"id":"43764","name":"陈卿","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":255,"id":"43718","name":"张磊","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":256,"id":"13738","name":"陆荣伟","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":257,"id":"43742","name":"金春山","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":258,"id":"62199","name":"龚乐天","scores":[1,0,1,1,5,5,4,4],"total":22},
{"rank":259,"id":"11603","name":"何波","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":260,"id":"43725","name":"计燕建","scores":[0,1,0,4,5,5,4,4],"total":22},
{"rank":261,"id":"11665","name":"董勤","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":262,"id":"12133","name":"宋陈强","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":263,"id":"43773","name":"陈锋","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":264,"id":"62320","name":"郑一凡","scores":[1,0,1,1,5,5,4,4],"total":22},
{"rank":265,"id":"62319","name":"姜俊凯","scores":[1,2,1,1,5,5,4,4],"total":22},
{"rank":266,"id":"43774","name":"钱玲渊","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":267,"id":"62227","name":"方芳","scores":[1,0,1,1,5,5,4,4],"total":22},
{"rank":268,"id":"62216","name":"胡忠强","scores":[1,1,1,1,5,5,4,4],"total":22},
{"rank":269,"id":"11563","name":"李生","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":270,"id":"62168","name":"许一鸣","scores":[1,2,1,1,5,5,4,4],"total":22},
{"rank":271,"id":"62302","name":"朱雨露","scores":[1,0,1,1,5,5,4,4],"total":22},
{"rank":272,"id":"11467","name":"吕东升","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":273,"id":"62200","name":"李捷","scores":[1,0,1,1,5,5,4,4],"total":22},
{"rank":274,"id":"43705","name":"沈安林","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":275,"id":"11442","name":"金林勇","scores":[0,0,0,4,5,5,4,4],"total":22},
{"rank":276,"id":"54080","name":"徐泽龙","scores":[0,0,4,4,1,5,4,4],"total":22},
{"rank":277,"id":"60147","name":"张敏","scores":[0,1,4,4,6,0,4,4],"total":22},
{"rank":278,"id":"61723","name":"王宇泽","scores":[1,0,2,1,5,5,3,4],"total":22},
{"rank":279,"id":"60657","name":"吴根强","scores":[0,1,4,4,5,1,3,4],"total":22},
{"rank":280,"id":"60659","name":"丁加平","scores":[0,0,4,4,5,4,0,4],"total":22},
{"rank":281,"id":"60206","name":"叶健","scores":[0,2,4,4,5,3,3,3],"total":22},
{"rank":282,"id":"61747","name":"徐自力","scores":[1,0,2,1,5,8,4,0],"total":22},
{"rank":283,"id":"11367","name":"张梅","scores":[0,0,0,0,5,8,4,4],"total":21},
{"rank":284,"id":"60345","name":"叶康蔚","scores":[0,0,4,4,0,5,4,4],"total":21},
{"rank":285,"id":"43760","name":"杨可杰","scores":[0,0,0,4,6,3,4,4],"total":21},
{"rank":286,"id":"61753","name":"朱成","scores":[1,4,2,1,5,3,4,4],"total":21},
{"rank":287,"id":"61763","name":"申崇靖","scores":[1,2,2,1,5,3,4,4],"total":21},
{"rank":288,"id":"61270","name":"朱玲","scores":[1,0,4,4,0,3,4,4],"total":21},
{"rank":289,"id":"62160","name":"刘苏乐","scores":[1,1,1,1,5,5,3,4],"total":21},
{"rank":290,"id":"43661","name":"吕伟","scores":[0,0,0,4,5,5,3,4],"total":21},
{"rank":291,"id":"62316","name":"赵卓成","scores":[1,0,1,1,5,5,3,4],"total":21},
{"rank":292,"id":"43687","name":"毛凌燕","scores":[0,1,0,4,5,5,3,4],"total":21},
{"rank":293,"id":"43767","name":"王筝","scores":[0,1,0,4,5,5,3,4],"total":21},
{"rank":294,"id":"43757","name":"陈菲","scores":[0,0,0,4,5,5,3,4],"total":21},
{"rank":295,"id":"11438","name":"胡翔","scores":[0,0,0,4,5,5,3,4],"total":21},
{"rank":296,"id":"11501","name":"支晓飞","scores":[0,0,0,4,5,5,3,4],"total":21},
{"rank":297,"id":"11520","name":"於群","scores":[0,4,0,4,5,5,3,4],"total":21},
{"rank":298,"id":"62214","name":"罗锐","scores":[1,1,1,1,10,0,3,4],"total":21},
{"rank":299,"id":"62202","name":"周杭楷","scores":[1,0,1,1,10,0,3,4],"total":21},
{"rank":300,"id":"60182","name":"倪波杰","scores":[0,0,4,4,5,4,0,4],"total":21},
{"rank":301,"id":"60195","name":"朱群儿","scores":[0,0,4,4,5,4,0,4],"total":21},
{"rank":302,"id":"60191","name":"龚宝","scores":[0,0,4,4,3,3,4,3],"total":21},
{"rank":303,"id":"62410","name":"吕思雨","scores":[1,0,1,1,5,5,4,3],"total":21},
{"rank":304,"id":"13677","name":"张旭玲","scores":[0,0,0,4,5,5,4,3],"total":21},
{"rank":305,"id":"13721","name":"俞亮超","scores":[0,0,0,4,5,5,4,3],"total":21},
{"rank":306,"id":"62309","name":"方逸驰","scores":[1,0,1,1,10,0,4,3],"total":21},
{"rank":307,"id":"61292","name":"吴镇涛","scores":[1,0,4,4,0,5,3,3],"total":21},
{"rank":308,"id":"11305","name":"王黎","scores":[0,0,0,0,8,8,2,3],"total":21},
{"rank":309,"id":"43783","name":"罗敏丽","scores":[0,0,4,4,5,3,2,3],"total":21},
{"rank":310,"id":"61105","name":"陈一峰","scores":[1,2,4,4,3,3,2,3],"total":21},
{"rank":311,"id":"60359","name":"陈海泉","scores":[0,0,4,4,5,3,1,3],"total":21},
{"rank":312,"id":"43768","name":"尚伟杰","scores":[0,0,0,4,5,6,4,2],"total":21},
{"rank":313,"id":"61347","name":"季善英","scores":[1,2,2,1,10,0,4,2],"total":21},
{"rank":314,"id":"60364","name":"倪家丹","scores":[0,0,4,4,5,3,2,2],"total":21},
{"rank":315,"id":"62191","name":"孟晨昊","scores":[1,4,1,1,10,0,2,4],"total":20},
{"rank":316,"id":"11589","name":"方铭钧","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":317,"id":"43722","name":"詹志军","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":318,"id":"43756","name":"项晓芳","scores":[0,0,0,4,3,5,4,4],"total":20},
{"rank":319,"id":"12108","name":"单金荣","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":320,"id":"11569","name":"朱永岷","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":321,"id":"62195","name":"刘镇业","scores":[1,3,1,1,5,3,4,4],"total":20},
{"rank":322,"id":"62388","name":"郑尚书","scores":[1,0,1,1,5,3,4,4],"total":20},
{"rank":323,"id":"43759","name":"单磊磊","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":324,"id":"11587","name":"俞卫强","scores":[0,1,0,4,5,3,4,4],"total":20},
{"rank":325,"id":"43748","name":"王伟.小","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":326,"id":"11636","name":"章军","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":327,"id":"62355","name":"郑积辉","scores":[1,1,1,1,5,3,4,4],"total":20},
{"rank":328,"id":"13670","name":"吴桂良","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":329,"id":"11441","name":"徐建斌","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":330,"id":"62322","name":"于骁乐","scores":[1,0,1,1,5,3,4,4],"total":20},
{"rank":331,"id":"11631","name":"叶家胜","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":332,"id":"11573","name":"王雷","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":333,"id":"11439","name":"胡斌斌","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":334,"id":"11605","name":"毛浙广","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":335,"id":"11602","name":"李雅东","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":336,"id":"11436","name":"余黎骏","scores":[0,3,0,4,5,3,4,4],"total":20},
{"rank":337,"id":"43674","name":"安丽芳","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":338,"id":"43700","name":"连朋花","scores":[0,0,0,4,5,3,4,4],"total":20},
{"rank":339,"id":"43762","name":"陈云","scores":[0,1,0,4,5,3,4,4],"total":20},
{"rank":340,"id":"61340","name":"陈焕","scores":[1,0,2,1,5,3,3,4],"total":20},
{"rank":341,"id":"12112","name":"倪志伟","scores":[0,0,0,4,5,5,2,4],"total":20},
{"rank":342,"id":"61758","name":"潘徐栋","scores":[1,0,2,1,3,8,2,2],"total":20},
{"rank":343,"id":"53987","name":"朱剑波","scores":[0,0,4,4,5,3,4,0],"total":20},
{"rank":344,"id":"61784","name":"李小龙","scores":[1,0,2,1,5,1,4,4],"total":19},
{"rank":345,"id":"11609","name":"朱群","scores":[0,0,0,4,5,3,3,4],"total":19},
{"rank":346,"id":"11593","name":"陈谷樟","scores":[0,0,0,4,5,3,3,4],"total":19},
{"rank":347,"id":"43678","name":"张辉","scores":[0,2,0,4,5,3,3,4],"total":19},
{"rank":348,"id":"62325","name":"裘鼎城","scores":[1,1,1,1,5,3,3,4],"total":19},
{"rank":349,"id":"11492","name":"章连根","scores":[0,0,0,4,5,3,3,4],"total":19},
{"rank":350,"id":"11473","name":"宣纪伟","scores":[0,0,0,4,5,3,3,4],"total":19},
{"rank":351,"id":"62167","name":"张添淇","scores":[1,0,1,1,5,3,3,4],"total":19},
{"rank":352,"id":"43786","name":"应美芬","scores":[0,0,4,4,5,0,2,4],"total":19},
{"rank":353,"id":"13708","name":"王理萍","scores":[0,1,0,4,5,5,1,4],"total":19},
{"rank":354,"id":"11606","name":"卫东","scores":[0,0,0,4,5,6,0,4],"total":19},
{"rank":355,"id":"11579","name":"何利权","scores":[0,0,0,4,5,3,4,3],"total":19},
{"rank":356,"id":"43683","name":"杨苗英","scores":[0,0,0,4,8,0,4,3],"total":19},
{"rank":357,"id":"61740","name":"林甲乐","scores":[1,4,2,1,5,3,3,3],"total":19},
{"rank":358,"id":"11440","name":"陈国繁","scores":[0,0,0,4,5,5,3,2],"total":19},
{"rank":359,"id":"62159","name":"钱琛","scores":[1,0,2,1,0,10,4,0],"total":19},
{"rank":360,"id":"62398","name":"陈子奕","scores":[1,0,1,1,0,15,0,0],"total":19},
{"rank":361,"id":"62391","name":"潘雨馨","scores":[1,0,1,1,15,0,0,0],"total":19},
{"rank":362,"id":"11432","name":"雷宏胜","scores":[0,0,0,0,5,5,4,4],"total":18},
{"rank":363,"id":"11306","name":"周黎","scores":[0,1,0,0,5,5,4,4],"total":18},
{"rank":364,"id":"13730","name":"庄雅娟","scores":[0,1,0,4,1,5,4,4],"total":18},
{"rank":365,"id":"11681","name":"孙晓刚","scores":[0,0,0,4,1,5,4,4],"total":18},
{"rank":366,"id":"11566","name":"王伟.大","scores":[0,0,0,4,3,3,4,4],"total":18},
{"rank":367,"id":"13744","name":"张国华","scores":[0,0,0,4,3,3,4,4],"total":18},
{"rank":368,"id":"11634","name":"谢诚","scores":[0,0,0,4,5,1,4,4],"total":18},
{"rank":369,"id":"62163","name":"朱仕安","scores":[1,0,1,1,5,1,4,4],"total":18},
{"rank":370,"id":"43695","name":"吴秀丹","scores":[0,1,0,4,6,0,4,4],"total":18},
{"rank":371,"id":"43769","name":"金科君","scores":[0,0,0,4,6,0,4,4],"total":18},
{"rank":372,"id":"61562","name":"胡国栋","scores":[1,0,2,1,5,0,4,4],"total":18},
{"rank":373,"id":"43696","name":"翁微微","scores":[0,0,0,4,5,3,2,4],"total":18},
{"rank":374,"id":"43707","name":"王红锋","scores":[0,0,0,4,8,0,2,4],"total":18},
{"rank":375,"id":"13799","name":"童朝钧","scores":[0,0,0,4,5,4,1,4],"total":18},
{"rank":376,"id":"61746","name":"叶子涵","scores":[1,0,2,1,5,3,1,4],"total":18},
{"rank":377,"id":"11604","name":"许家铭","scores":[0,0,0,4,5,5,0,4],"total":18},
{"rank":378,"id":"62305","name":"陆正萌","scores":[1,0,1,1,3,5,3,3],"total":18},
{"rank":379,"id":"62333","name":"余嘉懿","scores":[1,2,1,1,5,3,3,3],"total":18},
{"rank":380,"id":"62226","name":"叶晨苗","scores":[1,4,1,1,5,3,3,3],"total":18},
{"rank":381,"id":"62212","name":"张尚阳","scores":[1,3,1,1,8,0,3,3],"total":18},
{"rank":382,"id":"62303","name":"郎依林","scores":[1,0,1,1,5,5,1,3],"total":18},
{"rank":383,"id":"62190","name":"程旭东","scores":[1,0,1,1,0,10,4,0],"total":18},
{"rank":384,"id":"62181","name":"王欣悦","scores":[1,4,1,1,0,10,4,0],"total":18},
{"rank":385,"id":"62201","name":"陈伟民","scores":[1,0,1,1,5,5,4,0],"total":18},
{"rank":386,"id":"53971","name":"郦帅","scores":[0,0,4,4,5,5,0,0],"total":18},
{"rank":387,"id":"11431","name":"屠建国","scores":[0,0,0,0,5,5,3,4],"total":17},
{"rank":388,"id":"11399","name":"金涛","scores":[0,0,0,0,5,5,3,4],"total":17},
{"rank":389,"id":"13712","name":"张坚锋","scores":[0,0,0,4,5,4,0,4],"total":17},
{"rank":390,"id":"62174","name":"吴纯彪","scores":[1,1,1,1,3,3,4,3],"total":17},
{"rank":391,"id":"61764","name":"杜博兴","scores":[1,0,2,1,5,0,4,3],"total":17},
{"rank":392,"id":"62351","name":"厉浩伟","scores":[1,0,1,1,8,0,2,3],"total":17},
{"rank":393,"id":"11304","name":"李伶","scores":[0,1,0,0,5,3,4,4],"total":16},
{"rank":394,"id":"11020","name":"周农耀","scores":[0,0,0,0,5,3,4,4],"total":16},
{"rank":395,"id":"11295","name":"盛丽莉","scores":[0,0,0,0,5,3,4,4],"total":16},
{"rank":396,"id":"11019","name":"吕飞英","scores":[0,0,0,0,8,0,4,4],"total":16},
{"rank":397,"id":"43749","name":"傅宏玮","scores":[0,0,0,4,5,1,3,3],"total":16},
{"rank":398,"id":"11572","name":"方之炯","scores":[0,0,0,4,5,3,3,1],"total":16},
{"rank":399,"id":"60440","name":"吴春兰","scores":[0,0,4,4,4,1,1,1],"total":16},
{"rank":400,"id":"60542","name":"周来所","scores":[0,0,4,4,1,0,1,4],"total":15},
{"rank":401,"id":"11023","name":"朱明忠","scores":[0,0,0,0,5,3,3,4],"total":15},
{"rank":402,"id":"11398","name":"陈纲","scores":[0,0,0,0,5,3,3,4],"total":15},
{"rank":403,"id":"11741","name":"潘武","scores":[0,0,0,4,3,1,3,4],"total":15},
{"rank":404,"id":"11412","name":"吴一华","scores":[0,0,0,0,8,0,3,4],"total":15},
{"rank":405,"id":"43691","name":"孙海芳","scores":[0,0,0,4,5,0,2,4],"total":15},
{"rank":406,"id":"11585","name":"楼峰","scores":[0,0,0,4,1,6,0,4],"total":15},
{"rank":407,"id":"13733","name":"张德迪","scores":[0,0,0,4,5,0,4,2],"total":15},
{"rank":408,"id":"62312","name":"蒲曜先","scores":[1,0,1,1,5,3,1,2],"total":15},
{"rank":409,"id":"11296","name":"虞丽萍","scores":[0,0,0,0,1,5,4,4],"total":14},
{"rank":410,"id":"10204","name":"章云","scores":[0,0,0,0,5,1,4,4],"total":14},
{"rank":411,"id":"11414","name":"朱晓勤","scores":[0,1,0,0,8,0,2,4],"total":14},
{"rank":412,"id":"11584","name":"贾伟清","scores":[0,0,0,4,5,1,0,4],"total":14},
{"rank":413,"id":"11292","name":"徐玉中","scores":[0,0,0,0,5,3,4,2],"total":14},
{"rank":414,"id":"60185","name":"吴彩芬","scores":[0,0,4,4,3,1,1,1],"total":14},
{"rank":415,"id":"11429","name":"李平","scores":[0,0,0,0,6,0,3,4],"total":13},
{"rank":416,"id":"11430","name":"胡嘉军","scores":[0,0,0,0,5,3,1,4],"total":13},
{"rank":417,"id":"61290","name":"吕璐","scores":[1,0,4,4,0,3,0,0],"total":13},
{"rank":418,"id":"62359","name":"吴鹏","scores":[1,0,1,1,0,0,4,4],"total":12},
{"rank":419,"id":"11411","name":"徐静","scores":[0,4,0,0,5,0,3,4],"total":12},
{"rank":420,"id":"61772","name":"沈乐丰","scores":[1,0,2,1,3,0,0,4],"total":12},
{"rank":421,"id":"11588","name":"邵军","scores":[0,0,0,4,5,3,0,0],"total":12},
{"rank":422,"id":"61565","name":"韩湘","scores":[1,1,2,1,3,3,0,0],"total":11},
{"rank":423,"id":"54089","name":"李旭","scores":[0,0,4,4,0,3,0,0],"total":11},
{"rank":424,"id":"11413","name":"章茵","scores":[0,0,0,0,3,0,3,4],"total":10},
{"rank":425,"id":"43754","name":"王莺","scores":[0,0,0,4,3,1,1,1],"total":10},
{"rank":426,"id":"61338","name":"高升","scores":[1,2,3,1,0,0,4,0],"total":10},
{"rank":427,"id":"11416","name":"傅力","scores":[0,0,0,0,4,0,1,4],"total":9},
{"rank":428,"id":"11396","name":"章凌雁","scores":[0,0,0,0,1,3,4,1],"total":9},
{"rank":429,"id":"61751","name":"李嘉鑫","scores":[1,4,2,1,0,0,4,0],"total":9},
{"rank":430,"id":"62178","name":"赵昀阳","scores":[1,0,1,1,0,5,0,0],"total":9},
{"rank":431,"id":"62394","name":"王若朴","scores":[1,0,1,1,0,5,0,0],"total":9},
{"rank":432,"id":"11437","name":"程杭军","scores":[0,0,0,4,5,0,0,0],"total":9},
{"rank":433,"id":"62337","name":"查宇尘","scores":[1,0,1,1,0,0,4,0],"total":8},
{"rank":434,"id":"61727","name":"张银亮","scores":[1,0,2,1,0,0,3,0],"total":8},
{"rank":435,"id":"61502","name":"赵巧霞","scores":[1,0,2,1,0,3,0,0],"total":8},
{"rank":436,"id":"11583","name":"周江","scores":[0,0,0,4,0,3,0,0],"total":7},
{"rank":437,"id":"62354","name":"章涛","scores":[1,0,1,1,3,0,0,0],"total":7},
{"rank":438,"id":"11419","name":"任涛","scores":[0,1,0,0,3,3,0,0],"total":6},
{"rank":439,"id":"13669","name":"岑如春","scores":[0,0,0,4,0,1,0,0],"total":5},
{"rank":440,"id":"11309","name":"史旻","scores":[0,0,0,0,3,0,0,0],"total":3}
];

// 全局变量
let currentGameFilter = 'all';
let currentData = [...LEADERBOARD_DATA];

// DOM 元素
const totalParticipants = document.getElementById('totalParticipants');
const totalScore = document.getElementById('totalScore');
const leaderboardTitle = document.getElementById('leaderboardTitle');
const leaderboardCount = document.getElementById('leaderboardCount');
const leaderboardList = document.getElementById('leaderboardList');
const emptyState = document.getElementById('emptyState');
const gameDetailModal = document.getElementById('gameDetailModal');
const gameDetailTitle = document.getElementById('gameDetailTitle');
const gameStats = document.getElementById('gameStats');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeLeaderboard();
});

// 设置事件监听器
function setupEventListeners() {
    // 游戏选择器
    document.querySelectorAll('.game-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const game = this.dataset.game;
            selectGame(game);
        });
    });

    // 关闭游戏详情弹窗
    gameDetailModal.addEventListener('click', function(e) {
        if (e.target === gameDetailModal) {
            closeGameDetail();
        }
    });

    // ESC 键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGameDetail();
        }
    });
}

// 初始化排行榜
function initializeLeaderboard() {
    currentData = [...LEADERBOARD_DATA];
    displayLeaderboard(currentData);
    updateStats();
}

// 选择游戏
function selectGame(game) {
    // 更新标签状态
    document.querySelectorAll('.game-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-game="${game}"]`).classList.add('active');

    currentGameFilter = game;
    
    if (game === 'all') {
        currentData = [...LEADERBOARD_DATA];
        leaderboardTitle.textContent = '全部游戏排行榜';
    } else {
        const gameIndex = parseInt(game);
        const gameInfo = GAMES[gameIndex];
        leaderboardTitle.textContent = `${gameInfo.icon} ${gameInfo.name} 排行榜`;
        
        // 按选中游戏的分数排序
        currentData = [...LEADERBOARD_DATA]
            .filter(player => player.scores[gameIndex] > 0)
            .sort((a, b) => b.scores[gameIndex] - a.scores[gameIndex]);
    }
    
    displayLeaderboard(currentData);
    leaderboardCount.textContent = `${currentData.length} 人参与`;
}

// 显示排行榜
function displayLeaderboard(data) {
    if (data.length === 0) {
        leaderboardList.innerHTML = '';
        leaderboardList.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    leaderboardList.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    leaderboardList.innerHTML = data.slice(0, 100).map((player, index) => {
        const displayRank = currentGameFilter === 'all' ? player.rank : index + 1;
        return createPlayerCard(player, displayRank);
    }).join('');
}

// 创建玩家卡片
function createPlayerCard(player, rank) {
    const rankClass = getRankClass(rank);
    const gameIndex = currentGameFilter === 'all' ? null : parseInt(currentGameFilter);
    
    let gameScoresHtml = '';
    if (currentGameFilter === 'all') {
        // 显示所有游戏的积分
        GAMES.forEach((game, idx) => {
            const score = player.scores[idx];
            if (score > 0) {
                gameScoresHtml += `<div class="game-score">${game.icon} ${score}</div>`;
            }
        });
    } else {
        // 显示当前游戏的积分
        const game = GAMES[gameIndex];
        const score = player.scores[gameIndex] || 0;
        gameScoresHtml = `<div class="game-score">${game.icon} ${score}</div>`;
    }
    
    const displayScore = currentGameFilter === 'all' 
        ? player.total 
        : (player.scores[parseInt(currentGameFilter)] || 0);
    
    return `
        <div class="leaderboard-item ${rankClass}" onclick="showPlayerDetail('${player.id}', '${player.name}')">
            <div class="rank-number">${rank}</div>
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <p class="player-id">工号: ${player.id}</p>
            </div>
            <div class="score-info">
                <div class="total-score">${displayScore}</div>
                <div class="game-scores">${gameScoresHtml}</div>
            </div>
        </div>
    `;
}

// 获取排名样式类
function getRankClass(rank) {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
}

// 更新统计信息
function updateStats() {
    totalParticipants.textContent = LEADERBOARD_DATA.length;
    
    const totalScoreSum = LEADERBOARD_DATA.reduce((sum, p) => sum + p.total, 0);
    totalScore.textContent = totalScoreSum;
    
    leaderboardCount.textContent = `${currentData.length} 人参与`;
}

// 显示玩家详情
function showPlayerDetail(employeeId, employeeName) {
    const player = LEADERBOARD_DATA.find(p => p.id === employeeId);
    if (!player) return;
    
    gameDetailTitle.textContent = `${employeeName} (${employeeId}) 的游戏详情`;
    
    // 显示游戏统计
    const gameStatsHtml = GAMES.map((game, idx) => {
        const score = player.scores[idx];
        return `
            <div class="game-stat-item">
                <div class="game-stat-number">${score}</div>
                <p class="game-stat-label">${game.icon} ${game.name}</p>
            </div>
        `;
    }).join('');
    
    gameStats.innerHTML = gameStatsHtml;
    
    gameDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭游戏详情
function closeGameDetail() {
    gameDetailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
