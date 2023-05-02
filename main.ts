/* Work with flash storage */
//% block="Storage"
//% icon="\uf0ce"
//% color="#378273"
namespace storage {

    let onStorageFullHandler: () => void;
    let _disabled = false;

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

    /* A key and value to save to flash storage
     * @param key the key to set
     * @param value the value to set.
     * @returns result
     */
    //% block="key $key value $value"
    //% value.shadow=math_number
    //% key.shadow=storage_keyfield
    //% blockId=storagecreatekeyvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=storage/storedata
    export function storedata(key: string, value: any): KeyValue {
        let temp = "" + value;
        return flashstorage.storeData(key, value);
    }
    
    /* Retrieve value
     * @param key the key to get
     * @param value the value to get.
     * @returns result
     */
    //% block="key $key
    //% value.shadow=math_number
    //% key.shadow=storage_keyfield
    //% blockId=storagegetvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=storage/getdata
    export function getdata(key: string): string {
        return flashstorage.getData(key);
    }
}
