function JsonParser(token) {
  try {
    return JSON.parse(token);
  } catch (e) {
    return {};
  }
}

export default JsonParser;
