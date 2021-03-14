import fs from 'fs';

// Convert number to bit array in reverse order, e.g.:
// 2 becomes [0, 1]
// 4 becomes [0, 0, 1]
export const numberToBitArray = (value) => {
    return Array.from(value.toString(2)).reverse();
};

const createFault = (faultLists, faultListIndex, faultBitIndex) => {
    return {
        code: createFaultCode(faultListIndex, faultBitIndex),
        description: faultLists[faultListIndex][faultBitIndex],
    };
};

const createFaultCode = (faultList, faultBitIndex) => {
    return (faultList * 100 + faultBitIndex).toString().padStart(3, "0");
};

export const getFaultList = async () => {
    const rawData = fs.readFileSync('config/machinefaults.json');
    const faultData = (JSON.parse(rawData));
    return faultData.faults;
}

export const parseFaults = async (alarms) => {
    const faultLists = await getFaultList();
    return alarms.reduce((acc, alarm, i) => {
        return alarm ? acc.concat(...numberToBitArray(alarm).reduce((acc, bit, j) => {
            return parseInt(bit) ? acc.concat(createFault(faultLists, i, j)) : acc;
        }, [])) : acc;
    }, [])
}
