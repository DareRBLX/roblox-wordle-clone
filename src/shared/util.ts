import { Players } from "@rbxts/services";

/**
 * Creates a new array containing 'value' repeated 'length' times.
 * @param length {number} The number of times to repeat 'value'
 * @param value {any} The value to repeat
 * @returns {any[]} The new array
 */
export function fillArray(length: number, value: any): any[] {
    const arr = [];
    for (let i = 0; i < length; i++) arr.push(value);
    return arr;
}

/**
 * Registers a callback to be called for all players currently in the server, and will be called whenever a new player joins
 * **Note:** Do not use this for code that you don't want to run for existing players, as all the current players will be
 * iterated over, and the callback will be called for each player. If you only want to run for new players, use
 * `Players.PlayerAdded` instead.
 * @param callback The function to be called.
 */
export function playerJoined(callback: (player: Player) => void /* eslint-disable-line no-unused-vars*/) {
    for (const player of Players.GetPlayers()) {
        callback(player);
    }
    Players.PlayerAdded.Connect(callback);
}
