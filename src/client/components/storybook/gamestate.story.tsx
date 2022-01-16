import Roact from "@rbxts/roact";
import { GameStatus, LetterStatus } from "shared/types";
import { StateRenderer } from "../StateRenderer";

export default function GameStateStory(target: GuiObject) {
    const tree = Roact.mount(
        Roact.createElement(StateRenderer, {
            attempts: [
                {
                    word: "ABCDE",
                    letters: [
                        LetterStatus.CORRECT,
                        LetterStatus.INCORRECT,
                        LetterStatus.CORRECT,
                        LetterStatus.WRONG_POSITION,
                        LetterStatus.CORRECT,
                    ],
                },
                {
                    word: "ABCDE",
                    letters: [
                        LetterStatus.WRONG_POSITION,
                        LetterStatus.INCORRECT,
                        LetterStatus.WRONG_POSITION,
                        LetterStatus.WRONG_POSITION,
                        LetterStatus.WRONG_POSITION,
                    ],
                },
            ],
            status: GameStatus.PLAYING,
            answer: "OWUWU",
        }),
        target,
    );
    return () => Roact.unmount(tree);
}
