import { headers } from "./config.js";
import { calculate } from "./calc.js";
import { renderTable, renderRow } from "./view.js";
import { renderResult } from "./ui.js";

// キャラデータ定義
let characters = [];

// DOM取得
const charSelect = document.getElementById("character");
const table = document.getElementById("table");

// キャラ選択 初期化
characters.forEach((c, i) => {
	const option = document.createElement("option");
	option.value = i;
	option.textContent = `${c.name} (HP:${c.hp})`;
	charSelect.appendChild(option);
});

// event
//画面上のどこかが変わったとき、計算処理実行
document.addEventListener("change", handleChange);

// 初期化処理
init();

// =====================
// 初期化処理
// =====================
async function init() {

	// テーブルヘッダ
	renderTable(table, headers);

	try {
		// キャラ読み込み
		await loadCharacters();

		// キャラ選択
		initCharacterSelect();

		// 遺物読み込み
		const res = await fetch("../data/ibutsu.json");
		const dataIbutsu = await res.json();

		console.log("JSON読み込み結果:", dataIbutsu);

		// 行描画
		dataIbutsu.forEach(d => renderRow(table, d));

		// 初期画面用計算処理
		handleChange();

	} catch (err) {
		console.error("エラー", err);
	}
}

// =====================
// キャラデータ読み込み
// =====================
async function loadCharacters() {
	const res = await fetch("../data/characters.json");
	characters = await res.json();
}

// =====================
// キャラ選択
// =====================
function initCharacterSelect() {
	const charSelect = document.getElementById("character");

	charSelect.innerHTML = "";

	characters.forEach((c, i) => {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = `${c.name} (HP:${c.hp})`;
		charSelect.appendChild(option);
	});

	charSelect.value = "0";
}

// =====================
// 計算処理
// =====================
function handleChange() {

	if (!characters.length) return;

	const inputs = document.querySelectorAll("input:checked");

	const selectedIndex = Number(charSelect.value);

	if (!characters[selectedIndex]) return;

	const baseHp = characters[selectedIndex].hp;

	const result = calculate(inputs, baseHp);

	renderResult(result);
}
