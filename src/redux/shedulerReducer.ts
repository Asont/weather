export type StateTextForShedulerType ={
     shedulerData:DataType[]
}

export type DataType = {
    time:string,
    text:string
}

const initialState = {
    shedulerData:[
        {time:"13:05", text:"Go to the grocery store"},
        {time:"20:05", text:"Go to a friend"},
        {time:"08:05", text:"Go to nature"},
    ]
}


export const shedulerReducer =(state:StateTextForShedulerType=initialState, action:any)=>{
    switch (action.type){
        case"":{
            return state
        }
        default:return state
    }
}

