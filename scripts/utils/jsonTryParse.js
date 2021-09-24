export default function jsonTryParse(passedStringifedObject){
    try {
        return JSON.parse(passedStringifedObject);
    }
    catch(e) {
        console.log(e);
    }
}