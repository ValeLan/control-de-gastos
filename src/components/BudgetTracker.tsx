import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import "react-circular-progressbar/dist/styles.css"


const BudgetTracker = () => {
    const { state, totatlExpenses, remainingBudget, dispatch } = useBudget()
    const percentage = +((totatlExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <div className='w-60 h-60 md:w-100 md:h-100'>
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? 'DC2626' : '#3b82f6',
                            trailColor: '#F5F5F5',
                            textSize: 8,
                            textColor: percentage === 100 ? 'DC2626' : '#3b82f6'
                        })}
                        text={`${percentage}% Gastado`}
                    />

                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white fond-bold rounded-lg"
                    onClick={() => dispatch({ type: 'reset-app' })}
                >
                    Resetear App
                </button>
                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totatlExpenses}
                />
            </div>
        </div>
    )
}

export default BudgetTracker