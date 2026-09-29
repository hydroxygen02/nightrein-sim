export function renderResult(r) {
	document.getElementById("result").innerHTML =
		`物理攻撃倍率: ${r.atkButsuri.toFixed(4)}<br>
		 魔力攻撃倍率: ${r.atkMaryoku.toFixed(4)}<br>
		 炎攻撃倍率: ${r.atkFire.toFixed(4)}<br>
		 雷攻撃倍率: ${r.atkKaminari.toFixed(4)}<br>
		 聖攻撃倍率: ${r.atkSei.toFixed(4)}<br>
		 属性攻撃倍率: ${r.atkZokusei.toFixed(4)}<br>
		 最終HP: ${r.finalHp}<br>
		 カット率: ${(r.cut*100).toFixed(1)}%`;
}