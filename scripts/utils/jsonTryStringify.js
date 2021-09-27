const jsonTryStringify = (passedObject) => {
  try {
    return JSON.stringify(passedObject);
  } catch (e) {
    console.log(e);
  }
};

export default jsonTryStringify;
