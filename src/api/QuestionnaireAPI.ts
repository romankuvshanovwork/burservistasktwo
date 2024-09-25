import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAPIRequestResult } from "../interfaces/IAPIRequestResult";
import { IUser } from "../interfaces/IUser";

interface QuestionnaireStore {
  questionnaires: any[];
  amountOfQuestionnaires: () => number;
  addNewQuestionnaire: (
    user: IUser,
    newQuestionnaire: any
  ) => IAPIRequestResult;
}

export const useQuestionnaireStore = create<QuestionnaireStore>()(
  persist(
    (set, get) => ({
      questionnaires: [],

      amountOfQuestionnaires: () => get().questionnaires.length,

      addNewQuestionnaire: (user: IUser, newQuestionnaire: any) => {
        const updatedQuestionnaires = [
          ...get().questionnaires,
          { phone: user.phone, ...newQuestionnaire },
        ];

        set({ questionnaires: updatedQuestionnaires });

        return { success: true, result: null, errorMessage: null };
      },
    }),
    {
      name: "questionnaires-storage",
    }
  )
);
