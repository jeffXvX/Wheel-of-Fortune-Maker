import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AppErrorHandling } from './error-handling.model';
import { NewError, SetErrorStatus, ClearErrors } from './error-handling.actions';

@State<AppErrorHandling>({
  name: 'errors',
  defaults: {
    errors: [],
    nextId: 0
  }
})
export class ErrorHandlingState {
  @Selector() static errors(state: AppErrorHandling) {
    return state.errors;
  }

  @Action(NewError)
  NewError(ctx: StateContext<AppErrorHandling>, action: NewError) {
    const newState = { ...ctx.getState() }; 
    newState.errors = [...newState.errors, { ...action.payload, id: newState.nextId } ];
    newState.nextId++;
    ctx.setState(newState);
  }

  @Action(ClearErrors)
  ClearErrors(ctx: StateContext<AppErrorHandling>) {
    const newState = { ...ctx.getState() }; 
    newState.errors = [];
    ctx.setState(newState);
  }

  @Action(SetErrorStatus)
  SetStatus(ctx: StateContext<AppErrorHandling>, action: SetErrorStatus) {
    const newState = { ...ctx.getState() }; 
    newState.errors = newState.errors.map(error=>{
        if(error.id === action.payload.id) {
            error.status = action.payload.status;
        }
        return error;
    });
    ctx.setState(newState);
  }
  ​
}