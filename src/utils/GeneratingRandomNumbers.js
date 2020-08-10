export default () => {
    let randomNumbers = '_id'

    for(var i = 0; i < 16; i ++){
        const randomNumber = Math.floor(Math.random() * 9).toString()
        randomNumbers  += randomNumber
    }
    
    return randomNumbers
}