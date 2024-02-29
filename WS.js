//Global Values
var MapZoom = 1;
var ActiveMap = 1;
var ActiveMapSide = "R";
var ActivePrefecture;
var ActiveDistrict;
var ActiveDistrictID;
var ActiveDistrictInt = 0;
var NumTest = 0;
var ZoomRatio = 1;
var YScrollCounter;
var UpRatio = 1.25;
var DownRatio = 0.75;
var transformMatrix = [1, 0, 0, 1, 0, 0];
var svg = [];
var viewbox = [];
var centerX = [];
var centerY = [];
var matrixGroup = [];
var MapZoom2Array = [];
var newMatrix;
var SVG = 0;
var ActiveTileId = "";
var TotalDistrictInitCounter = 0;
var DistrictCount = 0;
var DistrictNameArrayCounter = 0;
var DistrictNameArray = [];

//GameplayCounters
var TurnCount = 0;
var TurnMoveCount = 0;

var VillageCount = 0;
var VillagePopulation = [];
var CivFactoryCount = 0;
var CivFactoryLevel = [];
var MilFactoryCount = 0;
var MilFactoryLevel = [];
var CityCount = 0;
var CityPopulation = [];
var LumberjackCount = 0;
var LumberjackLevel = [];
var SoldierCount = 0;
var SoldierLevel = [];
var MineCount = 0;
var MineLevel = [];
var FarmCount = 0;
var FarmLevel = [];

var WoodCount = 10;
var PopulationCount = 0;
var SteelCount = 0;
var FoodCount = 10;
var MoneyCount = 50;
var WeaponCount = 0;
var DistrictBuildingCount = [];

var MapGrid = [];
var MapGridBD = [];
var MapGridSBD = [];
var MapGridElement = [];
var TotalDistrictCount = 0;

