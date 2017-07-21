// Constructor
function statusCode(Code, data) {
    if(Code == 1){
        return {Code : 0 , message : 'OK' , data : data}
    } else {
        return {Code : -1 , message : 'Error'}
    }
}
// export the class
module.exports = statusCode;