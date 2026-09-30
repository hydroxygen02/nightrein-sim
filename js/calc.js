export function calculate(inputs, baseHp) {

	let atk = {
		all: 1,
		butsuri: 1,
		maryoku: 1,
		fire: 1,
		kaminari: 1,
		sei: 1,
		zokusei: 1
	};

	let hpAdd = 0;
	let hpRate = 1;
	let cut = 0;

	// 重複管理
	const usedUnique = new Set();     // 重複なし用
	const usedValue = new Map();      // 違う値のみ重複あり用

	// i = チェックした内容
	inputs.forEach(i => {

		// dataset = views.jsのdata-xxxの部分
		const unique = i.dataset.unique;
		const value = Number(i.value);
		const group = i.dataset.group;
		const type = i.dataset.type;
		const key = i.dataset.key;
		const calcType = i.dataset.calc; // "mul" or "add"

		// ================= 重複制御 =================

		// 重複なし
		if (unique === "single") {
			// なしの選択肢は無視
			if (value === 1.0) return;
			if (usedUnique.has(key)) return;
			usedUnique.add(key);
		}

		// 違うプラス値だけ計算対象 → 同じkey内で「同じvalue」は除外
		if (unique === "unique") {
			if (!usedValue.has(key)) {
				usedValue.set(key, new Set());
			}
			const set = usedValue.get(key);

			if (set.has(value)) return;
			set.add(value);
		}

		// ================= atk =================
		if (group === "atk") {

			if (calcType === "add") {
				atk[type] += value;
			}

			if (calcType === "mul") {
				atk[type] *= value;
			}

			return;
		}

		// ================= hp =================
		if (group === "hp") {

			if (calcType === "add") {
				hpAdd += value;
			}

			if (calcType === "mul") {
				hpRate *= value;
			}

			return;
		}

		// ================= cut =================
		if (group === "cut") {
			cut += (value - 1);
		}
	});

	// ===================== 最終計算 =====================

	// HP
	const finalHp = (baseHp + hpAdd) * hpRate;

	// 攻撃
	atk.butsuri *= atk.all;
	atk.maryoku *= atk.zokusei * atk.all;
	atk.fire *= atk.zokusei * atk.all;
	atk.kaminari *= atk.zokusei * atk.all;
	atk.sei *= atk.zokusei * atk.all;
	atk.zokusei *= atk.all;

	return {
		atkButsuri: atk.butsuri,
		atkMaryoku: atk.maryoku,
		atkFire: atk.fire,
		atkKaminari: atk.kaminari,
		atkSei: atk.sei,
		atkZokusei: atk.zokusei,
		finalHp,
		cut
	};
}