import { PointsActionType, type PointsAction } from "../reducers/pointsReducer"

// Action Creator for decreasing points
export const decreasePoints = (amount = 1): PointsAction => {
	return {
		type: PointsActionType.DECREMENT,
		payload: { amount },
	}
}

// Action Creator for increasing points
export const increasePoints = (amount = 1): PointsAction => {
	return {
		type: PointsActionType.INCREMENT,
		payload: { amount }
	}
}

// Action Creator for resetting points to initial value
export const resetPoints = (): PointsAction => {
	return { type: PointsActionType.RESET }
}
