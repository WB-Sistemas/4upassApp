
export interface Either<A, B> {
  left: A;
  right: B;
  isLeft: boolean;
  isRight: boolean;
}
