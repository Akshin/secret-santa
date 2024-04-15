const TOKEN_FIELD = "_t";

export class TokenService {
  private tokenField;

  constructor(tokenField: string = TOKEN_FIELD) {
    this.tokenField = tokenField;
  }

  public setToken(token: string): void {
    if (!token) return console.log("Token is not passed");
    localStorage.setItem(this.tokenField, token);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenField);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenField) || null;
  }
}