const PrefArray = ["Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima","Gifu","Gunma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa","Iwate","Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto","Mie","Miyagi","Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita","Okayama","Osaka","Saga","Saitama","Shiga","Shimane","Shizuoka","Tochigi","Tokushima","Tokyo","Tottori","Toyama","Wakayama","Yamagata","Yamaguchi","Yamanashi"];
const DetailedPrefArray = [
    ["Agui","Aisai","Ama","Anjo","Chiryu","Chita","Fuso","Gamagori","Handa","Hekinan","Higashiura","Ichinomiya","Inazawa","Inuyama","Iwakura","Kanie","Kariya","Kasugai","Kitanagoya","Kiyosu","Komaki","Konan","Kota","Mihama","Minamichita","Miyoshi","Nagakute","Nagoya_1","Nagoya_2","Nishio","Nisshin","Obu","Oguchi","Oharu","Okazaki","Owariasahi","Seto","Shinshiro","Shitara","Tahara","Takahama","Taketoyo","Tobishima","Toei","Togo","Tokai","Tokoname","Toyoake","Toyohashi","Toyokawa","Toyone","Toyota","Toyoyama","Tsushima","Yatomi"],
    ["Akita","Daisen","Fujisato","Gojome","Hachirogata","Happou","Higashinaruse","Ikawa","Kamikoani","Katagami","Kazuno","Kitaakita","Kosaka","Misato","Mitane","Nikaho","Noshiro","Odate","Oga","Ogata","Semboku","Ugo","Yokote","Yurihonjo","Yuzawa"],
    ["Ajigawasa","Aomori","Fujisaki","Fukaura","Gonohe","GoshogawaraNorth","GoshogawaraSouth","Hachinohe","Hashikami","Higashidoori","Hirakawa","Hiranai","Hirosaki","Imabetsu","Inakadate","Itayanagi","Kazamura","Kuroishi","Misawa","Mutsu","NakadomariNorth","NakadomariSouth","Nanbu","Nishimeya","Noheji","Oirase","Ooma","Owani","Rokkasho","Rokunohe","Sai","Sannohe","Shichinohe","Shingo","SotogahamaNorth","SotogahamaSouth","Takko","Tohoku","Towada","Tsugaru","Tsuruta","Yokohama","Yomogita"],
    ["Abiko","Asahi","Chiba","Chonan","Chosei","Choshi","Funabashi","Futtsu","Ichihara","Ichikawa","Ichinomiya","Inzai","Izumi","Kamagaya","Kamogaya","Kashiwa","Katori","Katsuura","Kimitsu","Kisarazu","Kozaki","Kujukuri","Kyonan","Matsudo","Minamiboso","Mobara","Mutsuzawa","Nagara","Nagareyama","Narashino","Narita","Noda","Oamishirasato","Onjuku","Otaki","Sakae","Sakura","Sammu","Shibayama","Shirako","Shiroi","Shisui","Sodegaura","Sosa","Tako","Tateyama","Togane","Tohnosho","Tomisato","Urayasu","Yachimata","Yachiyo","Yokoshibahikari","Yotsukaido"],
    ["Ainan","Ikata","Imabari","Iyo","Kamijima","Kihoku","Kumakogen","Masaki","Matsuno","Matsuyama","Niihama","Ozu","Saijo","Seiyo","Shikokuchuo","Tobe","Toon","Uchiko","Uwajima","Yawatahama"],
    ["Awara","Echizencho","Echizenshi","Eiheiji","Fukui","Ikeda","Katsuyama","Mihama","Minamiechizen","Obama","Ohi","Ono","Sabae","Sakai","Takahama","Tsuruga","Wakasa"],
    ["Aka","Asakura","Ashiya","Buzen","Chikugo","Chikujo","Chikushino","Chikuzen","Dazaifu","Fukuchi","Fukuoka","Fukutsu","Hirokawa","Hisayama","Iizuka","Itoda","Itoshima","Kama","Kanda","Kasuga","Kasuya","Kawara","Kawasaki","Keisen","Kitakyushu","Koga","Koge","Kotake","Kurate","Kurume","Miyako","Miyama","Miyawaka","Mizumaki","Munataka","Nakagawa","Nakama","Nogata","Ogori","Okagaki","Okawa","Omuta","Onga","Onojo","Ooki","Oto","Sasaguri","Shime","Shingu","Soeda","Sue","Tachiarai","Tagawa","Toho","Ukiha","Umi","Yame","Yanagawa","Yoshitomi","Yukuhashi"],
    ["Aizubange","Aizumisato","Aizuwakamatsu","Asakawa","Bandai","Date","Fukushima_1","Fukushima_2","Fukushima_3","Furudono","Futaba","Hanawa","Hinoemata","Hirata","Hirono","Iitate","Inawashiro","Ishikawa","Iwaki","Izumizaki","Kagamiishi","Kaneyama","Katsurao","Kawamata","Kawauchi","Kitakata","Kitashiobara","Koori","Koriyama","Kunimi","Miharu","Minamiaizu","Minamisoma","Mishima","Motomiya","Nakajima","Namie","Naraha","Nihonmatsu","Nishiaizu","Nishigo","Okuma","Ono","Otama","Samegawa","Shimogo","Shinchi","Shirakawa","Showa","Soma","Sukagawa","Tadami","Tamakawa","Tamura","Tanagura","Tenei","Tomioka","Yabuki","Yamatsuri","Yanaizu","Yugawa"],
    ["Anpachi","Ena","Gero","Gifu","Ginan","Godo","Gujo","Hashima","Hichiso","Hida","Higashishirakawa","Ibigawa","Ikeda","Kaizu","Kakamigahara","KaniNorth","KaniSouth","Kasamatsu","Kawabe","Kitagata","Mino","Minokamo","Mitake","Mizuho","Mizunami","Motosu","Nakatsugawa","OgakiEast","OgakiNorth","OgakiWest","Ono","Sakahogi","Seki","Sekigahara","Shirakawacho","Shirakawamura","Tajimi","Takayama","Tarui","Toki","Tomika","Wanouchi","Yamagata","Yaotsu","Yoro"],
    ["Annaka","Chiyoda","Fujioka","Higashiatsuma","Isesaki","Itakura","Kanna","Kanra","Katashina","Kawaba","KiryuEast","KiryuWest","Kusatsu","Maebashi","Meiwa","Midori","Minakami","Naganohara","Nakanojo","Nanmoku","Numata","Oizumi","Ora","Ota","Shibukawa","Shimonita","Shinto","Showa","TakasakiNorth","TakasakiSouth","Takayama","Tamamura","Tatebayashi","Tomioka","Tsumagoi","Ueno","Yoshioka"],
    ["Akiota","Akitakata","Etajima","Fuchu","Fukuyama_1","Fukuyama_2","Hatsukaichi","Higashihiroshima","Hiroshima_1","Hiroshima_2","Jinsekikogen","Kaita","Kitahiroshima","Kumano","Kure","Mihara","Miyoshi","Onomichi","Osakikamijima","Otake","Saka","Sera","Shobara","Takehara"],
    [],
    ["Aioi","Akashi","Ako","Amagasaki","Asago","Ashiya","Awaji","Fukusaki","Harima","HimejiNorth","HimejiSouth","Ichikawa","Inagawa","Inami","Itami","Kakogawa","Kami","Kamigori","Kamikawa","Kasai","Kato","Kawanishi","Kobe","Miki","Minamiawaji","Nishinomiya","Nishiwaki","Ono","Sanda","Sayo","Shinonsen","Shiso","Sumoto","Taishi","Taka","Takarazuka","Takasago","Tamba","Tambasasayama","Tatsuno","Toyooka","Yabu"],
    ["Ami","Bando","Chikusei","Daigo","Goka","Hitachi","Hitachinaka","Hitachiomiya","Hitachiota","Hokota","Ibaraki","Inashiki","Ishioka","Itako","Joso","Kamisu","Kasama","Kashima","Kasumigaura","Kawachi","Kitaibaraki","Koga","Miho","Mito","Moriya","Naka","Namegata","Oarai","Omitama","Ryugasaki","Sakai","Sakuragawa","Shimotsuma","Shirosato","Takahagi","Tokai","Tone","Toride","Tsuchiura","Tsukuba","Tsukubamirai","Ushiku","Yachiyo","Yuki"],
    ["Anamizu","Hakui","Hakusan","Hodatsushimizu","Kaga","Kahoku","Kanazawa","Kawakita","Komatsu","Nakanoto","Nanao","Nomi","Nonoichi","Noto","Shika","Suzu","Tsubata","Uchinada","Wajima"],
    ["Fudai","Hachimantai","Hanamaki","Hiraizumi","Hirono","Ichinohe","Ichinoseki","Iwaizumi","Iwate","Kamaishi","Kanegasaki","Karumai","Kitakami","Kuji","Kunohe","Kuzumaki","Miyako","Morioka","Ninohe","Nishiwaga","Noda","Ofunato","Oshu","Otsuchi","Rikuzentakata","Shiwa","Shizukuishi","Sumita","Takizawa","Tanohata","Tono","Yahaba","Yamada"],
    ["Ayagawa","Higashikagawa","Kanonji","Kotohira","Manno","Marugame","Miki","Mitoyo","Naoshima","Sakaide","Sanuki","Shodoshima","Tadotsu","Takamatsu","Tonosho","Utazu","Zentsuji"],
    ["Aira","Akune","Higashikushira","Hioki","Ibusuki","Ichikikushikino","Isa","Izumi","Kagoshima","Kanoya","Kimotsuki","Kinko","Kirishima","Makurazaki","Minamikyushu","Minamiosumi","Minamisatsuma","Nagashima","Osaki","Satsuma","Satsumasendai","Shibushi","Soo","Tarumizu","Yusui"],
    ["Aikawa","Atsugi","Ayase","Chigasaki","Ebina","Fujisawa","Hadano","Hakone","Hayama","Hiraitsuka","Isehara","Kaisei","Kamakura","Kawasaki","Kiyokawa","Manazuru","Matsuda","Minamiashigara","Miura","Nakai","Ninomiya","Odawara","Oi","Oiso","Sagamihara","Samukawa","Yamakita","Yamato","Yokohama","Yokosuka_1","Yokosuka_2","Yugawara","Zama","Zushi"],
    ["Aki","Geisei","Hidaka","Ino","Kami","Kitagawa","Kochi","Konan","Kurishio","Mihara","Motoyama","Muroto","Nahari","Nakatosa","Nankoku","Niyodogawa","Ochi","Okawa","Otoyo","Otsuki","Sakawa","Shimantocho","Shimantoshi","Sukumo","Susaki","Tano","Tosa","Tosacho","Tosashimizu","Toyo","Tsuno","Umaji","Yasuda","Yusuhara"],
    ["Amakusa_1","Amakusa_2","Arao","Asagiri","Ashikita","Aso","Gyokuta","Hikawa","Hitoyoshi","Itsuki","Kamiamakusa","Kashima","Kikuchi","Kikuyo","Kosa","Koshi","Kumamoto","Kumamura","Mashiki","Mifune","Minamata","Minamiaso","Minamioguni","Misato","Mizukami","Nagasu","Nagomi","Nankan","Nishihara","Nishiki","Oguni","Ozu","Reihoku","Sagara","Takamori","Tamana","Taragi","Tsunagi","Ubuyama","Uki","Uto","Yamae","Yamaga","Yamato","Yatsushiro","Yunomae"],
    ["Ayabe","Fukuchiyama","Ide","Ine","Joyo","Kameoka","Kasagi","Kizugawa","Kumiyama","Kyotamba","Kyotanabe","Kyotango","Kyoto","Minamiyama","Miyazu","Muko","Nagaokakyo","Nantan","Oyamazaki","Seika","Uji","Ujitawara","Wazuka","Yawata","Yosano"],
    ["Asahi","Iga","Inabe","Ise","Kameyama","Kawagoe","Kiho","Kihoku","Kisosaki","Komono","Kumano","Kuwana","Matsusaka","Meiwa","Mihama","Minamiise","Nabari","Odai","Owase","Shima","Suzuka","Taiki","Taki","Tamaki","Toba","Toin","Tsu","Watarai","Yokkaichi"],
    ["Higashimatsushima","Ishinomaki_1","Ishinomaki_2","Iwanuma","Kakuda","Kami","Kawasaki","Kesennuma_1","Kesennuma_2","Kurihara","Marumori","Matsushima","Minamisanriku","Misato","Murata","Natori","Ogawara","Ohira","Onagawa","Osaki","Osato","Rifu","Sendai","Shibata","Shichigahama","Shichikashuku","Shikama","Shiogama","Shiroishi","Tagajo","Taiwa","Tome","Tomiya","Wakuya","Watari","Yamamoto","Zaou"],
    ["Aya","Ebino","Gokase","Hinokage","Hyuga","Kadogawa","Kawaminami","Kijo","Kobayashi","Kunitomi","Kushima","Mimata","Misato","Miyakonojo","Miyazaki","Morotsuka","Nichinan","Nishimera","Nobeoka","Saito","Shiiba","Shintomi","Takachiho","Takaharu","Takanabe","Tsuno"],
    ["Achi","Agematsu","Anan","Aoki","Asahi","Azumino","Chikuhoku","Chikuma","Chino","Fujimi","Hakuba","Hara","Hiraya","Iida","Iijima","Iiyama","Iizuna","Ikeda","Ikusaka","Ina","Karuizawa","Kawakami","Kijimadaira","Kisomachi","Kisomura","Kitaaiki","Komagane","Komoro","Koumi","Matsukawamachi","Matsukawamura","Matsumoto","Minamiaiki","Minamimaki","Minamiminowa","Minowa","Miyada","Miyota","Nagano","Nagawa","Nagaiso","Nakagawa","Nakano","Neba","Nozawaonsen","Obuse","Ogawa","Okaya","Omachi","Omi","Ookuwa","Ooshika","Otaki","Otari","Sakae","Sakaki","Saku","Sakuho","Shimojo","Shimosuwa","Shinano","Shiojiri","Suwa","Suzaka","Takagi","Takamori","Takayama","Tateshina","Tatsuno","Tenryu","Tomi","Toyooka","Ueda","Urugi","Yamagata","Yamanouchi","Yasuoka"],
    ["Hasami","Higashisonogi","Hirado","Isahaya","Kawatana","Matsuura_1","Matsuura_2","Minamishimabara","Nagasaki","Nagayo","Omura","Saikai","Sasebo","Saza","Shimabara","Togitsu","Unzen"],
    ["Ando","Asukamura","Gojo","Gose","Heguri","Higashiyoshino","Ikaruga","Ikoma","Kamikitayama","Kanmaki","Kashiba","Kashihara","Katsuragi","Kawai","Kawakami","Kawanishi","Koryo","Kurotaki","Mitsue","Miyake","Nara","Nosegawa","Oji","Oyodo","Sakurai","Sango","Shimoichi","Shimokitayama","Soni","Takatori","Tawaramoto","Tenkawa","Tenri","Totsukawa","Uda","Yamatokoriyama","Yamatotakada","Yamazoe","Yoshino"],
    ["Aga","Agano","Awashimaura","Gosen","Itoigawa","Izumozaki","Joetsu","Kamo","Kariwa","Kashiwazaki","Minamiuonuma","Mitsuke","Murakami","Myoko","Nagaoka","NiigataSouth","Niigata","Ojiya","Sado","Sanjo","Seiro","Sekikawa","Shibata","Tagami","Tainai","Tokamachi","Tsubame","Tsunan","Uonuma","Yahiko","Yuzawa"],
    ["Beppu","BungoOhno","Bungotakada","Hiji","Hita","Kitsuki","Kokonoe","Kunisaki","Kusu","Nakatsu","Oita","Saiki","Taketa","Tsukumi","Usa","Usuki","Yufu"],
    ["Akaiwa","Asakuchi","Bizen","Hayashima","Ibara","Kagamino","Kasaoka","Kibichuo","Kumenan","Kurashiki","Maniwa","Mimasaka","Misaki","Nagi","Niimi","Nishiawakura","Okayama","Satosho","Setouchi","Shinjo","Shoo","Soja","Takahashi","Tamano","Tsuyama","Wake","Yakage"],
    ["Chihayaakasaka","Daito","Fujidera","Habikino","Hannan","Higashiosaka","Hirakita","Ibaraki","Ikeda","Izumi","Izumiotsu","Izumisano","Kadoma","Kaizuka","Kanan","Kashiwara","Katano","Kawachinagano","Kishiwada","Kumatori","Matsubara","Minoh","Misaki","Moriguchi","Neyagawa","Nose","Osaka","Osakasayama","Sakai","Sennan","Settsu","Shijonawate","Shimamoto","Suita","Tadaoka","Taishi","Tajiri","Takaishi","Takatsuki","Tondabayashi","Toyonaka","Toyono","Yao"],
    ["Arita","Genkai","Imari","Kamimine","Kanzaki","Karatsu","Kashima","Kiyama","Kouhoku","Miyaki","Ogi","Omachi","Saga","Shiroishi","Takeo","Taku","Tara","Tosu","Ureshino","Yoshinogari"],
    ["Ageo","Asaka","Chichibu","Fujimi","Fujimino","Fukaya","Gyoda","Hanno","Hanyu","Hasuda","Hatoyama","Hidaka","Higashichichibu","Higashimatsuyama","Honjo","Ina","Iruma","Kamikawa","Kamisato","Kasukabe","Kawagoe","Kawaguchi","Kawajima","Kazo","Kitamoto","Koshigaya","Kounosu","Kuki","Kumagaya","Matsubushi","Minano","MisatoKodama","Misato","Miyashiro","Miyoshi","Moroyama","Nagatoro","Namegawa","Niiza","Ogano","Ogawa","Ogose","Okegawa","Ranzan","Saitama","Sakado","Satte","Sayama","Shiki","Shiraoka","Soka","Sugito","Toda","Tokigawa","Tokorozawa","Tsurugashima","Wako","Warabi","Yashio","Yokoze","Yorii","Yoshikawa","Yoshimi"],
    ["Aisho","Higashiomi","Hikone","Hino","Koka","Konan","Koura","Kusatsu","Maibara","Moriyama","Nagahama","Omihachiman","Otsu","Ritto","Ryuoh","Taga","Takashima","Toyosato","Yasu"],
    ["Gotsu","Hamada","Iinan","Izumo","Kawamoto","Masuda","Matsue","Misato","Oda","Ohnan","Okuizumo","Tsuwano","Unnan","Yasugi","Yoshika"],
    ["Atami","Fuji","Fujieda","Fujinomiya","Fukuroi","Gotemba","Hamamatsu","Higashiizu","Ito","Iwata","Izu","Izunokuni","Kakegawa","Kannami","Kawanehon","Kawazu","Kikugawa","Kosai","Makinohara","Matsuzaki","Minamiizu","Mishima","Mori","Nagaizumi","Nishiizu","Numazu","Omaezaki","Oyama","Shimada","Shimizu","Shimoda","Shizuoka","Susono","Yaizu","Yoshida"],
    ["Ashikaga","Haga","Ichikai","Kaminokawa","Kanuma","Mashiko","Mibu","Moka","Motegi","Nakagawa","Nasu","Nasukarasuyama","Nasushiobara","Nikko","Nogi","Ohtawara","Oyama","Sakura","Sano","Shimotsuke","Shioya","Takanezawa","Tochigi","Utsunomiya","Yaita"],
    ["Aizumi","Anan","Awa","Higashimiyoshi","Ishii","Itano","Kaiyo","Kamiita","Kamikatsu","Kamiyama","Katsuura","Kitajima","Komatsushima","Matsushige","Mima","Minami","MiyoshiNorth","MiyoshiSouth","Mugi","Naka","Naruto","Sanagochi","Tokushima","Tsurugi","Yoshinogawa"],
    ["Akiruno","Akishima","Chofu","Fuchu","Fussa","Hachioji","Hamura","Higashikurume","Higashimurayama","Higashiyamato","Hino","Hinode","Hinohara","Inagi","Kiyose","Kodaira","Koganei","Kokubunji","Komae","Kunitachi","Machida","Mitaka","Mizuho","Musashimurayama","Musashino","Nishitokyo","Okutama","Ome","Tachikawa","Tama","Tokyo"],
    ["Chizu","Daisen","Hiezu","Hino","Hokuei","Houki","Iwami","Kofu","Kotoura","Kurayoshi","Misasa","Nanbu","Nichinan","Sakaiminato","Tottori","Wakasa","Yazu","Yonago","Yurihama"],
    ["Asahi","Funahashi","Himi","Imizu","Kamiichi","Kurobe","Namerikawa","Nanto","Nyuzen","Oyabe","Takaoka","Tateyama","Tonami","Toyama","Uozu"],
    ["Arida","Aridakawa","Gobo","Hashimoto","Hidaka","Hidakagawa","Hirokawa","Inami","Iwade","Kainan","Kamitonda","Katsuragi","Kimino","Kinokawa","Kitayama","Koya","Kozagawa","Kudoyama","Kushimoto","Mihama","Minabe","Nachikatsuura","Shingu","Shurahama","Susami","Taiji","Tanabe","Wakayama","Yuasa","Yura"],
    ["Asahi","Funagata","Higashine","Iide","Kahoku","Kaminoyama","Kaneyama","Kawanishi","Mamurogawa","Mikawa","Mogami","Murayama","Nagai","Nakayama","Nanyo","Nishikawa","Obanazawa","Oe","Oguni","Ohkura","Oishida","Sagae","Sakata","Sakegawa","Shinjo","Shirataka","Shonai","Takahata","Tendo","Tozawa","Tsuruoka","Yamagata","Yamanobe","Yonezawa","Yuza"],
    ["Abu","Hagi","Hikari","Hirao","Hofu","Iwakuni","Kaminoseki","Kudamatsu","Mine","Nagato","SanyoOnoda","Shimonoseki","Shunan","SuoOshima","Tabuse","Ube","Waki","Yamaguchi","Yanai"],
    ["Chuo","Doshi","Fuefuki","Fujikawa","Fujikawaguchiko","Fujiyoshida","Hayakawa","Hokuto","Ichikawamisato","Kai","Kofu","Koshu","Kosuge","MinamiAlps","Minobu","Nanbu","Narusawa","Nirasaki","Nishikatsura","Oshino","Otsuki","Showa","Tabayama","Tsuru","Uenohara","Yamanakako","Yamanashi"]
];

