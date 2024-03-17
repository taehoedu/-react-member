const IS_DEV = true;

// export const printLog = (comp_name, log) => {
export const printLog = (...args) => {

    if (IS_DEV) {
        console.log(`[${args[0]}] `, 
                    args[1], 
                    args[2] !== undefined ? args[2] : '', 
                    args[3] !== undefined ? args[3] : '', 
                    args[4] !== undefined ? args[4] : '');
        
    }

}