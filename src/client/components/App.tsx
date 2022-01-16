import Roact, { Component } from "@rbxts/roact";
import { GuessBox } from "./GuessBox";
import { StateManager } from "./StateManager";

export class App extends Component<{}, {}> {
    render() {
        return (
            <screengui ResetOnSpawn={false} IgnoreGuiInset={true}>
                <frame
                    Size={new UDim2(1, 0, 1, 0)}
                    BorderSizePixel={0}
                    BackgroundColor3={Color3.fromRGB(230, 230, 230)}
                >
                    <StateManager></StateManager>
                    <GuessBox></GuessBox>
                    <uilistlayout
                        VerticalAlignment={Enum.VerticalAlignment.Center}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        FillDirection={Enum.FillDirection.Vertical}
                        Padding={new UDim(0, 8)}
                    />
                </frame>
            </screengui>
        );
    }
}
