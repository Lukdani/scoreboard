const jsonTryParse = (passedStringifedObject) => {
  try {
    return JSON.parse(passedStringifedObject);
  } catch (e) {
    console.log(e);
  }
};

export default jsonTryParse;
