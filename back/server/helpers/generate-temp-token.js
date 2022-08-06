


const generateTemporalToken = () => {
    const partOne = Math.random().toString(32).substring(2);
    const partTwo = Date.now().toString(32);

    return partOne + partTwo;
}


module.exports = { generateTemporalToken }