export default interface ApiResponseError{
    message:string
    response?:response
}

type response = {
    data:data
}

type data = {
    message:string
}