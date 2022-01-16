import Roact, { Component } from "@rbxts/roact";
import { Client as Signals } from "@rbxts/simplesignals";
import { GameStatus, WordleState } from "shared/types";
import { StateRenderer } from "./StateRenderer";

export class StateManager extends Component<{}, WordleState> {
    constructor(p: {}) {
        super(p);
        this.setState({
            attempts: [],
            status: GameStatus.UNSTARTED,
            answer: "WAIT.",
        });
        Signals.on("gameState", (state) => this.setState(state as WordleState));
        Signals.fire("requestGameState");
    }
    render() {
        return Roact.createElement(StateRenderer, this.state);
    }
}
