export type Tetromino =
  | 'OrangeRicky'
  | 'BlueRicky'
  | 'ClevelandZ'
  | 'RhodeIslandZ'
  | 'Hero'
  | 'Teewee'
  | 'Smashboy';

export type ActiveState = 0 | 1 | 2 | 3;

// prettier-ignore
export const TetrominoArrayMap = {
  OrangeRicky: [
    [0, 0, 2],
    [2, 3, 2]
  ],
  BlueRicky: [
    [2, 0, 0],
    [2, 3, 2]
  ],
  ClevelandZ: [
    [2, 2, 0],
    [0, 3, 2]
  ],
  RhodeIslandZ: [
    [0, 2, 2],
    [2, 3, 0]
  ],
  Hero: [
    [2, 3, 2, 2]
  ],
  Teewee: [
    [0, 2, 0],
    [2, 3, 2]
  ],
  Smashboy: [
    [2, 2],
    [3, 2]
  ]
} as {[name: string]: ActiveState[][]}

export const TetrominoColorMap = {
  OrangeRicky: 'orange',
  BlueRicky: 'blue',
  ClevelandZ: 'red',
  RhodeIslandZ: 'lightgreen',
  Hero: 'lightblue',
  Teewee: 'purple',
  Smashboy: 'yellow',
  None: 'white',
};

export interface TileIdentity {
  id: number | null;
  tetromino: Tetromino | null;
  activeState: ActiveState;
}

export const emptyTile: TileIdentity = {
  id: null,
  tetromino: null,
  activeState: 0,
};

export type ValidMove = 'left' | 'right' | 'down';
