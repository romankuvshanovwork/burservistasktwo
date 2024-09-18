import * as React from "react";
import Typography from "@mui/material/Typography/Typography";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";
import { FirstNameField } from "../FormFields/FirstNameField/FirstNameField";
import { LastNameField } from "../FormFields/LastNameField/LastNameField";
import { FavoriteActorField } from "../FormFields/FavotiteActorField/FavotiteActorField";
import { FavoriteColorField } from "../FormFields/FavoriteColorField/FavoriteColorField";
import { FormSuccessMessage } from "../FormSuccessMessage/FormSuccessMessage";
import { AgreementField } from "../FormFields/AgreementField/AgreementField";
import { FavoriteSportField } from "../FormFields/FavoriteSportField/FavoriteSportField";
import { FreeTimeActivitiesField } from "../FormFields/FreeTimeActivitiesField/FreeTimeActivitiesField";
import { SignField } from "../FormFields/SignField/SignField";
import { FavoriteSchoolSubjectField } from "../FormFields/FavoriteSchoolSubjectField/FavoriteSchoolSubjectField";
import { LearningOptionsField } from "../FormFields/LearningOptionsField/LearningOptionsField";
import { FormSubmitButton } from "../FormSubmitButton/FormSubmitButton";
import { FavoriteActressField } from "../FormFields/FavoriteActressField/FavoriteActressField";

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
              <FavoriteActorField control={control} errors={errors} />
              <FavoriteColorField control={control} errors={errors} />
              <FavoriteSportField
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <FreeTimeActivitiesField control={control} setValue={setValue} />
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
              <FormSubmitButton label="Отправить анкету" />
            </form>
          </>
        ) : (
          <>
            <Typography variant="h4">Анкета для девочек</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FirstNameField control={control} errors={errors} />
              <LastNameField control={control} errors={errors} />
              <FavoriteActressField control={control} errors={errors} />
              <FavoriteColorField control={control} errors={errors} />
              <FavoriteSchoolSubjectField
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <LearningOptionsField control={control} setValue={setValue} />
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
              <FormSubmitButton label="Отправить анкету" />
            </form>
          </>
        )}
      </Box>
    );
  else {
    return <FormSuccessMessage />;
  }
}