//Hokkaido External DistrictID Function
const HokkaidoDistrictArray = ["Abashiri","Abira","Aibetsu","Akabira","Akaigawa","Akkeshi","Asahikawa","Ashibetsu","Ashoro","Assabu","Atsuma","Betsukai","Bibai","Biei","Bifuka","Bihoro","Biratori","Chippubetsu","Chitose","Date","Ebetsu","Embetsu","Engaru","Eniwa","Erimo","EsashiSoya","Esashi","Fukagawa","Fukushimacho","Furano","Furubira","Haboro","Hakodate","Hamanaka","Hamatonbetsu","HidakaNorth","HidakaSouth","Higashikagura","Higashikawa","Hiroo","Hokuryu","Hokuto","Honbetsu","Honorobe","Horokanai","Ikeda","Imakane","Ishikari","Iwamizawa","Iwanai","Kamifurano","Kamikawa","Kaminokuni","Kamishihoro","Kamisunagawa","Kamoenai","Kembuchi","Kikonai","Kimobetsu","Kitahiroshima","Kitami","Kiyosato","Koshimizu","Kunneppu","Kuriyama","Kuromatsunai","Kushiro","KushiroCityNorth","KushiroCitySouth","Kutchan","Kyogoku","Kyowa","Makkari","Makubetsu","Mashike","Matsumaecho","Memuro","Mikasa","Minamifurano","Mombetsu","Mori","Moseushi","Mukawa","Muroran","Naganuma","Naie","Nakafurano","Nakagawa","Nakasatsunai","Nakashibetsu","Nakatombetsu","Nanae","Nanporo","Nayoro","Nemuro","Niikappu","Niki","Niseko","Nishiokoppe","Noboribetsu","Numata","Obihiro","Obira","Oketo","Okoppe","Oshamambe","Otaru","Otobe","Otofuke","Otoineppu","Oumu","Ozora","Pippu","Rankoshi","Rausu","Rikubetsu","Rumoi","Rusutsu","Samani","Sapporo","Sarabetsu","Saroma","Sarufutsu","Setana","Shakotan","Shari","Shibecha","ShibetsuNemuro","Shibetsu","Shihoro","Shikabe","Shikaoi","Shimamaki","Shimizu","Shimokawa","Shimukappu","Shinhidaka","Shinshinotsu","Shintoku","Shintotsukawa","Shiranuka","Shiraoi","Shiriuchi","Shosanbetsu","Sobetsu","Sunagawa","Suttu","Taiki","Takasu","Takikawa","Takinoue","Teshikaga","Teshio","Tobetsu","Tohma","Tomakomai","Tomamae","Tomari","Toyako","Toyokoro","Toyotomi","Totoura","Tsubetsu","Tsukigata","Tsurui","Urahoro","Urakawa","Urausu","Uryu","Utashinai","Wakkanai","Wassamu","Yakumo","Yoichi","Yubari","Yubetsu","Yuni"];
const HokkaidoDistrictNumberArray = [44,1,23,1,1,4,50,28,29,1,37,2,1,28,29,35,40,1,1,1,1,20,33,1,20,49,1,33,1,29,1,27,1,3,35,41,50,14,34,46,1,1,39,17,40,22,1,1,1,1,26,27,1,42,1,1,16,1,1,1,47,21,25,21,1,1,1,2,2,1,1,1,1,31,1,1,18,1,29,57,1,1,18,1,1,1,14,41,23,22,14,1,1,37,3,61,1,1,10,1,18,31,31,19,22,1,1,1,35,31,27,41,8,1,60,33,1,1,16,1,23,31,29,1,1,54,2,56,42,22,1,16,1,29,22,14,36,1,50,1,2,1,1,13,1,1,1,43,7,1,17,1,29,1,14,1,28,1,1,32,35,1,23,1,3,15,48,1,1,1,55,19,1,1,43,31,1];
var HokkaidoSideLoopNumTest = 0;
var HokkaidoLoopCounter = 0;

function HokkaidoDistrictID(){

    var HokkaidoDistrictSVGPathArray = Array.from(
        document.getElementsByClassName("HokkaidoD")
    );

    for(let e = 0; e < HokkaidoDistrictNumberArray.length; e++){
        
        for(let f = 0; f < HokkaidoDistrictNumberArray[e]; f++)
        {
            HokkaidoDistrictSVGPathArray[HokkaidoLoopCounter].setAttribute("id","Hokkaido"+"-"+TDC+"-"+HokkaidoDistrictArray[e]+"_"+f);
            HokkaidoDistrictSVGPathArray[HokkaidoLoopCounter].setAttribute("onclick","DistrictSelection(this.id)");
            DistrictNameArrayCounter++;
            HokkaidoLoopCounter++;
            TotalDistrictCount++;
            console.log(TotalDistrictCount);
        }
        TDC++;
    }
}

//Start
function PreStart(){
    
}

function Start(){

    //PrefectureID
    PrefectureInit();

    //DistrictID
    DistrictInit();

    //SVG_ID
    SVGInit();

    //ZoomValues
    ZoomInit();

    //MapInit
    MapInit();

    //Start Game
    EndLoad();
}

function Loading(){
    document.getElementById("Start").style.display = "none";
    document.getElementById("Loading").style.display = "block";
}

function EndLoad(){
    document.getElementById("Start").style.display = "none";
    document.getElementById("Game").style.display = "grid";
    document.getElementById("MapR1").style.display = "block";
}

