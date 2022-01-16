export const WORDLE_DURATION = 86400;
export const TRIES = 6;
export const WORD_LENGTH = 5;

export enum LetterStatus {
    EMPTY,
    INCORRECT,
    WRONG_POSITION,
    CORRECT,
}
export enum GameStatus {
    UNSTARTED,
    PLAYING,
    SUCCESS,
    FAILURE,
}

export interface Word {
    word: string;
    letters: LetterStatus[];
}

export interface WordleState {
    attempts: Word[];
    status: GameStatus;
    answer: string;
}
