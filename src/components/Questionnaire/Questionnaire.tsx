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
          <SignField control={control} errors={errors} setValue={setValue} />
          <AgreementField control={control} errors={errors} />
          <Button fullWidth type="submit" variant="contained" color="primary">
            Отправить анкету
          </Button>
        </form>
      </Box>
    );
  else {
    return <FormSuccessMessage />;
  }
}
