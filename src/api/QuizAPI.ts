import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAPIRequestResult } from "../interfaces/IAPIRequestResult";
import { IUser } from "../interfaces/IUser";

interface QuizStore {
  quizzes: any[];
  addNewQuiz: (user: IUser, newQuiz: any) => IAPIRequestResult;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      quizzes: [],

      addNewQuiz: (user: IUser, newQuiz: any) => {
        const updatedQuizzes = [
          ...get().quizzes,
          { phone: user.phone, ...newQuiz },
        ];

        set({ quizzes: updatedQuizzes });

        return { success: true, result: null, errorMessage: null };
      },
    }),
    {
      name: "quizzes-storage",
    }
  )
);
