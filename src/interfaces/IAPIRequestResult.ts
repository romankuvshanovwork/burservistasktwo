export interface IAPIRequestResult {
  success: boolean;
  result: string | undefined | null;
  errorMessage: string | undefined | null;
}
