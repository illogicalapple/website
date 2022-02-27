class Thing {
	constructor(array, weight) {
		this.array = array;
		this.weight = weight;
		this.picking = array.map(e => ({
			value: e,
			amount: 1
		}));
	}
	random(change) {
		let newArray = [];
		this.picking.forEach(e => {
			newArray = newArray.concat((new Array(e.amount)).fill(e.value))
		});
		console.log(newArray);
		let result = Math.floor(Math.random() * newArray.length);
		if(change) {
			this.picking = this.picking.map((e, i) => {
				let amount = e.amount + this.weight - 1;
				if(newArray[result] == e.value) amount -= this.weight - 1;
				return {
					value: e.value,
					amount: amount
				}
			});
		}
		return newArray[result];
	}
	clear() {
		this.picking = this.picking.map(e => ({
			value: e.value,
			amount: 1
		}));
	}
}
export default Thing
