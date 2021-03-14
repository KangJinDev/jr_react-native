import * as plcnext from '../plcnext'

const pushButtonSuffix = 'PB'
const onPushButtonVar = 'OnPB'

interface ButtonRequest {
    name: string,
    value: string
}

export const handleButton = async (button: ButtonRequest): Promise<boolean> => {
    const end = button.name.substring(button.name.length - 2, button.name.length)

    if (end === pushButtonSuffix) {
        const path = `${button.name}.${onPushButtonVar}`
        const setRes = await plcnext.setPushButton(path, button.value === 'true')
        return true
    } else {
        // TODO: Handle non-PB buttons
        console.log(`TODO: Handle non-PB buttons`)
        return true
    }
}
