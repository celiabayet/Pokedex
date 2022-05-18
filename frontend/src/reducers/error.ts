export default function(error: string = '', action: any){

    if(action.type === 'messageError'){
        return action.message
    } else {
        return error
    }
}