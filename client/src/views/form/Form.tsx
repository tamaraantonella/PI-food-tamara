import { Link, useHistory } from 'react-router-dom';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { getDiets, postRecipe } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { validateInputs } from '../../utils/validate';
import { Input } from '../../components/Input';
import { Diet, State } from '../../reducer/types';
import s from './form.module.css';

interface Errors {
  name?: string;
  summary?: string;
  healthScore?: string;
  steps?: string;
  image?: string;
  diets?: string;
}
interface InputProps {
  name: string;
  summary: string;
  healthScore: number;
  steps: string;
  image: string;
  diets: string[];
}

export const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector<State, Diet[]>((state) => state.diets);
  const errorServer = useSelector<State, string>((state) => state.errorServer);
  const [errors, setErrors] = useState<Errors>({});
  const [ableToSubmit, setAbleToSubmit] = useState(true);
  const [input, setInput] = useState<InputProps>({
    name: '',
    summary: '',
    healthScore: 0,
    steps: '',
    image: '',
    diets: []
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validateInputs(
        {
          ...input,
          [e.target.name]: e.target.value
        },
        setAbleToSubmit
      )
    );
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    if (target.checked) {
      const existingDiets = input.diets.includes(target.name);
      if (!existingDiets) {
        setInput({
          ...input,
          diets: [...input.diets, target.name]
        });
      }
    } else {
      const deleteDiets = input.diets.filter((diet) => diet !== target.name);
      setInput({
        ...input,
        diets: deleteDiets
      });
    }
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!input.name || !input.summary) {
      setInput({
        ...input
      });
      return alert('Name and summary are required');
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      e.preventDefault();
      dispatch(postRecipe(input));
      setInput({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: []
      });
      alert('Recipe created successfully');
      history.push('/home');
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={s.createContainer}>
      <div className={s.formContainer}>
        <div className={s.formHeader}>
          <h1 className={s.formTitle}>Create your own recipe</h1>
          <Link to="/home">
            <button className={s.button}>Go back</button>
          </Link>
        </div>
        <form
          action=""
          className={s.form}
        >
          <Input
            inputName="name"
            inputType="text"
            inputOnChange={(e) => handleChange(e)}
            inputValue={input.name}
            containerClassName={s.inputBox}
            labelText="Name"
            errors={errors.name && <p className={s.errorText}>{errors.name}</p>}
          />

          <div className={s.inputBox}>
            <label htmlFor="summary">Summary </label>
            <input
              type="text"
              name="summary"
              id=""
              onChange={(e) => handleChange(e)}
              value={input.summary}
            />
            {errors.summary && <p className={s.errorText}>{errors.summary}</p>}
          </div>

          <div className={s.inputBox}>
            <label htmlFor="healthScore">HealthScore 0-100</label>
            <input
              type="text"
              name="healthScore"
              id=""
              onChange={(e) => handleChange(e)}
              value={input.healthScore}
            />
            {errors.healthScore && (
              <p className={s.errorText}>{errors.healthScore}</p>
            )}
          </div>
          <div className={s.inputBox}>
            <label htmlFor="steps">Steps </label>
            <input
              type="text"
              name="steps"
              id=""
              onChange={(e) => handleChange(e)}
              value={input.steps}
            />
          </div>
          <div className={s.inputBox}>
            <label htmlFor="image">URL Image (jpg) </label>
            <input
              type="text"
              name="image"
              id=""
              onChange={(e) => handleChange(e)}
              value={input.image}
            />
            {errors.image && <p className={s.errorText}>{errors.image}</p>}
          </div>
          <div className={s.dietsBox}>
            <label
              htmlFor="diets"
              className={s.dietTitle}
            >
              Diets{' '}
            </label>
            <div className={s.dietContainer}>
              {!errorServer ? (
                diets?.map(function (diet) {
                  return (
                    <div
                      key={diet.id}
                      className={s.dietItem}
                    >
                      <input
                        type="checkbox"
                        name={diet.name}
                        value={diet.name}
                        onChange={(e) => handleCheck(e)}
                      ></input>
                      <label>{diet.name}</label>
                    </div>
                  );
                })
              ) : (
                <p className={s.errorText}>
                  No diets found! Error: {errorServer}
                </p>
              )}
            </div>
          </div>
          <button
            className={!ableToSubmit ? s.buttonSubmit : s.buttonDisabled}
            disabled={ableToSubmit}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Create recipe
          </button>
        </form>
      </div>
    </div>
  );
};
