import Roact from "@rbxts/roact";
import { Players, StarterGui } from "@rbxts/services";
import { Client as Signals } from "@rbxts/simplesignals";
import { App } from "./components/App";

Roact.mount(Roact.createElement(App), Players.LocalPlayer.WaitForChild("PlayerGui"));

Signals.on("notification", (data) => {
    StarterGui.SetCore("SendNotification", data as SendNotificationConfig);
});
