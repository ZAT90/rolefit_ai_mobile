import { CHIP_INPUT_ACTIONS } from './chipInputActionTypes';

export type ChipInputState = {
  draftValue: string;
  ignoredSubmittedValue: string | null;
  items: string[];
};

export type ChipInputAction =
  | {
      type: typeof CHIP_INPUT_ACTIONS.SET_DRAFT;
      value: string;
    }
  | {
      type: typeof CHIP_INPUT_ACTIONS.SUBMIT_DRAFT;
      value: string;
    }
  | {
      type: typeof CHIP_INPUT_ACTIONS.REMOVE_ITEM;
      value: string;
    }
  | {
      type: typeof CHIP_INPUT_ACTIONS.SET_ITEMS;
      value: string[];
    };

export const getItemsAfterSubmit = (items: string[], value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue || items.includes(trimmedValue)) {
    return items;
  }

  return [...items, trimmedValue];
};

export const getItemsAfterRemove = (items: string[], value: string) => {
  return items.filter(item => item !== value);
};

export const chipInputReducer = (
  state: ChipInputState,
  action: ChipInputAction,
): ChipInputState => {
  switch (action.type) {
    case CHIP_INPUT_ACTIONS.SET_DRAFT:
      if (
        state.ignoredSubmittedValue &&
        action.value === state.ignoredSubmittedValue
      ) {
        return {
          ...state,
          draftValue: '',
          ignoredSubmittedValue: null,
        };
      }

      return {
        ...state,
        draftValue: action.value,
        ignoredSubmittedValue: null,
      };

    case CHIP_INPUT_ACTIONS.SUBMIT_DRAFT: {
      const trimmedValue = action.value.trim();

      if (!trimmedValue) {
        return state;
      }

      return {
        draftValue: '',
        ignoredSubmittedValue: action.value,
        items: getItemsAfterSubmit(state.items, action.value),
      };
    }

    case CHIP_INPUT_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: getItemsAfterRemove(state.items, action.value),
      };

    case CHIP_INPUT_ACTIONS.SET_ITEMS:
      return {
        ...state,
        draftValue: '',
        items: action.value,
      };

    default:
      return state;
  }
};
