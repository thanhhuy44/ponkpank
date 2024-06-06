export const convertImageURL = (url: string) => {
  const splitUrl = url.split("/");
  return url.replace(`${splitUrl[3]}/`, "").replace(`${splitUrl[4]}/`, "");
};
