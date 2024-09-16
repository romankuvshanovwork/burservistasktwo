// TODO: Переписать покрасивее и предусмотреть крайние случаи. Возращать объект: {success, result, errorMessage}
export const Questionnaire: {
  amountOfQuestionnaires: number;
} = {
  amountOfQuestionnaires: !!localStorage.getItem("questionnaires")
    ? JSON.parse(localStorage.getItem("questionnaires") || "{}")?.length
    : 0,
};