function MapInit(){
    var DistrictDIV = document.getElementById("DistrictMap");
    var TDC = 0;
    for(let a = 0; a < TotalDistrictCount-10; a++)
    {
        MapGridElement[a] = [];
    }

    for(let c = 0; c < PrefArray.length; c++)
    {
        if(c == 11)
        {
            for(let a = 0; a < HokkaidoDistrictArray.length; a++)
            {
                var MapGridPrefDiv = document.createElement("div");
                MapGridPrefDiv.setAttribute("id","Hokkaido-"+TDC+"-"+HokkaidoDistrictArray[a]+"MapGrid");
                MapGridPrefDiv.setAttribute("class","MapTiles");
                const MapGridDiv = document.getElementById("DistrictMap");
                MapGridDiv.appendChild(MapGridPrefDiv);
                var b = 0;
                for(let z = 0; z < 8; z++)
                {
                    for(let y = 0; y < 14; y++)
                    {
                        var RandomNumber = Math.round(Math.random()*100);
                        if(RandomNumber <= 50)
                        {
                            MapGrid[TotalDistrictInitCounter] = 0;
                            MapGridBD[TotalDistrictInitCounter] = 0;
                            MapGridSBD[TotalDistrictInitCounter] = 0;
                        }
                        else if(RandomNumber <= 60)
                        {
                            MapGrid[TotalDistrictInitCounter] = 1;
                            MapGridBD[TotalDistrictInitCounter] = 1;
                            MapGridSBD[TotalDistrictInitCounter] = 1;
                        }
                        else if(RandomNumber <= 100)
                        {
                            MapGrid[TotalDistrictInitCounter] = 2;
                            MapGridBD[TotalDistrictInitCounter] = 2;
                            MapGridSBD[TotalDistrictInitCounter] = 2;
                        }
                        MapGridElement[11][b] = document.createElement("img");
                        switch(MapGrid[TotalDistrictInitCounter]){
                            case 0:
                                MapGridElement[11][b].setAttribute("src","Grass.jpg");
                                break;
                            case 1:
                                MapGridElement[11][b].setAttribute("src","Lake.jpg");
                                break;
                            case 2:
                                MapGridElement[11][b].setAttribute("src","Wald.jpg");
                                break;
                            case 3:
                                MapGridElement[11][b].setAttribute("src","Sand.jpg");
                                break;
                        }
                        MapGridElement[11][b].setAttribute("width","100px");
                        MapGridElement[11][b].setAttribute("height","100px");
                        MapGridElement[11][b].setAttribute("class","MapTile"+"Hokkaido-"+a+"-"+HokkaidoDistrictArray[a]);
                        MapGridElement[11][b].setAttribute("id",TotalDistrictInitCounter);
                        MapGridElement[11][b].setAttribute("onclick","selectTile(this.id)");
                        MapGridElement[11][b].style.rowGap = "0px";
                        MapGridElement[11][b].style.padding = "0px";
                        var z1 = z+1;
                        var y1 = y+1;
                        var StringArea = new String(z1+"/"+y1+"/ span 1 / span 1");
                        MapGridElement[11][b].style.gridArea = StringArea;
                        MapGridElement[11][b].style.display = "none";
                        var DistrictDIV = document.getElementById("Hokkaido"+"-"+TDC+"-"+HokkaidoDistrictArray[a]+"MapGrid");
                        DistrictDIV.appendChild(MapGridElement[11][b]);
                        b++
                        TotalDistrictInitCounter++;
                    }   
                }
                TDC++;
                
            }
        }
        else
        {
            var LoopDetailedPrefArray = Array.from(
                document.getElementsByClassName(PrefArray[c]+"D")
            );
    
            for(let a = 0; a < LoopDetailedPrefArray.length; a++)
            {
                var DetailedPrefArrayTrim = DetailedPrefArray[c][a].split("_");
                if(DetailedPrefArrayTrim[1] == null || DetailedPrefArrayTrim[1] == 1)
                {
                    var MapGridPrefDiv = document.createElement("div");
                    MapGridPrefDiv.setAttribute("id",PrefArray[c]+"-"+TDC+"-"+DetailedPrefArrayTrim[0]+"MapGrid");
                    MapGridPrefDiv.setAttribute("class","MapTiles");
                    const MapGridDiv = document.getElementById("DistrictMap");
                    MapGridDiv.appendChild(MapGridPrefDiv);
                    var b = 0;
                    for(let z = 0; z < 8; z++)
                    {
                        for(let d = 0; d < 14; d++)
                        {
                            var RandomNumber = Math.round(Math.random()*100);
                            if(RandomNumber <= 50)
                            {
                                MapGrid[TotalDistrictInitCounter] = 0;
                                MapGridBD[TotalDistrictInitCounter] = 0;
                                MapGridSBD[TotalDistrictInitCounter] = 0;
                            }
                            else if(RandomNumber <= 60)
                            {
                                MapGrid[TotalDistrictInitCounter] = 1;
                                MapGridBD[TotalDistrictInitCounter] = 1;
                                MapGridSBD[TotalDistrictInitCounter] = 1;
                            }
                            else if(RandomNumber <= 100)
                            {
                                MapGrid[TotalDistrictInitCounter] = 2;
                                MapGridBD[TotalDistrictInitCounter] = 2;
                                MapGridSBD[TotalDistrictInitCounter] = 2;
                            }
                            MapGridElement[a][b] = document.createElement("img");
                            switch(MapGrid[TotalDistrictInitCounter]){
                                case 0:
                                    MapGridElement[a][b].setAttribute("src","Grass.jpg");
                                    break;
                                case 1:
                                    MapGridElement[a][b].setAttribute("src","Lake.jpg");
                                    break;
                                case 2:
                                    MapGridElement[a][b].setAttribute("src","Wald.jpg");
                                    break;
                                case 3:
                                    MapGridElement[a][b].setAttribute("src","Sand.jpg");
                                    break;
                            }
                            MapGridElement[a][b].setAttribute("width","100px");
                            MapGridElement[a][b].setAttribute("height","100px");
                            MapGridElement[a][b].setAttribute("class","MapTile"+PrefArray[c]+"-"+TDC+"-"+DetailedPrefArrayTrim[0]);
                            MapGridElement[a][b].setAttribute("id",TotalDistrictInitCounter);
                            MapGridElement[a][b].setAttribute("onclick","selectTile(this.id)");
                            MapGridElement[a][b].style.rowGap = "0px";
                            MapGridElement[a][b].style.padding = "0px";
                            MapGridElement[a][b].style.display = "none";
                            var z1 = z+1;
                            var d1 = d+1;
                            var StringArea = new String(z1+"/"+d1+"/ span 1 / span 1");
                            MapGridElement[a][b].style.gridArea = StringArea;

                            var DistrictDIV = document.getElementById(PrefArray[c]+"-"+TDC+"-"+DetailedPrefArrayTrim[0]+"MapGrid");

                            DistrictDIV.appendChild(MapGridElement[a][b]);
                            b++;
                            TotalDistrictInitCounter++;
                        }
                    }
                    TDC++;
                }
            }
        }
    }

    var DistrictGrids = Array.from(
        document.getElementsByClassName("MapTiles")
    );

    for(let a = 0; a < DistrictGrids.length; a++)
    {
        DistrictGrids[a].style.display = "none";
    }

    for(let a = 0; a < TotalDistrictInitCounter; a++)
    {
        VillagePopulation[a] = 0;
        CityPopulation[a] = 0;
    }

    for(let k = 0; k < PrefArray.length; k++)
    {
        DistrictCount = DistrictCount + DetailedPrefArray[k].length;
        for(let b = 0; b < DetailedPrefArray[k].length; b++)
        {
            DistrictBuildingCount[b] = 0;
        }
    }
    DistrictCount = DistrictCount + HokkaidoDistrictArray.length - 10;
    console.log(DistrictCount);
}

function PrefectureInit(){
    for(let a = 0; a < PrefArray.length; a++)
    {
        var LoopPrefArray = Array.from(
            document.getElementsByClassName(PrefArray[a])
        );

        for(let b = 0; b < LoopPrefArray.length; b++)
        {
            LoopPrefArray[b].setAttribute("id",PrefArray[a]+"_"+b);
        }
    }
}

function DistrictInit(){
    TDC = 0;
    for(let c = 0; c < PrefArray.length; c++)
    {
        if(c == 11)
        {
            HokkaidoDistrictID();
        }
        else
        {
            var LoopDetailedPrefArray = Array.from(
                document.getElementsByClassName(PrefArray[c]+"D")
            );
    
            for(let d = 0; d < LoopDetailedPrefArray.length; d++)
            {
                LoopDetailedPrefArray[d].setAttribute("id",PrefArray[c]+"-"+TDC+"-"+DetailedPrefArray[c][d]);
                DistrictNameArray[DistrictNameArrayCounter] = PrefArray[c]+"-"+TDC+"-"+DetailedPrefArray[c][d];
                DistrictNameArrayCounter++;
                LoopDetailedPrefArray[d].setAttribute("onclick","DistrictSelection(this.id)");
                switch(DetailedPrefArray[c][d])
                {
                    case "Nagoya_1":
                        break;
                    case "Fukushima_1":
                        break;
                    case "Fukushima_2":
                        break;
                    case "Fukuyama_1":
                        break;
                    case "Hiroshima_1":
                        break;
                    case "Yokosuka_1":
                        break;
                    case "Amakusa_1":
                        break;
                    case "Ishinomaki_1":
                        break;
                    case "Kesennuma_1":
                        break;
                    case "Matsuura_1":
                        break;
                    default:
                        TDC++;
                        break;
                }
            }
        }
    }
}

function SVGInit(){
    var SVG_Array_MapZoom2 = Array.from(
        document.getElementsByClassName("SVG_MapZoom2")
    );

    for(let g = 0; g < SVG_Array_MapZoom2.length; g++)
    {
        SVG_Array_MapZoom2[g].setAttribute("id",PrefArray[g]+"SVG");
    }

    var SVG_Array_MapZoom2_Group = Array.from(
        document.getElementsByClassName("DragEnabled")
    );

    for(let j = 0; j < SVG_Array_MapZoom2_Group.length; j++)
    {
        SVG_Array_MapZoom2_Group[j].setAttribute("id",PrefArray[j]+"Group")
    }
}

