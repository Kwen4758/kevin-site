export type Tetromino =
  | 'OrangeRicky'
  | 'BlueRicky'
  | 'ClevelandZ'
  | 'RhodeIslandZ'
  | 'Hero'
  | 'Teewee'
  | 'Smashboy';

// prettier-ignore
export const TetrominoArrayMap = {
  OrangeRicky: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  BlueRicky: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  ClevelandZ: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  RhodeIslandZ: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Hero: [
    [1, 1, 1, 1]
  ],
  Teewee: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  Smashboy: [
    [1, 1],
    [1, 1]
  ]
};

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
  activeState: 0 | 1 | 2;
}

export const emptyTile: TileIdentity = {
  id: null,
  tetromino: null,
  activeState: 0,
};

export type ValidMove = 'left' | 'right' | 'down'