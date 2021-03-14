const fs = require('fs');

interface FaultData {
  faults: string[][]
}

interface Fault {
  code: string,
  description: string
}

export const getFaultList = async (): Promise<string[][]> => {
  const rawData = fs.readFileSync('config/machinefaults.json')
  const faultData = (JSON.parse(rawData) as FaultData)
  return faultData.faults
}

export const parseFaults = async (alarms: number[]): Promise<Fault[]> => {
  const faultLists = await getFaultList()
  return alarms.reduce((acc, alarm, i) => {
    return alarm ? acc.concat(...numberToBitArray(alarm).reduce((acc, bit, j) => {
      return bit ? acc.concat(createFault(faultLists, i, j)) : acc
    }, new Array<Fault>())) : acc
  }, new Array<Fault>())
}

// Helper functions

// Convert number to bit array in reverse order, e.g.:
// 2 becomes [0, 1]
// 4 becomes [0, 0, 1]
function numberToBitArray(value: number): number[] {
  return Array.from(value.toString(2)).map(Number).reverse()
}

function createFault(faultLists: string[][], faultList: number, faultBitIndex: number): Fault {
  return {
    code: createFaultCode(faultList, faultBitIndex),
    description: faultLists[faultList][faultBitIndex]
  }
}

function createFaultCode(faultList: number, faultBitIndex: number): string {
  return (faultList * 100 + faultBitIndex).toString()
}
