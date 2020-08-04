export let accessToken = "";

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};

export const renewAccessToken = async () => {
  return fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setAccessToken(data.accessToken);
      return data.accessToken;
    });
};
