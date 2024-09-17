import * as React from "react";
import Typography from "@mui/material/Typography/Typography";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button/Button";
import { Box } from "@mui/material";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";
import { FirstNameField } from "../FirstNameField/FirstNameField";
import { LastNameField } from "../LastNameField/LastNameField";
import { FavoriteActorField } from "../FavotiteActorField/FavotiteActorField";
import { FavoriteColorField } from "../FavoriteColorField/FavoriteColorField";
import { FormSuccessMessage } from "../FormSuccessMessage/FormSuccessMessage";
import { AgreementField } from "../AgreementField/AgreementField";
import { FavoriteSportField } from "../FavoriteSportField/FavoriteSportField";
import { FreeTimeActivitiesField } from "../FreeTimeActivitiesField/FreeTimeActivitiesField";
import { SignField } from "../SignField/SignField";
import { ACTORS } from "../../constants/actors";
import { ACTRESSES } from "../../constants/actresses";
import { TYPES_OF_SPORT } from "../../constants/typesOfSport";
import { SCHOOL_SUBJECTS } from "../../constants/schoolSubjects";
import { FREE_TIME_ACTIVITIES } from "../../constants/freeTimeActivities";
import { LEARNING_OPTIONS } from "../../constants/learningOptions";

export default function Questionnaire() {
  const [formSent, setFormSent] = React.useState(false);
  const {
    control,
    handleSubmit,
    trigger,
    getFieldState,
    setValue,
    formState: { errors },
  } = useForm();

  const questionnaire = QuestionnaireAPI;
  const user = User;
  const userGender = user.currentUser().gender;

  //   React.useEffect(() => {
  //     const isTouched = getFieldState('favoriteSport').isTouched;
  //     if (isTouched) trigger("favoriteSport");
  //   }, [trigger, sportsState, getFieldState]);

  const onSubmit = (data: any) => {
    console.log(data);
    if (user.isLogedIn() && user.currentUser()) {
      questionnaire.addNewQuestionnaire(user.currentUser(), {
        ...data,
      });
      setFormSent(true);
    }
  };

  if (!formSent)
    return (
      <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
        {userGender === "male" ? (
          <>
            <Typography variant="h4">Анкета для мальчиков</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FirstNameField control={control} errors={errors} />
              <LastNameField control={control} errors={errors} />
              <FavoriteActorField
                control={control}
                errors={errors}
                options={ACTORS}
                label="Любимый актер*"
                helperText="Пожалуйста, выберите вашего любимого актера"
                errorRequiredText="Выбор любимого актера обязателен"
              />
              <FavoriteColorField control={control} errors={errors} />
              <FavoriteSportField
                control={control}
                errors={errors}
                setValue={setValue}
                options={TYPES_OF_SPORT}
                label="Любимый/любимые виды спорта*"
                validateErrorMessage="Выберите хотя бы один вид спорта"
              />
              <FreeTimeActivitiesField
                control={control}
                setValue={setValue}
                options={FREE_TIME_ACTIVITIES}
                label="Распределите по порядку, что вам больше всего нравится делать в свободное время:"
              />
              <SignField
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <AgreementField
                control={control}
                errors={errors}
                label="Я согласен с обработкой моих персональных данных"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Отправить анкету
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h4">Анкета для девочек</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FirstNameField control={control} errors={errors} />
              <LastNameField control={control} errors={errors} />
              <FavoriteActorField
                control={control}
                errors={errors}
                options={ACTRESSES}
                label="Любимая актриса*"
                helperText="Пожалуйста, выберите вашу любимую актрису"
                errorRequiredText="Выбор любимой актрисы обязателен"
              />
              <FavoriteColorField control={control} errors={errors} />
              <FavoriteSportField
                control={control}
                errors={errors}
                setValue={setValue}
                options={SCHOOL_SUBJECTS}
                label="Любимый/любимые школьные предметы*"
                validateErrorMessage="Выберите хотя бы один предмет"
              />
              <FreeTimeActivitiesField
                control={control}
                setValue={setValue}
                options={LEARNING_OPTIONS}
                label="Распределите по порядку, что для вас интереснее изучать или узнавать:"
              />
              <SignField
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <AgreementField
                control={control}
                errors={errors}
                label="Я согласна с обработкой моих персональных данных"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Отправить анкету
              </Button>
            </form>
          </>
        )}
      </Box>
    );
  else {
    return <FormSuccessMessage />;
  }
}
