// Convert timezone string to timezone number: "-05:30" -> -5.5
export const convertTimezoneStringToNumber = (timezoneString: string): number => {
    const splitTz = timezoneString.split(":")
    const tzHourStg = splitTz[0]
    const tzMinuteStg = splitTz[1]

    const tzHourNum = parseFloat(tzHourStg)
    let tzMinuteNum = parseFloat(tzMinuteStg)

    // Make minutes negative if the timezone is negative
    if (tzHourNum < 0) tzMinuteNum = tzMinuteNum * -1

    return tzHourNum + (tzMinuteNum / 60)
}

// Convert timezone string to timezone number: -5.5 -> "-05:30"
export const convertTimezoneNumberToString = (timezoneNumber: number): string => {
    const hour = Math.floor(Math.abs(timezoneNumber))
    const minute = (Math.abs(timezoneNumber) - hour) * 60
    const sign = (timezoneNumber < 0) ? "-" : ""
    const hourStg = hour.toFixed(0).toString().padStart(2, '0')
    const minStg = minute.toFixed(0).toString().padStart(2, '0')
    return sign + hourStg + ":" + minStg
}

// Ensures the provided timezone is a string. If input a number, will attempt
// to convert from number to string. If input is neither number or string, it
// will fail cast to string
export const ensureTimezoneIsString = (timezone: any): string => {
    if (typeof timezone == "number") {
        return convertTimezoneNumberToString(timezone)
    } else {
        return timezone as string
    }
}
