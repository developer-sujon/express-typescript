export const addMinutes = (minutes: any) => {
  const d = new Date();
  let v = new Date();
  v.setMinutes(d.getMinutes() + parseInt(minutes));

  return v.getTime();
};