function ZoomInit(){
    MapZoom2Array = Array.from(
        document.getElementsByClassName("MapZoom2")
    );

    for(let x = 0; x < MapZoom2Array.length; x++)
    {
        MapZoom2Array[x].setAttribute("onwheel", "MouseZoom(event,"+x+")");
    }

    transformMatrix = [1, 0, 0, 1, 0, 0];
    svg = Array.from(
        document.getElementsByClassName("SVG_MapZoom2")
    );

    for(let z = 0; z < svg.length; z++)
    {
        viewbox = svg[z].getAttributeNS(null, "viewBox").split(" ");
        centerX[z] = parseFloat(viewbox[2]) / 2;
        centerY[z] = parseFloat(viewbox[3]) / 2;
        matrixGroup[z] = document.getElementById(PrefArray[z]+"Group");

    }
}

//Menu => Back
function Back(){

    MapZoom2Array.forEach(MapZoom2 => {MapZoom2.style.display = "none"});
    document.getElementById("LMP").style.display = "none";
    document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
    document.getElementById("CB1").style.display = "none";
    MapZoom = 1;
    transformMatrix[0] = 1;
    transformMatrix[1] = 0;
    transformMatrix[2] = 0;
    transformMatrix[3] = 1;
    transformMatrix[4] = 0;
    transformMatrix[5] = 0;
    matrixGroup[ActivePrefecture].setAttributeNS(null, "transform", transformMatrix);
    document.getElementById("DistrictName").style.display = "none";
    document.getElementById("DistrictBuildings").style.display = "none";
    document.getElementById("ZoomIn").style.display = "none";
    ActivePrefecture = "";

}

//Map Controls
//PanControl (Working!)
function MapControlTogglePan(){
    
    HokkaidoLoopCounter = 0;
    for(let c = 0; c < PrefArray.length; c++)
    {
        if(c == 11)
        {
            var HokkaidoDistrictSVGPathArray = Array.from(
                document.getElementsByClassName("HokkaidoD")
            );
        
            for(let e = 0; e < HokkaidoDistrictNumberArray.length; e++){
                
                for(let f = 0; f < HokkaidoDistrictNumberArray[e]; f++)
                {
                    HokkaidoDistrictSVGPathArray[HokkaidoLoopCounter].setAttribute("onclick","");
                }
            }
        }
        else
        {
            var LoopDetailedPrefArray = Array.from(
                document.getElementsByClassName(PrefArray[c]+"D")
            );
            
            for(let d = 0; d < LoopDetailedPrefArray.length; d++)
            {
                LoopDetailedPrefArray[d].setAttribute("onclick","");
            }
        }
    }
}

function MapControlCancelPan(){

    HokkaidoLoopCounter = 0;
    for(let c = 0; c < PrefArray.length; c++)
    {
        if(c == 11)
        {
            var HokkaidoDistrictSVGPathArray = Array.from(
                document.getElementsByClassName("HokkaidoD")
            );
        
            for(let e = 0; e < HokkaidoDistrictNumberArray.length; e++){
                
                for(let f = 0; f < HokkaidoDistrictNumberArray[e]; f++)
                {
                    HokkaidoDistrictSVGPathArray[HokkaidoLoopCounter].setAttribute("onclick","DistrictSelection(this.id)");
                    HokkaidoLoopCounter++;
                }
            }
        }
        else
        {
            var LoopDetailedPrefArray = Array.from(
                document.getElementsByClassName(ActivePrefecture+"D")
            );
            
            for(let d = 0; d < LoopDetailedPrefArray.length; d++)
            {
                LoopDetailedPrefArray[d].setAttribute("onclick","DistrictSelection(this.id)");
            }
        }
    }
}

function MapPanChecked(){
    var CB1 = document.getElementById("MapPanCB");
    if(CB1.checked == true)
    {
        MapControlTogglePan();
    }
    else
    {
        MapControlCancelPan();
    }
}

//ButtonRight (Working!)
function MapControlRight(){
    if(ActiveMapSide == "L")
    {
        switch(ActiveMap){
            case 3:
                document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                ActiveMapSide = "R";
                document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                break;
            case 4:
                document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                ActiveMapSide = "L";
                document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                break;
            default:
                return;
        }
    }
}

//KeyListener MapZoom1 (Working!)
document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":
            if(MapZoom == 1){
                if((ActiveMap < 4))
                {
                    document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                    ActiveMap = ActiveMap + 1;
                    document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                }
            }
            break;
        case "ArrowUp":
            if(MapZoom == 1){
                if(ActiveMapSide == "L")
                {
                    if(ActiveMap > 3)
                    {
                        document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                        ActiveMap = ActiveMap - 1;
                        document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                    }
                }
                else
                {
                    if(ActiveMap !== 1)
                    {
                        document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                        ActiveMap = ActiveMap - 1;
                        document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                    }
                }
            }
            break;
        case "ArrowLeft":
            if(MapZoom == 1)
            {
                if(ActiveMapSide == "R")
                {
                    switch(ActiveMap){
                        case 3:
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                            ActiveMapSide = "L";
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                            break;
                        case 4:
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                            ActiveMapSide = "L";
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                            break;
                        default:
                            return;
                    }
                }
            }
            break;
        case "ArrowRight":
            if(MapZoom == 1)
            {
                if(ActiveMapSide == "L")
                {
                    switch(ActiveMap){
                        case 3:
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                            ActiveMapSide = "R";
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                            break;
                        case 4:
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "none";
                            ActiveMapSide = "R";
                            document.getElementById("Map"+ActiveMapSide+ActiveMap).style.display = "block";
                            break;
                        default:
                            return;
                    }
                }
            }
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);

//MouseZoom (Working!)
var ZoomCounter = 0;
function MouseZoom(ZoomEvent, ActPref){
    ZoomEvent.preventDefault();
    var YScroll = ZoomEvent.deltaY;
    if(YScroll < 0)
    {
        ActualZoom(UpRatio, ActPref);
        ZoomCounter++;   
    }
    if(YScroll > 0)
    {
        ActualZoom(DownRatio, ActPref);
        ZoomCounter -= 1;
    }
}

function ActualZoom(Ratio, ActPref){
    for (var i = 0; i < 6; i++) {
        transformMatrix[i] *= Ratio;
    }
    transformMatrix[4] += (1 - Ratio) * centerX[ActPref];
    transformMatrix[5] += (1 - Ratio) * centerY[ActPref];
    setMatrix(ActPref);
}

function setMatrix(ActPref) {
    newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
    matrixGroup[ActPref].setAttributeNS(null, "transform", newMatrix);
}


