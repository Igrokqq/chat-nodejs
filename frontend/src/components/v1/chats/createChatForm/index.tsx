import { useState, ChangeEvent, FormEvent } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { CreateChatFormState, CreateChatFormErrors, Props } from './types';
import * as CreateChatFormPresenter from "./presenter";
import { useMutation } from "react-query";
import * as eventBus from "../../../../common/eventBus";

const defaultState: CreateChatFormState = {
  label: "",
  description: "",
}
const defaultErrorsState: CreateChatFormErrors = {
  label: "",
  description: ""
}
export default function CreateChatForm(props: Props): JSX.Element {
  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultErrorsState);
  const createChatMutation = useMutation(CreateChatFormPresenter.onSubmit, {
    onSuccess() {
      setState(defaultState);
      setErrors(defaultErrorsState);
      eventBus.trigger(CreateChatFormPresenter.EVENTS.SUBMIT, {});
    },
    onError(error: Error) {
      console.error('custom error', error);
    }
  });

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const errors: CreateChatFormErrors | null = await CreateChatFormPresenter.validate(state);

    if (errors) {
      setErrors(errors);
      return;
    }

    createChatMutation.mutate(state);
  };

  const onLabelInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      label: event.target.value.trim()
    })
  }

  const onDescriptionInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setState({
      ...state,
      description: event.target.value.trim()
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3" hasValidation>
        <Form.Label className="w-100 text-start">Label</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Label"
          onChange={onLabelInput}
          isInvalid={!!errors.label}
        />
        <Form.Control.Feedback type="invalid">
          {errors.label}
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3 flex-column" hasValidation>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          onChange={onDescriptionInput}
          className="w-100"
          rows={3}
          placeholder="Enter your description"
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </InputGroup>
      <div className="d-flex justify-content-center">
        <Button
          variant="dark"
          className="w-50 mt-2"
          type="submit"
          disabled={props.isSubmitDisabled}
        >Create</Button>
      </div>
    </Form>
  )
}