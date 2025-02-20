export function FormValidation(inputField:string,button:HTMLButtonElement){
    if(inputField === ""){
        button.disabled = true;
        return false;
    }
    else{
        button.disabled = false;
        return true;
    }
}