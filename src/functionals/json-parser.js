function JsonParser(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export default JsonParser;
