// パス
export const PATHS = {
  data: {
    characters: "./data/characters.json",
    ibutsu: "./data/ibutsu.json"
  }
};

// ヘッダー
export const HEADERS = [
  "効果",
  "重ね掛け<br><small>（表 / 裏）</small>",
  "備考",
  "表遺物1","表遺物2","表遺物3",
  "裏遺物1","裏遺物2","裏遺物3"
];

// 遺物数
export const IBUTSU_CNT_MAX = 6;

// 重ね掛けありなし
export const UNIQUE_MARK = {
	all: "〇",
	single: "✕",
	unique: "△",
  none: "-"
};