/* Storing structured data in flash. */
//%
declare namespace flashstorage {
    /* Stores the given key/value pair. */
	//% help=flashstorage/store-data
	//% parts="flashstorage"
	//% blockGap=8
	//% group="micro:bit (V2)" shim=flashlog::storeData
    function storeData(key: string, value: string): int32;

    /* Retrieves the given key/value pair. */
	//% help=flashstorage/get-data
	//% parts="flashstorage"
	//% blockGap=8
	//% group="micro:bit (V2)" shim=flashlog::getData
    function getData(key: string): string;
}