//DragSVG (Working!)
function Drag(evt){

    SVG = evt.target;
    SVG.addEventListener('mousedown',StartDrag);
    SVG.addEventListener('mousemove',DragMove);
    SVG.addEventListener('mouseup',EndDrag);
    SVG.addEventListener('mouseleave',EndDrag);

    function MousePosition(evt){
        var CTM = SVG.getScreenCTM();
        return{
            x: (evt.clientX - CTM.e)/CTM.a,
            y: (evt.clientY - CTM.f)/CTM.d
        };
    }

    var ElementSelection, offset, transform;
    function DragInit(evt){
        offset = MousePosition(evt);

        var transforms = ElementSelection.transform.baseVal;
        if(transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE)
        {
            var translate = SVG.createSVGTransform();
            translate.setTranslate(0, 0);
            ElementSelection.transform.baseVal.insertItemBefore(translate, 0);
        }

        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }

    function StartDrag(evt){
        if(evt.target.parentNode.classList.contains('DragEnabled'))
        {
            ElementSelection = evt.target.parentNode;
            DragInit(evt);
        }
    }
    
    function DragMove(evt){
        if(ElementSelection)
        {
            //console.log('if_true')
            evt.preventDefault();
            var coord = MousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }

    function EndDrag(evt){
        ElementSelection = false;
    }

}

//Zoom1 => Zoom2 (Working!)
function Zoom(PrefId){
    var MapZoom1Array = Array.from(
        document.getElementsByClassName("MapZoom1")
    );

    var PrefName = PrefId.split("_");
    ActivePrefecture = PrefName[0];
    
    MapZoom1Array.forEach(MapZoom1 => {MapZoom1.style.display = "none"});
    document.getElementById(PrefName[0]+"_Detail").style.display = "block";
    document.getElementById("LMP").style.display = "block";
    document.getElementById("CB1").style.display = "block";
    MapZoom = 2;
    ZoomRatio = 1;
    YScrollCounter = 0;
}

//Zoom2 => District
function DistrictSelection(ID){
    var RLabels = Array.from(
        document.getElementsByClassName("RLabelDistrict")
    );

    for(let a = 0; a < RLabels.length; a++)
    {
        RLabels[a].style.display = "block";
    }

    var DistrictName = ID.split("-");
    ActiveDistrictInt = parseInt(DistrictName[1]);
    document.getElementById("DistrictName").innerHTML = DistrictName[2];
    document.getElementById("DistrictBuildings").innerHTML = DistrictBuildingCount[ActiveDistrictInt];
    document.getElementById("ZoomIn").style.display = "block";
    ActiveDistrictID = ID;
}

function Zoom2(){
    var DistrictIdTrim = ActiveDistrictID.split("_");
    document.getElementById(ActivePrefecture+"_Detail").style.display = "none";
    var selectedDistrict = document.getElementById(DistrictIdTrim[0]+"MapGrid");
    ActiveDistrict = ActiveDistrictID;
    ActiveDistrictInt
    selectedDistrict.style.display = "grid";
    document.getElementById("LMP").setAttribute("onclick","Back2()");
    document.getElementById("EndTurn").style.display = "block";
    document.getElementById("CB1").style.display = "none";
    document.getElementById("DistrictName").style.display = "none";
    document.getElementById("DistrictBuildings").style.display = "none";
    document.getElementById("ZoomIn").style.display = "none";
    var MapTile = Array.from(
        document.getElementsByClassName("MapTile"+ActiveDistrict)
    );
    for(let a = 0; a < 112; a++)
    {
        MapTile[a].style.display = "grid";
    }
    document.getElementById("LB").style.width = "260px";
    document.getElementById("RB").style.width = "260px";
    document.getElementById("RB2").style.width = "260px";
    document.getElementById("GameMap").style.width = "1400px";
}

function Back2(){
    var MapTile = Array.from(
        document.getElementsByClassName("MapTile"+ActiveDistrict)
    );
    for(let a = 0; a < 112; a++)
    {
        MapTile[a].style.display = "none";
    }
    document.getElementById("RB").style.display = "grid";
    document.getElementById(ActivePrefecture+"_Detail").style.display = "block";
    document.getElementById(ActiveDistrict+"MapGrid").style = "none";
    document.getElementById("LMP").setAttribute("onclick","Back()");
    document.getElementById("EndTurn").style.display = "none";
    ActiveDistrict = "";
    document.getElementById("LB").style.width = "235px";
    document.getElementById("RB").style.width = "235px";
    document.getElementById("GameMap").style.width = "1450px";
    document.getElementById("CB1").style.display = "block";
    document.getElementById("DistrictName").style.display = "block";
    document.getElementById("DistrictBuildings").style.display = "block";
}

//Gameplay
function selectTile(id){
    var MapTile = Array.from(
        document.getElementsByClassName("MapTile"+ActiveDistrict)
    );
    var PlaceButtons = Array.from(
        document.getElementsByClassName("PlaceButton")
    );

    for(let a = 0; a < 112; a++)
    {
        MapTile[a].style.border = "";
    }
    document.getElementById(id).style.border = "1px solid";
    document.getElementById("RB").style.display = "none";
    document.getElementById("RB2").style.display = "grid";
    ActiveTileId = id;
    if((TurnCount == 0)&&(TurnMoveCount == 0))
    {
        switch(MapGrid[id]){
            case 1:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                    document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                }
                break;
            case 3:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                    document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                }
                break;
            case 4:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                    document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                }
                break;
            default:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                    document.getElementById("PlaceVillage").style.backgroundColor = "#4CAF50";
                    document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                }
                break;
        }
    }
    else
    {
        var MapGridInt = parseInt(MapGrid[id]);
        switch(MapGridInt){
            case 1:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
                document.getElementById("PlaceVillage").innerHTML = "Village";
                break;
            case 2:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#4CAF50";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#8a8f8a";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                checkCivFactory();
                checkMilFactory();
                checkFarm();
                checkLumberjack();
                checkMine();
                checkVillage();
                break;
            case 3:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
                document.getElementById("PlaceVillage").innerHTML = "Village";
                break;
            case 4:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
                document.getElementById("PlaceVillage").innerHTML = "Village";
                break;
            case 5:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceVillage").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceVillage").setAttribute("onclick","placeCity()");
                document.getElementById("PlaceVillage").innerHTML = "Upgrade";
                checkCity();
                ResetPlaceButton("Soldier");
                checkSoldier();
                break;
            case 6:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
                document.getElementById("PlaceVillage").innerHTML = "Village";
                ResetPlaceButton("Soldier");
                checkSoldier();
                break;
            case 7:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceFarm").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceFarm").setAttribute("onclick","UpgradeFarm()");
                document.getElementById("PlaceFarm").innerHTML = "Upgrade";
                document.getElementById("BuildingLevel").style.display = "grid";
                document.getElementById("BuildingLevel").innerHTML = "Level: "+FarmLevel[ActiveTileId];
                ResetPlaceButton("Village");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                break;
            case 8:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceLumberjack").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceLumberjack").setAttribute("onclick","UpgradeLumberjack()");
                document.getElementById("PlaceLumberjack").innerHTML = "Upgrade";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                break;
            case 9:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceCivFactory").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceCivFactory").setAttribute("onclick","UpgradeCivFactory()");
                document.getElementById("PlaceCivFactory").innerHTML = "Upgrade";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                break;
            case 10:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceMilFactory").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceMilFactory").setAttribute("onclick","UpgradeMilFactory()");
                document.getElementById("PlaceMilFactory").innerHTML = "Upgrade";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("Mine");
                break;
            case 11:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceMine").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceMine").setAttribute("onclick","UpgradeMine()");
                document.getElementById("PlaceMine").innerHTML = "Upgrade";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                break;
            case 12:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").setAttribute("onclick","ActMoveMenu()");
                document.getElementById("PlaceSoldier").innerHTML = "Move";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                break;
            default:
                for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#4CAF50";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceLumberjack").style.backgroundColor = "#8a8f8a";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                checkCivFactory();
                checkMilFactory();
                checkFarm();
                checkLumberjack();
                checkMine();
                checkVillage();
                break;
        }
    }
}

//CheckFunctions
function checkCivFactory(){
    var MCost = 25*CivFactoryCount + 25;
    var FCost = 10*CivFactoryCount + 10;
    var WCost = 10*CivFactoryCount + 10;
    var SCost = 15*CivFactoryCount + 15;

    if((MCost > MoneyCount)||(FCost > FoodCount)||(WCost > WoodCount)||(SCost > SteelCount))
    {
        document.getElementById("PlaceCivFactory").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceCivFactory").setAttribute("onclick","");
    }
}

function checkMilFactory(){
    var MCost = 25*MilFactoryCount + 25;
    var FCost = 10*MilFactoryCount + 10;
    var WCost = 10*MilFactoryCount + 10;
    var SCost = 15*MilFactoryCount + 15;
    if((MCost > MoneyCount)||(FCost > FoodCount)||(WCost > WoodCount)||(SCost > SteelCount))
    {
        document.getElementById("PlaceMilFactory").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceMilFactory").setAttribute("onclick","");
    }
}

function checkFarm(){
    var MCost = 10*FarmCount + 10;
    var WCost = 5*FarmCount + 5;
    if((MCost > MoneyCount)||(WCost > WoodCount))
    {
        document.getElementById("PlaceFarm").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceFarm").setAttribute("onclick","");
    }
}

function checkVillage(){
    var MCost = 10*VillageCount;
    var FCost = 5*VillageCount;
    var WCost = 10*VillageCount;
    if((MCost > MoneyCount)||(FCost > FoodCount)||(WCost > WoodCount))
    {
        document.getElementById("PlaceVillage").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceVillage").setAttribute("onclick","");
    }
}

function checkLumberjack(){
    var MCost = 10*LumberjackCount + 10;
    var FCost = 5*LumberjackCount + 5;
    if((MCost > MoneyCount)||(FCost > FoodCount))
    {
        document.getElementById("PlaceLumberjack").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceLumberjack").setAttribute("onclick","");
    }
}

function checkMine(){
    var MCost = 15*MineCount + 15;
    var FCost = 5*MineCount + 5;
    var WCost = 15*MineCount + 15;
    if((MCost > MoneyCount)||(FCost > FoodCount)||(WCost > WoodCount))
    {
        document.getElementById("PlaceMine").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceMine").setAttribute("onclick","");
    }
}

function checkCity(){
    var MCost = 50*CityCount + 50;
    var FCost = 25*CityCount + 25;
    var SCost = 30*CityCount + 30;
    if((MCost > MoneyCount)||(FCost > FoodCount)||(SCost > SteelCount))
    {
        document.getElementById("PlaceVillage").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceVillage").setAttribute("onclick","");
    }
}

function checkSoldier(){
    if((10 > MoneyCount)||(10 > FoodCount)||(10 > PopulationCount)||(10 > WeaponCount))
    {
        document.getElementById("PlaceSoldier").style.backgroundColor = "#8a8f8a";
        document.getElementById("PlaceSoldier").setAttribute("onclick","");
    }
}
//BuildFunctions
function placeSoldier(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    if((MapGrid[ActiveTileIdInt] == 5)||(MapGrid[ActiveTileIdInt] == 6))
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        document.getElementById(ActiveTileIdInt).setAttribute("src","Soldier_5.jpg");
        MapGridSBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 12;
        MoneyCost(10,SoldierCount);
        FoodCost(10,SoldierCount);
        WeaponCost(10,SoldierCount);
        PopulationCost(10,SoldierCount);
        UpdateBuildMenu();
        UpdateRessources();
        
        DistrictBuildingCount[ActiveDistrictInt]++;
        SoldierCount++;
        TurnMoveCount++;
    }
}

