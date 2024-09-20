import { IAPIRequestResult } from "../interfaces/IAPIRequestResult";
import { IUser } from "../interfaces/IUser";

// TODO: Переписать покрасивее и предусмотреть крайние случаи. Возращать объект: {success, result, errorMessage}
export const QuestionnaireAPI: {
  amountOfQuestionnaires: number;
  addNewQuestionnaire: (
    user: IUser,
    newQuestionnaire: any
  ) => IAPIRequestResult;
} = {
  amountOfQuestionnaires: !!localStorage.getItem("questionnaires")
    ? JSON.parse(localStorage.getItem("questionnaires") || "{}")?.length
    : 0,
  addNewQuestionnaire: function (user: IUser, newQuestionnaire: any) {
    const questionnaires = !!localStorage.getItem("questionnaires")
      ? JSON.parse(localStorage.getItem("questionnaires") || "{}")
      : [];

    localStorage.setItem(
      "questionnaires",
      JSON.stringify([
        ...questionnaires,
        { phone: user.phone, ...newQuestionnaire },
      ])
    );
    return { success: true, result: null, errorMessage: null };
  },
};
