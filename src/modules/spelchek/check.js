export default class Spelchek() {
	constructor(text) {
		this.text = text;
		this._text = text;
		this._vowels = "aeiou";
		this.warp = {
			_sort(chekArray) {
				let priorities = [];
				chekArray.forEach(chek => {
					priorities.push({
						PRIORITY: this[chek](true),
						value: chek
					})
				});
				return priorities.sort((first, second) => first.PRIORITY - second.PRIORITY)
			},
			vowel(priority) {
				if(!priority) this.text = [...this.text].map(element => this._vowels.includes(element) ? this._vowels(Math.floor(Math.random() * 5)) : element).join("");
				return { PRIORITY: 200 }
			}
		}
	}
	go(cheks) {
		let sorted = this.warp._sort(cheks).map(e => e.value);
		sorted.forEach(element => this.warp[element](false));
	}
	static get cheks() {
		return [
			"vowel", // replace random vowels
			"typo", // replace keys (randomly) to keys slightly different
			"snake", // eat random parts
			"adverb", // put in random adverbs
			"noun" // put in random nouns
		];
	}
}
