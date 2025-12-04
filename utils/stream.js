export async function streamJSON(res, jsonObject, delay = 300) {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  const chars = jsonString.split("");

  for (const ch of chars) {
    res.write(ch);
    await new Promise(r => setTimeout(r, delay));
  }

  res.end();
}
