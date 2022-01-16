import Roact from "@rbxts/roact";
import { LetterStatus } from "shared/types";
import { WordContainer } from "../WordContainer";

export default function WordStory(target: GuiObject) {
    const tree = Roact.mount(
        <WordContainer
            word="ABC  "
            letters={[
                LetterStatus.CORRECT,
                LetterStatus.WRONG_POSITION,
                LetterStatus.INCORRECT,
                LetterStatus.EMPTY,
                LetterStatus.EMPTY,
            ]}
        ></WordContainer>,
        target,
    );
    return () => Roact.unmount(tree);
}