function placeCivFactory(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            BuildCivFactory();
            break;
        case 2:
            BuildCivFactory();
            break;
        default:
            break;
    }
}
function placeMilFactory(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            BuildMilFactory();
            break;
        case 2:
            BuildMilFactory();
            break;
        default:
            break;
    }
}
function placeCity(){
    BuildCity();
}
function placeVillage(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            BuildVillage();
            break;
        case 2:
            BuildVillage();
            break;
        default:
            break;
    }
}
function placeMine(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            BuildMine();
            break;
        case 2:
            BuildMine();
            break;
        default:
            break;
    }
}
function placeLumberjack(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 2:
            BuildLumberjack();
            break;
        default:
            break;
    }
}
function placeFarm(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            BuildFarm();
            break;
        case 2:
            BuildFarm();
            break;
        default:
            break;
    }
}
function BuildCity(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    document.getElementById(ActiveTileIdInt).setAttribute("src","Stadt.jpg");
    MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
    MapGrid[ActiveTileIdInt] = 6;
    MoneyCost(50,CityCount);
    FoodCost(25,CityCount);
    SteelCost(30,CityCount);
    UpdateBuildMenu();
    UpdateRessources();
    
    CityCount++;
    VillageCount--;
    TurnMoveCount++;
}
function BuildCivFactory(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","CivFactory.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 9;
        MoneyCost(25,CivFactoryCount);
        FoodCost(10,CivFactoryCount);
        WoodCost(10,CivFactoryCount);
        SteelCost(15,CivFactoryCount);
        UpdateBuildMenu();
        UpdateRessources();
        CivFactoryCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function BuildMilFactory(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","MilFactory.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 10;
        MoneyCost(25,MilFactoryCount);
        FoodCost(10,MilFactoryCount);
        WoodCost(10,MilFactoryCount);
        SteelCost(15,MilFactoryCount);
        UpdateBuildMenu();
        UpdateRessources();
        MilFactoryCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function BuildVillage(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","Village.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 5;
        MoneyCost(10,VillageCount);
        FoodCost(5,VillageCount);
        WoodCost(10,VillageCount);
        UpdateBuildMenu();
        UpdateRessources();
        VillageCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
    else if((TurnCount == 0)&&(TurnMoveCount == 0))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","Village.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 5;
        UpdateBuildMenu();
        UpdateRessources();
        VillageCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function BuildMine(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","Mine.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 11;
        MoneyCost(15,MineCount);
        FoodCost(5,MineCount);
        WoodCost(15,MineCount);
        UpdateBuildMenu();
        UpdateRessources();

        MineCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function BuildFarm(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","Farm.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 7;
        MoneyCost(10,FarmCount);
        WoodCost(5,FarmCount);
        UpdateBuildMenu();
        UpdateRessources();
        FarmLevel[ActiveTileIdInt] = 1;

        FarmCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function BuildLumberjack(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var M1 = ActiveTileIdInt - 1;
    var P1 = ActiveTileIdInt + 1;
    var M14 = ActiveTileIdInt - 14;
    var P14 = ActiveTileIdInt + 14;
    if((MapGrid[M1] > 4)||(MapGrid[P1] > 4)||(MapGrid[M14] > 4)||(MapGrid[P14] > 4))
    {
        document.getElementById(ActiveTileIdInt).setAttribute("src","Lumberjack.jpg");
        MapGridBD[ActiveTileIdInt] = MapGrid[ActiveTileIdInt];
        MapGrid[ActiveTileIdInt] = 8;
        MoneyCost(10,LumberjackCount);
        FoodCost(5,LumberjackCount);
        UpdateBuildMenu();
        UpdateRessources();

        LumberjackCount++;
        DistrictBuildingCount[ActiveDistrictInt]++;;
        TurnMoveCount++;
    }
}
function UpgradeFarm(){
    if(FarmLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(15,FarmLevel[ActiveTileIdInt]-1);
        WoodCost(10,FarmLevel[ActiveTileIdInt]-1);
        SteelCost(2,FarmLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        FarmLevel[ActiveTileIdInt]++;
    }
}
function UpgradeLumberjack(){
    if(LumberjackLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(15,LumberjackLevel[ActiveTileIdInt]-1);
        FoodCost(10,LumberjackLevel[ActiveTileIdInt]-1);
        SteelCost(2,LumberjackLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        LumberjackLevel[ActiveTileIdInt]++;
    }
}
function UpgradeCivFactory(){
    if(CivFactoryLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(40,CivFactoryLevel[ActiveTileIdInt]-1);
        FoodCost(20,CivFactoryLevel[ActiveTileIdInt]-1);
        WoodCost(20,CivFactoryLevel[ActiveTileIdInt]-1);
        SteelCost(25,CivFactoryLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        CivFactoryLevel[ActiveTileIdInt]++;
    }
}
function UpgradeMilFactory(){
    if(MilFactoryLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(40,MilFactoryLevel[ActiveTileIdInt]-1);
        FoodCost(20,MilFactoryLevel[ActiveTileIdInt]-1);
        WoodCost(20,MilFactoryLevel[ActiveTileIdInt]-1);
        SteelCost(25,MilFactoryLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        MilFactoryLevel[ActiveTileIdInt]++;
    }
}
function UpgradeMine(){
    if(MineLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(25,MineLevel[ActiveTileIdInt]-1);
        FoodCost(10,MineLevel[ActiveTileIdInt]-1);
        WoodCost(25,MineLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        MineLevel[ActiveTileIdInt]++;
    }
}
function UpgradeSoldier(){
    if(SoldierLevel[ActiveTileIdInt] < 10)
    {
        var ActiveTileIdInt = parseInt(ActiveTileId);
        MoneyCost(25,SoldierLevel[ActiveTileIdInt]-1);
        FoodCost(10,SoldierLevel[ActiveTileIdInt]-1);
        WoodCost(25,SoldierLevel[ActiveTileIdInt]-1);
        UpdateRessources();
        SoldierLevel[ActiveTileIdInt]++;
    }
}
function Demolish(){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    if(MapGrid[ActiveTileIdInt] == 5)
    {
        VillagePopulation[ActiveTileIdInt] = 0;
    }
    else if(MapGrid[ActiveTileIdInt] == 6)
    {
        CityPopulation[ActiveTileIdInt] = 0;
    }
    MapGrid[ActiveTileIdInt] = MapGridBD[ActiveTileIdInt];
    switch(MapGrid[ActiveTileIdInt]){
        case 0:
            document.getElementById(ActiveTileId).setAttribute("src","Grass.jpg");
            break;
        case 1:
            document.getElementById(ActiveTileId).setAttribute("src","Lake.jpg");
            break;
        case 2:
            document.getElementById(ActiveTileId).setAttribute("src","Wald.jpg");
            break;
        case 3:
            document.getElementById(ActiveTileId).setAttribute("src","Sand.jpg");
            break;
    }
    DistrictBuildingCount[ActiveDistrictInt]--;
    ResetPlaceButton();
    UpdateRessources();
}

//End Turn
function EndTurn(){
    TurnCount++;
    WoodCount = WoodCount + LumberjackCount;
    FoodCount = FoodCount - PopulationCount + FarmCount*5;
    FoodCount = FoodCount - SoldierCount*5;
    for(let a = 0; a < DistrictCount; a++)
    {
        if(DistrictBuildingCount[a] > 0)
        {
            var a1 = a+1;
            document.getElementById(DistrictNameArray[a1]).style.fill = "#4CAF50";
            var DistrictNameArrayTrim = DistrictNameArray[a1].split("-");
            var PrefectureNameArray = Array.from(
                document.getElementsByClassName(DistrictNameArrayTrim[0])
            );
            for(let c = 0; c < PrefectureNameArray.length; c++)
            {
                PrefectureNameArray[c].style.fill = "#4CAF50";           
            }
        }
    }
    SteelCount = SteelCount + MineCount*5;
    MoneyCount = MoneyCount + PopulationCount + CivFactoryCount*2;
    WeaponCount = WeaponCount + MilFactoryCount*2;
    PopulationCount = PopulationCount + VillageCount*1 + CityCount*2;
    if(FoodCount < 0)
    {
        PopulationCount = PopulationCount + FoodCount;
    }
    if(PopulationCount <= 0)
    {
        EndGame();
    }
    for(var a = 0; a < MapGrid.length; a++)
    {
        if(MapGrid[a] == 13)
        {
            MapGrid[a] = 12;
        }
    }
    UpdateRessources();
}

function EndGame(){
    document.getElementById("EndScreen").style.display = "block";
    document.getElementById("Game").style.display = "none";
}

//Updaters
function UpdateRessources(){
    document.getElementById("TurnCount").innerHTML = "Turn: "+TurnCount;
    document.getElementById("Population").innerHTML = "Total Population: "+PopulationCount;
    document.getElementById("Money").innerHTML = "Money: "+MoneyCount;
    document.getElementById("Wood").innerHTML = "Wood: "+WoodCount;
    document.getElementById("Food").innerHTML = "Food: "+FoodCount;
    document.getElementById("Steel").innerHTML = "Steel: "+SteelCount;
    document.getElementById("Weapons").innerHTML = "Weapons: "+WeaponCount;
}

function UpdateBuildMenu(){
    var PlaceButtons = Array.from(
        document.getElementsByClassName("PlaceButton")
    );
    var ActiveTileIdInt = ActiveTileId;
    var MapGridInt = parseInt(MapGrid[ActiveTileIdInt])
    switch(MapGridInt){
        case 1:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
            document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
            document.getElementById("PlaceVillage").innerHTML = "Village";
            break;
        case 2:
            for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#4CAF50";
                }
                document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#8a8f8a";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
                checkCivFactory();
                checkMilFactory();
                checkFarm();
                checkLumberjack();
                checkMine();
                checkVillage();
                break;
        case 3:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
            document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
            document.getElementById("PlaceVillage").innerHTML = "Village";
            break;
        case 4:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
            document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
            document.getElementById("PlaceVillage").innerHTML = "Village";
            break;
        case 5:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceVillage").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceVillage").setAttribute("onclick","placeCity()");
            document.getElementById("PlaceVillage").innerHTML = "Upgrade";
            ResetPlaceButton("Soldier");
            checkCity();
            checkSoldier();
            break;
        case 6:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceVillage").setAttribute("onclick","placeVillage()");
            document.getElementById("PlaceVillage").innerHTML = "Village";
            ResetPlaceButton("Soldier");
            checkSoldier();
            break;
        case 7:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceFarm").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceFarm").setAttribute("onclick","UpgradeFarm()");
            document.getElementById("PlaceFarm").innerHTML = "Upgrade";
            document.getElementById("BuildingLevel").style.display = "grid";
            document.getElementById("BuildingLevel").innerHTML = "Level: "+FarmLevel[ActiveTileId];
            ResetPlaceButton("Village");
            ResetPlaceButton("Lumberjack");
            ResetPlaceButton("CivFactory");
            ResetPlaceButton("MilFactory");
            ResetPlaceButton("Mine");
            break;
        case 8:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceLumberjack").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceLumberjack").setAttribute("onclick","UpgradeLumberjack()");
            document.getElementById("PlaceLumberjack").innerHTML = "Upgrade";
            ResetPlaceButton("Village");
            ResetPlaceButton("Farm");
            ResetPlaceButton("CivFactory");
            ResetPlaceButton("MilFactory");
            ResetPlaceButton("Mine");
            break;
        case 9:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceCivFactory").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceCivFactory").setAttribute("onclick","UpgradeCivFactory()");
            document.getElementById("PlaceCivFactory").innerHTML = "Upgrade";
            ResetPlaceButton("Village");
            ResetPlaceButton("Farm");
            ResetPlaceButton("Lumberjack");
            ResetPlaceButton("MilFactory");
            ResetPlaceButton("Mine");
            break;
        case 10:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceMilFactory").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceMilFactory").setAttribute("onclick","UpgradeMilFactory()");
            document.getElementById("PlaceMilFactory").innerHTML = "Upgrade";
            ResetPlaceButton("Village");
            ResetPlaceButton("Farm");
            ResetPlaceButton("Lumberjack");
            ResetPlaceButton("CivFactory");
            ResetPlaceButton("Mine");
            break;
        case 11:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#8a8f8a";
            }
            document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceMine").style.backgroundColor = "#4CAF50";
            document.getElementById("PlaceMine").setAttribute("onclick","UpgradeMine()");
            document.getElementById("PlaceMine").innerHTML = "Upgrade";
            ResetPlaceButton("Village");
            ResetPlaceButton("Farm");
            ResetPlaceButton("Lumberjack");
            ResetPlaceButton("CivFactory");
            ResetPlaceButton("MilFactory");
            break;
        case 12:
            for(let a = 0; a < PlaceButtons.length; a++)
                {
                    PlaceButtons[a].style.backgroundColor = "#8a8f8a";
                }
                document.getElementById("Demolish").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").style.backgroundColor = "#4CAF50";
                document.getElementById("PlaceSoldier").setAttribute("onclick","ActMoveMenu()");
                document.getElementById("PlaceSoldier").innerHTML = "Move";
                ResetPlaceButton("Village");
                ResetPlaceButton("Farm");
                ResetPlaceButton("Lumberjack");
                ResetPlaceButton("CivFactory");
                ResetPlaceButton("MilFactory");
                ResetPlaceButton("Mine");
            break;
        default:
            for(let a = 0; a < PlaceButtons.length; a++)
            {
                PlaceButtons[a].style.backgroundColor = "#4CAF50";
            }
            document.getElementById("Demolish").style.backgroundColor = "#8a8f8a";
            document.getElementById("PlaceSoldier").style.backgroundColor = "#8a8f8a";
            ResetPlaceButton("Village");
            ResetPlaceButton("Farm");
            ResetPlaceButton("Lumberjack");
            ResetPlaceButton("CivFactory");
            ResetPlaceButton("MilFactory");
            ResetPlaceButton("Mine");
            checkCivFactory();
            checkMilFactory();
            checkFarm();
            checkLumberjack();
            checkMine();
            checkVillage();
            break;
    }
}

//CostFunctions
function MoneyCost(Cost,Count){
    MoneyCount = MoneyCount - Count*Cost - Cost;
}
function FoodCost(Cost,Count){
    FoodCount = FoodCount - Count*Cost - Cost;
}
function WoodCost(Cost,Count){
    WoodCount = WoodCount - Count*Cost - Cost;
}
function SteelCost(Cost,Count){
    SteelCount = SteelCount - Count*Cost - Cost;
}
function PopulationCost(Cost,Count){
    PopulationCount = PopulationCount - Count*Cost - Cost;
}
function WeaponCost(Cost,Count){
    WeaponCount = WeaponCount - Count*Cost - Cost;
}

function ResetPlaceButton(Type){
    document.getElementById("Place"+Type).setAttribute("onclick","place"+Type+"()");
    document.getElementById("Place"+Type).innerHTML = Type;
}

//SodierMovement
function ActMoveMenu(){
    document.getElementById("RB2").style.display = "none";
    document.getElementById("RBSoldier").style.display = "block";
    ResetSoldierMove();
    checkMovement(-1);
    checkMovement(1);
    checkMovement(-14);
    checkMovement(14);
}

function DeActMoveMenu(){
    document.getElementById("RB2").style.display = "block";
    document.getElementById("RBSoldier").style.display = "none";
    ResetSoldierMove();
}

function Movement(Direction){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var DirectedTile = ActiveTileIdInt+Direction;
    MapGridSBD[DirectedTile] = MapGrid[DirectedTile];
    document.getElementById(DirectedTile).setAttribute("src","Soldier_"+MapGridSBD[DirectedTile]+".jpg");
    console.log(MapGridSBD[DirectedTile]);
    MapGrid[DirectedTile] = 13;
    switch(MapGridSBD[ActiveTileIdInt])
    {
        case 0:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Grass.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 2:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Wald.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 5:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Village.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 6:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Stadt.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 7:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Farm.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 8:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Lumberjack.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 9:
            document.getElementById(ActiveTileIdInt).setAttribute("src","CivFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 10:
            document.getElementById(ActiveTileIdInt).setAttribute("src","MilFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 11:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Mine.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
    }
    DeActMoveMenu();
    UpdateBuildMenu();
}

function checkMovement(Direction){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    switch(Direction)
    {
        case -1:
            var DirectionID = "MoveLeft";
            break;
        case 1:
            var DirectionID = "MoveRight";
            break;
        case 14:
            var DirectionID = "MoveDown";
            break;
        case -14:
            var DirectionID = "MoveUp";
            break;
    }

    var DirectionValue = ActiveTileIdInt+Direction;
    
    if((ActiveTileIdInt%14 == 0)&&(Direction == -1))
    {
        console.log("CASE 1");
        document.getElementById(DirectionID).setAttribute("onclick","movePrevDistrict(-105)");
        document.getElementById(DirectionID).innerHTML = "Next District";
    }
    else if(((ActiveTileIdInt-13)%14 == 0)&&(Direction == 1))
    {
        console.log("CASE 1");
        document.getElementById(DirectionID).setAttribute("onclick","moveNextDistrict(99)");
        document.getElementById(DirectionID).innerHTML = "Next District";
    }
    else if((ActiveTileIdInt%112 < 14)&&(Direction == -14))
    {
        console.log("CASE 1");
        document.getElementById(DirectionID).setAttribute("onclick","movePrevDistrict(-14)");
        document.getElementById(DirectionID).innerHTML = "Next District";
    }
    else if((ActiveTileIdInt%112 > 98)&&(Direction == 14))
    {
        console.log("CASE 1");
        document.getElementById(DirectionID).setAttribute("onclick","moveNextDistrict(14)");
        document.getElementById(DirectionID).innerHTML = "Next District";
    }
    else if((ActiveTileIdInt%112)+Direction > 112)
    {
        document.getElementById(DirectionID).setAttribute("onclick","");
        document.getElementById(DirectionID).style.backgroundColor = "#8a8f8a";
    }
    if(MapGrid[DirectionValue] == 1)
    {
        document.getElementById(DirectionID).setAttribute("onclick","");
        document.getElementById(DirectionID).style.backgroundColor = "#8a8f8a";
    }
}

function ResetSoldierMove(){
    document.getElementById("MoveUp").setAttribute("onclick","Movement(-14)");
    document.getElementById("MoveUp").style.backgroundColor = "#4CAF50";
    document.getElementById("MoveUp").innerHTML = "Up";
    document.getElementById("MoveDown").setAttribute("onclick","Movement(14)");
    document.getElementById("MoveDown").style.backgroundColor = "#4CAF50";
    document.getElementById("MoveDown").innerHTML = "Down";
    document.getElementById("MoveRight").setAttribute("onclick","Movement(1)");
    document.getElementById("MoveRight").style.backgroundColor = "#4CAF50";
    document.getElementById("MoveRight").innerHTML = "Right";
    document.getElementById("MoveLeft").setAttribute("onclick","Movement(-1)");
    document.getElementById("MoveLeft").style.backgroundColor = "#4CAF50";
    document.getElementById("MoveLeft").innerHTML = "Left";
}

function moveNextDistrict(Direction){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var DirectedTile = ActiveTileIdInt+Direction;
    MapGridSBD[DirectedTile] = MapGrid[DirectedTile];
    document.getElementById(DirectedTile).setAttribute("src","Soldier_"+MapGridSBD[DirectedTile]+".jpg");
    console.log(MapGridSBD[DirectedTile]);
    var NextDistrictInt = ActiveDistrictInt + 1;
    DistrictBuildingCount[NextDistrictInt]++;
    DistrictBuildingCount[ActiveDistrictInt]--;
    MapGrid[DirectedTile] = 13;
    switch(MapGridSBD[ActiveTileIdInt])
    {
        case 0:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Grass.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 2:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Wald.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 5:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Village.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 6:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Stadt.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 7:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Farm.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 8:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Lumberjack.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 9:
            document.getElementById(ActiveTileIdInt).setAttribute("src","CivFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 10:
            document.getElementById(ActiveTileIdInt).setAttribute("src","MilFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 11:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Mine.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
    }
    DeActMoveMenu();
    UpdateBuildMenu();
}

function movePrevDistrict(Direction){
    var ActiveTileIdInt = parseInt(ActiveTileId);
    var DirectedTile = ActiveTileIdInt+Direction;
    MapGridSBD[DirectedTile] = MapGrid[DirectedTile];
    document.getElementById(DirectedTile).setAttribute("src","Soldier_"+MapGridSBD[DirectedTile]+".jpg");
    console.log(MapGridSBD[DirectedTile]);
    var NextDistrictInt = ActiveDistrictInt - 1;
    DistrictBuildingCount[NextDistrictInt]++;
    DistrictBuildingCount[ActiveDistrictInt]--;
    MapGrid[DirectedTile] = 13;
    switch(MapGridSBD[ActiveTileIdInt])
    {
        case 0:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Grass.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 2:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Wald.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 5:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Village.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 6:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Stadt.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 7:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Farm.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 8:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Lumberjack.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 9:
            document.getElementById(ActiveTileIdInt).setAttribute("src","CivFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 10:
            document.getElementById(ActiveTileIdInt).setAttribute("src","MilFactory.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
        case 11:
            document.getElementById(ActiveTileIdInt).setAttribute("src","Mine.jpg");
            MapGrid[ActiveTileIdInt] = MapGridSBD[ActiveTileIdInt];
            break;
    }
    DeActMoveMenu();
    UpdateBuildMenu();
}