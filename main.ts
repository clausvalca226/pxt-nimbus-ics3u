/**
 * Work with flash storage
 */
//% block="Storage"
//% icon="\uf0ce"
//% color="#378273"
namespace storage {
    export enum DeleteType {
        //% block="fast"
        Fast,
        //% block="full"
        Full
    }

    let onStorageFullHandler: () => void;
    let _disabled = false;

    let initialized = false;
    function init() {
        if (initialized)
            return;
        initialized = true;

        mirrorToSerial(false);

        control.onEvent(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL, () => {
            _disabled = true;
            if (onStorageFullHandler) {
                onStorageFullHandler();
            } else {
                basic.showLeds(`
                    # . . . #
                    # # . # #
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                basic.pause(1000);
                basic.clearScreen();
                basic.showString("928");
            }
        });
    }


    export class KeyValue {
        public value: string;
        public key: string;
        constructor(
            key: string,
            value: any
        ) {
            this.value = "" + value;
        }
    }

    /**
     * A key and value to save to flash storage
     * @param key the key to set
     * @param value the value to set.
     * @returns A new value that can be stored in flash storage using log data
     */
    //% block="key $key value $value"
    //% value.shadow=math_number
    //% key.shadow=datalogger_keyfield
    //% blockId=storagecreatekeyvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=storage/create-kv
    export function createKV(key: string, value: any): KeyValue {
        return new KeyValue(key, value);
    }

    //% block="$key"
    //% blockId=storage_keyfield
    //% group="micro:bit (V2)"
    //% blockHidden=true shim=TD_ID
    //% key.fieldEditor="autocomplete" key.fieldOptions.decompileLiterals=true
    //% key.fieldOptions.key="storagekey"
    export function _keyField(key: string) {
        return key
    }

    /**
     * Log data to flash storage
     * @param data Array of data to be logged to flash storage
     */
    //% block="log data array $data"
    //% blockId=storagelogdata
    //% data.shadow=lists_create_with
    //% data.defl=storagecreatekeyvalue
    //% group="micro:bit (V2)"
    //% blockHidden=true
    //% weight=100
    export function storeData(data: KeyValue[]): void {
        if (!data || !data.length)
            return;
        init();

        if (_disabled)
            return;

        flashstorage.beginRow();
        for (const kv of data) {
            flashstorage.logData(kv.key, kv.value);
        }
        flashstorage.endRow();
    }

    /**
     * Register an event to run when no more data can be logged.
     * @param handler code to run when the log is full and no more data can be stored.
     */
    //% block="on log full"
    //% blockId="on log full"
    //% group="micro:bit (V2)"
    //% weight=40 help=datalogger/on-log-full
    export function onLogFull(handler: () => void): void {
        init();
        onStorageFullHandler = handler;
    }


    /**
     * Set whether data is mirrored to serial or not.
     * @param on if true, data that is logged will be mirrored to serial
     */
    //% block="mirror data to serial $on"
    //% blockId=dataloggertogglemirrortoserial
    //% on.shadow=toggleOnOff
    //% on.defl=false
    //% weight=25 help=datalogger/mirror-to-serial
    export function mirrorToSerial(on: boolean): void {
        // TODO:/note intentionally does not have group, as having the same group for all
        // blocks in a category causes the group to be elided.
        init();
        flashstorage.setSerialMirroring(on);
    }
}
