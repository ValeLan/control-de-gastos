import {v4 as uuidv4} from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {...draftExpense, id: uuidv4()}
}

export type BudgetActions = 
    { type: 'add-budget', payload: {budget:number}} |
    { type: 'show-modal'} |
    { type: 'close-modal'} |
    { type: 'add-expense', payload: DraftExpense} |
    { type: 'delete-expense', payload: {id: Expense['id']}} |
    { type: 'get-expense-by-id', payload: {id: Expense['id']}} |
    { type: 'update-expense', payload: {expense:Expense}} |
    { type: 'reset-app'} |
    { type: 'filter-by-category', payload: {id: Category['id']}}

export type BudgetState = {
    budget:number
    modal:boolean
    expenses: Expense[]
    expenseId: Expense['id']
    selectedCategory: Category['id']
}

const initialBudget = () =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStoraExpenses = () =>{
    const localStoraExpenses = localStorage.getItem('expenses')
    return localStoraExpenses ? JSON.parse(localStoraExpenses) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStoraExpenses(),
    expenseId: '',
    selectedCategory: ''
}

export const budgetReducer = (
    state: BudgetState = initialState, 
    action: BudgetActions
) => {

    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }
    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            expenseId: ''
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload)

        return{
            ...state,
            expenses:[...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === 'delete-expense'){{
        return{
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }}


    if(action.type === 'get-expense-by-id'){{
        return{
            ...state,
            expenseId: action.payload.id,
            modal: true
        }
    }}

    if(action.type === 'update-expense'){
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            expenseId: ''
        }
    }

    if(action.type === 'reset-app'){
        return{
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if(action.type === 'filter-by-category'){
        return{
            ...state,
            selectedCategory: action.payload.id
        }
    }
    return state
}