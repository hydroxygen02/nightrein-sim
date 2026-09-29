import { headers } from "./js/config.js";
import { calculate } from "./js/calc.js";
import { renderTable, renderRow } from "./js/view.js";
import { renderResult } from "./js/ui.js";

// キャラデータ定義
let characters = [];
let charSelect;
let table;

// 初期化処理
init();

// =====================
// 初期化処理
// =====================
async function init() {

	// DOM取得
	charSelect = document.getElementById("character");
	table = document.getElementById("table");

	// テーブルヘッダ
	renderTable(table, headers);

	// キャラ読み込み
	await loadCharacters();

	// キャラ選択
	initCharacterSelect();

	// 遺物読み込み
	const res = await fetch("./data/ibutsu.json");
	const dataIbutsu = await res.json();

	// 行描画
	dataIbutsu.forEach(d => renderRow(table, d));

	// event
	// 初期画面用計算処理
	handleChange();

	//画面上のどこかが変わったとき、計算処理実行
	document.addEventListener("change", handleChange);

}

// =====================
// キャラデータ読み込み
// =====================
async function loadCharacters() {
	const res = await fetch("./data/characters.json");
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
