import { MONO_SECRET_KEY } from "../config";

class MonoServices {
  private readonly tinUrl = "https://api.withmono.com/v3/lookup/tin";
  private readonly cacUrl = "https://api.withmono.com/v3/lookup/cac";
  private readonly NinUrl = "https://api.withmono.com/v3/lookup/nin";

  public async verifyTin(tinNumber: string) {
    try {
      const response = await fetch(this.tinUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "mono-sec-key": String(MONO_SECRET_KEY)
        },
        body: JSON.stringify({number: tinNumber, channel: "TIN"})
      });
      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(String(error));
    }
  }

  public async verifyCac(cacName: string) {
    try {
      const response = await fetch(`${this.cacUrl}?search=${cacName}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "mono-sec-key": String(MONO_SECRET_KEY)
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  public async verifyNin(ninNo: string) {
    try {
      const response = await fetch(this.NinUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "mono-sec-key": String(MONO_SECRET_KEY)
        },
        body: JSON.stringify({nin: ninNo})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }
}

export default MonoServices;
