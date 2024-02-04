function execute() {
	const code = document.getElementById("code").value;
	const input = document.getElementById("input").value;
	var newcode = "";
	var linelist = [0]

	for (let i = 0; i <= code.length; i++) {
		if (code.substring(i, i + 2) == "🗿") {
			newcode = newcode + "O";
		} else if (code.charAt(i) == "\n") {
			newcode = newcode + "\n";
		}
	}
	for (let i = 0; i <= newcode.length; i++) {
		if (newcode.charAt(i) == "\n") {
			linelist.push(i + 1)
		}
	}
	linelist.push(newcode.length + 1)

	var output = ""
	var stack = [0, 0]
	var memory = []
	var comp = false

	for (i = 0; i < linelist.length - 1 || i < 0; i++) {
		if (stack.length == 1) {
			stack = [0, stack[0]]
		}
		if (memory[stack[stack.length - 1]] == undefined) {
			memory[stack[stack.length - 1]] = 0;
		}
		console.log(linelist[i + 1] - linelist[i] - 1)
		switch (linelist[i + 1] - linelist[i] - 1) {
			case 0:
			case -1:
				break;
			case 1:
				if (input.charAt(stack[stack.length - 1])) {
					stack.push(input.charCodeAt(stack[stack.length - 1]))
				} else {
					stack.push(0)
				}
				break;
			case 2:
				if (stack[stack.length - 1] == 0) {
					output = output + "🗿"
				} else {
					output = output + String.fromCharCode(Math.abs(stack[stack.length - 1]))
				}
				break;
			case 3:
				memory[Math.abs(stack[stack.length - 1])] = stack[stack.length - 2];
				break;
			case 4:
				if (memory[Math.abs(stack[stack.length - 1])] == NaN) {
					memory[Math.abs(stack[stack.length - 1])] = 0;
				}
				stack.push(memory[Math.abs(stack[stack.length - 1])])
				break;
			case 5:
				let dif = stack[stack.length - 2] - stack[stack.length - 1]
				stack.pop()
				stack.pop()
				stack.push(dif)
				break;
			case 6:
				let sum = stack[stack.length - 2] + stack[stack.length - 1]
				stack.pop()
				stack.pop()
				stack.push(sum)
				break;
			case 7:
				let pro = stack[stack.length - 2] * stack[stack.length - 1]
				stack.pop()
				stack.pop()
				stack.push(pro)
				break;
			case 8:
				if (stack[stack.length - 2] == stack[stack.length - 1]) {
					comp = true;
				} else {
					comp = false;
				}
				break;
			case 9:
				if (comp) {
					i = i + stack[stack.length - 1] - 1
				}
				break;
			default:
				if (linelist[i + 1] - linelist[i] - 1 >= 10) {
					stack.push(linelist[i + 1] - linelist[i] - 11)
				}
		}
		console.log(i, stack)
	}
	document.getElementById("output").value = output;
}