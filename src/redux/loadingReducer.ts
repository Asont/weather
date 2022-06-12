type LoadingReducerType = {
    loading: boolean
}

let initialState = {
    loading: false,
}

export type ActionTypeLoading = LoadingSetTypeAC

export const loadingReducer = (
    state: LoadingReducerType = initialState,
    action: ActionTypeLoading
) => {
    switch (action.type) {
        case 'SET-LOADING': {
            return { ...state, loading: action.loading }
        }
        default:
            return state
    }
}

export const loadingSetAC = (loading: boolean) => {
    return {
        type: 'SET-LOADING',
        loading,
    }
}

type LoadingSetTypeAC = ReturnType<typeof loadingSetAC>