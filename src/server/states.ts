import { DataStoreService, HttpService, Players } from "@rbxts/services";
import { Server as Signals } from "@rbxts/simplesignals";
import { GameStatus, WordleState } from "shared/types";
import { playerJoined } from "shared/util";
import { getWordleNo, wordles } from "./wordles";

const statesDS = DataStoreService.GetDataStore("gameStates");
const leaderboardDS = DataStoreService.GetDataStore("leaderboard");

const states = new Map<number, WordleState>();

/**
 * Checks if a user has a saved game state for the current wordle.
 * @param pId Player ID
 */
function getSavedState(pId: number) {
    try {
        print("Loading state for", pId);
        const saved = statesDS.GetAsync(`${pId}_${getWordleNo()}`) as string;
        if (!saved) return undefined;
        const state = HttpService.JSONDecode(saved) as WordleState;
        return state;
    } catch (e) {
        warn(e);
        return undefined;
    }
}

/**
 * Generates a new wordle state for the player.
 * **Note:** This function will overwrite any existing state for the player.
 * @param p {Player} The player to generate a state for
 * @returns {WordleState} The new state
 */
export function makeGameState(p: Player): WordleState {
    if (states.has(p.UserId) && states.get(p.UserId)?.answer === "WAITINGFORSTATELOAD") {
        const s = states.get(p.UserId)!;
        while (s && s.answer === "WAITINGFORSTATELOAD") wait();
        return s || makeGameState(p);
    }
    states.set(p.UserId, {
        attempts: [],
        status: GameStatus.FAILURE,
        answer: "WAITINGFORSTATELOAD",
    });
    const state: WordleState = getSavedState(p.UserId) || {
        attempts: [],
        status: GameStatus.UNSTARTED,
        answer: wordles[getWordleNo()],
    };
    print(state, getWordleNo(), wordles[getWordleNo()]);
    states.set(p.UserId, state);
    sendGameState(p);
    return state;
}
playerJoined(makeGameState);

/**
 * Function for getting a player's game state, and creating one if it doesn't exist.
 * @param p {Player} The player to get the game state for
 * @returns {WordleState} The player's game state
 */
export function getGameState(p: Player) {
    if (states.has(p.UserId)) return states.get(p.UserId)!;
    return makeGameState(p);
}

/**
 * Sends a player their current game state.
 * @param p {Player} The player to send the state to
 */
export function sendGameState(p: Player) {
    const state = states.get(p.UserId);
    if (state)
        Signals.fire("gameState", p, {
            ...state,
            answer: state.status >= GameStatus.SUCCESS ? state.answer : "no",
        });
}
Signals.on("requestGameState", sendGameState);

/**
 * Saves a player's game state.
 * @param p {Player} The player to save the state for
 */
export function saveGameState(p: Player) {
    try {
        print("Saving state for", p.Name);
        const state = states.get(p.UserId);
        if (state && state.status > GameStatus.UNSTARTED)
            // have to cast to anon function bc typings are out of date
            statesDS.SetAsync(`${p.UserId}_${getWordleNo()}`, HttpService.JSONEncode(state)); //,[p.UserId]);
    } catch (e) {
        warn(e);
    }
}
Players.PlayerRemoving.Connect(saveGameState);
