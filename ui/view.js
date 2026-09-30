import { UNIQUE_MARK, IBUTSU_CNT_MAX } from "../js/config.js";

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

	// 効果
	let tr = `<tr><td>${dataIbutsu.name}</td>`;
	
	// 重ね掛け
	const frontMark = UNIQUE_MARK[dataIbutsu.front?.unique] ?? "";
	const backMark  = UNIQUE_MARK[dataIbutsu.back?.unique] ?? "";
	tr += `<td>${frontMark} / ${backMark}</td>`;

	// 備考
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
		const count = side.count;

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
					data-count="${values.count ?? 1}"
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