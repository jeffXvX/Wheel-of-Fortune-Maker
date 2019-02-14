import { State, Selector, Action, StateContext } from '@ngxs/store';
import { RomConstants, AllRomConstants } from './rom-constants.model';
import { SetRomConstants, ClearRomConstants } from './rom-constants.actions';
import { defaultRomConstants } from './rom-constants.default';

@State<RomConstants>({
  name: 'romConstants',
  defaults: defaultRomConstants()
})
export class RomConstantsState {

    @Selector() static definedConstants(state: RomConstants) {
        return state;
    }

    @Selector() static md5(state: RomConstants) {
        return state.md5;
    }

    @Selector() static allConstants(state: RomConstants): AllRomConstants {
        return {
            ...state,
            puzzlesEndAddress: state.puzzlesStartAddress + state.maxPuzzleCharacters,
            puzzlePointersEndAddress: state.puzzlePointersStartAddress + (state.puzzlesRequired * state.puzzlePointerBytesSize),
            categoryPointersEndAddress: state.categoryPointersStartAddress + (state.numberOfCategories * state.categoryPointerAddressSize),
            categoryNamesEndAddress: state.categoryNamesStartAddress + (state.categoryNameCharacterLength * state.numberOfCategories),
            categoryNameLengthsEndAddress: state.categoryNameLengthsStartAddress + state.numberOfCategories
        }
    }

    @Action(SetRomConstants)
    SetGameName(ctx: StateContext<RomConstants>, action: SetRomConstants) {
        const newState = { ...action.payload.constants };
        newState.numberOfCategoryAnswersAddresses = [...action.payload.constants.numberOfCategoryAnswersAddresses];
        ctx.setState(newState);
    }

    @Action(ClearRomConstants)
    SetGame(ctx: StateContext<RomConstants>) {
        ctx.setState(defaultRomConstants());
    }
}