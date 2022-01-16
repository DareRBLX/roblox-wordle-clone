import { Server as Signals } from "@rbxts/simplesignals";
import { GameStatus, LetterStatus, TRIES, WORD_LENGTH } from "shared/types";
import { fillArray } from "shared/util";
import { wordlist } from "shared/words";
import { getGameState, sendGameState } from "./states";

Signals.setCallback("getTime", () => os.time());

/**
 * Process a player's guess.
 * @param p {Player} The player to process the guess for
 * @param guess {string} The guess to process
 */
function performGuess(p: Player, guess: string) {
    const state = getGameState(p)!;
    if (!state) p.Kick("Something went wrong, please rejoin the game.");
    switch (state.status) {
        case GameStatus.UNSTARTED:
            state.status = GameStatus.PLAYING;
        case GameStatus.PLAYING:
            if (guess === state.answer) {
                state.status = GameStatus.SUCCESS;
                state.attempts.push({
                    word: guess,
                    letters: fillArray(guess.size(), LetterStatus.CORRECT),
                });
                Signals.fire("notification", p, {
                    Title: `✅ Congratulations!`,
                    Text: `You found the word '${state.answer}' in ${state.attempts.size()} attempt(s)!`,
                    Duration: 10,
                });
            } else {
                if (guess.size() !== WORD_LENGTH)
                    return Signals.fire("notification", p, {
                        Title: "🔢 That word is too short!",
                        Text: `All guesses must be ${WORD_LENGTH} letters long.`,
                        Duration: 5,
                    });
                if (!wordlist.includes(guess))
                    return Signals.fire("notification", p, {
                        Title: `📘 ${guess} is not a real word!`,
                        Text: "All guesses must be a dictionary word.",
                        Duration: 5,
                    });
                if (state.attempts.some((a) => a.word === guess))
                    return Signals.fire("notification", p, {
                        Title: `You already guessed '${guess}'!`,
                        Text: "You can only guess each word once.",
                        Duration: 5,
                    });
                state.attempts.push({
                    word: guess,
                    letters: guess.split("").map((l, i) => {
                        if (l === state.answer.sub(i + 1, i + 1)) return LetterStatus.CORRECT;
                        if (state.answer.match(l)[0]) return LetterStatus.WRONG_POSITION;
                        return LetterStatus.INCORRECT;
                    }),
                });
                if (state.attempts.size() >= TRIES) {
                    state.status = GameStatus.FAILURE;
                    Signals.fire("notification", p, {
                        Title: `💔 Bad luck!`,
                        Text: `You failed to find the word '${state.answer}' after ${TRIES} attempts.`,
                        Duration: 10,
                    });
                }
            }
            break;
        default:
            break;
    }
    sendGameState(p);
}
Signals.on("guess", performGuess);
