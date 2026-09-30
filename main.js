import { PATHS, HEADERS } from "./js/config.js";
import { calculate } from "./js/calc.js";
import { renderTable, renderRow } from "./ui/view.js";
import { renderResult } from "./ui/result.js";

let dataCharacters = [];	// キャラのjsonデータ
let dataIbutsu = [];		// 遺物のjsonデータ
let selectChar;				// キャラ選択
let selectTable;			// 遺物効果テーブル

// 初期処理
init();

// =====================
// 初期処理
// =====================
async function init() {

	// DOM取得（HTML読み込み）
	selectChar = document.getElementById("character");
	selectTable = document.getElementById("table");

	// テーブルヘッダ
	renderTable(selectTable, HEADERS);

	// キャラデータ読み込み
	await loadCharacters();

	// キャラ選択の表示
	initCharacterSelect();

	// 遺物データ読み込み
	await loadIbutsu();

	// 遺物データの表示
	initIbutsuView();

	// === event ===
	// 初期画面用計算処理
	handleChange();
	//画面上のどこかが変わったとき、計算処理実行
	document.addEventListener("change", handleChange);
}

// =====================
// キャラデータ読み込み
// =====================
async function loadCharacters() {
	const res = await fetch(PATHS.data.characters);
	dataCharacters = await res.json();
}

// =====================
// キャラ選択の表示
// =====================
function initCharacterSelect() {
	const charSelect = document.getElementById("character");

	charSelect.innerHTML = "";

	dataCharacters.forEach((chara, i) => {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = `${chara.name} (HP:${chara.hp})`;
		charSelect.appendChild(option);
	});

	charSelect.value = "0";
}

// =====================
// 遺物データ読み込み
// =====================
async function loadIbutsu() {
	const res = await fetch(PATHS.data.ibutsu);
	dataIbutsu = await res.json();
}

// =====================
// 遺物内容の表示
// =====================
function initIbutsuView() {
	// 行描画
	dataIbutsu.forEach(d => renderRow(selectTable, d));
}

// =====================
// 計算処理
// =====================
function handleChange() {
	// 選択キャラと遺物の選択内容を取得
	const state = getState();
	if (!state) return;

	// 計算処理を実行
	const result = calc(state);

	// 計算結果を画面に反映（UI更新）
	renderResult(result);
}

// =====================
// 選択キャラと遺物の選択内容を取得
// =====================
function getState() {

	// キャラデータがまだ読み込まれていない場合は何もしない
	if (!dataCharacters.length) return null;

	// セレクトボックスで選ばれているキャラのインデックスを取得
	const selectedIndex = Number(selectChar.value);

	// インデックスが不正（未選択 or 範囲外）の場合は処理しない
	const character = dataCharacters[selectedIndex];
	if (!character) return null;

	// 画面上でチェックされているinput要素をすべて取得（遺物や効果のON/OFF）
	const inputs = document.querySelectorAll("input:checked");

	return {
		character,
		inputs
	};
}
// =====================
// 入力データをもとに計算だけを行う
// =====================
function calc(state) {

	// 選択されたキャラの基本HPを取得
	const baseHp = state.character.hp;

	// 計算処理を実行
	const result = calculate(state.inputs, baseHp);

	return result;
}