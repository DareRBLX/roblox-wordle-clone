import Roact, { PureComponent } from "@rbxts/roact";
import { Word, WORD_LENGTH } from "shared/types";
import { LetterContainer } from "./LetterContainer";

export class WordContainer extends PureComponent<Word, {}> {
    render() {
        return (
            <frame Size={new UDim2(0, WORD_LENGTH * 44, 0, 48)} BorderSizePixel={0} BackgroundTransparency={1}>
                {this.props.letters.map((letterState, index) => (
                    <LetterContainer letter={this.props.word.sub(index + 1, index + 1)} status={letterState} />
                ))}
                <uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 8)} />
            </frame>
        );
    }
}
