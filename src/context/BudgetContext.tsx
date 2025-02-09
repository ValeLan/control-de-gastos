import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"



type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totatlExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [ state, dispatch ] = useReducer(budgetReducer, initialState)

    const totatlExpenses = useMemo(()=> state.expenses.reduce((total, expense) => expense.amount + total, 0),[state.expenses])
    
    const remainingBudget = state.budget - totatlExpenses


    return (

        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totatlExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>

    )
        
    
}