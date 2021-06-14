function solve(clawPos, boxes, boxInClaw) {
	const boxesCount = boxes.reduce((a, b) => a + b) + ~~boxInClaw

	// Prepare the array for further comparison with zeroes
	let shouldBeStacked = [...Array(boxes.length).keys()].map(n => 0)

	// Distribute all boxes one by one, from left to right until no boxes left
	let currentLoop = 1
	for (let i = 1; i <= boxesCount; i++) {
		shouldBeStacked[currentLoop - 1] += 1
		if (currentLoop === boxes.length) currentLoop = 1
		else currentLoop++
	}

	// Current value and it's capacity
	const currentVal = boxes[clawPos]
	const currentMax = shouldBeStacked[clawPos]

	// Helpers
	const shouldBeZero = currentMax === 0
	const isBigger = currentVal > currentMax
	const isLower = currentVal < currentMax

	// Split to left and to right arrays between the current claw position
	const leftFromClaw = boxes.slice(0, clawPos)
	const rightFromClaw = boxes.slice(clawPos + 1)

	// Checkers
	const freeSpaceOnLeft = leftFromClaw.some((v, i) => boxes[i] < shouldBeStacked[i])
	const freeSpaceOnRight = rightFromClaw.some((v, i) => boxes[i + clawPos + 1] < shouldBeStacked[i + clawPos + 1])
	const excessiveOnLeft = leftFromClaw.some((v, i) => boxes[i] > shouldBeStacked[i])
	const excessiveOnRight = rightFromClaw.some((v, i) => boxes[i + clawPos + 1] > shouldBeStacked[i + clawPos + 1])

	// Command actions for a claw
	let command = ''
	const LEFT = () => command = 'LEFT'
	const RIGHT = () => command = 'RIGHT'
	const PICK = () => command = 'PICK'
	const PLACE = () => command = 'PLACE'

	if (boxInClaw) {
		if (isLower && !shouldBeZero) PLACE()
		else if (freeSpaceOnLeft) LEFT()
		else if (freeSpaceOnRight) RIGHT()
	} else {
		if (isBigger) PICK()
		else if (excessiveOnLeft) LEFT()
		else if (excessiveOnRight) RIGHT()
	}

	return command;
}
