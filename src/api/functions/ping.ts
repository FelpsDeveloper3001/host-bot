import api from "../";

export async function ping(): Promise<number> {
  return new Promise((res) => {
    api
      .get("/system")
      .then((data) => {
        res(data.status);
      })
      .catch((err) => {
        res(err.status);
      });
  });
}
