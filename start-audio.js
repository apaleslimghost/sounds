export default function startAudio() {
	const playButtonElement = document.createElement('button')
	playButtonElement.innerHTML = '▶️ start audio'
	playButtonElement.style.position = 'absolute'
	playButtonElement.style.top = '1em'
	playButtonElement.style.left = '1em'
	playButtonElement.style.display = "flex"
	document.body.appendChild(playButtonElement)

	const audioContext = new (window.AudioContext || window.webkitAudioContext)()

	let buttonWasShowingAtStart = false

	document.addEventListener("touchstart", () => {
		if (playButtonElement.style.display != "none") {
			buttonWasShowingAtStart = true
		}

		audioContext.resume()
	})

	let buttonWasShowingAtEnd

	document.addEventListener("touchend", event => {
		if (playButtonElement.style.display != "none" || buttonWasShowingAtStart) {
			buttonWasShowingAtStart = false
			buttonWasShowingAtEnd = true
		}

		audioContext.resume()
	})

	document.addEventListener("click", event => {
		if (
			playButtonElement.style.display != "none" ||
			buttonWasShowingAtStart ||
			buttonWasShowingAtEnd
		) {
			event.preventDefault()
			buttonWasShowingAtStart = false
			buttonWasShowingAtEnd = false

			audioContext.resume()
		}
	})

	return {
		audioContext,
		promise: audioContext.resume().then(() => {
			playButtonElement.style.display = "none"
		})
	}
}
