// calc.js

export function calculate(inputs, baseHp) {

	let atkAll = 1;
	let atkButsuri = 1;
	let atkMaryoku = 1;
	let atkFire = 1;
	let atkKaminari = 1;
	let atkSei = 1;
	let atkZokusei = 1;
	let hpAdd = 0;
	let hpRate = 0;
	let cut = 0;

	const usedUnique = new Set();

	inputs.forEach(i => {

		const group = i.dataset.group;
		const type = i.dataset.type;
		const value = Number(i.value);

		// ===== atk =====
		if (group === "atk") {

			const unique = i.dataset.unique === "true";

			if (unique) {
				const key = "atk_" + i.dataset.key;
				if (usedUnique.has(key)) return;
				usedUnique.add(key);
			}

			if (type === "butsuri") atkButsuri *= value;
			else if (type === "maryoku") atkMaryoku *= value;
			else if (type === "fire") atkFire *= value;
			else if (type === "kaminari") atkKaminari *= value;
			else if (type === "sei") atkSei *= value;
			else if (type === "zokusei") atkZokusei *= value;
			else if (type === "all") atkAll *= value;

			return;
		}

		// ===== hp =====
		if (group === "hp") {

			const kind = i.dataset.kind;
			const unique = i.dataset.unique === "true";

			if (unique) {
				const key = "hp_" + i.dataset.key;
				if (usedUnique.has(key)) return;
				usedUnique.add(key);
			}

			if (kind === "add") hpAdd += value;
			if (kind === "rate") hpRate += (value - 1);

			return;
		}

		// ===== cut =====
		if (group === "cut") {
			cut += (value - 1);
		}
	});

	// ===== 最終計算 =====
	const finalHp = (baseHp + hpAdd) * (1 + hpRate);

	atkButsuri *= atkAll;
	atkMaryoku *= atkZokusei * atkAll;
	atkFire *= atkZokusei * atkAll;
	atkKaminari *= atkZokusei * atkAll;
	atkSei *= atkZokusei * atkAll;
	atkZokusei *= atkAll;

	return {
		atkButsuri,
		atkMaryoku,
		atkFire,
		atkKaminari,
		atkSei,
		atkZokusei,
		finalHp,
		cut
	};
}