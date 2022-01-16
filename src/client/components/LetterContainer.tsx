/**
 * @file Implements a component that renders a letter with the background color
 * @author Taylor Fox <taylor@foxt.dev>
 * @license GPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { LetterStatus } from "shared/types";

interface LetterContainerProps {
    letter: string;
    status: LetterStatus;
}
const ColorLUT = {
    [LetterStatus.CORRECT]: Color3.fromRGB(100, 230, 100),
    [LetterStatus.INCORRECT]: Color3.fromRGB(70, 70, 70),
    [LetterStatus.WRONG_POSITION]: Color3.fromRGB(230, 170, 100),
    [LetterStatus.EMPTY]: Color3.fromRGB(175, 175, 175),
};

export class LetterContainer extends PureComponent<LetterContainerProps, {}> {
    render() {
        return (
            <textlabel
                Text={this.props.letter}
                Size={new UDim2(0, 36, 0, 48)}
                BackgroundColor3={ColorLUT[this.props.status]}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                Font={Enum.Font.SourceSansSemibold}
                TextScaled={true}
                BorderSizePixel={0}
            >
                <uicorner CornerRadius={new UDim(0.2, 0)}></uicorner>
            </textlabel>
        );
    }
}
