import Roact, { PureComponent } from "@rbxts/roact";
import { LetterStatus, TRIES, WordleState, WORD_LENGTH } from "shared/types";
import { fillArray } from "shared/util";
import { WordContainer } from "./WordContainer";

export class StateRenderer extends PureComponent<WordleState, {}> {
    render() {
        return (
            <frame
                Size={new UDim2(0, WORD_LENGTH * 44, 0, TRIES * 56)}
                LayoutOrder={1}
                BorderSizePixel={0}
                BackgroundTransparency={1}
            >
                {this.props.attempts.map((attempt) => (
                    <WordContainer word={attempt.word} letters={attempt.letters} />
                ))}

                {
                    // fill the remaining attempts with empty words
                    fillArray(TRIES - this.props.attempts.size(), 0).map(() => (
                        <WordContainer word={""} letters={fillArray(WORD_LENGTH, LetterStatus.EMPTY)} />
                    ))
                }
                <uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 8)} />
            </frame>
        );
    }
}
