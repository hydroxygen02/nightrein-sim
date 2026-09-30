import { IBUTSU_CNT_MAX } from "../js/config.js";

// =====================
// テーブルヘッダ
// =====================
export function renderTable(table, headers) {
	table.innerHTML =
		"<tr>" +
		headers.map(h => `<th>${h}</th>`).join("") +
		"</tr>";
}

// =====================
// 1行描画
// =====================
export function renderRow(table, dataIbutsu) {

		let tr = `<tr><td>${dataIbutsu.name}</td>`;
		// 重複・備考（今は空）
		tr += `<td></td>`;
		tr += `<td></td>`;

	// =====================
	// 遺物列
	// =====================
	for (let col = 0; col < IBUTSU_CNT_MAX; col++) {

		// 表遺物か判定
		const isFront = col < 3;
		const side = isFront ? dataIbutsu.front : dataIbutsu.back;

		const unique = side.unique;
		const calcType = side.calc;
		const list = side.values;

		// o = 1つの選択肢（{label, value}）
		// i = 何番目か（0,1,2...）
		// をラベル化する
		tr += `<td>` + list.map((values, i) => `
			<label>
				<input type="${getInputType(dataIbutsu.group)}"
					name="${dataIbutsu.id}_${col}"
					data-group="${dataIbutsu.group}"
					data-type="${dataIbutsu.type}"
					data-key="${dataIbutsu.id}"
					data-unique="${unique}"
					data-calc="${calcType}"
					value="${values.value}"
					${getInputType(dataIbutsu.group) === "radio" && i === 0 ? "checked" : ""}
				>
				${values.label}
			</label><br>
		`).join("") + `</td>`;
	}

	tr += `</tr>`;
	table.innerHTML += tr;
}

// =====================
// 入力タイプ切替
// =====================
function getInputType(group) {
	if (group === "cut") return "checkbox";
	return "radio";
}