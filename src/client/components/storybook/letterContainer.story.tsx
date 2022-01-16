import Roact from "@rbxts/roact";
import { LetterStatus } from "shared/types";
import { LetterContainer } from "../LetterContainer";

export default function LetterContainerStory(target: GuiObject) {
    const tree = Roact.mount(
        <frame Size={target.Size}>
            <frame Size={new UDim2(0, 36, 0, 48)} BorderSizePixel={0}>
                <LetterContainer letter="A" status={LetterStatus.CORRECT} />
            </frame>
            <frame Size={new UDim2(0, 36, 0, 48)} BorderSizePixel={0}>
                <LetterContainer letter="B" status={LetterStatus.WRONG_POSITION} />
            </frame>
            <frame Size={new UDim2(0, 36, 0, 48)} BorderSizePixel={0}>
                <LetterContainer letter="C" status={LetterStatus.INCORRECT} />
            </frame>
            <frame Size={new UDim2(0, 36, 0, 48)} BorderSizePixel={0}>
                <LetterContainer letter=" " status={LetterStatus.EMPTY} />
            </frame>
            <uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 8)} />
        </frame>,
        target,
    );
    return () => Roact.unmount(tree);
}
