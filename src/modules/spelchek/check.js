export default class Spelchek {
	constructor(text) {
		this.text = text;
		this._text = text;
		this._vowels = "aeiou";
		this._alphabet = "abcdefghijklmnopqrstuvwxyz";
		this._alphabet += this._alphabet.toUpperCase();
		this._punctuation = ",.?/<>;:'\"[]{}\\|=+-_)(*&^%$#@!~`"
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
			},
			typo(priority) {
				if(!priority) this.text = [...this.text].map(element => this._alphabet.includes(element) && Math.random() < 0.09 ? this._alphabet[Math.floor(Math.random() * 54)] : element)
				return { PRIORITY: 201 }
			},
			punctuation(priority) {
				if(!priority) this.text = [...this.text].filter(e => !this._punctuation.includes(e)).forEach((e, i, a) => Math.random() < 0.09 && a.splice(i, 0, this._punctuation[Math.random() * this._punctuation.length]))
				return { PRIORITY: 199 }
			}
		}
	}
	go(cheks) {
		let sorted = this.warp._sort(cheks).map(e => e.value);
		sorted.forEach(element => this.warp[element](false));
	}
	static get cheks() {
		return [
			"vowel", // replace random vowels DONE
			"typo", // replace keys (randomly) to keys different DONE
			"snake", // eat random parts
			"punctuation", // punctuate and delete punctuate DONE
			"adverb", // put in random adverbs
			"noun" // put in random nouns
		];
	}
}
