import { IBUTSU_CNT_MAX } from "../js/config.js";

// ヘッダー生成
export function renderTable(table, headers) {
	table.innerHTML =
		"<tr>" +
		headers.map(h => `<th>${h}</th>`).join("") +
		"</tr>";
}

// カラム設定
export function renderRow(table, ibutsuData) {

    // "効果"カラム
	let tr = `<tr><td>${ibutsuData.name}</td>`;
    // "重複"カラム
	tr += `<td></td>`;
    // "備考"カラム
	tr += `<td></td>`;

    // "遺物"カラム
	for (let col = 0; col < IBUTSU_CNT_MAX; col++) {

		if (ibutsuData.group === "atk") {
			const list = (col < 3) ? ibutsuData.front : ibutsuData.back;

			tr += `<td>` +
				list.map((o,i)=>`
					<label>
						<input type="radio"
							name="${ibutsuData.name}__${col}"
							data-group="atk"
							data-type="${ibutsuData.type}"
							data-key="${ibutsuData.name}"
							data-unique="${o.unique ?? false}"
							value="${o.value}"
							${i===0?"checked":""}>
						${o.label}
					</label><br>
				`).join("") +
			`</td>`;
		}

		else if (ibutsuData.group === "hp") {
			const list = (col < 3) ? ibutsuData.front : ibutsuData.back;

			tr += `<td>` +
				list.map((o)=>`
					<label>
						<input type="radio"
							name="${ibutsuData.name}_${col}"
							data-group="hp"
							data-kind="${o.kind}"
							data-key="${ibutsuData.name}"
							data-unique="${o.unique ?? false}"
							value="${o.value}">
						${o.label}
					</label><br>
				`).join("") +
			`</td>`;
		}

		else if (ibutsuData.group === "cut") {
			tr += `<td>
				<input type="checkbox"
					data-group="cut"
					value="${ibutsuData.value}">
			</td>`;
		}
	}

	tr += `</tr>`;
	table.innerHTML += tr;
}