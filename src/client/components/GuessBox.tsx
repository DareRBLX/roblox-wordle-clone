import Roact, { PureComponent } from "@rbxts/roact";
import { Client } from "@rbxts/simplesignals";
import { WORD_LENGTH } from "shared/types";

export class GuessBox extends PureComponent<{}, {}> {
    textboxRef = Roact.createRef<TextBox>();
    render() {
        return (
            <frame
                Size={new UDim2(0, WORD_LENGTH * 44, 0, 36)}
                LayoutOrder={2}
                BorderSizePixel={0}
                BackgroundTransparency={1}
            >
                <textbox
                    Ref={this.textboxRef}
                    Size={new UDim2(1, -40, 0, 36)}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    TextColor3={new Color3()}
                    Font={Enum.Font.SourceSansSemibold}
                    TextScaled={true}
                    BorderSizePixel={0}
                    Text={""}
                    PlaceholderText={"Type your guess here"}
                    ClearTextOnFocus={false}
                    Change={{
                        Text: (text) => {
                            text.Text = text.Text.lower().gsub("%A", "")[0].sub(0, WORD_LENGTH);
                            print(text.Text);
                        },
                    }}
                >
                    <uicorner CornerRadius={new UDim(0.2, 0)}></uicorner>
                </textbox>
                <textbutton
                    Text="►"
                    Size={new UDim2(0, 36, 0, 36)}
                    Position={new UDim2(1, -36, 0, 0)}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    TextColor3={new Color3()}
                    Font={Enum.Font.SourceSansSemibold}
                    TextScaled={true}
                    BorderSizePixel={0}
                    Event={{
                        MouseButton1Click: () => {
                            const val = this.textboxRef.getValue()!;

                            Client.fire("guess", val.Text);
                            val.Text = "";
                        },
                    }}
                >
                    <uicorner CornerRadius={new UDim(0.2, 0)}></uicorner>
                </textbutton>
            </frame>
        );
    }
}
